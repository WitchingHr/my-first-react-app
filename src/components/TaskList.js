import React, { useState } from "react";

export default function TaskList() {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState(0);

  function handleChange(e) {
    setTaskName(e.target.value);
  }

  function handleClick(e) {
    if (taskName) {
      setTasks([
        ...tasks,
        { name: taskName, id: key }
      ]);
      setKey(key + 1);
      setTaskName('');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleClick();
    }
  }

  function handleDelete(id) {
    const filtered = tasks.filter(t => t.id !== id);
    setTasks(filtered);
  }

  return (
    <>
      <div>
        <input 
          type='text'
          value={taskName}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></input>
        <button onClick={handleClick}>
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task) =>
          <li key={task.id} className="list-item">
            {task.name}
            <button onClick={()=> handleDelete(task.id)}>
              Delete
            </button>
          </li>
        )}
      </ul>
    </>
  );
}