import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CalendarDayComponent from './CalendarDayComponent'; // Corrected import path

const CalendarDay = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/calendar');
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events: ", error);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = async (event) => {
    if (selectedEvent) {
      // Update existing event
      await axios.put(`http://localhost:5000/api/calendar/${selectedEvent._id}`, event);
    } else {
      // Add new event
      await axios.post('http://localhost:5000/api/calendar', event);
    }
    fetchEvents();
    handleCloseModal();
  };

  return (
    <div className="container">
      <h2>Calendar</h2>
      {showModal && (
        <CalendarDayComponent
          show={showModal}
          handleClose={handleCloseModal}
          day={selectedEvent ? new Date(selectedEvent.date) : new Date()}
          onSave={handleSaveEvent}
          content={selectedEvent}
        />
      )}
    </div>
  );
};

export default CalendarDay;