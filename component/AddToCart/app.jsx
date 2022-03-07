import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Navigation from './Navigation'
import Main from './Main'
import Cart from './Cart'

const AddToCart = () => {
    return (
        <>  
            <div className="container"> 
                <div className="inner-container">
                    <Navigation />
                    <Main />
                </div>
                <Cart />
            </div>
            <style jsx>
                {`
                
                    .container {    
                        position: relative;
                        min-height: 100vh;
                        width: 100%;
                        padding: 0 0 100px 0;
                    }
                    
                    .inner-container {
                        height: 100vh;
                        width: 90%;
                        margin: 0 auto;
                    }

                `}
            </style>
        </>
    )
}

export default AddToCart