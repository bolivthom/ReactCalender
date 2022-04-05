import dayjs from 'dayjs'
import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

var styles = {
    header: {
        display: 'flex',
        flexDirection: 'row',
        height: '100px',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
       // marginLeft: '50px',
        //marginRight: '50px'
    },
    right: {
        display: 'flex',
        flexDirection: 'row',
        width: '350px',
    },
    headerDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    button: {
        border: '0',
        boxShadow: 'none',
        background: '#3658F5',
        height: '25px',
        width: '25px',
        borderRadius: '50%',
        marginLeft: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    title: {
        fontSize: '18px',
        width: '200px',
        textAlign: 'left',
        color: '#3658F5'
    },
    subTitle: {
        color: '#97989D',
        width: '100px',
        fontSize: '14px',
        textAlign: 'right',
    },
}
export default function CalenderHeader() {

    const { monthIndex, setMonthIndex } = useContext(GlobalContext)
    const { yearIndex, setYearIndex } = useContext(GlobalContext)

    function handleNextMonth() {
        if (monthIndex === 11) {
            setMonthIndex(0);
            handleNextYear();
        } else {
            setMonthIndex(monthIndex + 1);
        }
    }

    function handleNextYear() {
        setYearIndex(yearIndex + 1)
    }

    function handlePrevYear() {
        setYearIndex(yearIndex - 1)
    }

    function handlePrevMonth() {
        if (monthIndex === 0) {
            setMonthIndex(11);
            handlePrevYear();
        } else {
            setMonthIndex(monthIndex - 1);
        }
    }

    const currentYear = new Date();
    currentYear.setYear(yearIndex);

    return (
        <header style={styles.header}>

            <h1 style={styles.title}>Calender</h1>

            <div style={styles.right}>
                <div style={styles.headerDiv}>
                    <h1 style={styles.subTitle}>
                        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM")}
                    </h1>
                    <button onClick={handlePrevMonth} style={styles.button}>
                        <span style={{ color: 'white' }} className="material-icons-outlined">
                            chevron_left
                        </span>
                    </button>
                    <button onClick={handleNextMonth} style={styles.button}>
                        <span style={{ color: 'white' }} className="material-icons-outlined">
                            chevron_right
                        </span>
                    </button>
                </div>
                
                <div style={styles.headerDiv}>
                    <h1 style={styles.subTitle}>
                        {dayjs(currentYear).format("YYYY")}
                    </h1>
                    <button onClick={handlePrevYear} style={styles.button}>
                        <span style={{ color: 'white' }} className="material-icons-outlined">
                            chevron_left
                        </span>
                    </button>
                    <button onClick={handleNextYear} style={styles.button}>
                        <span style={{ color: 'white' }} className="material-icons-outlined">
                            chevron_right
                        </span>
                    </button>
                </div>
            </div>
        </header>
    )
}