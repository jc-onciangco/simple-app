import formatCurrency from './formatCurrency'

const Product = ({product}) => {
    return (
        <>
            <div className="container" key={product.id}>
                <div className="product-section">
                    <div className="img-container">
                        <img src={`/addToCart/${product.images[0].image}.webp`} alt="earphone"/>
                    </div>
                    <div className="product-details">
                        <div className="product-name">{product.name}</div>
                        <div className="product-price">
                            {
                                formatCurrency(product.prices[0].price)
                            }
                        </div>
                    </div>
                </div>    
                <div className="addToCart-btn">Add to Cart</div>
            </div>
            <style jsx>{`
            
                .container {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .img-container {
                    overflow: hidden;
                    height: 20vw;
                    background-color: grey;
                    margin: 0 0 6px 0;
                }

                .img-container > img {
                    width: 100%;
                    height: 100%;
                }


                .product-name {
                    font-weight: 600;
                    margin: 0 0 4px 0;
                }

                .product-price {
                    display: inline-block;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color:  rgb(255, 211, 15);
                    background-color: #202020;
                    padding: 3px 6px;
                    border-radius: 3px;
                    margin: 0 0 20px 0;
                }

                .addToCart-btn {
                    background-color: rgb(255, 211, 15);
                    padding: 10px 0;
                    text-align: center;
                    border-radius: 3px;
                    font-weight: 600;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: 0.2s linear;
                }

                .addToCart-btn:hover {
                    filter: brightness(98%);
                }

            `}</style>
        </>
    )
}

export default Product