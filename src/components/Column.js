import React from 'react'
import { useParams } from 'react-router-dom';
import { Droppable } from 'react-beautiful-dnd';

import Task from './Task'

export default function Column({ columnName, columnId, state, filteredTasks, handleAddTask, handleDeleteTask }) {

    const { eventId } = useParams();
    let flag = false

    // Detect if there is any event exists
    if (eventId !== '0') {
        flag = true
    }

    // Handle add task btn if no event
    const handleNoEvent = () => {
        alert('Please add new Event first!')
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
                    <button onClick={() => flag ? handleAddTask(state) : handleNoEvent()} className='addTask-btn'>+</button>

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
