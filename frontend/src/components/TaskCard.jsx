function TaskCard({ task, toggleStatus, deleteTask, editTask }) {
  const priorityStyle = {
    low: {
      background: "#dcfce7",
      color: "#166534",
    },
    medium: {
      background: "#fef3c7",
      color: "#92400e",
    },
    high: {
      background: "#fee2e2",
      color: "#991b1b",
    },
  };

  const isCompleted = task.status === "completed";

  return (
    <article style={styles.card}>
      <div style={styles.topRow}>
        <div>
          <h3
            style={{
              ...styles.title,
              textDecoration: isCompleted ? "line-through" : "none",
              color: isCompleted ? "#94a3b8" : "#172033",
            }}
          >
            {task.title}
          </h3>

          <p style={styles.description}>
            {task.description || "No description added."}
          </p>
        </div>

        <span style={{ ...styles.badge, ...priorityStyle[task.priority] }}>
          {task.priority}
        </span>
      </div>

      <div style={styles.metaGrid}>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Status</span>
          <span style={isCompleted ? styles.doneText : styles.pendingText}>
            {task.status}
          </span>
        </div>

        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Due Date</span>
          <span style={styles.metaValue}>
            {task.dueDate ? task.dueDate.split("T")[0] : "Not set"}
          </span>
        </div>

        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Created</span>
          <span style={styles.metaValue}>
            {task.createdAt ? task.createdAt.split("T")[0] : "N/A"}
          </span>
        </div>
      </div>

      <div style={styles.actions}>
        <button
          style={isCompleted ? styles.secondaryButton : styles.completeButton}
          onClick={() => toggleStatus(task)}
        >
          {isCompleted ? "Mark Pending" : "Mark Done"}
        </button>

        <button style={styles.secondaryButton} onClick={() => editTask(task)}>
          Edit
        </button>

        <button style={styles.deleteButton} onClick={() => deleteTask(task._id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "18px",
    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "flex-start",
  },
  title: {
    margin: 0,
    fontSize: "19px",
    lineHeight: 1.3,
  },
  description: {
    margin: "8px 0 0",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: 1.5,
  },
  badge: {
    borderRadius: "999px",
    padding: "6px 10px",
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "capitalize",
    whiteSpace: "nowrap",
  },
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginTop: "16px",
  },
  metaItem: {
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "10px",
  },
  metaLabel: {
    display: "block",
    color: "#64748b",
    fontSize: "12px",
    marginBottom: "4px",
  },
  metaValue: {
    color: "#334155",
    fontWeight: 800,
    fontSize: "13px",
  },
  doneText: {
    color: "#15803d",
    fontWeight: 800,
    fontSize: "13px",
    textTransform: "capitalize",
  },
  pendingText: {
    color: "#b45309",
    fontWeight: 800,
    fontSize: "13px",
    textTransform: "capitalize",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "16px",
    flexWrap: "wrap",
  },
  completeButton: {
    border: 0,
    borderRadius: "10px",
    padding: "10px 12px",
    background: "#16a34a",
    color: "#ffffff",
    fontWeight: 800,
    cursor: "pointer",
  },
  secondaryButton: {
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    padding: "10px 12px",
    background: "#ffffff",
    color: "#334155",
    fontWeight: 800,
    cursor: "pointer",
  },
  deleteButton: {
    border: 0,
    borderRadius: "10px",
    padding: "10px 12px",
    background: "#ef4444",
    color: "#ffffff",
    fontWeight: 800,
    cursor: "pointer",
  },
};

export default TaskCard;
