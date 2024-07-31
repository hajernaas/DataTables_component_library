import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PaginationRange } from "../lib/dataTable/utils";
import Pagination from "../lib/dataTable/Pagination";

describe("Pagination Component", () => {
	//vérifier que le composant de pagination affiche correctement les informations de pagination et les numéros de page.
	test("should display the correct range of pages and pagination info", () => {
		const paginate = vi.fn(); // Créer une fonction fictive pour remplacer la fonction réelle de pagination, permettant de vérifier les appels à cette fonction sans exécuter la logique réelle.
		render(<Pagination itemsPerPage={10} totalItems={100} paginate={paginate} currentPage={3} />);

		// Vérifier les informations de pagination
		expect(screen.getByText("Showing 21 to 30 of 100 entries")).toBeInTheDocument();

		// Vérifiez les numéros de page
		expect(screen.getByText("1")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
		expect(screen.getByText("4")).toBeInTheDocument();
		expect(screen.getByText("5")).toBeInTheDocument();
		expect(screen.getByText("...")).toBeInTheDocument();
		expect(screen.getByText("10")).toBeInTheDocument();

		// Vérifier les boutons de navigation
		expect(screen.getByText("Précédent")).toBeInTheDocument();
		expect(screen.getByText("Suivant")).toBeInTheDocument();
	});

	//vérifier que le bouton "Précédent" est désactivé lorsqu'on est sur la première page.
	test("should disable the previous button on the first page", () => {
		const paginate = vi.fn();
		render(<Pagination itemsPerPage={10} totalItems={100} paginate={paginate} currentPage={1} />); //Rendu du composant Pagination avec la première page active.

		// Vérifier que le bouton précédent est désactivé
		expect(screen.getByText("Précédent")).toBeDisabled();
	});

	// vérifier que le bouton "Suivant" est désactivé lorsqu'on est sur la dernière page.
	test("should disable the next button on the last page", () => {
		const paginate = vi.fn();
		render(<Pagination itemsPerPage={10} totalItems={100} paginate={paginate} currentPage={10} />);

		// Vérifier que le bouton suivant est désactivé
		expect(screen.getByText("Suivant")).toBeDisabled();
	});

	//vérifier que la fonction paginate est appelée avec le bon numéro de page lorsque l'utilisateur clique sur un numéro de page
	test("should call paginate function when a page number is clicked", () => {
		const paginate = vi.fn();
		render(<Pagination itemsPerPage={10} totalItems={100} paginate={paginate} currentPage={3} />);

		// Cliquer sur un numéro de page et vérifiez que la fonction paginate est appelée
		fireEvent.click(screen.getByText("4"));
		expect(paginate).toHaveBeenCalledWith(4);
	});

	//vérifier que la fonction paginate est appelée avec le bon numéro de page lorsque l'utilisateur clique sur le bouton "Suivant".
	test("should call paginate function when next button is clicked", () => {
		const paginate = vi.fn();
		render(<Pagination itemsPerPage={10} totalItems={100} paginate={paginate} currentPage={3} />);

		// Cliquer sur le bouton suivant et vérifiez que la fonction paginate est appelée
		fireEvent.click(screen.getByText("Suivant"));
		expect(paginate).toHaveBeenCalledWith(4);
	});

	//vérifier que la fonction paginate est appelée avec le bon numéro de page lorsque l'utilisateur clique sur le bouton "Précédent".
	test("should call paginate function when previous button is clicked", () => {
		const paginate = vi.fn();
		render(<Pagination itemsPerPage={10} totalItems={100} paginate={paginate} currentPage={3} />);

		// Cliquer sur le bouton précédent et vérifiez que la fonction paginate est appelée
		fireEvent.click(screen.getByText("Précédent"));
		expect(paginate).toHaveBeenCalledWith(2);
	});
});

describe("PaginationRange", () => {
	//vérifier que la fonction PaginationRange retourne la plage correcte de pages pour les paramètres fournis.
	test("should return the correct range for given parameters", () => {
		const result = PaginationRange(3, 10, 5);
		expect(result).toEqual([1, 2, 3, 4, 5, "...", 10]); // Obtenir une plage correcte autour de la page 3
	});

	//vérifier que la fonction PaginationRange gère correctement les cas où il y a moins de pages que le nombre maximum de pages à afficher.
	test("should handle the case where there are less pages than maxPageNumbersToShow", () => {
		const result = PaginationRange(1, 3, 5);
		expect(result).toEqual([1, 2, 3]); // Il devrait retourner toutes les pages disponibles
	});

	//vérifier que la fonction PaginationRange ajoute des ellipses lorsque le nombre total de pages dépasse le nombre maximum de pages affichées.
	test("should add ellipses when there are more pages than maxPageNumbersToShow", () => {
		const result = PaginationRange(6, 20, 5);
		expect(result).toEqual([1, "...", 4, 5, 6, 7, 8, "...", 20]); // Vérifier l'inclusion correcte des points de suspension
	});

	// vérifier que la fonction PaginationRange inclut les ellipses et les pages finales lorsqu'il y a peu de pages autour de la page actuelle.
	test("should include only ellipses and the end pages when there are only a few pages around currentPage", () => {
		const result = PaginationRange(1, 20, 5);
		expect(result).toEqual([1, 2, 3, "...", 20]);
	});
});
