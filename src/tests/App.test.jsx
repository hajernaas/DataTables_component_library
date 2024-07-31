import React from "react";
//Utilisés pour rendre les composants dans un environnement de test et interagir avec les éléments du DOM.
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import App from "../App";

describe("App Component", () => {
	//s'assurer que le titre "Current Employees" est bien rendu dans le composant App.
	test("should render the heading 'Current Employees'", () => {
		render(<App />);
		const headingElement = screen.getByText(/Current Employees/i);
		expect(headingElement).toBeInTheDocument();
	});

	//Vérifier de l'affichage du composant DataTable avec des données
	test("should render the DataTable component with data", () => {
		render(<App />);
		const table = document.getElementsByTagName("table");
		expect(table[0]).toBeInTheDocument();
	});
});
