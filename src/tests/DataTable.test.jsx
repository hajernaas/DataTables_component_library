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
	//vérifier que le composant DataTable se rend correctement en vérifiant la présence
	//d'un champ de recherche avec un texte de remplacement "search".
	describe("Rendering", () => {
		test("renders DataTable component", () => {
			render(<DataTable jsonData={mockData} />);
			expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
		});
	});

	describe("Sorting", () => {
		//vérifier que les données sont triées par firstName dans l'ordre croissant lorsqu'on clique sur le bouton de tri correspondant.
		test("sorts data by firstName in ascending order", () => {
			render(<DataTable jsonData={mockData} />); //rendre le composant DataTable avec les données de test fournies dans mockData.

			// Simuler le clic sur le tri par nom
			const sortByNameButton = screen.getByText(/firstName/i); // s'assurer que le texte correspond au bouton de tri
			fireEvent.click(sortByNameButton);
			//sélectionner tous les éléments du DOM qui ont le rôle row. Dans le contexte d'un tableau HTML, chaque ligne (<tr>) a généralement ce rôle.
			const rows = screen.getAllByRole("row");
			expect(rows[1]).toHaveTextContent("Alice");
			expect(rows[2]).toHaveTextContent("Bob");
			expect(rows[3]).toHaveTextContent("Charlie");
		});

		//vérifier que les données sont triées par startDate dans l'ordre décroissant après deux clics sur le bouton de tri.
		test("sorts data by startDate in descending order", () => {
			render(<DataTable jsonData={mockData} />);

			// Simuler le clic sur le tri par date
			const sortByDateButton = screen.getByText(/startDate/i); // s'assurer que le texte correspond au bouton de tri
			fireEvent.click(sortByDateButton);
			fireEvent.click(sortByDateButton); // Deux clics pour trier dans l'ordre décroissant

			const rows = screen.getAllByRole("row");
			expect(rows[1]).toHaveTextContent("Charlie");
			expect(rows[2]).toHaveTextContent("Bob");
			expect(rows[3]).toHaveTextContent("Alice");
		});

		//vérifier que lorsque les valeurs de startDate sont égales, les données restent dans l'ordre initial.
		test("sorts data by date in ascending order when values are equal", () => {
			const mockDataWithEqualValues = [
				{ firstName: "Alice", startDate: "12/12/2021" },
				{ firstName: "Bob", startDate: "12/12/2021" },
				{ firstName: "Charlie", startDate: "12/12/2021" },
			];

			render(<DataTable jsonData={mockDataWithEqualValues} />);

			// Simuler le clic sur le tri par date
			const sortByDateButton = screen.getByText(/startDate/i);
			fireEvent.click(sortByDateButton);

			const rows = screen.getAllByRole("row");
			// Vérifier que les éléments sont restés dans l'ordre initial pour les dates égales
			expect(rows[1]).toHaveTextContent("Alice");
			expect(rows[2]).toHaveTextContent("Bob");
			expect(rows[3]).toHaveTextContent("Charlie");
		});

		// vérifier que lorsque les valeurs de firstName sont égales, les données restent dans l'ordre initial.
		test("sorts data by name in ascending order when names are equal", () => {
			const mockDataWithEqualNames = [
				{ firstName: "Alice", startDate: "12/12/2021" },
				{ firstName: "Alice", startDate: "11/11/2021" },
				{ firstName: "Alice", startDate: "10/10/2021" },
			];

			render(<DataTable jsonData={mockDataWithEqualNames} />);

			// Simuler le clic sur le tri par nom
			const sortByNameButton = screen.getByText(/firstName/i); // s'assurer que le texte correspond au bouton de tri
			fireEvent.click(sortByNameButton);

			const rows = screen.getAllByRole("row");
			// Vérifier que les éléments sont restés dans l'ordre initial pour les noms égaux
			expect(rows[1]).toHaveTextContent("12/12/2021");
			expect(rows[2]).toHaveTextContent("11/11/2021");
			expect(rows[3]).toHaveTextContent("10/10/2021");
		});
	});

	describe("Pagination", () => {
		//vérifier que le nombre d'éléments par page est mis à jour correctement lorsqu'une nouvelle valeur est sélectionnée.
		test("updates items per page", () => {
			render(<DataTable jsonData={mockData} />);

			const select = screen.getByLabelText(/show/i); //trouver l'élément <select> basé sur son label, qui contient le mot "show".
			//simuler un changement dans le champ de sélection. La valeur est modifiée pour "25".
			fireEvent.change(select, { target: { value: "25" } });
			//vérifier que la valeur de sélection a bien été mise à jour à "25".
			expect(select.value).toBe("25");
		});
	});

	describe("Filtering", () => {
		// vérifier que les données sont filtrées correctement en fonction du terme de recherche.
		test("filters data based on search term", () => {
			render(<DataTable jsonData={mockData} />);

			const searchInput = screen.getByPlaceholderText(/search/i);
			fireEvent.change(searchInput, { target: { value: "Alice" } });

			const rows = screen.getAllByRole("row");
			expect(rows).toHaveLength(2); //vérifier que le nombre total de lignes dans le tableau est de 2, une ligne pour l'entête et une pour le résultat
			expect(rows[1]).toHaveTextContent("Alice"); //vérifier que le contenu de la deuxième ligne (index 1, car l'indexation commence à 0) contient le texte "Alice".
		});
	});

	describe("Date Validation", () => {
		//vérifier que la fonction isDate retourne true pour des dates valides.
		test("returns true for valid dates", () => {
			expect(isDate("12/12/2021")).toBe(true);
			expect(isDate("01/01/2020")).toBe(true);
		});

		// vérifier que la fonction isDate retourne false pour des dates invalides.
		test("returns false for invalid dates", () => {
			expect(isDate("02/31/2021")).toBe(false); // Invalid date
			expect(isDate("not-a-date")).toBe(false);
		});

		// vérifier que la fonction isDate retourne false pour des valeurs null, undefined ou des chaînes vides.
		test("returns false for null, undefined, or empty strings", () => {
			expect(isDate(null)).toBe(false);
			expect(isDate(undefined)).toBe(false);
			expect(isDate("")).toBe(false);
		});

		//vérifier que la fonction isDate retourne false pour des chaînes qui ne sont pas des dates.
		test("returns false for non-date strings", () => {
			expect(isDate("abc")).toBe(false);
			expect(isDate("123")).toBe(false);
		});
		// vérifier que la fonction isDate gère les erreurs inattendues de manière appropriée, comme des objets ou des tableaux.
		test("handles unexpected errors gracefully", () => {
			const spy = vi.spyOn(console, "error").mockImplementation(() => {});
			expect(isDate({})).toBe(false); // Object input
			expect(isDate([])).toBe(false); // Array input
			spy.mockRestore();
		});
	});
});
