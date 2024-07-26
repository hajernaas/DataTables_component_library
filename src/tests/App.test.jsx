import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import App from "../App";

describe("App Component", () => {
	test("should render the heading 'Current Employees'", () => {
		render(<App />);
		const headingElement = screen.getByText(/Current Employees/i);
		expect(headingElement).toBeInTheDocument();
	});

	test("should render the EmployeeTable component with data", () => {
		render(<App />);
		const table = document.getElementsByTagName("table");
		expect(table[0]).toBeInTheDocument();
	});
});
