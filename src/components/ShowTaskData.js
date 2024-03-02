import { useState, useEffect } from 'react';

const FilteredTaskData = () => {
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [currentEventId, setCurrentEventId] = useState('');

    useEffect(() => {
        const tasksString = localStorage.getItem('tasks');
        if (tasksString) {
            const tasks = JSON.parse(tasksString);
            const filteredTasks = tasks.filter(task => task.event_id === currentEventId);
            setFilteredTasks(filteredTasks); // Update the state with the filtered tasks
        }
    }, [currentEventId]);

    return filteredTasks; // Return the filteredTasks array
}

export default FilteredTaskData;