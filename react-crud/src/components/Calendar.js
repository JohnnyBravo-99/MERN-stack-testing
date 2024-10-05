import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar-test.css';
import CalendarDay from './calendarSubComponents/Calender.Day.js';
import CalendarDayComponent from './calendarSubComponents/CalendarDayComponent'; // Corrected import path
import 'bootstrap/dist/css/bootstrap.css';
import { AuthContext } from './user_system/authContext.js';

const CalendarTest = () => {
  const [value, setValue] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState({});
  const { logout } = useContext(AuthContext);

  const onChange = (newValue) => {
    setValue(newValue);
  };

  const dateHandler = () => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + 8); // Change year to next year
    return currentDate;
  }

  const dayHandler = (day) => {
    setSelectedDay(day);
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const handleSave = (event) => {
    setEvents(prevEvents => ({
      ...prevEvents,
      [new Date(event.date).toDateString()]: event
    }));
    setShowModal(false);
  }

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const event = events[date.toDateString()];
      return event ? <p className="event-indicator">{event.title}</p> : null;
    }
  };

  return (
    <div className="bg-info">
      <button onClick={logout} className="btn btn-danger">Logout</button>
      <Calendar 
        onChange={onChange} 
        onClickDay={dayHandler}
        value={value}
        minDate={new Date(2023, 1, 1)} 
        maxDate={dateHandler()} 
        nextLabel='Next'
        prevLabel='Previous'
        next2Label={null}
        prev2Label={null}
        tileContent={tileContent}
      />
      {showModal && (
        <CalendarDayComponent
          show={showModal} 
          handleClose={handleClose} 
          day={selectedDay}
          onSave={handleSave}
          content={selectedDay ? events[selectedDay.toDateString()] : null}
        />
      )}
    </div>
  );
};

export default CalendarTest;