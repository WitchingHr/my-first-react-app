import React, { useState } from "react";

export default function TaskList() {
  const [taskName, setTaskName] = useState('');
  const [taskEdit, setTaskEdit] = useState('');
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState(0);

  function handleChange(e) {
    setTaskName(e.target.value);
  }

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

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  }

  function handleEdit(id) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {...task, edit: true}
      } else {
        return task
      }
    }));
  }

  function handleEditName(e) {
    setTaskEdit(e.target.value)
  }

  function handleSave(id) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {...task, name: taskEdit, edit: false}
      } else {
        return task;
      }
    }));
    setTaskEdit('');
  }

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
        <button className="add" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task) =>
          <li key={task.id} className="list-item">
            {task.edit ? (
              <>
                <input id="edit"
                  placeholder={task.name}
                  value={taskEdit}
                  onChange={handleEditName}
                ></input>
                <button className="save" onClick={() => handleSave(task.id)}>Save</button>
              </>
            ) : (
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