import React from "react";

const Table = ({ infoEmployees, sortConfig, setSortConfig }) => {
	//sortByField est utilisée pour trier les employés en fonction d'un champ spécifique (key).
	//Elle ajuste la direction du tri (ascendant ou descendant) et met à jour la configuration du tri (sortConfig).
	const sortByField = (key) => {
		let direction = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			//Si les deux conditions sont vraies, cela signifie que l'utilisateur demande de trier
			//à nouveau par la même clé mais dans l'ordre inverse.
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const renderSortIcon = (key) => {
		//aucune icône de tri n'est affichée
		if (sortConfig.key !== key) return null;
		// retourne l'icône de flèche ascendante "▲" pour indiquer un tri croissant si non "▼" pour indiquer un tri décroissant.
		if (sortConfig.direction === "ascending") return "▲";
		return "▼";
	};

	return (
		<table>
			<thead>
				{/* Chaque en-tête de colonne (<th>) est cliquable et permet de trier les lignes de la table en fonction de la colonne correspondante. */}
				<tr>
					<th onClick={() => sortByField("firstName")}>First Name{renderSortIcon("firstName")}</th>
					<th onClick={() => sortByField("lastName")}>Last Name{renderSortIcon("lastName")}</th>
					<th onClick={() => sortByField("startDate")}>Start Date{renderSortIcon("startDate")}</th>
					<th onClick={() => sortByField("department")}>
						Department{renderSortIcon("department")}
					</th>
					<th onClick={() => sortByField("dateOfBirth")}>
						Date of Birth{renderSortIcon("dateOfBirth")}
					</th>
					<th onClick={() => sortByField("street")}>Street{renderSortIcon("street")}</th>
					<th onClick={() => sortByField("city")}>City{renderSortIcon("city")}</th>
					<th onClick={() => sortByField("state")}>State{renderSortIcon("state")}</th>
					<th onClick={() => sortByField("zipCode")}>Zip Code{renderSortIcon("zipCode")}</th>
				</tr>
			</thead>
			<tbody>
				{infoEmployees.map((employee) => (
					<tr key={employee.id}>
						<td>{employee.firstName}</td>
						<td>{employee.lastName}</td>
						<td>{employee.startDate}</td>
						<td>{employee.department}</td>
						<td>{employee.dateOfBirth}</td>
						<td>{employee.street}</td>
						<td>{employee.city}</td>
						<td>{employee.state}</td>
						<td>{employee.zipCode}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
