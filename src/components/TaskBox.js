import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import './TaskBox.css'
import Column from './Column';

const TaskBox = ({ removeItemByIdFromLocalStorage }) => {
  // Get Current Event Id Using Params
  const { eventId } = useParams()
  const currentEventId = eventId

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (!storedTasks) {
      const defaultTasks = [
        { id: uuidv4(), event_id: 0, taskName: 'task1', taskContent: 'content1', state: 'todo', columnId: 1 },
        { id: uuidv4(), event_id: 0, taskName: 'task2', taskContent: 'process', state: 'processed', columnId: 2 },
        { id: uuidv4(), event_id: 0, taskName: 'task3', taskContent: 'completed', state: 'completed', columnId: 3 }
        // Add more default tasks here if needed
      ];
      localStorage.setItem('tasks', JSON.stringify(defaultTasks)); // Use 'tasks' as the key here
      return defaultTasks;
    }
    return JSON.parse(storedTasks);
  });

  // Filter Tasks Data when event id matches
  let filteredTasks = tasks.filter(task => task.event_id.toString() === currentEventId);

  // Add Task Card
  const handleAddTask = (state) => {
    const taskName = prompt("Please enter your task name: ");
    const taskContent = prompt("Please enter task content: ");
    if (taskName) {
      const newTask = { id: uuidv4(), event_id: currentEventId, taskName: taskName, taskContent: taskContent, state: state };
      let columnId = null;
      if (state === 'todo') {
        columnId = 1
      } else if (state === 'processed') {
        columnId = 2
      } else { columnId = 3 }
      const updatedNewTask = { ...newTask, columnId: columnId }
      const updatedTasks = [...tasks, updatedNewTask];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // update local storage
    }
  }

  // Delete Task Card
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(item => item.id !== taskId); // filter deleted task
    setTasks(updatedTasks); // update state
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // update local storage
  }

  // Remove all related tasks if event is deleted
  const handleRemoveTasks = (currentEventId) => {
    const removedTasks = tasks.filter(item => item.event_id.toString() !== currentEventId)
    setTasks(removedTasks)
    localStorage.setItem('tasks', JSON.stringify(removedTasks)); // update local storage
  }

  // For Merging tasks After dragging
  const mergeTasksByEventId = (tasks, mergedTasks) => {
    // Filter out other event tasks
    const filteredTasks = tasks.filter(task => task.event_id.toString() !== currentEventId);

    // Merge the new tasks into the filtered tasks based on the current event_id
    mergedTasks.forEach(newTask => {
        filteredTasks.push(newTask);
    });

    return filteredTasks;
  };

  // Handle drag ends function (Reordering and inserting logic)
  const handleOnDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    let updatedTasks = Array.from(filteredTasks);
    let columnData = {
      1: [],
      2: [],
      3: []
    };

    updatedTasks.forEach(item => {
      columnData[item.columnId].push(item);
    });

    const start = columnData[source.droppableId];
    const finish = columnData[destination.droppableId];
    const draggedTask = updatedTasks.find(task => task.id === draggableId);

    if (start === finish) {
      // Reorder in the same column
      start.splice(source.index, 1);
      start.splice(destination.index, 0, draggedTask);
      columnData[source.droppableId] = start;
    } else {
      // Insert to another column
      draggedTask.columnId = Number(destination.droppableId);
      start.splice(source.index, 1);

      columnData[source.droppableId] = start;
      columnData[destination.droppableId] = finish;

      if (destination.droppableId === '1') {
        draggedTask.state = 'todo';
      } else if (destination.droppableId === '2') {
        draggedTask.state = 'processed';
      } else if (destination.droppableId === '3') {
        draggedTask.state = 'completed';
      }

      finish.splice(destination.index, 0, draggedTask);
    }

    const mergedTasks = [].concat(...Object.values(columnData));

    const updatedAllTasks = mergeTasksByEventId(tasks, mergedTasks);

    setTasks(updatedAllTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedAllTasks));
  }

  return (
    <div className='task-container'>

      <div className='top-bar'>
        <div className='title'>All Tasks</div>
        <button onClick={() => { removeItemByIdFromLocalStorage(currentEventId); handleRemoveTasks(currentEventId); }}
          className='remove-event-btn'>
          Remove this Event
        </button>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className='main-container'>
          <Column columnName='To Do' state='todo' columnId={1} filteredTasks={filteredTasks}
            handleAddTask={handleAddTask} handleDeleteTask={handleDeleteTask} />

          <Column columnName='In Process' state='processed' columnId={2} filteredTasks={filteredTasks}
            handleAddTask={handleAddTask} handleDeleteTask={handleDeleteTask} />

          <Column columnName='Completed' state='completed' columnId={3} filteredTasks={filteredTasks}
            handleAddTask={handleAddTask} handleDeleteTask={handleDeleteTask} />
        </div>
      </DragDropContext>
    </div>
  );
}

export default TaskBox;
