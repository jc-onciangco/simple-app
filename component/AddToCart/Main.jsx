import { useSelector } from "react-redux"
import Product from './Product'

const Main = () => {
    const products = useSelector(state => state.addToCart.products)
    console.table(products)
    return (
        <>
            <main className="container">
                <div className="title-section">
                    Products
                </div>
                <div className="products-container">
                    {
                        products.map(product => {
                            return (
                                <Product product={product} />
                            )
                        })
                    }
                </div>
            </main>
            <style jsx>
                {`
                
                    .container {
                        height: 90vh;
                        width: 100%;
                        padding: 30px 0 0 0;
                    }

                    .title-section {
                        height: 10vh;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        font-size: 1.5rem;
                    }

                    .products-container {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        grid-gap: 20px;
                    }

                `}
            </style>
        </>
    )
}

export default Main