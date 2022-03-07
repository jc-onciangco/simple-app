import Todos from './Todos'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import TodoTitle from './TodoTitle'
import AddTodos from './AddTodos'
import Filter from './Filter'
import { useDispatch, useSelector } from 'react-redux'
import { openAddTodo , cancelEdit } from '../../store/todo/todoReducer'

const Todo = () => {
    const dispatch = useDispatch()
    const activeTodo = useSelector(state => state.todo.activeTodo)
    const addTodo = useSelector(state => state.todo.addTodo)
    console.log(activeTodo)

    const handleAddTodo = () => {
        dispatch(openAddTodo())
    }

    const handleGlobalClick = e => {
        const id = e.target.id
        if (id === 'edit-input' || id === 'save-btn' || id==='open-edit-btn') return
        dispatch(cancelEdit())
    }


    return (
        <>
            <div onClick={handleGlobalClick} className="container">
                <div className="todo">
                    {
                        activeTodo!==null?
                        <>
                            <TodoTitle type={'todo'}/>
                            <Filter />
                            <TodoList />
                            <TodoForm />
                        </> :
                        <>
                            {
                                addTodo?
                                <TodoTitle type={'form'}/> :
                                <div className="todo-header">
                                    <div className="title-container">
                                        <div className="title">JUST DO IT!</div>
                                        <div className="sub-title">To-do App</div>
                                    </div>
                                </div> 
                            }
                            {
                                addTodo?
                                <AddTodos /> :
                                <> 
                                    <Todos />
                                    <div onClick={handleAddTodo} className="add-todo">+</div>
                                </>
                            }
                        </>
                    }
                </div>
            </div>
            <style jsx>
                {`
                
                    .container {
                        position: relative;
                        height: 100vh;
                        width: 100%;
                        background-color:  rgb(240, 240, 240);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .add-todo {
                        height: 8%;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        font-size: 1.3rem;
                        font-weight: 700;
                        color: white;
                        background-color: rgb(53, 141, 255);
                    }

                    .todo {
                        height: 85%;
                        width: 700px;
                        background-color: rgb(245, 245, 245);
                    }

                    .todo-header {
                        background-color: rgb(20, 20, 20);
                        height: 15%;
                        width: 100%;
                        color: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 1.2rem;
                        font-weight: 600;
                    }

                    .title-container {
                        text-align: center;
                    }

                    .sub-title {
                        font-size: 0.8rem;
                        color: rgba(255,2555,255,0.6);
                    }

                    @media screen and (max-width: 720px) {
                        .todo {
                            width: 90%;
                        }
                    }

                    @media screen and (max-width: 530px) {
                        .container {
                            align-items: flex-end;
                        }

                        .todo {
                            width: 100%;
                            height: 95%;
                        }

                        .todo-header {
                            height: 13%;
                        }
                    }
                
                `}
            </style>
        </>
    )
}

export default Todo