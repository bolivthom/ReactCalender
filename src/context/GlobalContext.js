import React from 'react'

const GlobalContext = React.createContext({
    monthIndex: 0,
    yearIndex: 0,
    setYearIndex: (index) => {},
    setMonthIndex: (index) => { },
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => { },
    daySelected: null,
    setDaySelected: (day) => { },
    showEventModal: false,
    setShowEventModal: () => { },
    dispatchCalEvent: ({ type, payload }) => { },
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: () => { },
    filteredEvents: [],
})

export default GlobalContext;