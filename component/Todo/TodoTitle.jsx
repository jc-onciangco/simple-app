import { useDispatch } from 'react-redux'
import { backState } from '../../store/todo/todoReducer'

const TodoTitle = ({type}) => {
    const dispatch = useDispatch()

    const handleClickBack = () => {
        console.log('hhahaha')
        dispatch(backState(type)) 
    }

    return (
        <>
            <div className="container">
                <div className="inner-container">
                    <div className="back">
                        <div onClick={handleClickBack} className="icon-container">
                            <i className="fas fa-chevron-left"></i>
                        </div>
                    </div>
                    {
                        type==='todo'?
                        <div className="title">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, consectetur!
                        </div> :
                        <div className="title">
                            Add todos
                        </div> 
                    }
                </div>
            </div>
            <style jsx>
                {`
                    
                    .container {
                        height: 10%;
                        width: 100%;
                        background-color: rgb(20, 20, 20);
                    }

                    .inner-container {
                        width: 95%;
                        height: 100%;
                        margin: 0 auto;
                        color: white;
                        display: flex;
                        align-items: center;
                    }

                    .title {
                        width: 100%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 1rem;
                        font-weight: 600;
                    }

                    .icon-container {
                        color: white;
                        margin: 0 20px 0 0;
                        cusror: pointer;
                    }
                
                `}
            </style>
        </>
    )
}

export default TodoTitle