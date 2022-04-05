import React, { useState, useContext, useEffect } from 'react'
import { getMonth } from '../util'
import CalenderHeader from '../components/CalenderHeader';
import Month from '../components/Month';
import GlobalContext from '../context/GlobalContext';
import EventModal from '../components/EventModal';

var styles = {
    container: {
        marginLeft: '4%',
        marginRight: '4%'
    },
    div: {
        width: '100%',
        display: 'flex',
        flexDirection: 'columns',
        justifyContent: 'center',
    },
    overlay: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: '2',
        cursor: 'pointer'
    }
}

function Home() {
    const this_month = getMonth();
    const { monthIndex, yearIndex, showEventModal } = useContext(GlobalContext)
    const [currentMonth, setCurrentMonth] = useState(this_month);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex, yearIndex))
    }, [monthIndex, yearIndex]);

    return (
        <React.Fragment>
            <div style={styles.container}>
                {showEventModal && <div style={styles.overlay} ></div>}
                <div style={styles.div}>
                    <CalenderHeader />
                </div>
                <div style={styles.div}>
                    {showEventModal && <EventModal />}
                    <Month month={currentMonth} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home;