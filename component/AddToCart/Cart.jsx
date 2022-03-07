import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import CartProducts from './CartProducts'
import TotalProducts from './TotalProducts'
import Modal from './Modal'
import { useSelector } from 'react-redux'

const Cart = () => {
    const selectedProductVoucherModal = useSelector(state => state.addToCart.selectedProductVoucher)

    return (
        <>
            <div className="container">
                <header>
                    <div className="left-side">
                        <div className="icon-box">
                            <div className="icon-container">
                                <FontAwesomeIcon icon={faArrowRight} />
                            </div>
                        </div>
                        <div className="my-cart-title">
                            My Cart
                        </div>
                    </div>
                    <div className="right-s"></div>
                </header>
                <CartProducts />
                <TotalProducts />
                {
                    selectedProductVoucherModal &&
                    <Modal />
                }
            </div>
            <style jsx>
                {`
                
                    .container {
                        position: fixed;
                        top: 0;
                        right: 0;
                        height: 100vh;
                        width: 350px;
                        background-color: white;
                        z-index: 10;
                        box-shadow: -8px 0 30px rgba(0,0,0,0.05);
                        display: flex;
                        flex-direction: column;
                    }

                    header {
                        height: 10vh;
                        width: 100%;
                        display: flex;
                    }

                    .left-side {
                        display: flex;
                    }

                    .icon-box {
                        height: 100%;
                        width: 10vh;
                        background-color: #202020;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .icon-container {
                        color: white;
                    }

                    .my-cart-title {
                        flex: 1;
                        height: 100%;
                        padding: 0 0 0 15px;
                        display: flex;
                        align-items: center;
                        font-size: 1.1rem;
                        font-weight: 600;
                    }
            
                `}
            </style>
        </>
    )
}

export default Cart