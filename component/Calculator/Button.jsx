import { useDispatch, useSelector } from "react-redux"
import { inputNumber, deleteByDigit, deleteAllInput, setOp, equal, clearInput, resetAll, percent, saveHistory } from '../../store/calculator/calculatorReducer'

const Button = ({btn}) => {
    const dispatch = useDispatch()
    const isOpSet = useSelector(state => state.calculator.isOpSet)
    const {equalizedNumber, input, isEqualizedByOpCanBeUse, deleteByDigitBlocker} = useSelector(state => state.calculator)
    const myColors = useSelector(state => state.calculator.myColors)

    const handleClickButton = data => {
        if (data.type === 'number' || data.value === '.') {
            if (data.value === '.' && input.includes('.')) return

            if (isOpSet) dispatch(clearInput())

            if (deleteByDigitBlocker) {
                dispatch(deleteAllInput())
            }
            
            if (equalizedNumber)  dispatch(resetAll())

            if (input==='0' && data.value === '.') {
                dispatch(inputNumber('0.'))
            }
            else {
                dispatch(inputNumber(data.value))
            }
            
        }

        if (data.value === '%') dispatch(percent())

        if (data.value === 'del') dispatch(deleteByDigit())

        if (data.value === 'CE')  dispatch(deleteAllInput())

        if (data.value === 'C')  dispatch(resetAll())



        if (data.value === '+') dispatch(setOp({sign: '+', op: 'add'}))  

        if (data.value === '-')  dispatch(setOp({sign: '-', op: 'sub'}))

        if (data.value === '*') dispatch(setOp({sign: '\u00d7', op: 'mul'}))

        if (data.value === '/') dispatch(setOp({sign: '\u00f7', op: 'div'}))
 

        
        if (data.value === '=') {
            if (isOpSet || equalizedNumber || isEqualizedByOpCanBeUse) {
                dispatch(equal())
                dispatch(saveHistory())
            }
        } 
    }

    return (
        <>
            <div 
                onClick={() => handleClickButton({value: btn.value, type: btn.type})} 
                className={`btn btn-${btn.name}`}
                title={btn.title}>
                {
                   btn.display
                }
            </div>
            <style jsx>
                {`
                
                    .btn-${btn.name} {
                        position: relative;
                        grid-area: ${btn.name};
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: ${btn.value==='='? myColors.yellow : myColors.white};
                        font-weight: 700;
                        font-size: 1.6rem;
                        cursor: pointer;
                        color: ${myColors.black};
                        border-radius: 3px;
                        transition: 0.2s linear;
                        box-shadow: 3px 3px 4px rgba(0,0,0,0.1),
                                    inset -2px -2px 6px rgba(0,0,0,0.1);
                    }

                    .btn-${btn.name}:hover {
                        filter: brightness(106%);
                    }

                    .btn-${btn.name}:active {
                        transform: scale(0.98);
                        filter: brightness(98%);
                        box-shadow: 3px 3px 4px rgba(0,0,0,0),
                                    inset -2px -2px 6px rgba(0,0,0,0);
                    }

                    .btn-${btn.name}::before {
                        position: absolute;
                        content: '';
                        height: 30%;
                        width: 90%;
                        border-radius: 4px;
                        background-image: linear-gradient(to bottom, rgba(255,255,255,0.6), transparent);
                        top: 5px;
                        left: 50%;
                        transform: translate(-50%, 0);
                    }

                    @media screen and (max-width: 800px) {
                        .btn-${btn.name} {
                            font-size: 1.4rem;
                        }
                    }
                
                `}
            </style>
        </>
    )
}

export default Button