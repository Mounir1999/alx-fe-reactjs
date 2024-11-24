import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

test("renders TodoList with initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Write Tests")).toBeInTheDocument();
  expect(screen.getByText("Build Projects")).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText("Add a new todo");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(button);

  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

test("toggles a todo", () => {
  render(<TodoList />);
  const todo = screen.getByText("Learn React");

  // Click to toggle the todo
  fireEvent.click(todo);

  // Check if the todo is completed (style updated)
  expect(todo).toHaveStyle("text-decoration: line-through");

  // Click again to toggle back
  fireEvent.click(todo);
  expect(todo).toHaveStyle("text-decoration: none");
});

test("deletes a todo", () => {
  render(<TodoList />);

  // Find the todo by its text
  const todo = screen.getByText("Learn React");

  // Use `within` to scope to the specific <li> containing the todo
  const todoItem = todo.closest("li"); // Get the parent <li> of the todo
  const deleteButton = within(todoItem).getByText("Delete");

  // Click the delete button
  fireEvent.click(deleteButton);

  // Assert that the todo is no longer in the document
  expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});
