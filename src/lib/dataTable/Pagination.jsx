import React from "react";
import "./style.css";
import { PaginationRange } from "./PaginationRange";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
	//const pageNumbers = []; //Un tableau qui sera utilisé pour stocker les numéros de pages généré

	// calcule le nombre total de pages nécessaires pour afficher tous les éléments, en arrondissant à l'entier supérieur.
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	//Le nombre maximal de numéros de pages à afficher dans la pagination.
	const maxPageNumbersToShow = 5;

	/*	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}
*/
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	// pour ajouter des points de suspension et générer  et calculer les pages à afficher
	const paginationRange = PaginationRange(currentPage, totalPages, maxPageNumbersToShow);

	return (
		<div className="PaginationContainer">
			<div className="PaginationInfo">
				{`Showing ${indexOfFirstItem + 1} to ${Math.min(
					indexOfLastItem,
					totalItems
				)} of ${totalItems} entries`}
			</div>
			<ul className="Pagination">
				<li>
					<button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
						Précédent
					</button>
				</li>
				{paginationRange.map((number, index) => (
					<li key={index} className={currentPage === number ? "active" : ""}>
						{number === "..." ? (
							<span className="ellipsis">...</span>
						) : (
							<button onClick={() => paginate(number)}>{number}</button>
						)}
					</li>
				))}
				<li>
					<button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
						Suivant
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
