import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App component with header and TodoList", () => {
  // Render the App component
  render(<App />);

  // Check if the header is present
  expect(screen.getByText("Todo Application")).toBeInTheDocument();

  // Check if the TodoList component renders by looking for a placeholder from it
  expect(screen.getByPlaceholderText("Add a new todo")).toBeInTheDocument();
});
