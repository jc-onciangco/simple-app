import { useDispatch, useSelector } from "react-redux"
import { showOptions, deleteHistory, displayHistory, copyAnswer, unShowCopiedTooltip, deleteAllHistory } from '../../store/calculator/calculatorReducer'

const History = () => {
    const history = useSelector(state => state.calculator.history)
    const {myColors, isHistoryShow} = useSelector(state => state.calculator)
    const dispatch = useDispatch()

    const handleClickHistory = id => {
        dispatch(showOptions(id))
    }

    const handleClickDelete = id => {
        dispatch(deleteHistory(id))
    }

    const handleClickSelect = id => {
        dispatch(displayHistory(id))
    }

    const handleClickCopy = id => {
        dispatch(copyAnswer(id))
        dispatch(showOptions(id))

        setTimeout(() => {
            dispatch(unShowCopiedTooltip(id))
        }, 1000)
    }

    const handleClickDeleteAll = () => {
        dispatch(deleteAllHistory())
    }

    return (
        <>
            <div className="container">
                <div className="title">
                    History 
                </div>
                <div className="history-data">
                    <div className="inner-container">
                        {
                            history.map(data => {
                                return (
                                    <div className="data" key={data.id}>
                                        <div className="data-inner-container" onClick={() => handleClickHistory(data.id)}>
                                            <div className="answer-solution">
                                                <div className="solution">{data.solution}</div>
                                                <div className="answer">{data.answer}</div>
                                            </div>
                                                {
                                                    data.isOptionsOpen &&
                                                    <div className="options">
                                                        <div className="select option" onClick={() => handleClickSelect(data.id)}>Select</div>
                                                        <div className="copy option" onClick={() => handleClickCopy(data.id)}>
                                                            Copy
                                                            {
                                                                data.copied &&
                                                                <div className="copied">Copied</div>
                                                            }
                                                        </div>
                                                        <div className="delete option" onClick={() => handleClickDelete(data.id)}>Delete</div>
                                                    </div>
                                                }
                                        </div>   
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="delete-all">
                    <div title="Delete all history." onClick={() => handleClickDeleteAll()} className="icon-container">
                        <i className="fas fa-trash"></i>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                
                    .container {
                        width: 48%;
                        height: 100%;
                        color: ${myColors.black};
                    }

                    .title {
                        height: 8%;
                        display: flex;
                        align-items: center;
                        padding: 0 0 0 10px;
                        font-weight: 700;
                    }

                    .history-data {
                        height: 84%;
                    }

                    .delete-all {
                        height: 10%;
                        display: flex;
                        align-items: center;
                        padding: 0 10px 0 0;
                        justify-content: flex-end;
                    }

                    .icon-container {
                        cursor: pointer;
                    }

                    .inner-container {
                        height: 100%;
                        width: 100%;
                        overflow-y: scroll;
                    }
                    ::-webkit-scrollbar {
                        display: none;
                    }

                    .data {
                        padding: 6px;
                        width: 100%;
                    }

                    .data-inner-container {
                        background-color: ${myColors.yellow};
                        border-radius: 4px;
                        width: 100%;
                        transition: 0.2s linear;
                        cursor: pointer;
                    }

                    .data-inner-container:hover {
                        filter: brightness(106%);
                    }

                    .answer-solution {
                        padding: 8px 14px;
                        overflow-x: scroll;
                    }

                    .solution, .answer {
                        text-align: right;
                    }

                    .solution {
                        font-weight: 600;
                        color: rgba(0,0,0,0.8);
                    }

                    .answer {
                        font-size: 1.5rem;
                        font-weight: 700;
                    }

                    .options {
                        display: flex;
                        justify-content: flex-end;
                        padding: 0 12px 8px 12px;
                    }

                    .option {
                        position: relative;
                        background-color: ${myColors.yellow};
                        font-size: 0.8rem;
                        font-weight: 600;
                        padding: 2px 5px;
                        margin: 0 0 0 10px;
                        border-radius: 3px;
                        cursor: pointer;
                        box-shadow: 3px 3px 4px rgba(0,0,0,0.1),
                                    inset -2px -2px 6px rgba(0,0,0,0.1);
                    }

                    .option:hover {
                        filter: brightness(106%);
                    }

                    .option::before {
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

                    .copy {
                        position: relative;
                    }

                    .copied {
                        position: absolute;
                        top: -5px;
                        left: 50%;
                        transform: translate(-50%, -100%);
                        background-color: #404040;
                        color: white;
                        padding: 3px;
                        border-radius: 3px;
                    }

                    @media screen and (max-width: 800px) {
                        .solution {
                            font-size: 0.85rem;
                        }

                        .answer {
                            font-size: 1.25rem;
                        }
                    }

                    @media screen and (max-width: 600px) {
                        .container {
                            display: ${isHistoryShow? 'block' : 'none'};
                            width: 100%;
                            height: 100%;
                            color: ${myColors.black};
                        }
                    }

                `}
            </style>
        </>
    )
}

export default History