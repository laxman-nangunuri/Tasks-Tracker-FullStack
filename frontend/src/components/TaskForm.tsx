import { useState } from "react";

interface TaskFormProps {
  onCreate: (task: {
    title: string;
    description: string;
  }) => Promise<void>;
}

function TaskForm({ onCreate }: TaskFormProps) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    await onCreate({
      title,
      description,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />
      </div>

      <button
        className="btn btn-primary"
        type="submit"
      >
        Add Task
      </button>

    </form>
  );
}

export default TaskForm;