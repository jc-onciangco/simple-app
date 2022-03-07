import { useSelector, useDispatch } from "react-redux"
import { toggleCheck, openEdit , cancelEdit , saveEdit , saveNewTodo , deleteTodo } from '../../store/todo/todoReducer'

const TodoList = () => {
    const dispatch = useDispatch()
    const todosRef = useSelector(state => state.todo.todos.find(todo => todo.id === state.todo.activeTodo).todos)
    const selectedTodo = useSelector(state => {
        const todo = state.todo.todos.find(todo => todo.id === state.todo.activeTodo)

        if (state.todo.filter === 'done') {
            return {
                ...todo,
                todos: todo.todos.filter(todo => todo.isFinished)
            }
        }
        else if (state.todo.filter === 'remainings') {
            return {
                ...todo,
                todos: todo.todos.filter(todo => !todo.isFinished)
            }
        }
        else {
            return todo
        }
    })
    const filter = useSelector(state => state.todo.filter)
    const todoEditable = useSelector(state => state.todo.todoEditable)

    const handleToggleCheck = (selectedTodoId, todoId) => {
        dispatch(toggleCheck({selectedTodoId, todoId}))
    }

    const handleOpenEdit = id => {
        dispatch(openEdit(id))
    }

    const handleCancelEdit = () => {
        dispatch(cancelEdit())
    }

    const handleEditTodo = e => {
        const todo = e.target.value
        dispatch(saveNewTodo(todo))
    }
    
    const handleSaveEdit = (selectedTodoId, todoId) => {
        dispatch(saveEdit({selectedTodoId, todoId}))
        dispatch(cancelEdit())
    }

    const handleDeleteTodo = (selectedTodoId, todoId) => {
        dispatch(deleteTodo({selectedTodoId, todoId}))
    }

    return (
        <>
            <div className="container">
                <div className="inner-container">
                    {   
                        selectedTodo.todos.length===0? 
                        <div className="no-data-container">
                            {
                                (todosRef.length!==0 && filter==='done') && <div className="no-data-message">You have not yet done.</div>
                            }
                            {
                                (todosRef.length!==0 && filter==='remainings') && <div className="no-data-message">Congrats, you have finished all your todos.</div>
                            }
                            {
                                (todosRef.length===0 && (filter==='all' || filter==='done' || filter==='remainings')) && <div className="no-data-message">Add todo below.</div>
                            }
                        </div>:
                        selectedTodo.todos.map(todo => {
                            return (
                                <div className="todo" key={todo.id}>
                                    <div className="todo-inner-container" style={
                                        {
                                            backgroundColor: filter!=='all'? '#E0EFE0' : (todo.isFinished? 'rgb(210, 229, 255)' : 'rgb(235, 235, 235)')
                                        }
                                    }>
                                        <div className="checkbox-container">
                                            <div onClick={() => handleToggleCheck(selectedTodo.id, todo.id)} className="icon-container checkbox-icon-container">
                                                {
                                                    todo.isFinished?
                                                    <i className="fas fa-check-square"></i>:
                                                    <i className="far fa-square"></i>
                                                }
                                            </div>
                                        </div>
                                        <div className="title">
                                            {
                                                todoEditable!==(selectedTodo.id + todo.id)?
                                                <div className="read" style={{
                                                    textDecoration: filter!=='all'? 'none' : (todo.isFinished? 'line-through' : 'none')
                                                    }}>{todo.todo}</div> :
                                                <input type="input" id="edit-input" onChange={handleEditTodo} autoFocus  className="write" defaultValue={todo.todo} />                                            }
                                        </div>
                                        <div className="options">
                                            {
                                                todoEditable!==(selectedTodo.id + todo.id)?
                                                <>
                                                    <div className="edit option">
                                                        {
                                                            !todo.isFinished &&
                                                            <div onClick={() => handleOpenEdit(selectedTodo.id + todo.id)} id="open-edit-btn" className="icon-container edit-icon-container">
                                                                <i className="fas fa-edit"></i>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="delete option">
                                                        <div onClick={() => handleDeleteTodo(selectedTodo.id, todo.id)} className="icon-container delete-icon-container">
                                                            <i className="fas fa-trash"></i>
                                                        </div>
                                                    </div>
                                                </> :
                                                <>
                                                    <div className="save option">
                                                        <div onClick={() => handleSaveEdit(selectedTodo.id, todo.id)} id="save-btn" className="icon-container">
                                                            <i className="fas fa-check"></i>
                                                        </div>
                                                    </div>
                                                    <div className="cancel option">
                                                        <div onClick={handleCancelEdit} className="icon-container">
                                                            <i className="fas fa-times"></i>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <style jsx>
                {`
                    
                    .container {
                        height: 72%;
                        width: 100%;
                    }

                    .no-data-container {
                        width: 80%;
                        background-color: rgb(137, 190, 211);
                        padding: 10px 0;
                        text-align: center;
                        font-size: 0.9rem;
                        font-weight: 600;
                        margin: 0 auto;
                        margin-top: 20px;
                        color: white;
                    }

                    .inner-container {
                        height: 100%;
                        width: 100%;
                        overflow-y: scroll;
                    }
                    ::-webkit-scrollbar {
                        display: none;
                    }

                    .todo {
                        padding: 0 0.4rem 0.4rem 0.4rem;
                        min-height: 3rem;
                    }

                    .todo-inner-container {
                        height: 100%;
                        width: 100%;
                        border-radius: 3px;
                        display: flex;
                    }

                    .checkbox-container {
                        display: flex;
                        align-items: center;
                        padding: 0 15px;
                    }

                    .checkbox {
                        height: 20px;
                        width: 20px;
                        background-color: blue;
                    }

                    .title {
                        padding: 20px 0;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        font-size: 1rem;
                    }

                    .read {
                        width: 100%;
                        height: 100%;
                    }

                    .write {
                        width: 100%;
                        height: 100%;
                        font-size: 1rem;
                        outline: none;
                        border-radius: 3px;
                        border: none;
                        padding: 4px 4px 4px 6px;
                        background-color: rgba(0,0,0,0.05);
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif ui;
                        resize: none;
                    }

                    .options {
                        display: flex;
                        align-items: center;
                        font-size: 0.9rem;
                        font-weight: 600;
                        padding: 0 15px 0 0;
                    }

                    .option {
                        margin: 0 0 0 12px;
                        cursor: pointer;
                    }

                    .icon-container {
                        cursor:: pointer;
                    } 

                    .option > .icon-container {
                        cursor: pointer;
                        height: 1.5rem;
                        width: 1.5rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 3px;
                        font-size: 0.8rem;
                    }

                    .edit-icon-container {
                        background-color: rgb(28, 171, 228);
                        color: white;
                    }
                    .delete-icon-container {
                        background-color: rgb(255, 71, 71);
                        color: white;
                    }
                    .checkbox-icon-container {
                        font-size: 1.3rem;
                        color: rgb(28, 171, 228);
                    }
             
                `}
            </style>
        </>
    )
}

export default TodoList