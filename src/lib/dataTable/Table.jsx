import React from "react";

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

	//pour afficher un indicateur de tri (une flèche vers le haut ou vers le bas) en fonction de la configuration de tri actuelle dans une table
	const renderSortIcon = (key) => {
		if (!sortConfig || sortConfig.key !== key) return null;
		return sortConfig.direction === "ascending" ? "▲" : "▼";
	};

	return (
		<table className="table">
			<thead>
				<tr>
					{/* Il affiche les en-têtes de colonnes basés sur un tableau d'en-têtes filtrés et 
					permet de trier les données en cliquant sur ces en-têtes. */}
					{filteredHeaders.map((header, index) => (
						<th key={index} onClick={() => sortByField(header)}>
							{header} {renderSortIcon(header)}
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{/* pour générer dynamiquement les lignes d'un tableau */}
				{jsonData.map((item, index) => (
					<tr key={item.id}>
						{filteredHeaders.map((header, idx) => (
							<td key={idx}>{item[header]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
