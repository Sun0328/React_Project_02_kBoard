import React from 'react'
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ taskId, index, taskName, taskContent, onDelete }) => {
    const handleDeleteTask = () => {
        onDelete();
    }

    const getDraggableId = () => {
        return taskId.toString()
    }

    return (
        <Draggable draggableId={getDraggableId()} index={index}>
            {(provided) => (
                <div className='task-card-container'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className='task-name'>{taskName}</div>
                    <div className='task-content'>{taskContent}</div>
                    <span onClick={handleDeleteTask} className='task-delete-btn material-symbols-outlined'>
                        remove
                    </span>
                </div>
            )}
        </Draggable>
    )
}

export default Task;