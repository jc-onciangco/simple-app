import { useDispatch, useSelector } from "react-redux"
import { chooseFilter , cancelEdit , deleteAllTodos } from '../../store/todo/todoReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const currentFilter = useSelector(state => state.todo.filter)

    const  filters = [
        {
            id: 0,
            name: 'all'
        },
        {
            id: 1,
            name: 'done'
        },
        {
            id: 2,
            name: 'remainings'
        }
    ]

    const handleChooseFilter = filter => {
        dispatch(chooseFilter(filter))
        dispatch(cancelEdit())
    }

    const handleDeleteAllTodos = () => {
        dispatch(deleteAllTodos())
    }

    return (
        <>
            <div className="container">
                <div className="inner-container">
                    <div className="left-container">
                        {
                            filters.map(filter => {
                                return (
                                    <div 
                                        style={{
                                            backgroundColor: currentFilter===filter.name? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)',
                                            color: currentFilter===filter.name? 'white' : '#202020'
                                        }}
                                        onClick={() => handleChooseFilter(filter.name)} 
                                        key={filter.id} 
                                        className={`${filter.name} filter-btn`}>{filter.name}</div>
                                )
                            })
                        }
                    </div>
                    <div className="right-container">
                        <div onClick={handleDeleteAllTodos} className="delete-btn">Delete All</div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                
                    .container {
                        height: 8%;
                        width: 100%;
                        padding: 0 0.4rem;
                    }

                    .inner-container {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }

                    .left-container, .right-container  {
                        display: flex;
                        align-items: center;
                        height: 100%;
                    }

                    .filter-btn {
                        height: 60%;
                        display: flex;
                        align-items: center;
                        border: 2px;
                        font-size: 0.8rem;
                        padding: 0 8px;
                        margin: 0 12px 0 0;
                        cursor: pointer;
                    }

                    .delete-btn {
                        height: 60%;
                        display: flex;
                        align-items: center;
                        border: 2px;
                        font-size: 0.8rem;
                        padding: 0 8px;
                        cursor: pointer;
                        background-color: rgb(253, 121, 121);
                        color: white;
                    }
                
                `}
            </style>
        </>
    )
}

export default Filter