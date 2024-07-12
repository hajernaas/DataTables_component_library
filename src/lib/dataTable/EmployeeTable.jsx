import React, { useState } from "react";
import Table from "./Table";
import "./style.css";
import { parse } from "date-fns";

const EmployeeTable = ({ infoEmployees }) => {
	console.log("employeesTable", infoEmployees);
	const [sortConfig, setSortConfig] = useState({ key: "firstName", direction: "ascending" });

	/*const listEmployees = React.useMemo(() => {
		let listEmployees = [...infoEmployees]; //Créer une nouvelle copie de infoEmployees
		return listEmployees;
	}, [infoEmployees]);*/

	const sortedEmployees = React.useMemo(() => {
		let listEmployees = [...infoEmployees];

		if (sortConfig !== null) {
			listEmployees.sort((a, b) => {
				let aValue = a[sortConfig.key];
				let bValue = b[sortConfig.key];
				//console.log("aValue", aValue);
				//console.log("bValue", bValue);

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

	return (
		<>
			<div className="TableContainer">
				{/* <Table infoEmployees={listEmployees} /> */}
				<Table
					infoEmployees={sortedEmployees}
					sortConfig={sortConfig}
					setSortConfig={setSortConfig}
				/>
			</div>
		</>
	);
};

export default EmployeeTable;
