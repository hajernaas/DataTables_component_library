import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PaginationRange } from "../lib/dataTable/utils";
import Pagination from "../lib/dataTable/Pagination";

describe("Pagination Component", () => {
	test("should display the correct range of pages and pagination info", () => {
		const paginate = vi.fn();
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

	test("should disable the previous button on the first page", () => {
		const paginate = vi.fn();
		render(<Pagination itemsPerPage={10} totalItems={100} paginate={paginate} currentPage={1} />);

		// Vérifier que le bouton précédent est désactivé
		expect(screen.getByText("Précédent")).toBeDisabled();
	});

	test("should disable the next button on the last page", () => {
		const paginate = vi.fn();
		render(<Pagination itemsPerPage={10} totalItems={100} paginate={paginate} currentPage={10} />);

		// Vérifier que le bouton suivant est désactivé
		expect(screen.getByText("Suivant")).toBeDisabled();
	});

	test("should call paginate function when a page number is clicked", () => {
		const paginate = vi.fn();
		render(<Pagination itemsPerPage={10} totalItems={100} paginate={paginate} currentPage={3} />);

		// Cliquer sur un numéro de page et vérifiez que la fonction paginate est appelée
		fireEvent.click(screen.getByText("4"));
		expect(paginate).toHaveBeenCalledWith(4);
	});

	test("should call paginate function when next button is clicked", () => {
		const paginate = vi.fn();
		render(<Pagination itemsPerPage={10} totalItems={100} paginate={paginate} currentPage={3} />);

		// Cliquer sur le bouton suivant et vérifiez que la fonction paginate est appelée
		fireEvent.click(screen.getByText("Suivant"));
		expect(paginate).toHaveBeenCalledWith(4);
	});

	test("should call paginate function when previous button is clicked", () => {
		const paginate = vi.fn();
		render(<Pagination itemsPerPage={10} totalItems={100} paginate={paginate} currentPage={3} />);

		// Cliquer sur le bouton précédent et vérifiez que la fonction paginate est appelée
		fireEvent.click(screen.getByText("Précédent"));
		expect(paginate).toHaveBeenCalledWith(2);
	});
});

describe("PaginationRange", () => {
	test("should return the correct range for given parameters", () => {
		const result = PaginationRange(3, 10, 5);
		expect(result).toEqual([1, 2, 3, 4, 5, "...", 10]); // Obtenir une plage correcte autour de la page 3
	});

	test("should handle the case where there are less pages than maxPageNumbersToShow", () => {
		const result = PaginationRange(1, 3, 5);
		expect(result).toEqual([1, 2, 3]); // Il devrait retourner toutes les pages disponibles
	});

	test("should add ellipses when there are more pages than maxPageNumbersToShow", () => {
		const result = PaginationRange(6, 20, 5);
		expect(result).toEqual([1, "...", 4, 5, 6, 7, 8, "...", 20]); // Vérifier l'inclusion correcte des points de suspension
	});

	test("should include only ellipses and the end pages when there are only a few pages around currentPage", () => {
		const result = PaginationRange(1, 20, 5);
		expect(result).toEqual([1, 2, 3, "...", 20]); // Vérifier le cas où il y a peu de pages au début
	});
});
