import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

const Navigation = () => {
    return (
        <>
            <nav className="container">
                <div className="logo">
                    LAZHAPEE
                </div>
                <div className="cart">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCartPlus} />
                        <div className="product-count">4</div>
                    </div>
                </div>
            </nav>
            <style jsx>
                {`
                
                    .container {
                        height: 10vh;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background-color: rgb(255, 211, 15);
                    }

                    .logo {
                        font-size: 1.2rem;
                        font-weight: 600;
                        margin: 0 0 0 20px;
                    }

                    .cart {
                        align-self: stretch;
                    }

                    .icon-container {
                        color: white;
                        background-color: #202020;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 0 20px;
                        position: relative;
                        font-size: 1.2rem;
                    }

                    .product-count {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        height: 20px;
                        width: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50%;
                        background-color: rgb(255, 211, 15);
                        color: black;
                        font-size: 0.8rem;
                        font-weight: 600;
                    }


                
                `}
            </style>
        </>
    )
}

export default Navigation