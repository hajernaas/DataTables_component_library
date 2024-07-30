import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import DataTable from "../lib/dataTable/DataTable";
import { isDate } from "../lib/dataTable/utils";
import React from "react";

const mockData = [
	{
		id: "19v7JDoqQBMugRcxzQ3o1YWgmqC1k3R65G",
		firstName: "Charlie",
		lastName: "Warby",
		startDate: "12/12/2021",
		department: "Services",
		dateOfBirth: "22/03/1988",
		street: "Vera",
		city: "Lansing",
		state: "MI",
		zipCode: "48912",
	},
	{
		id: "168hYxdqWAyB4VMEdb9df1KPyRjTKTC39t",
		firstName: "Alice",
		lastName: "Grahl",
		startDate: "10/10/2021",
		department: "Research and Development",
		dateOfBirth: "05/10/1986",
		street: "Namekagon",
		city: "Baton Rouge",
		state: "LA",
		zipCode: "70805",
	},
	{
		id: "1G3xUAkLuShkfLBMwPa78AajB9SqvFi7Fz",
		firstName: "Bob",
		lastName: "Dell",
		startDate: "11/11/2021",
		department: "Research and Development",
		dateOfBirth: "17/03/2004",
		street: "Merchant",
		city: "Fairfield",
		state: "CT",
		zipCode: "06825",
	},
];

describe("DataTable Component", () => {
	describe("Rendering", () => {
		test("renders DataTable component", () => {
			render(<DataTable jsonData={mockData} />);
			expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
		});
	});

	describe("Sorting", () => {
		test("sorts data by firstName in ascending order", () => {
			render(<DataTable jsonData={mockData} />);

			// Simuler le clic sur le tri par nom
			const sortByNameButton = screen.getByText(/firstName/i); // Assurez-vous que le texte correspond au bouton de tri
			fireEvent.click(sortByNameButton);

			const rows = screen.getAllByRole("row");
			expect(rows[1]).toHaveTextContent("Alice");
			expect(rows[2]).toHaveTextContent("Bob");
			expect(rows[3]).toHaveTextContent("Charlie");
		});

		test("sorts data by startDate in descending order", () => {
			render(<DataTable jsonData={mockData} />);

			// Simuler le clic sur le tri par date
			const sortByDateButton = screen.getByText(/startDate/i); // Assurez-vous que le texte correspond au bouton de tri
			fireEvent.click(sortByDateButton);
			fireEvent.click(sortByDateButton); // Deux clics pour trier dans l'ordre décroissant

			const rows = screen.getAllByRole("row");
			expect(rows[1]).toHaveTextContent("Charlie");
			expect(rows[2]).toHaveTextContent("Bob");
			expect(rows[3]).toHaveTextContent("Alice");
		});

		test("sorts data by date in ascending order when values are equal", () => {
			const mockDataWithEqualValues = [
				{ firstName: "Alice", startDate: "12/12/2021" },
				{ firstName: "Bob", startDate: "12/12/2021" },
				{ firstName: "Charlie", startDate: "12/12/2021" },
			];

			render(<DataTable jsonData={mockDataWithEqualValues} />);

			// Simuler le clic sur le tri par date
			const sortByDateButton = screen.getByText(/startDate/i); // Assurez-vous que le texte correspond au bouton de tri
			fireEvent.click(sortByDateButton);

			const rows = screen.getAllByRole("row");
			// Vérifiez que les éléments sont restés dans l'ordre initial pour les dates égales
			expect(rows[1]).toHaveTextContent("Alice");
			expect(rows[2]).toHaveTextContent("Bob");
			expect(rows[3]).toHaveTextContent("Charlie");
		});

		test("sorts data by name in ascending order when names are equal", () => {
			const mockDataWithEqualNames = [
				{ firstName: "Alice", startDate: "12/12/2021" },
				{ firstName: "Alice", startDate: "11/11/2021" },
				{ firstName: "Alice", startDate: "10/10/2021" },
			];

			render(<DataTable jsonData={mockDataWithEqualNames} />);

			// Simuler le clic sur le tri par nom
			const sortByNameButton = screen.getByText(/firstName/i); // Assurez-vous que le texte correspond au bouton de tri
			fireEvent.click(sortByNameButton);

			const rows = screen.getAllByRole("row");
			// Vérifiez que les éléments sont restés dans l'ordre initial pour les noms égaux
			expect(rows[1]).toHaveTextContent("12/12/2021");
			expect(rows[2]).toHaveTextContent("11/11/2021");
			expect(rows[3]).toHaveTextContent("10/10/2021");
		});
	});

	describe("Pagination", () => {
		test("updates items per page", () => {
			render(<DataTable jsonData={mockData} />);

			const select = screen.getByLabelText(/show/i);
			fireEvent.change(select, { target: { value: "25" } });

			expect(select.value).toBe("25");
		});
	});

	describe("Filtering", () => {
		test("filters data based on search term", () => {
			render(<DataTable jsonData={mockData} />);

			const searchInput = screen.getByPlaceholderText(/search/i);
			fireEvent.change(searchInput, { target: { value: "Alice" } });

			const rows = screen.getAllByRole("row");
			expect(rows).toHaveLength(2); // Une ligne pour l'entête et une pour le résultat
			expect(rows[1]).toHaveTextContent("Alice");
		});
	});

	describe("Date Validation", () => {
		test("returns true for valid dates", () => {
			expect(isDate("12/12/2021")).toBe(true);
			expect(isDate("01/01/2020")).toBe(true);
		});

		test("returns false for invalid dates", () => {
			expect(isDate("02/31/2021")).toBe(false); // Invalid date
			expect(isDate("not-a-date")).toBe(false);
		});

		test("returns false for null, undefined, or empty strings", () => {
			expect(isDate(null)).toBe(false);
			expect(isDate(undefined)).toBe(false);
			expect(isDate("")).toBe(false);
		});

		test("returns false for non-date strings", () => {
			expect(isDate("abc")).toBe(false);
			expect(isDate("123")).toBe(false);
		});

		test("handles unexpected errors gracefully", () => {
			const spy = vi.spyOn(console, "error").mockImplementation(() => {});
			expect(isDate({})).toBe(false); // Object input
			expect(isDate([])).toBe(false); // Array input
			spy.mockRestore();
		});
	});
});
