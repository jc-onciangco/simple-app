import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect , useRef } from 'react'
import { saveTodo, openAddTodo } from '../../store/todo/todoReducer'

const Todos = () => {
    const todosContainerRef = useRef(null)
    const dispatch = useDispatch()
    const [todoForm, setTodoForm] = useState([])
    const [title, setTitle] = useState(null)
    const [todos, setTodos] = useState([])
    const [noTitle, setNoTitle] = useState(false)

    useEffect(() => {
        console.log(todos)
    }, [todos])

    const handleAddTodoForm = () => {
        setTodoForm(prevState => [...prevState, Math.random()])
        console.log(todos)
    }

    const handleChangeTitle = e => {
        const title = e.target.value.trim()
        setTitle(title)
        setNoTitle(false)
    }

    const handleChangeForm = e => {
        const id = Number(e.target.name)
        const value = e.target.value

        console.log(id)

        if (!todos.some(todo => todo.id === id)) {
            setTodos(prevState => {
                return [
                    ...prevState,
                    {
                        id,
                        todo: value,
                        isFinished: false,
                        isEditable: false
                    }
                ]
            })
        }
        else {
            setTodos(prevState => {
                return prevState.map(todo => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            todo: value
                        }
                    }

                    return todo
                })
            })
        }
    }

    const handleDeleteTodoForm = (id, index) => {
        setTodoForm(prevState => prevState.filter(form => form !== id))
        setTodos(prevState => prevState.filter(todo => todo.id !== index))
    }

    const handleSaveTodo = () => {
        if (!title) {
            setNoTitle(true)
            return
        }

        const todo = {
            id: Math.random(),
            title,
            todos: todos.sort((a,b) => a.id - b.id),
            isAllFinished: false,
            timestamp: new Date().toLocaleString()
        }

        dispatch(saveTodo(todo))
        dispatch(openAddTodo())
    }

    const handlePressEnter = e => {
        const lastIndexName = todosContainerRef.current.children[todosContainerRef.current.children.length-1].children[0].name
        const currentIndexName = e.target.name

        if (lastIndexName === currentIndexName) {
            if (e.target.value === '') return
            if (e.code === 'Enter') handleAddTodoForm()
        }

        else {
            e.target.blur()
            e.target.parentNode.nextSibling.children[0].focus()
        }

    }

    const handlePressEnterTitle = e => {
        if (!title) return

        if (e.code === 'Enter') handleAddTodoForm()
    }

    return (
        <>
            <div className="container">
                <div className="inner-container">
                    <div className="title-container">
                        <label htmlFor="title">Title</label>
                        <input type="text" onKeyPress={handlePressEnterTitle} onChange={handleChangeTitle} className="title" id="title"/>
                    </div>
                    <div className="title-todos">Todos</div>
                    <div ref={todosContainerRef} className="todos">
                        {
                            todoForm.map((form, index) => {
                                return (
                                    <div className="form-field" id={`form-${index}`} key={form}>
                                        <input onKeyPress={handlePressEnter} type="text" autoFocus onChange={handleChangeForm} name={index} className="todo"/>
                                        <div className="delete-todo">
                                            <div onClick={() => handleDeleteTodoForm(form,index)} className="icon-container">
                                                <i className="fas fa-times"></i>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="add-todo" onClick={handleAddTodoForm}>Add</div>
                </div>
            </div>
            <div onClick={handleSaveTodo} className="save-todo">SAVE</div>
            <style jsx>
                {`

                    .container {
                        background-color: white;
                        height: 83%;
                        width: 100%;
                    }

                    .save-todo {
                        height: 8%;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: rgb(53, 141, 255);
                        color: white;
                    }

                    .inner-container {
                        height: 100%;
                        width: 96%;
                        overflow-y: scroll;
                        margin: 0 auto;
                        padding: 30px 0 0 0;
                    }
                    ::-webkit-scrollbar {
                        display: none;
                    }

                    input {
                        border: none;
                        outline: none;
                        border-radius: 3px;
                    }

                    .title-container {
                        background-color: rgb(240, 240, 240);
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        padding: 12px;
                        border-radius: 3px;
                        font-weight: 600;
                        color: rgba(0,0,0,0.8);
                    }

                    .title-container label {
                        margin: 0 0 10px 0;
                        font-size: 1.2rem;
                    }

                    input.title {
                        font-size: 1rem;
                        padding: 8px 12px;
                        border: solid 2px rgba(252, 148, 148, ${noTitle? '1' : '0'});
                    }

                    .title-todos {
                        font-weight: 600;
                        color: rgba(0,0,0,0.8);
                        font-size: 1rem;
                        margin: 20px 0 12px 0;
                    }

                    .todos {
                        width: 100%;
                        margin: 0 0 15px 0;
                    }

                    .form-field {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        margin: 0 0 8px 0;
                        background-color: rgb(240, 240, 240);
                        padding: 6px 0 6px 6px;
                        border-radius: 3px;
                    }

                    .form-field input {
                        width: 100%;
                        font-size: 1rem;
                        padding: 6px 10px;
                        background-color: rgba(255,255,255,0.8);
                    }

                    .delete-todo {
                        padding: 0 10px;
                        color: rgba(0,0,0,0.5));
                    }

                    .add-todo {
                        background-color:  rgba(81, 185, 255, 0.05);
                        font-size: 0.95rem;
                        padding: 6px 0;
                        text-align: center;
                        border-radius: 3px;
                        font-weight: 600;
                        color: rgba(81, 185, 255, 0.8);
                        border: 2px dashed rgba(81, 185, 255, 0.5);
                    }


                    @media screen and (max-width: 530px) {
                        .container {
                            height: 79%;
                        }
                    }


                `}
            </style>
        </>
    )
}

export default Todos