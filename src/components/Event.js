import React from 'react'
import { NavLink } from 'react-router-dom';

const Event = ({ id, eventName }) => {

    return (
        <NavLink to={`/${id}`}
            className='eventName-container' >
            {eventName}
        </NavLink>
    )
}

export default Event;