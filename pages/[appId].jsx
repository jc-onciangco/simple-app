import {useRouter} from 'next/router' 
import Calculator from '../component/Calculator/app'
import Todo from '../component/Todo/app'
import AddToCart from '../component/AddToCart/app'
import Head from 'next/head'

const MyApp = () => {
    const router = useRouter()
    const appComponents = [
        {
            name: 'calculator',
            component: <Calculator />,
            title: <title>Calculator</title>
        },
        {
            name: 'todo',
            component: <Todo />,
            title: <title>To-do List</title>
        },
        {
            name: 'add-to-cart',
            component: <AddToCart />,
            title: <title>Add to Cart</title>
        }
    ]

    //if router is ready
    if (router.isReady) { 
        //if has URI 
        if (appComponents.some(appComp => appComp.name === router.query.appId)) {
            return (
                <>
                    <Head>
                        {
                            appComponents.find(appComp => {
                                return appComp.name === router.query.appId
                            }).title
                        }
                        <link rel="icon" href="/favicon.ico" />
                        <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
                    </Head>
                    {
                        appComponents.find(appComp => {
                            return appComp.name === router.query.appId
                        }).component
                    }
                </>
            )
        }

        else {
            return (
                <>
                    <main className="container">404 NOT FOUND</main>
                    <style jsx>
                        {`
                        
                            .container {
                                height: 100vh;
                                width: 100%;
                                background-color: #202020;
                                color: pink;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                        
                        `}
                    </style>
                </>
            )
        }
    }
    
    else {
        return (
            <>
                <main className="container">LOADING...</main>
                <style jsx>
                    {`
                    
                        .container {
                            height: 100vh;
                            width: 100%;
                            background-color: #b3a5a5;
                            color: salmon;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    
                    `}
                </style>
            </>
        )
    }

}

export default MyApp