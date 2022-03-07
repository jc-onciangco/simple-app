import { useDispatch, useSelector } from "react-redux"
import { openTodo } from '../../store/todo/todoReducer'

const Todos = () => {
    const dispatch = useDispatch()
    const todos = useSelector(state => {
        return state.todo.todos.map(todo => {
            return {
                ...todo,
                finishedTodos: todo.todos.filter(todo => todo.isFinished).length
            }
            return todo
        })
    })
    

    const handleClickOpenTodo = id => {
        dispatch(openTodo(id))
    }

    return (
        <>
            <div className="container">
                <div className="inner-container">
                    {
                        todos.map(todo => {
                            return (
                                <div className="todo" key={todo.id}>
                                    <div className="todo-inner-container" >
                                        <div className="todo-title">
                                            <div className="title">
                                                <div onClick={() => handleClickOpenTodo(todo.id)} className="title-wrapper">{todo.title}</div>
                                            </div>
                                            <div className="details">
                                                <div className="finished"> <span>Finished: </span>{todo.finishedTodos}/{todo.todos.length}</div>
                                                <div className="timestamp">{todo.timestamp}</div>
                                            </div>
                                        </div>
                                        <div className="menu">
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
                        position: relative;
                        background-color: white;
                        height: 77%;
                        width: 100%;
                    }

                    .inner-container {
                        height: 100%;
                        width: 100%;
                        overflow-y: scroll;
                        padding: 0.6rem 0 0 0;
                    }
                    ::-webkit-scrollbar {
                        display: none;
                    }

                    .todo {
                        height: 5rem;
                        padding: 0 0.4rem 0.5rem 0.4rem;
                    }

                    .todo-inner-container {
                        height: 100%;
                        width: 100%;
                        background-color: rgb(238, 238, 238);
                        border-radius: 3px;
                        display: flex;
                    }

                    .todo-title {
                        width: 95%;
                        padding: 0 10px;
                    }

                    .menu {
                        width: 5%;
                    }

                    .title {
                        width: 100%;
                        height: 60%;
                        display: flex;
                        align-items: center;
                        font-size: 1.1rem;
                        font-weight: 600;
                        color: rgb(29, 29, 29);
                    }

                    .title-wrapper {
                        overflow-x: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        cursor: pointer;
                        transition: 0.2s linear;
                    }

                    .title-wrapper:hover {
                        color: #1CABE4;
                    }
                     
                    .details {
                        width: 100%;
                        height: 40%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 0.8rem;
                        font-weight: 600;
                        color: rgba(0,0,0,0.6);
                    }

                    .details .finished span {
                        color: rgba(0,0,0,0.6);
                    }

                    .details .finished {
                        color: rgb(36, 167, 255);
                    }

                    @media screen and (max-width: 530px) {
                        .container {
                            height: 79%;
                        }

                        .todo {
                            height: 5rem;
                            padding: 0 0.4rem 0.5rem 0.4rem;
                        }

                        .title {
                            font-size: 1rem;
                        }

                        .details {
                            font-size: 0.75rem;
                        }
                    }
                
                `}
            </style>
        </>
    )
}

export default Todos