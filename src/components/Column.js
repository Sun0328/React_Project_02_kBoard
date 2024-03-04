import React from 'react'
import { Droppable } from 'react-beautiful-dnd';

import Task from './Task'
import { useParams } from 'react-router-dom';

export default function Column({ columnName, columnId, state, filteredTasks, handleAddTask, handleDeleteTask }) {
    const { eventId } = useParams()

    const handleAddEventBtn = () => {
        if (eventId === '0') {
            alert('Please Add New Event First!')
        } else {
            handleAddTask(state);
        }
    }

    const getDroppableIndex = (state) => {
        const columnArr = filteredTasks.filter(item => item.state === state)
        return columnArr.length
    }

    return (
        <Droppable droppableId={columnId.toString()} index={getDroppableIndex(state)}>
            {(provided, snapshot) => (
                <div className='column' {...provided.droppableProps} ref={provided.innerRef}
                    style={{ backgroundColor: snapshot.isDraggingOver ? 'wheat' : '' }}
                >
                    <div className='task-state'>{columnName}</div>
                    <button onClick={() => handleAddEventBtn()} className='addTask-btn'>+</button>

                    {filteredTasks
                        .filter(item => item.state === state)
                        .map((filteredItem, index) => (
                            <Task key={filteredItem.id} index={index} taskId={filteredItem.id}
                                taskName={filteredItem.taskName}
                                taskContent={filteredItem.taskContent}
                                onDelete={() => handleDeleteTask(filteredItem.id)}
                            />
                        ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}
