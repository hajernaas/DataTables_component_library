import React from "react";
//import MonComposant from "./lib";
//import HelloWorld from "./lib/HelloWorld";
//import { HelloWorld } from "./lib";
//import HelloWorld from "./lib";
import Components from "./lib/index.jsx"; // Importation de l'objet contenant les composants

const { MonComposant, HelloWorld } = Components; // Déstructuration de l'objet pour accéder aux composants

function App() {
	return (
		<div>
			<h1>titre1</h1>
			<HelloWorld text="salut" />
			<MonComposant />
		</div>
	);
}

export default App;
