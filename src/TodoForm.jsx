import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text, date);
    setText("");
    setDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add task..."
      />
      <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy"/>
      <button type="submit">+</button>
    </form>
  );
};

export default TodoForm;
