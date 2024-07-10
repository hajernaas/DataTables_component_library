import React from "react";
import "./App.css";
//import Components from "./lib/index.jsx"; // Importation de l'objet contenant les composants
//const { MonComposant, HelloWorld } = Components; // Déstructuration de l'objet pour accéder aux composants
import { data } from "./lib/mock/data";
import EmployeeTable from "./lib/dataTable/EmployeeTable";

function App() {
	return (
		<div>
			<h1>Current Employees</h1>
			<EmployeeTable infoEmployees={data} />
		</div>
	);
}

export default App;
