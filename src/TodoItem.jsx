import React, { useState } from "react";
import { motion } from "framer-motion";

const TodoItem = ({ todo, removeTodo, toggleComplete, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) updateTodo(todo.id, newText);
    setIsEditing(!isEditing);
  };

  return (
    <motion.li
      className={`todo-item ${todo.completed ? "completed" : ""}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleEdit}
          autoFocus
        />
      ) : (
        <span className="todo-text">
          {todo.text} <small>({new Date(todo.date).toLocaleDateString()})</small>
        </span>
      )}

      <div className="actions">
        <button onClick={() => toggleComplete(todo.id)}>
          {todo.completed ? "🔄" : "✅"}
        </button>
        <button onClick={handleEdit}>✏️</button>
        <button className="delete-btn" onClick={() => removeTodo(todo.id)}>❌</button>
      </div>
    </motion.li>
  );
};

export default TodoItem;
