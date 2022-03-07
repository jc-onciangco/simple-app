import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4} from 'uuid'

const products = [
    {
        id: 0,
        name: 'POCO M3 (4GB+64GB/4GB+128GB) Global Version',
        prices: [
            {
                id: 0,
                storage: 64,
                price: 6990
            },
            {
                id: 1,
                storage: 128,
                price: 7990
            }       
        ],
        images: [
            {id: 0, color: 'yellow', image: 'poco-m3-yellow'}, 
            {id: 1, color: 'grey', image: 'poco-m3-grey'}, 
            {id: 2, color: 'blue', image: 'poco-m3-blue'}
        ],
        shippingFee: 45,
        vouchers: [
            {
                id: 0,
                name: 'free shipping voucher',
                type: 'shipping',
                save: {
                    type: 'flat',
                    value: 45
                }
            },
            {
                id: 1,
                name: 'christmas sale voucher',
                type: 'sale',
                save: {
                    type: 'percent',
                    value: 8
                }
            }
        ]
    },
    {
        id: 1,
        name: 'Realme 20000mah Powerbank 132',
        prices: [
            {
                id: 0,
                capaity: '15001-20000mAh',
                price: 310
            }
        ],
        images: [
            {
                id: 0, 
                color: 'green',
                image: 'realme-powerbank-green'
            },
            {
                id: 1,
                color: 'yellow',
                image: 'realme-powerbank-yellow'
            }
        ],
        shippingFee: 45,
        vouchers: [
            {
                id: 0,
                name: 'free shipping voucher',
                type: 'shipping',
                save: {
                    type: 'flat',
                    value: 45
                }
            }
        ]
    },
    {
        id: 2,
        name: 'S530 Mini Wireless Hands-Free In Ear Bluetooth Earphone V4.1 For Android/IOS',
        prices: [{id: 0, price: 62}],
        images: [
            {
                id: 0,
                color: 'black',
                image: 'earphone-black'
            },
            {
                id: 1,
                color: 'blue',
                image: 'earphone-blue'
            },
            {
                id: 2,
                color: 'pink',
                image: 'earphone-pink'
            }
        ],
        shippingFee: 45,
        vouchers: [
            {
                id: 0,
                name: 'free shipping voucher',
                type: 'shipping',
                save: {
                    type: 'flat',
                    value: 45
                }
            }
        ]
    },
    {
        id: 3,
        name: 'Rainbow Gaming USB Wired Mouse LED Colorful Home&Office Mice',
        prices: [{id: 0, price: 69}],
        images: [
            {
                id: 0,
                color: 'black',
                image: 'mouse-black'
            },
            {
                id: 1,
                color: 'pink',
                image: 'mouse-pink'
            }
        ],
        shippingFee: 45,
        vouchers: [
            {
                id: 0,
                name: 'free shipping voucher',
                type: 'shipping',
                save: {
                    type: 'flat',
                    value: 45
                }
            },
            {
                id: 1,
                name: 'lazhapee sale voucher',
                type: 'sale',
                save: {
                    type: 'flat',
                    value: 50
                }
            }
        ]
    }
]

const cart = [
    {
        id: 0,
        product_id: 0,
        price_id: 0,
        color_id: 1,
        vouchers: [
            {
                id: 0,
                voucherId: 0,
                type: 'shipping'
            }
        ],
        count: 1
    }
]

export const addToCartSlice = createSlice({
    name: 'addToCart',
    initialState: {
        products,
        cart,
        selectedProductVoucher: null
    },
    reducers: {
        openVouchers: (state, action) => {
            const ids = action.payload
            state.selectedProductVoucher = ids
        },
        closeCartModal: state => {
            state.selectedProductVoucher = null
        },
        addVoucher: (state, action) => {
            const voucher = {
                ...action.payload,
                id: uuidv4(),
            }

            const {voucherId} = action.payload
             
            state.cart = state.cart.map(product => {
                if(product.product_id === state.selectedProductVoucher.productId) {
                    return {
                        ...product,
                        vouchers: product.vouchers.some(voucher => voucher.voucherId === voucherId)? 
                                    product.vouchers.filter(voucher => voucher.voucherId !== voucherId) :
                                    [...product.vouchers, voucher]
                    }
                }
                return product
            })
        },
        modifyAmount: (state, action) => {
            const {id, type} = action.payload

            if (type === 'inc') {
                state.cart = state.cart.map(product => {
                    if (product.id === id) {
                        return {
                            ...product,
                            count: product.count++
                        }

                        return product
                    }
                }) 
            }

            if (type === 'dec') {
                state.cart = state.cart.map(product => {
                    if (product.id === id) {
                        return {
                            ...product,
                            count: product.count--
                        }

                        return product
                    }
                }) 
            }

        }
    }
})

export const {
    openVouchers,
    closeCartModal,
    addVoucher,
    modifyAmount
} = addToCartSlice.actions

export default addToCartSlice.reducer