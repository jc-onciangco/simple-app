import { useRef } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from '../../store/todo/todoReducer'

const TodoForm = () => {
    const dispatch = useDispatch()
    const inputRef = useRef(null)

    const handleAddTodo = () => {
        const val = inputRef.current.value.trim()

        if (!val) return

        const todo = {   
            id: Math.random(),
            todo: val,
            isFinished: false,
        }

        dispatch(addTodo(todo))
        inputRef.current.value = ''
    }

    const handlePressEnter = e => {
        if (e.code === 'Enter') {
            handleAddTodo()
        }
    }

    return (
        <>
            <div className="container">
                <div className="inner-container">
                    <div className="input-container">
                        <input onKeyPress={handlePressEnter} ref={inputRef} type="text"/>
                    </div>
                    <div onClick={handleAddTodo} className="btn-container">Add</div>
                </div>
            </div>
            <style jsx>
                {`
                
                    .container {
                        height: 10%;
                        width: 100%;
                        background-color: rgb(216, 216, 216);
                    }

                    .inner-container {
                        height: 100%;
                        width: 90%;
                        margin: 0 auto;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .input-container {
                        height: 100%;
                        width: 90%;
                        display: flex;
                        align-items: center;
                    }

                    .input-container input {
                        width: 100%;
                        height: 60%;
                        border: none;
                        outline: none;
                        font-size: 1.1rem;
                        padding: 0 0 0 10px;
                    }

                    .btn-container {
                        margin: 0 0 0 15px;
                        width: 10%;
                        height: 60%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #1CABE4;
                        color: white;
                        font-size: 0.9rem;
                        font-weight: 600;
                    }
                
                `}
            </style>
        </>
    )
}

export default TodoForm