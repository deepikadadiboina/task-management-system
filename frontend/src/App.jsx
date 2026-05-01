import { useEffect, useMemo, useState } from "react";
import TaskCard from "./components/TaskCard";

const API_URL = "https://task-management-system-backend-kbe8.onrender.com/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
    setStatus("pending");
    setDueDate("");
    setEditId(null);
  };

  const validate = () => {
    if (!title.trim()) {
      alert("Title is required");
      return false;
    }

    if (!dueDate) {
      alert("Due date is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      title,
      description,
      priority,
      status,
      dueDate,
    };

    if (editId) {
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  const toggleStatus = async (task) => {
    await fetch(`${API_URL}/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: task.status === "completed" ? "pending" : "completed",
      }),
    });

    fetchTasks();
  };

  const editTask = (task) => {
    setTitle(task.title);
    setDescription(task.description || "");
    setPriority(task.priority || "medium");
    setStatus(task.status || "pending");
    setDueDate(task.dueDate?.split("T")[0] || "");
    setEditId(task._id);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      return (
        (filterStatus === "all" || task.status === filterStatus) &&
        (filterPriority === "all" || task.priority === filterPriority)
      );
    });
  }, [tasks, filterStatus, filterPriority]);

  const completedCount = tasks.filter((task) => task.status === "completed").length;
  const pendingCount = tasks.filter((task) => task.status === "pending").length;

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.header}>
          <div>
            <p style={styles.eyebrow}>Task Management System</p>
            <h1 style={styles.title}>Organize your work</h1>
            <p style={styles.subtitle}>
              Create, track, prioritize, and complete your tasks from one clean dashboard.
            </p>
          </div>

          <div style={styles.stats}>
            <div style={styles.statBox}>
              <span style={styles.statNumber}>{tasks.length}</span>
              <span style={styles.statLabel}>Total</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNumber}>{pendingCount}</span>
              <span style={styles.statLabel}>Pending</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNumber}>{completedCount}</span>
              <span style={styles.statLabel}>Done</span>
            </div>
          </div>
        </header>

        <section style={styles.layout}>
          <form style={styles.formPanel} onSubmit={handleSubmit}>
            <div style={styles.panelHeader}>
              <h2 style={styles.panelTitle}>{editId ? "Edit Task" : "Add Task"}</h2>
              {editId && (
                <button type="button" style={styles.linkButton} onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>

            <label style={styles.label}>
              Title
              <input
                style={styles.input}
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label style={styles.label}>
              Description
              <textarea
                style={{ ...styles.input, ...styles.textarea }}
                placeholder="Write a short description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <div style={styles.twoCols}>
              <label style={styles.label}>
                Priority
                <select
                  style={styles.input}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>

              <label style={styles.label}>
                Status
                <select
                  style={styles.input}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
            </div>

            <label style={styles.label}>
              Due Date
              <input
                style={styles.input}
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>

            <button style={styles.primaryButton} type="submit">
              {editId ? "Update Task" : "Create Task"}
            </button>
          </form>

          <section style={styles.taskPanel}>
            <div style={styles.toolbar}>
              <div>
                <h2 style={styles.panelTitle}>Tasks</h2>
                <p style={styles.muted}>{filteredTasks.length} task(s) showing</p>
              </div>

              <div style={styles.filters}>
                <select
                  style={styles.filterInput}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  style={styles.filterInput}
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div style={styles.list}>
              {filteredTasks.length === 0 ? (
                <div style={styles.emptyState}>
                  <h3>No tasks found</h3>
                  <p>Create a new task or change your filters.</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    toggleStatus={toggleStatus}
                    deleteTask={deleteTask}
                    editTask={editTask}
                  />
                ))
              )}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 45%, #ecfeff 100%)",
    color: "#172033",
    fontFamily: "Inter, system-ui, Arial, sans-serif",
    padding: "32px",
    boxSizing: "border-box",
  },
  shell: {
    maxWidth: "1180px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "24px",
    marginBottom: "26px",
    flexWrap: "wrap",
  },
  eyebrow: {
    margin: "0 0 8px",
    color: "#2563eb",
    fontWeight: 700,
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  title: {
    margin: 0,
    fontSize: "42px",
    lineHeight: 1.1,
  },
  subtitle: {
    margin: "12px 0 0",
    maxWidth: "560px",
    color: "#64748b",
    fontSize: "16px",
  },
  stats: {
    display: "flex",
    gap: "12px",
  },
  statBox: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "14px 18px",
    minWidth: "86px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
  },
  statNumber: {
    display: "block",
    fontSize: "24px",
    fontWeight: 800,
  },
  statLabel: {
    display: "block",
    color: "#64748b",
    fontSize: "13px",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "360px 1fr",
    gap: "22px",
    alignItems: "start",
  },
  formPanel: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)",
  },
  taskPanel: {
    background: "rgba(255,255,255,0.78)",
    border: "1px solid #e2e8f0",
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },
  panelTitle: {
    margin: 0,
    fontSize: "22px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    fontSize: "14px",
    fontWeight: 700,
    color: "#334155",
    marginBottom: "14px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    padding: "12px 13px",
    fontSize: "14px",
    outline: "none",
    background: "#f8fafc",
    color: "#172033",
  },
  textarea: {
    minHeight: "92px",
    resize: "vertical",
    fontFamily: "inherit",
  },
  twoCols: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  primaryButton: {
    width: "100%",
    border: 0,
    borderRadius: "12px",
    padding: "13px 16px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 12px 22px rgba(37, 99, 235, 0.28)",
  },
  linkButton: {
    border: 0,
    background: "transparent",
    color: "#2563eb",
    fontWeight: 800,
    cursor: "pointer",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
    marginBottom: "18px",
    flexWrap: "wrap",
  },
  muted: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: "14px",
  },
  filters: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  filterInput: {
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    padding: "10px 12px",
    background: "#ffffff",
    color: "#172033",
    fontWeight: 700,
  },
  list: {
    display: "grid",
    gap: "14px",
  },
  emptyState: {
    textAlign: "center",
    padding: "48px 20px",
    border: "1px dashed #cbd5e1",
    borderRadius: "16px",
    color: "#64748b",
    background: "#f8fafc",
  },
};

export default App;
