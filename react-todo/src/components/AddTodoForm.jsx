import React, { useState } from "react";

const AddTodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue(""); // Clear input after adding
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo"
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
