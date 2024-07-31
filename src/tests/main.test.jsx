import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import App from "../App";

describe("Main Component rendering", () => {
	//vérifier que le composant principal App est bien rendu dans l'élément DOM avec l'ID "root".
	test('should render App into the DOM element with id "root"', () => {
		const div = document.createElement("div");
		div.id = "root";
		document.body.appendChild(div);
		// rendre le composant App dans l'élément div.
		render(<App />, { container: div });
		expect(div.querySelector("div")).toBeInTheDocument(); // Vérifier que l'élément div est présent dans le DOM
	});
});
