import React from 'react'
import { NavLink } from 'react-router-dom';

const Event = ({ id, eventName, handleAddEvent }) => {

    const handleNoEvent = () => {
        if (id === undefined) {
            handleAddEvent();
        } else {
            return;
        }
    }

    return (
        <NavLink to={id ? `/${id}` : '/'}
            className='eventName-container' onClick={handleNoEvent}>
            {eventName}
        </NavLink>
    )
}

export default Event;