import React from "react";
import PropTypes from "prop-types";
import "./style.css";
/**
 * Composant affichant une table de données avec des en-têtes triables.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Array<Object>} props.jsonData - Les données JSON à afficher dans la table. Chaque objet représente une ligne de la table.
 * @param {Object} props.sortConfig - La configuration actuelle du tri.
 * @param {string} props.sortConfig.key - La clé du champ actuellement trié.
 * @param {string} props.sortConfig.direction - La direction du tri ('ascending' ou 'descending').
 * @param {Function} props.setSortConfig - Fonction pour mettre à jour la configuration du tri.
 * @returns {JSX.Element} Le composant Table.
 */

const Table = ({ jsonData, sortConfig, setSortConfig }) => {
	//Extrait les en-têtes de colonnes d'un tableau de données au format JSON
	const headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : []; //Récupère les  noms des propriétés du premier objet du tableau jsonData.

	//Le nouveau tableau contenant les en-têtes filtrés, sans l'en-tête "id".
	const filteredHeaders = headers.filter((header) => header !== "id");

	//Fonction pour définir la clé de tri et la direction. Si le tri est déjà appliqué à la même colonne en ordre croissant, il passe en ordre décroissant.
	const sortByField = (key) => {
		let direction = "ascending";
		if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	//Pour afficher un indicateur de tri (une flèche vers le haut ou vers le bas) en fonction de la configuration de tri actuelle dans une table
	const renderSortIcon = (key) => {
		if (!sortConfig || sortConfig.key !== key) return null;
		return sortConfig.direction === "ascending" ? "▲" : "▼";
	};

	return (
		<table className="table" aria-label="DataTable">
			<thead>
				<tr>
					{/* Afficher les en-têtes de colonnes basés sur un tableau d'en-têtes filtrés et 
					permettre de trier les données en cliquant sur ces en-têtes. */}
					{filteredHeaders.map((header) => (
						<th key={header} onClick={() => sortByField(header)} role="columnheader">
							<span>{header}</span>
							<span className="sort-icon">{renderSortIcon(header)}</span>
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{/* Pour générer dynamiquement les lignes d'un tableau */}
				{jsonData.map((item) => (
					<tr key={item.id}>
						{filteredHeaders.map((header) => (
							<td key={`${item.id}-${header}`}>{item[header]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

Table.propTypes = {
	jsonData: PropTypes.arrayOf(PropTypes.object).isRequired,
	sortConfig: PropTypes.shape({
		key: PropTypes.string,
		direction: PropTypes.oneOf(["ascending", "descending"]),
	}),
	setSortConfig: PropTypes.func.isRequired,
};
export default Table;
