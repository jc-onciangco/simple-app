import { useSelector } from "react-redux"

const Screen = () => {
    const input = useSelector(state => {
        
        var val = state.calculator.input

        val += ''
        var x = val.split('.')
        var x1 = x[0]
        var x2 = x.length > 1? '.' + x[1] : ''
        var rgx = /(\d+)(\d{3})/

        while(rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2')
        }

        return x1 + x2
    })
    const preview = useSelector(state => state.calculator.preview)
    const myColors = useSelector(state => state.calculator.myColors)
    const previewFont = useSelector(state => {
        return state.calculator.preview
    })

    return (
        <>
            <div className="container">
                <div className="preview screen">
                    {preview}
                </div>
                <div className="input screen">
                    {input}
                </div>
            </div>
            <style jsx>
                {`
                
                    .container {
                        width: 100%;
                        height: 20%;
                        background-color: rgb(200, 200, 200);
                        margin: 0 0 10px 0;
                        display: flex;
                        flex-direction: column;
                        border-radius: 6px;
                        color: ${myColors.black};
                    }

                    .screen {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        padding: 0 20px;
                        width: 100%;
                    }

                    .preview {
                        text-align: right;
                        height: 50%;
                        font-size: 0.9rem;
                        font-weight: 700;
                        color: rgba(0,0,0,0.6);
                    }

                    .input {
                        height: 50%;
                        font-size: 1.55rem;
                        font-weight: 700;
                    }
                
                `}
            </style>
        </>
    )
}

export default Screen