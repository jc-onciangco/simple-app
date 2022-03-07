import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"
import formatCurrency from './formatCurrency'
import { closeCartModal , addVoucher } from '../../store/addToCart/addToCartReducer'

export const Header = ({label, type, data}) => {
    const dispatch = useDispatch()

    const handleCloseModal = () => {
        dispatch(closeCartModal())
    }

    return (
        <>
            <header>
                <div onClick={handleCloseModal} className="caretdown-container">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                </div>
                <div className="header-label">{label}{type==='voucher' && ` (${data.voucherCount})`}</div>
            </header>
            <style jsx>
                {`
                
                header {
                    display: flex;
                    align-items: center;
                    padding: 10px 0;
                }

                .caretdown-container {
                    height: 35px;
                    width: 35px;
                    border-radius: 50%;
                    background-color: transparent;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }

                .caretdown-container:hover {
                    background-color: #ebebeb;
                }

                .icon-container {
                    color: #202020;
                }

                .header-label {
                    margin: 0 0 0 10px;
                    font-weight: 600;
                }
    
                
                `}
            </style>
        </>
    )
}

export const Main = ({children, label}) => {
    return (
        <>
            <main>
                <div className="container">
                    <div className="inner-container">
                        <div className="label">{label}</div>
                        <hr/>
                        {children}
                    </div>
                </div>
            </main>
            <style jsx>
                {`
                
                .container {
                    height: 100%;
                    width: 100%;
                }

                .label {
                    font-weight: 600;
                    font-size: 0.9rem;
                    padding: 6px 0;
                }
                
                `}
            </style>
        </>
    )
}

const Modal = ({type}) => {
    const dispatch = useDispatch()
    const userActiveVouchers = useSelector(state => state.addToCart.cart.find(product => product.id === state.addToCart.selectedProductVoucher.cartProductId).vouchers)
    const selectedVouchers = useSelector(state => {
        return state.addToCart.products.find(product => {
            return product.id === state.addToCart.selectedProductVoucher.productId
        }).vouchers
    })
    const selectedProductVoucherModal = useSelector(state => state.addToCart.selectedProductVoucher)

    const handleAddVoucher = (voucherId, type) => {
        dispatch(addVoucher({voucherId, type}))
    }

    return (
        <>
            <div className="container" >
                <div className="modal">
                    <div className="modal-inner-container">
                        {
                            selectedProductVoucherModal.type==='voucher'?
                            <>
                                <Header label={'Vouchers'} type={'voucher'} data={{voucherCount: userActiveVouchers.length}}/>
                                <Main label={'Available Vouchers'}>
                                    <div className="available-vouchers">
                                        {
                                            selectedVouchers.map(voucher => {
                                                return (
                                                    <div 
                                                        key={voucher.id} 
                                                        style={{
                                                            backgroundColor: userActiveVouchers.some(myVoucher => myVoucher.voucherId === voucher.id)? 'rgb(255, 151, 151)' : 'rgb(155, 255, 155)',
                                                            border: userActiveVouchers.some(myVoucher => myVoucher.voucherId === voucher.id)? '2px solid rgb(255, 128, 128)' : '2px solid transparent'
                                                        }} 
                                                        onClick={() => handleAddVoucher(voucher.id, voucher.type)}
                                                        className="available-voucher">
                                                            <div className="available-voucher-name">{voucher.name}</div>
                                                            <div className="available-voucher-value"> 
                                                                <span>Save </span>
                                                                {
                                                                    voucher.save.type==='flat'?
                                                                    formatCurrency(voucher.save.value) :
                                                                    `${voucher.save.value}%`
                                                                }
                                                            </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Main>
                            </> :
                            <>  
                                <Header label={'Colors'} type={'spec'} data={null}/>
                                <Main label={'Available Colors'}>
                                    <div className="available-colors">
                                       <div className="color red"></div>
                                       <div className="color blue"></div>
                                       <div className="color yellow"></div>
                                       <div className="color orange"></div>
                                       <div className="color green"></div>
                                    </div>
                                </Main>
                            </>
                        }

                    </div>
                </div>
            </div>
            <style jsx>
                {`
                
                    .container {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,0,0,0.6);
                        display: flex;
                        align-items: flex-end;
                    }

                    .modal {
                        width: 96%;
                        height: 85%;
                        margin: 0 auto;
                        border-radius: 20px 20px 0 0;
                        background-color: white;
                        padding: 0 10px;
                    }

                    .modal-inner-container {
                        height: 100%;
                        width: 100%;
                    }

                    main {
                        height: 100%;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                    }

                    .available-voucher {
                        font-weight: 600;
                        padding: 6px 10px;
                        border-radius: 3px;
                        margin: 0 0 8px 0;
                        background-color: rgb(255, 157, 157);
                        text-transform: capitalize;
                    }

                    .available-voucher-name {
                        font-size: 0.85rem;
                    }

                    .available-voucher-value {
                        font-size: 0.8rem;
                    }

                    ..available-voucher-value span {
                        font-weight: 600;
                    }

                    .available-colors {
                        display: grid;
                        grid-template-columns: repeat(5,1fr);
                        padding: 10px 0 0 0;
                    }

                    .color {
                        height: 50px;
                        width: 50px;
                        background-color: green;
                        cursor: pointer;
                    }
                
                `}
            </style>
        </>
    )
}

export default Modal