import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [
            {
                id: 0,
                title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam sunt enim recusandae?',
                todos: [
                    {   
                        id: 0,
                        todo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, maxime!',
                        isFinished: true,
                    },
                    {   
                        id: 2,
                        todo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatum placeat, dolores dolorem sunt harum, perferendis beatae quam aperiam vero excepturi possimus laudantium vitae eaque tempora non repellendus totam quibusdam consequatur. Ad quaerat quod natus! Optio nihil corrupti aliquid possimus.',
                        isFinished: true,
                    }
                ],
                isAllFinished: false,
                timestamp: '5/20/2021, 9:46:08 AM'
            },
            {
                id: 1,
                title: 'HAHAHAHAHHAHAACAC',
                todos: [
                    {   
                        id: 0,
                        todo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti atque omnis eaque modi, illum tenetur.',
                        isFinished: true,
                    },
                    {   
                        id: 2,
                        todo: 'EAT EAT EAT',
                        isFinished: false,
                    }
                ],
                isAllFinished: false,
                timestamp: '5/20/2021, 9:46:08 AM'
            }
        ],
        todoEditable: null,
        activeTodo: null,
        addTodo: false,
        filter: 'all',
        newTodo: null
    },
    reducers: {
        openTodo: (state, action) => {
            const id = action.payload
            state.activeTodo = id
        },
        openAddTodo: state => {
            state.addTodo = !state.addTodo
        },
        saveTodo: (state, action) => {
            const todo = action.payload
            state.todos.push(todo)
        },
        toggleCheck: (state, action) => {
            const {selectedTodoId, todoId} = action.payload

            state.todos = state.todos.map(selectedTodo => {
                if (selectedTodo.id === selectedTodoId) {
                    return {
                        ...selectedTodo,
                        todos: selectedTodo.todos.map(todo => {
                                    if (todo.id === todoId) {
                                        return {
                                            ...todo,
                                            isFinished: !todo.isFinished
                                        }
                                    }
            
                                    return todo
                                })
                    }
                }

                return selectedTodo
            })
        },
        openEdit: (state, action) => {
            const id = action.payload
            state.todoEditable = id
            state.newTodo = null
        },
        cancelEdit: state => {
            state.todoEditable = null
            state.newTodo = null
        },
        saveNewTodo: (state, action) => {
            const todo = action.payload
            state.newTodo = todo
        },
        saveEdit: (state, action) => {
            const {selectedTodoId, todoId} = action.payload

            if (!state.newTodo) return

            state.todos = state.todos.map(selectedTodo => {
                if (selectedTodo.id === selectedTodoId) {
                    return {
                        ...selectedTodo,
                        todos: selectedTodo.todos.map(todo => {
                                    if (todo.id === todoId) {
                                        return {
                                            ...todo,
                                            todo:  state.newTodo
                                        }
                                    }
            
                                    return todo
                                })
                    }
                }

                return selectedTodo
            }) 
        },
        deleteTodo: (state, action) => {
            const {selectedTodoId, todoId} = action.payload

            state.todos = state.todos.map(selectedTodo => {
                if (selectedTodo.id === selectedTodoId) {
                    return {
                        ...selectedTodo,
                        todos: selectedTodo.todos.filter(todo => todo.id !== todoId)
                    }
                }

                return selectedTodo
            })
        },
        addTodo: (state, action) => {
            const todo = action.payload

            state.todos = state.todos.map(selectedTodo => {
                if (selectedTodo.id === state.activeTodo) {
                    return {
                        ...selectedTodo,
                        todos: [...selectedTodo.todos, todo]
                    }
                }

                return selectedTodo
            })
        },
        deleteAllTodos: state => {
            state.todos = state.todos.map(selectedTodo => {
                if (selectedTodo.id === state.activeTodo) {
                    return {
                        ...selectedTodo,
                        todos: []
                    }
                }

                return selectedTodo
            })
        },
        chooseFilter: (state, action) => {
            const filter = action.payload
            state.filter = filter
        },
        backState: (state, action) => {
            const type = action.payload

            if (type === 'todo') state.activeTodo = null
            else if (type === 'form') state.addTodo = false
        }
    }
})

export const {
    openTodo,
    saveTodo,
    openAddTodo,
    toggleCheck,
    openEdit,
    cancelEdit,
    chooseFilter,
    saveEdit,
    saveNewTodo,
    deleteTodo,
    addTodo,
    deleteAllTodos,
    backState
} = todoSlice.actions

export default todoSlice.reducer