import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import "../../styles/calendar-test.css"

const CalendarDayComponent = ({ show, handleClose, day, onSave, events, onDelete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(day.toISOString().split('T')[0]);
  const [important, setImportant] = useState(false);
  const [published, setPublished] = useState(true);

  useEffect(() => {
    
    setDate(day.toISOString().split('T')[0]); // Reset date when day changes
  }, [day]);

  const handleSave = () => {
    const newEvent = {
      title,
      description,
      date,
      important,
      published,
    };
    onSave(newEvent); // Call the save function passed from the parent
    resetForm(); // Reset form after saving
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImportant(false);
    setPublished(true);
  };

  const handleDelete = (eventId) => {
    onDelete(eventId); // Call the delete function passed from the parent
  };

  if (!show) return null;

  return (

    <div className="modal fade show" style={{display: 'block'}} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content day-component">
          {events}
        </div>
      </div>
    </div>

  )
};

export default CalendarDayComponent;