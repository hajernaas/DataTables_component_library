import React from "react";
import Table from "./Table";
import "./style.css";

const EmployeeTable = ({ infoEmployees }) => {
	console.log("employeesTable", infoEmployees);

	const listEmployees = React.useMemo(() => {
		let listEmployees = [...infoEmployees]; //Créer une nouvelle copie de infoEmployees
		return listEmployees;
	}, [infoEmployees]);

	return (
		<>
			<Table infoEmployees={listEmployees} />
		</>
	);
};

export default EmployeeTable;
