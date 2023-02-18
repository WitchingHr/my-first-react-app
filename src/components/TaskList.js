import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";

export default function TaskList() {
  const [taskName, setTaskName] = useState('');
  const [taskEdit, setTaskEdit] = useState('');
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState(0);

  // Update task name on change
  function handleChange(e) {
    setTaskName(e.target.value);
  }

  // Add task to list
  function handleAddTask() {
    if (taskName) {
      setTasks([
        ...tasks,
        { name: taskName, id: key, edit: false }
      ]);
      setKey(key + 1);
      setTaskName('');
    }
  }

  // Add task to array on 'Enter'
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  }

  // Open editor input after Edit button click
  function handleEdit(id) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        setTaskEdit(task.name);
        return {...task, edit: true}
      } else {
        return task
      }
    }));
  }

  // Update task name on change
  function handleEditName(e) {
    setTaskEdit(e.target.value)
  }


  // Save edit
  function handleSave(id) {
    if (!taskEdit) return; // If empty string
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {...task, name: taskEdit, edit: false}
      } else {
        return task;
      }
    }));
    setTaskEdit('');
  }

  // Save edit on 'Enter'
  function handleSaveOnKeyDown(e, id) {
    if (e.key === 'Enter') {
      handleSave(id)
    }
  }

  // Delete task
  function handleDelete(id) {
    const filtered = tasks.filter(t => t.id !== id);
    setTasks(filtered);
  }

  return (
    <div className="container">
      <div className="input-container">
        <input 
          type='text'
          value={taskName}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></input>
        {!taskName ? (
          <button className="add" disabled>
            Add Task
          </button>
        ) : (
          <button className="add" onClick={handleAddTask}>
            Add Task
          </button>
        )}
      </div>
      <ul>
        {/* Render list items */}
        {tasks.map((task) =>
          <li key={task.id} className="list-item">

            {task.edit ? (
              // If item being edited
              <>
                <input id="edit"
                  value={taskEdit}
                  onChange={handleEditName}
                  onKeyDown={(e) =>handleSaveOnKeyDown(e, task.id)}
                  autoFocus
                ></input>
                {!taskEdit ? (
                  <button className="save" disabled>Save</button>
                ) : (
                  <button className="save" onClick={() => handleSave(task.id)}>Save</button>
                )}
              </>
            ) : (
              // Else
              <>
                <span className="task-name">{task.name}</span>
                <button className="edit" onClick={() => handleEdit(task.id)}>
                  Edit
                </button>
              </>
            )}

            <button className="delete" onClick={()=> handleDelete(task.id)}>
              Delete
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}