import { useEffect, useState } from 'react';
import { getTasks } from './api/taskApi';
import type { Task } from './types/task';

function App() {

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const loadTasks = async () => {
    const response =
      await getTasks();

    setTasks(response.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Task Tracker</h2>

      <ul className="list-group">

        {tasks.map(task => (

          <li
            className="list-group-item"
            key={task.id}
          >
            {task.title}
          </li>

        ))}

      </ul>
    </div>
  );
}

export default App;