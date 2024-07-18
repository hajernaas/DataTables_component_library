import React, { useState } from "react";
import Table from "./Table";
import "./style.css";
import { parse } from "date-fns";

//Ce composant affiche une table d'employés avec des fonctionnalités de tri et de recherche.
const DataTable = ({ jsonData }) => {
	console.log("employeesTable", jsonData);

	const [sortConfig, setSortConfig] = useState({ key: "defaultKey", direction: "ascending" });
	const [searchTerm, setSearchTerm] = useState("");

	const sortedData = React.useMemo(() => {
		let data = [...jsonData];

		if (sortConfig.key !== "defaultKey") {
			data.sort((a, b) => {
				let aValue = a[sortConfig.key];
				let bValue = b[sortConfig.key];

				// Format de date attendu
				const dateFormat = "dd/MM/yyyy";
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
					return sortConfig.direction === "ascending" ? -1 : 1;
				}
				if (aValue > bValue) {
					return sortConfig.direction === "ascending" ? 1 : -1;
				}
				return 0;
			});
		}

		return data;
	}, [jsonData, sortConfig]);

	console.log("sortedEmployees", sortedData);

	const normalizeValue = (value) =>
		value
			.toLowerCase()
			.replace(/\s/g, "")
			// Enlever les accents
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");

	const filteredData = sortedData.filter((employee) =>
		Object.values(employee).some(
			(value) =>
				typeof value === "string" && normalizeValue(value).includes(normalizeValue(searchTerm))
		)
	);
	console.log("filteredEmployees", filteredData);

	return (
		<>
			<div className="SearchSelectContainer">
				<input
					type="text"
					placeholder="Search..."
					value={searchTerm}
					className="Search"
					onChange={(e) => setSearchTerm(e.target.value)}
					data-testid="search-input"
				/>
			</div>

			<div className="TableContainer">
				<Table jsonData={filteredData} sortConfig={sortConfig} setSortConfig={setSortConfig} />
			</div>
		</>
	);
};

export default DataTable;
