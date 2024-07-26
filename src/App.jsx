import React from "react";
import "./App.css";
//import Components from "./lib/index.jsx"; // Importation de l'objet contenant les composants
//const { MonComposant, HelloWorld } = Components; // Déstructuration de l'objet pour accéder aux composants
import { data } from "./lib/mock/data";
import DataTable from "./lib/dataTable/DataTable";

function App() {
	return (
		<div data-testid="app-container">
			<h1>Current Employees</h1>
			<DataTable jsonData={data} />
		</div>
	);
}

export default App;
