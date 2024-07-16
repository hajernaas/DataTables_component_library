import React, { useState } from "react";
import Table from "./Table";
import "./style.css";
import { parse } from "date-fns";

//Ce composant affiche une table d'employés avec des fonctionnalités de tri et de recherche.
const EmployeeTable = ({ infoEmployees }) => {
	console.log("employeesTable", infoEmployees);
	//sortConfig : Utilisé pour configurer le tri des employés, avec une clé de tri (firstName)
	//et une direction de tri (ascending).
	const [sortConfig, setSortConfig] = useState({ key: "firstName", direction: "ascending" });
	//Utilisé pour stocker le terme de recherche saisi par l'utilisateur.
	const [searchTerm, setSearchTerm] = useState("");

	//Utilise React.useMemo pour mémoriser la liste triée des employés.Elle s'exécute lorsque infoEmployees ou sortConfig change.
	const sortedEmployees = React.useMemo(() => {
		let listEmployees = [...infoEmployees]; //Crée une copie de la liste des employés

		// Si non nul,trier les employés par date ou par chaîne de caractères en fonction de sortConfig.key et et sortConfig.direction.
		if (sortConfig !== null) {
			listEmployees.sort((a, b) => {
				let aValue = a[sortConfig.key];
				let bValue = b[sortConfig.key];

				const dateFormat = "dd/MM/yyyy";
				//Fonction utilitaire pour vérifier si une chaîne de caractères est une date valide au format "dd/MM/yyyy".
				const isDate = (date) => {
					try {
						const parsedDate = parse(date, dateFormat, new Date());
						return !isNaN(parsedDate);
					} catch {
						return false;
					}
				};

				if (aValue == null) aValue = "";
				if (bValue == null) bValue = "";

				if (isDate(aValue) && isDate(bValue)) {
					aValue = parse(aValue, dateFormat, new Date());
					bValue = parse(bValue, dateFormat, new Date());
				} else {
					aValue = aValue.toString().toLowerCase();
					bValue = bValue.toString().toLowerCase();
				}

				if (aValue < bValue) {
					console.log("aValue1", aValue);
					console.log("bValue1", bValue);
					return sortConfig.direction === "ascending" ? -1 : 1;
				}
				if (aValue > bValue) {
					return sortConfig.direction === "ascending" ? 1 : -1;
				}
				return 0;
			});
		}

		return listEmployees;
	}, [infoEmployees, sortConfig]);

	console.log("sortedEmployees", sortedEmployees);

	// Fonction pour normaliser les valeurs en les transformant en minuscules, en supprimant les espaces et les accents.
	const normalizeValue = (value) =>
		value
			.toLowerCase()
			.replace(/\s/g, "")
			// Enlever les accents
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");

	//Filtre les employés triés (sortedEmployees) pour ne conserver que ceux dont les valeurs (après normalisation)
	//contiennent la valeur de recherche searchTerm
	const filteredEmployees = sortedEmployees.filter((employee) =>
		Object.values(employee).some(
			(value) =>
				typeof value === "string" && normalizeValue(value).includes(normalizeValue(searchTerm))
		)
	);

	return (
		<>
			{/* le champ de recherche permet à l'utilisateur de saisir la valeur de recherche. */}
			{/* cette valeur est mis à jour dans l'état (searchTerm) à chaque modification avec la  nouvelle valeur du champs d'entrée. */}

			<input
				placeholder="Search"
				className="Search"
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)} 
			/>
			{/* Le composant Table  reçoit les employés filtrés */}
			{/* la configuration de tri (sortConfig), et la fonction pour mettre à jour */}
			{/* cette configuration (setSortConfig). */}
			<div className="TableContainer">
				<Table
					//infoEmployees={sortedEmployees}
					infoEmployees={filteredEmployees}
					sortConfig={sortConfig}
					setSortConfig={setSortConfig}
				/>
			</div>
		</>
	);
};

export default EmployeeTable;
