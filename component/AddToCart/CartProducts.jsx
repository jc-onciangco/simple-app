import { useDispatch, useSelector } from "react-redux"
import formatCurrency from './formatCurrency'
import { openVouchers , modifyAmount } from '../../store/addToCart/addToCartReducer'

const CartProducts = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.addToCart.cart)
    const products = useSelector(state => state.addToCart.products)

    const handleOpenModalVouchers = (productId, cartProductId, type) => {
        dispatch(openVouchers({productId, cartProductId, type}))
    }

    const handleAmount = (id, type) => { 
        dispatch(modifyAmount({id, type}))
    }

    const getTotal = (rawPrice, productId, selectedVouchers, count) => {
        let initialPrice = rawPrice

        if (!selectedVouchers.length) {
            return formatCurrency(rawPrice + products.find(product => product.id === productId).shippingFee)
        }
        
        const  shippingFee = products.find(product => product.id === productId).shippingFee
        const vouchers =  products.find(product => product.id === productId).vouchers
        const saves = selectedVouchers.map(selectedVoucher => {
            const productVoucher = vouchers.find(voucher => voucher.id === selectedVoucher.voucherId)
            return {
                save: productVoucher.save,
                type: productVoucher.type
            }
        })

        saves.forEach(save => {
            if (save.type !== 'shipping') {
                if(save.save.type === 'percent') {
                    const saved = (save.save.value/100) * rawPrice
                    initialPrice = initialPrice - saved
                }
            }
        })

        initialPrice = initialPrice * count

        if (saves.some(save => save.type === 'shipping')) {
            initialPrice = initialPrice + saves.find(save => save.type === 'shipping').save.value
        }

        console.log(initialPrice)

        return formatCurrency(initialPrice)
    }

    return (
        <>
            <div className="container">
                <div className="inner-container">
                    {
                        cart.map(product => {
                            return (
                                <div className="product" key={product.id}>
                                    <div className="product-wrapper">
                                        <div className="voucher-container">
                                            <div className="include">
                                                <div className="circle"></div>
                                            </div>
                                            <div onClick={() => handleOpenModalVouchers(product.product_id, product.id, 'voucher')} className="voucher-btn">Get Voucher</div>
                                        </div>
                                        <div className="product-details">
                                            <div className="product-img">
                                                <img src={`/addToCart/${
                                                    products.find(prod => {
                                                        return prod.id === product.product_id
                                                    }).images.find(image => {
                                                        return image.id === product.color_id
                                                    }).image 
                                                }.webp`} alt=""/>
                                            </div>
                                            <div className="details">
                                                <div className="product-name">
                                                    <div className="name">
                                                        {
                                                            products.find(prod => {
                                                                return prod.id === product.product_id
                                                            }).name
                                                        }
                                                    </div>
                                                </div>
                                                <div className="product-spec">
                                                    <div onClick={() => handleOpenModalVouchers(product.product_id, product.id, 'color')} className="spec">
                                                        Color: <span>{
                                                                products.find(prod => {
                                                                    return prod.id === product.product_id
                                                                }).images.find(image => {
                                                                    return image.id === product.color_id
                                                                }).color  
                                                        }</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="count-container">
                                            <div className="price">
                                                {
                                                    getTotal(
                                                    products.find(prod => {
                                                        return prod.id === product.product_id
                                                    }).prices.find(price => {
                                                        return price.id === product.price_id
                                                    }).price, product.product_id, product.vouchers, product.count)
                                                }
                                            </div>
                                            <div className="count">
                                                <div onClick={() => handleAmount(product.id, 'dec')} className="dec count-at-center">-</div>
                                                <div className="val count-at-center">1</div>
                                                <div onClick={() => handleAmount(product.id, 'inc')} className="inc count-at-center">+</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div 
                                        className="shipping-fee"
                                        style={{
                                            textDecoration:  product.vouchers.some(voucher => voucher.type === 'shipping')? 'line-through' : 'none'
                                        }}
                                            >
                                        Shipping fee: {
                                            formatCurrency(
                                                products.find(prod => {
                                                    return prod.id === product.product_id
                                                }).shippingFee)
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <style jsx>
                {`
                
                    .container {
                        flex: 0.8;
                        overflow-y: scroll;
                    }

                    .inner-container {
                        padding: 20px 0 0 0;
                    }

                    .product {
                        width: 100%;
                        background-color: rgba(0,0,0,0.05);
                        margin: 0 0 10px 0;
                    }

                    .product-wrapper {
                        width: 100%;
                        padding: 0 10px 10px 10px;
                    }

                    .voucher-container {
                        padding: 10px 0;
                        display: flex;
                        width: 100%;
                    }

                    .include {
                        display: flex;
                        align-items: center;
                        padding: 0 15px 0 0;
                    }

                    .circle {
                        height: 15px;
                        width: 15px;
                        border-radius: 50%;
                        background-color: white;
                        border: 1px solid rgba(0,0,0,0.4);
                    }

                    .voucher-btn {
                        flex: 1;
                        padding: 8px 0;
                        text-align: center;
                        font-size: 0.8rem;
                        background-color: rgb(255, 134, 134);
                        color: white;
                        cursor: pointer;
                    }

                    .product-details {
                        display: flex;
                    }

                    .product-img {
                        height: 80px;
                        width: 80px;
                    }

                    .product-img img {
                        width: 100%;
                        height: 100%:
                        object-fit: fill;
                    }


                    .details {
                        flex: 1;
                        padding: 0 0 0 6px;
                    }

                    .product-name {
                        width: 100%;
                    }

                    .product-name .name {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        font-weight: 600;
                        font-size: 0.9rem;
                    }

                    .product-spec {
                        font-size: 0.8rem;
                        margin: 6px 0 0 0;
                        display: inline-block;
                        cursor: pointer;
                    }

                    .count-container {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 6px 0;
                    }

                    .price {
                        font-size: 0.9rem;
                        font-weight: 600;
                        color: rgb(255, 35, 35);
                    }

                    .count {
                        display: flex;
                        height: 20px;
                    }

                    .count-at-center {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 0.9rem;
                        font-weight: 600;
                    }

                    .dec, .inc {
                        width: 20px;
                        height: 100%;
                        background-color: rgb(228, 228, 228);
                        cursor: pointer;
                    }

                    .dec:hover, .inc:hover {
                        filter: brightness(90%);
                    }

                    .val {
                        height: 100%;
                        width: 40px;
                        background-color: white;
                    }

                    .shipping-fee {
                        background-color: rgb(132, 226, 255);
                        color: rgb(31, 149, 185);
                        font-size: 0.85rem;
                        font-weight: 600;
                        padding: 5px 0 5px 10px;
                    }


                `}
            </style>
        </>
    )
}

export default CartProducts