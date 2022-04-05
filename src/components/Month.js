import React from 'react'
import Day from './Day'

const height = window.innerHeight;
var styles = {
    div: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7,minmax(10%, 20%))',
        gridAutoRows: 'minmax(50px, 120px)',
        backgroundColor: '#F5F6FA',
        border: '1px solid',
        borderColor: '#EDEFF6',
        width: '100%',
        height: 'height - 100px',
        //marginLeft: '50px',
        //marginRight: '50px'
    },
}

export default function Month({month}) {
    return(
        <div style={styles.div}>
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, index) => (
                        <Day day={day} key={index} rowIndex={i}/>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
}