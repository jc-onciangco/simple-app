const TotalProducts = () => {
    return (
        <>
            <div className="container">
                <div className="inner-container">
                    <div className="total-details">
                        <div className="all-btn">
                            <div className="include-all">
                                <div className="circle"></div>
                            </div>
                            <div className="include-all-label">
                                All
                            </div>
                        </div>
                        <div className="total">
                            <div className="all-total">
                                Total <span className="all-total-value">20.00</span>
                            </div>
                            <div className="shipping-fee-total">
                                Total Shipping fee: <span className="shipping-fee-total-value">30</span>
                            </div>
                        </div>
                    </div>
                    <div className="checkout">
                        <div className="checkout-inner-container">
                            <div className="checkout-btn">Check out</div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                
                    .container {
                        flex: 0.2;
                        background-color: rgb(238, 238, 238);
                    }

                    .inner-container {
                        height: 100%;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                    }

                    .total-details {
                        flex: 0.55;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                    }

                    .checkout {
                        flex: 0.45;
                        padding: 0 10px;
                    }

                    .all-btn {
                        display: flex;
                        align-items: center;
                    }

                    .include-all {
                        display: flex;
                        align-items: center;
                        padding: 0 10px;
                    }

                    .circle {
                        height: 15px;
                        width: 15px;
                        border-radius: 50%;
                        background-color: white;
                        border: 1px solid rgba(0,0,0,0.4);
                    }

                    .total {
                        padding: 0 20px 0 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-end;
                    }

                    .all-total {
                        font-size: 0.9rem;
                    }

                    .shipping-fee-total {
                        font-size: 0.85rem;
                    }

                    .all-total-value {
                        font-size: 1.3rem;
                        font-weight: 600;
                    }

                    .checkout-inner-container {
                        height: 100%;
                        width: 100%;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                    }

                    .checkout-btn {
                        font-size: 0.9rem;
                        font-weight: 600;
                        background-color: rgb(255, 211, 15);
                        height: 70%;
                        padding: 0 12px;
                        display: flex;
                        align-items: center;
                        border-radius: 3px;
                    }

                `}
            </style>
        </>
    )
}

export default TotalProducts