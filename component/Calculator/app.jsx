import Screen from './Screen'
import Keypad from './Keypad'
import History from './History'
import { useDispatch, useSelector } from 'react-redux'
import { toggleHistory } from '../../store/calculator/calculatorReducer'

const Calculator = () => {
    const {myColors, isHistoryShow} = useSelector(state => state.calculator)
    const dispatch = useDispatch()

    const handleShowHistory = () => {
        dispatch(toggleHistory())
    }

    return (
        <>  
            <main className="container">
                <div onClick={handleShowHistory} className="history-btn">H</div>
                <div className="calculator">
                    <div className="inner-container">
                        <Screen />
                        <Keypad />
                    </div>
                    <History />
                </div>
            </main>
            <style jsx>
                {`
                
                    .container {
                        height: 100vh;
                        width: 100%;
                        background-color: ${myColors.white};
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .calculator {
                        position: relative;
                        padding: 14px;
                        background-color: ${myColors.white};
                        height: 80%;
                        width: 800px;
                        display: flex;
                        justify-content: space-between;
                        border-radius: 8px;
                        box-shadow: 8px 8px 15px rgba(0,0,0,0.2),
                                    inset -5px -5px 15px rgba(0,0,0,0.1),
                                    inset 3px 3px 12px rgb(255, 255, 255);
                    }

                    .inner-container {
                        width: 48%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }

                    .history-btn {
                        display: none;
                    }

                    @media screen and (max-width: 800px) {
                        .calculator {
                            width: 100%;
                            border-radius: 0px;
                        }
                    }

                    @media screen and (max-width: 600px) {
                        .calculator {
                            position: relative;
                            width: 400px;
                            border-radius: 6px;
                        }

                        .inner-container {
                            display: ${isHistoryShow? 'none' : 'flex'};
                            width: 100%;
                            height: 100%;
                            flex-direction: column;
                        }

                        .history-btn {
                            position: absolute;
                            top: 0;
                            right: 0;
                            transform: translate(0, 0);
                            background-color: ${myColors.yellow};
                            height: 40px;
                            width: 40px;
                            border-radius: 0 0 0 50%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-weight: 900;                      
                            box-shadow: 3px 3px 4px rgba(0,0,0,0.1),
                                        inset -2px -2px 6px rgba(0,0,0,0.1);
                        }

                        .history-btn::before {
                            position: absolute;
                            content: '';
                            height: 90%;
                            width: 90%;
                            background-image: linear-gradient(to bottom, rgba(255,255,255,0.6), transparent);
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            border-radius: 0 50% 50% 0;
                        }

                    }

                    @media screen and (max-width: 430px) {
                        .container {
                            height: 100vh;
                            width: 100%;
                            background-color: ${myColors.white};
                            display: flex;
                            align-items: flex-end;
                        }

                        .calculator {
                            width: 100%;
                            height: 90%;
                            border-radius: 0px;
                        }
                    }
                `}
            </style>
        </>
    )
}

export default Calculator