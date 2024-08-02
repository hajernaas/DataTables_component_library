import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import { PaginationRange } from "./utils.js";

/**
 * Composant de pagination affichant des boutons pour naviguer entre les pages.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {number} props.itemsPerPage - Le nombre d'éléments affichés par page.
 * @param {number} props.totalItems - Le nombre total d'éléments à paginer.
 * @param {Function} props.paginate - La fonction pour changer la page actuelle.
 * @param {number} props.currentPage - La page actuellement affichée.
 * @returns {JSX.Element} Le composant Pagination.
 */

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
	// Calculer le nombre total de pages nécessaires pour afficher tous les éléments, en arrondissant à l'entier supérieur.
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	//Le nombre maximal de numéros de pages à afficher dans la pagination.
	const maxPageNumbersToShow = 5;

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	//Pour ajouter des points de suspension et générer  et calculer les pages à afficher
	const paginationRange = PaginationRange(currentPage, totalPages, maxPageNumbersToShow);
	console.log("paginationRange", paginationRange);

	return (
		<div className="PaginationContainer">
			<div className="PaginationInfo">
				{`Showing ${indexOfFirstItem + 1} to ${Math.min(
					indexOfLastItem,
					totalItems
				)} of ${totalItems} entries`}
			</div>
			<nav role="navigation" aria-label="Pagination">
				<ul className="Pagination">
					<li>
						<button
							onClick={() => paginate(currentPage - 1)}
							disabled={currentPage === 1}
							aria-label="Previous Page">
							Précédent
						</button>
					</li>
					{paginationRange.map((number, index) => (
						<li key={index} className={currentPage === number ? "active" : ""}>
							{number === "..." ? (
								<span className="ellipsis" aria-hidden="true">
									...
								</span>
							) : (
								<button
									onClick={() => paginate(number)}
									aria-current={currentPage === number ? "page" : undefined}>
									{number}
								</button>
							)}
						</li>
					))}
					<li>
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalPages}
							aria-label="Next Page">
							Suivant
						</button>
					</li>
				</ul>
			</nav>
		</div>
	);
};

Pagination.propTypes = {
	itemsPerPage: PropTypes.number.isRequired,
	totalItems: PropTypes.number.isRequired,
	paginate: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired,
};

export default Pagination;
