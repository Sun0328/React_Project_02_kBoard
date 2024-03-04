import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css'
import EventBar from './components/EventBar';
import TaskBox from './components/TaskBox';

const App = () => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem('events');
    if (!storedEvents) {
      const defaultEvents = [
        { id: 0, eventName: 'Project' },
        // Add more default events here if needed
      ];
      localStorage.setItem('events', JSON.stringify(defaultEvents));
      return defaultEvents;
    }
    return JSON.parse(storedEvents);
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const navigate = useNavigate();

  // Remove event from localStorage
  const removeItemByIdFromLocalStorage = (idToRemove) => {
    // 从 localStorage 中获取存储的值
    const storedEvents = localStorage.getItem('events');

    const isConfirmed = window.confirm('Do you want to delete this event and all related tasks?');

    if (isConfirmed) {
      // If user click yes, then delete
      if (storedEvents) {
        const events = JSON.parse(storedEvents);

        // find and remove the selected event
        const updatedEvents = events.filter(item => item.id.toString() !== idToRemove);

        // update localStorage
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        console.log(`Item with id ${idToRemove} removed from localStorage.`);

        // update state
        setEvents(updatedEvents);

        if (updatedEvents == '') {
          navigate('/0');
        } else {
          const link = updatedEvents[0].id;
          handleLink(link)
        }

      } else {
        console.log('No items found in localStorage.');
      }
    }
  }

  // --- Clear local Storage for testing
  // localStorage.clear()

  const handleLink = (link) => {
    if (link) {
      navigate(`/${link}`);
    } else {
      navigate('/0');
    }
  }

  return (

    <div className='container'>
      <EventBar events={events} setEvents={setEvents} handleLink={handleLink} />
      <Routes>
        <Route path='/:eventId' element={<TaskBox removeItemByIdFromLocalStorage={removeItemByIdFromLocalStorage} />} />
        <Route path='/' element={<Navigate to="/0" />} />
      </Routes>
    </div>

  );
}

export default App;
