import { useEffect, useState } from 'react';
import { getTasks } from './api/taskApi';
import type { Task } from './types/task';
import TaskForm from './components/TaskForm';
import {createTask, deleteTask, updateTask} from './api/taskApi';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const loadTasks = async () => {
    setLoading(true);
    try{
      const response = await getTasks();

      setTasks(response.data);
    }
    catch
    {
      setError('Failed to load tasks');
    }
    finally{
      setLoading(false);
    }
  };

  const handleCreateTask = async (
    task: {
      title: string;
      description: string;
    }
  ) => {

    await createTask(task);

    toast.success('Task created successfully');

    await loadTasks();
  };

  const handleStatusChange = async (
    id: number,
    status: string
  ) => {

    await updateTask(id, {
      status,
    });

    toast.success('Task Updated Successfully');

    await loadTasks();
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);

    toast.success('Task Deleted Successfully');

    await loadTasks();
  }

  const handleSaveEdit =
  async (id:number) => {

    await updateTask(
      id,
      {
        title: editTitle,
        description: editDescription,
      }
    );

    toast.success('Task updated');

    setEditingTaskId(null);

    await loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if(loading)
  {
    return <h3>Loading...</h3>;
  }
  
  const filteredTasks = tasks.filter(task => {

    const statusMatch =
      filterStatus === 'All' ||
      task.status === filterStatus;

    const searchMatch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    return statusMatch && searchMatch;
  });

  return (
    <div className="container mt-5">
      <h2>Task Tracker</h2>

      { error && ( 
        <div className="alert alert-danger">
            {error}
        </div>
        )
      }

      <TaskForm onCreate = {handleCreateTask} />

      <input
        className="form-control mb-3"
        placeholder="Search task..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
        className="form-select mb-3"
        value={filterStatus}
        onChange={(e) =>
          setFilterStatus(e.target.value)
        }
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="InProgress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {filteredTasks.map(task => (
        <div className="card mb-3" key={task.id}>
          <div className="card-body">
            {
              editingTaskId === task.id ? (
                  <>
                    <input
                      className="form-control mb-2"
                      value={editTitle}
                      onChange={(e) =>
                        setEditTitle(e.target.value)
                      }
                    />
                    <textarea
                      className="form-control mb-2"
                      value={editDescription}
                      onChange={(e) =>
                        setEditDescription(e.target.value)
                      }
                    />
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() =>
                      handleSaveEdit(task.id)
                    }
                  >
                    Save
                  </button>

                  <button
                    className="btn btn-secondary btn-sm me-2"
                    onClick={() =>
                      setEditingTaskId(null)
                    }
                  >
                    Cancel
                  </button>
                  </>
                ) : (
                  <>
                    <h5>{task.title}</h5>
                    <p>{task.description}</p>
                  </>
                )
            }

            <div className="mb-2">
              <label className="me-2">
                Status:
              </label>

              <select
                className="form-select mb-3"
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(
                    task.id,
                    e.target.value
                  )
                }
              >
                <option value="Pending">Pending</option>

                <option value="InProgress">In Progress</option>

                <option value="Completed">Completed</option>
              </select>
            </div>
            {(editingTaskId !== task.id) && (
              <>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditingTaskId(task.id);

                    setEditTitle(task.title);

                    setEditDescription(task.description);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {

                    const confirmed = window.confirm('Are you sure you want to delete this task?');

                    if (confirmed) {
                      handleDeleteTask(task.id);
                    }
                  }}
                >
                  Delete
                </button>

              </>
            )}
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default App;