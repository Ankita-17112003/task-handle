import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTasks(res.data);
      setError("");
    } catch (err) {
      setError("Backend se connect nahi ho paya. API URL check karo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axios.post(API_URL, { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      setError("Task add nahi ho paya.");
    }
  };

  const toggleTask = async (task) => {
    try {
      await axios.put(`${API_URL}/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } catch (err) {
      setError("Task update nahi ho paya.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      setError("Task delete nahi ho paya.");
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <p className="subtitle">MERN Deployment Practice Project</p>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Naya task likho..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="task-list">
          {tasks.length === 0 && <p className="empty">Koi task nahi hai. Naya add karo!</p>}
          {tasks.map((task) => (
            <li key={task._id} className={task.completed ? "completed" : ""}>
              <span onClick={() => toggleTask(task)}>{task.title}</span>
              <button onClick={() => deleteTask(task._id)}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
