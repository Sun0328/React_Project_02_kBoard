import React from 'react'
import { v4 as uuidv4 } from 'uuid';

import './EventBar.css'
import Event from './Event'

const EventBar = ({ events, setEvents, handleLink }) => {

  const handleAddEvent = () => {
    const eventName = prompt("Please enter your event name:");
    const eventId = uuidv4();
    if (eventName) {
      const newEvent = { id: eventId, eventName: eventName };
      setEvents([...events, newEvent]);
      handleLink(newEvent.id);
    } else {
      alert("Event name cannot be empty. Please enter a valid event name.");
    }
  }

  return (
    <div className='event-container'>
      <div className='title'>.KBoard</div>
      <div className='main'>
        <button onClick={handleAddEvent} className='addEvent-btn'>+</button>
        {events.length === 0 ? (
          <Event eventName='Add New Event' />
        ) : (
          events.map(item => (
            <Event key={uuidv4()} id={item.id} eventName={item.eventName} />
          ))
        )}
      </div>
    </div>
  );
}

export default EventBar;

