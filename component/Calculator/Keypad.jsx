import Button from './Button'

const Keypad = () => {
    const buttons = [
        {
            id: 0,
            type: 'number',
            name: 'zero',
            display: '0',
            value: '0',
            title: '0'
        },
        {
            id: 1,
            type: 'number',
            name: 'one',
            display: '1',
            value: '1',
            title: '1'
        },
        {
            id: 2,
            type: 'number',
            name: 'two',
            display: '2',
            value: '2',
            title: '2'
        },
        {
            id: 3,
            type: 'number',
            name: 'three',
            display: '3',
            value: '3',
            title: '3'
        },
        {
            id: 4,
            type: 'number',
            name: 'four',
            display: '4',
            value: '4',
            title: '4'
        },
        {
            id: 5,
            type: 'number',
            name: 'five',
            display: '5',
            value: '5',
            title: '5'
        },
        {
            id: 6,
            type: 'number',
            name: 'six',
            display: '6',
            value: '6',
            title: '6'
        },
        {
            id: 7,
            type: 'number',
            name: 'seven',
            display: '7',
            value: '7',
            title: '7'
        },
        {
            id: 8,
            type: 'number',
            name: 'eight',
            display: '8',
            value: '8',
            title: '8'
        },
        {
            id: 9,
            type: 'number',
            name: 'nine',
            display: '9',
            value: '9',
            title: '9'
        },
        {
            id: 10,
            type: 'operation',
            name: 'plus',
            display: '+',
            value: '+',
            title: 'Add.'
        },
        {
            id: 11,
            type: 'operation',
            name: 'minus',
            display: '-',
            value: '-',
            title: 'Subtract.'
        },
        {
            id: 12,
            type: 'operation',
            name: 'times',
            display: '\u00d7',
            value: '*',
            title: 'Multiply.'
        },
        {
            id: 13,
            type: 'operation',
            name: 'divide',
            display: '\u00f7',
            value: '/',
            title: 'Divide.'
        },
        {
            id: 14,
            type: 'operation',
            name: 'equal',
            display: '=',
            value: '=',
            title: 'Equal.'
        },
        {
            id: 15,
            type: 'remove',
            name: 'per_digit',
            display: 'del',
            value: 'del',
            title: 'Delete by digit.'
        },
        {
            id: 16,
            type: 'remove',
            name: 'input_preview',
            display: 'C',
            value: 'C',
            title: 'Reset all.'
        },
        {
            id: 17,
            type: 'remove',
            name: 'all_input',
            display: 'CE',
            value: 'CE',
            title: 'Delete all input.'
        },
        {
            id: 18,
            type: 'punctuation-mark',
            name: 'dot',
            display: '.',
            value: '.',
            title: 'Point.'
        },
        {
            id: 19,
            type: 'punctuation-mark',
            name: 'percent',
            display: '%',
            value: '%',
            title: 'Percentage.'
        }
    ]


    return (
        <>
            <div className="container">
                {
                    buttons.map(btn => {
                        return (
                            <Button btn={btn} key={btn.id}/>
                        )
                    })
                }
            </div>
            <style jsx>
                {`
                
                    .container {
                        height: 80%;
                        width: 100%;
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        grid-template-rows: repeat(5, 1fr);
                        grid-gap: 10px;
                        grid-template-areas: 
                        'input_preview all_input per_digit divide'
                        'seven eight nine times'
                        'four five six minus'
                        'one two three plus'
                        'percent zero dot equal'
                    }
                
                `}
            </style>
        </>
    )
}

export default Keypad