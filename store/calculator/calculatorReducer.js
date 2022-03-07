import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4} from 'uuid'
import myColors from '../../data/myColors'

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState: {
        myColors: myColors.normal,
        darkMode: myColors.dark,
        input: '0',
        preview: null,
        prevInput: null,
        operation: null,
        equalizedNumber: null,
        isOpSet: false,
        opSetInputCache: null,
        isEqualizedByOpCanBeUse: false,
        deleteByDigitBlocker: false,
        history: [
            {
                id: 0,
                solution: '1+4=',
                answer: '5',
                isOptionsOpen: false,
                operation: 'add',
                copied: false
            },
            {
                id: 1,
                solution: '5+5=',
                answer: '10',
                isOptionsOpen: false,
                operation: 'add',
                copied: false
            }
        ],
        isHistoryShow: false
    },
    reducers: {
        inputNumber: (state, action) => {
            const number = action.payload

            if (state.input.replace('.','').length === 16) return

            if (state.input === '0') {
                state.input = number
                return
            }

            state.input += number
        },
        deleteByDigit: state => {
            if (state.deleteByDigitBlocker) return
            if (state.input === '0') return

            const arrayValue = state.input

            if (arrayValue.length === 1) {
                state.input = '0'
                return
            }
            state.input = arrayValue.substring(0,arrayValue.length-1)
        },
        deleteAllInput: state => {
            if (state.deleteByDigitBlocker) {
                state.preview = `${state.prevInput} +`
                state.deleteByDigitBlocker = false
            }

            if (state.input === '0') return
            state.input = '0'
        },
        setOp: (state, action) => {
            const sign = action.payload.sign
            const op = action.payload.op

            if (!state.equalizedNumber && state.isEqualizedByOpCanBeUse) {
                const setOp = state.operation
                let answer = null

                if (setOp==='add') answer = state.prevInput + Number(state.input)
                if (setOp==='sub') answer = state.prevInput - Number(state.input)
                if (setOp==='mul') answer = state.prevInput * Number(state.input)
                if (setOp==='div') answer = state.prevInput / Number(state.input)

                const history = {
                    id: uuidv4(),
                    solution: `${state.prevInput} ${setOp==='add'? '+' : (setOp==='sub'? '-' : (setOp==='mul'? '\u00d7' : '\u00f7'))} ${state.input} =`,
                    answer,
                    isOptionsOpen: false,
                    operation: state.operation 
                }

                const setPreview = `${answer} ${sign}`
                state.preview = setPreview
                state.input = answer.toString()
                state.prevInput = Number(state.input)
                state.isOpSet = true
                state.operation = op
                state.isEqualizedByOpCanBeUse = false
                state.history.unshift(history)

                return
            }

            const setPreview = `${state.input} ${sign}`
            state.operation = op
            state.prevInput = Number(state.input)
            state.isOpSet = true
            state.preview = setPreview
            state.equalizedNumber = null
        },
        equal: state => {
            if (state.operation === 'add') {
                if (state.equalizedNumber) {
                    const answer = state.equalizedNumber + Number(state.opSetInputCache)
                    state.preview = `${state.equalizedNumber} + ${state.opSetInputCache} =`
                    state.input = answer.toString()
                    state.equalizedNumber = answer
                    return
                }

                const answer = state.prevInput + Number(state.input)
                state.opSetInputCache = state.input
                state.preview = `${state.prevInput} + ${state.input} =`
                state.input = answer.toString()
                state.equalizedNumber = answer
            }

            if (state.operation === 'sub') {
                if (state.equalizedNumber) {
                    const answer = state.equalizedNumber - Number(state.opSetInputCache)
                    state.preview = `${state.equalizedNumber} - ${state.opSetInputCache} =`
                    state.input = answer.toString()
                    state.equalizedNumber = answer
                    return
                }

                const answer = state.prevInput - Number(state.input)
                state.opSetInputCache = state.input
                state.preview = `${state.prevInput} - ${state.input} =`
                state.input = answer.toString()
                state.equalizedNumber = answer
            }

            if (state.operation === 'mul') {
                if (state.equalizedNumber) {
                    const answer = state.equalizedNumber * Number(state.opSetInputCache)
                    state.preview = `${state.equalizedNumber} \u00d7 ${state.opSetInputCache} =`
                    state.input = answer.toString()
                    state.equalizedNumber = answer
                    return
                }

                const answer = state.prevInput * Number(state.input)
                state.opSetInputCache = state.input
                state.preview = `${state.prevInput} \u00d7 ${state.input} =`
                state.input = answer.toString()
                state.equalizedNumber = answer
            }

            if (state.operation === 'div') {
                if (state.equalizedNumber) {
                    const answer = state.equalizedNumber / Number(state.opSetInputCache)
                    state.preview = `${state.equalizedNumber} \u00f7 ${state.opSetInputCache} =`
                    state.input = answer.toString()
                    state.equalizedNumber = answer
                    return
                }

                const answer = state.prevInput / Number(state.input)
                state.opSetInputCache = state.input
                state.preview = `${state.prevInput} \u00f7 ${state.input} =`
                state.input = answer.toString()
                state.equalizedNumber = answer
            }

            state.isEqualizedByOpCanBeUse = false
            state.deleteByDigitBlocker = false
        },
        clearInput: state => {
            state.input = '0'
            state.isOpSet = false
            state.isEqualizedByOpCanBeUse = true
        },
        resetAll: state => {
            state.input = '0'
            state.preview = null
            state.prevInput = null
            state.operation = null
            state.equalizedNumber = null
            state.isOpSet = false
            state.opSetInputCache = null
            state.isEqualizedByOpCanBeUse = false
            state.deleteByDigitBlocker = false
        },
        percent: state => {
            const percentage = Number(state.input) / 100
            const valByPercentage = state.prevInput * percentage

            if (state.operation === 'add') {
                state.preview = `${state.prevInput} + ${valByPercentage}`
                state.input = valByPercentage.toString()
            }

            state.deleteByDigitBlocker = true
        },
        showOptions: (state, action) => {
            const id = action.payload
            
            state.history = state.history.map(data => {
                if (data.id === id) {
                    return {...data, isOptionsOpen: !data.isOptionsOpen}
                }
                return {...data, isOptionsOpen: false}
            })
        },
        saveHistory: state => {
            const history = {
                id: uuidv4(),
                solution: state.preview,
                answer: state.input,
                isOptionsOpen: false,
                operation: state.operation 
            }

            console.log(history)

            state.history.unshift(history)
        },
        deleteHistory: (state, action) => {
            const id = action.payload
            const history = state.history.filter(data => data.id !== id)
            state.history = history
        },
        displayHistory: (state, action) => {
            const id = action.payload

            const {solution, answer, operation} = state.history.find(data => data.id === id)

            state.input = answer
            state.preview = solution 
            state.opSetInputCache = answer
            state.equalizedNumber = Number(answer)
            state.operation = operation
        },
        copyAnswer: (state, action) => {
            const id = action.payload

            const {answer} = state.history.find(data => data.id === id)

            navigator.clipboard.writeText(answer)

            state.history = state.history.map(data => {
                if (data.id === id) {
                    return {...data, copied: !data.copied}
                }
                return data
            })
        },
        unShowCopiedTooltip: (state, action) => {
            const id = action.payload
            state.history = state.history.map(data => {
                if (data.id === id) {
                    return {...data, copied: false}
                }
                return data
            })
        },
        deleteAllHistory: state => {
            state.history = []
        },
        toggleHistory: state => {
            state.isHistoryShow = !state.isHistoryShow
        }
    }
})

export const {
    inputNumber,
    deleteByDigit,
    deleteAllInput,
    equal,
    clearInput,
    resetAll,
    setOp,
    percent,
    showOptions,
    saveHistory,
    deleteHistory,
    displayHistory,
    copyAnswer,
    unShowCopiedTooltip,
    deleteAllHistory,
    toggleHistory
} = calculatorSlice.actions

export default calculatorSlice.reducer