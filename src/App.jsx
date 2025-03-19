import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.scss";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) setTodos(savedTodos);

    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("darkMode", darkMode);
  }, [todos, darkMode]);

  const addTodo = (text, date) => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, date: date.toISOString(), completed: false }]);
  };

  const removeTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (!selectedDate) return true;
    return new Date(todo.date).toDateString() === selectedDate.toDateString();
  });

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <h1>To-Do List 📝</h1>
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <TodoForm addTodo={addTodo} />

      <div className="date-filter">
        <label>Filter by date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          isClearable
          dateFormat="dd/MM/yyyy"  
        />
      </div>

      <h2>Tasks to do ⏳</h2>
      <ul className="todo-list">
        {filteredTodos.filter(todo => !todo.completed).map(todo => (
          <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleComplete={toggleComplete} updateTodo={updateTodo} />
        ))}
      </ul>

      <h2>Tasks completed ✅</h2>
      <ul className="todo-list">
        {filteredTodos.filter(todo => todo.completed).map(todo => (
          <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleComplete={toggleComplete} updateTodo={updateTodo} />
        ))}
      </ul>
    </div>
  );
};

export default App;
