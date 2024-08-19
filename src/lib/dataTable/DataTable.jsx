import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Table from "./Table";
import Pagination from "./Pagination";
import { parse } from "date-fns";
import { isDate } from "./utils";
import "./style.css";

/**
 * Composant affichant une table des données avec des fonctionnalités de tri et de recherche.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Array<Object>} props.jsonData - Les données JSON à afficher dans la table. Chaque objet représente une ligne de la table.
 * @returns {JSX.Element} Le composant DataTable.
 */

const DataTable = ({ jsonData }) => {
	const [sortConfig, setSortConfig] = useState({ key: "defaultKey", direction: "ascending" });
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const sortedData = React.useMemo(() => {
		let data = [...jsonData];

		if (sortConfig.key !== "defaultKey") {
			data.sort((a, b) => {
				let aValue = a[sortConfig.key];
				let bValue = b[sortConfig.key];

				const dateFormat = "dd/MM/yyyy";

				if (aValue == null) aValue = "";
				if (bValue == null) bValue = "";

				if (isDate(aValue, dateFormat) && isDate(bValue, dateFormat)) {
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

	const normalizeValue = (value) =>
		value
			.toLowerCase()
			// Enlever les accents
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");

	const filteredData = sortedData.filter((e) =>
		Object.entries(e).some(
			([key, value]) =>
				key !== "id" &&
				typeof value === "string" &&
				normalizeValue(value).includes(normalizeValue(searchTerm))
		)
	);

	useEffect(() => {
		setCurrentPage(1); // Réinitialiser à la première page après la recherche
	}, [searchTerm]);

	//Détermine la position du dernier élément de la page actuelle dans le tableau de données filtrées.
	const indexOfLastItem = currentPage * itemsPerPage;

	// Détermine la position du premier élément de la page actuelle
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	//Sous-liste des éléments à afficher sur la page actuelle, obtenue à l'aide de la méthode slice().
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

	// Pour gérer le changement du nombre d'éléments affichés par page
	const updateItemsPerPage = (event) => {
		setItemsPerPage(Number(event.target.value));
		setCurrentPage(1);
	};

	// Pour gérer le changement de la page affichée
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<>
			<div className="searchSelectContainer">
				<label htmlFor="itemsPerPage" className="selectLabel">
					Show
					<select
						id="itemsPerPage"
						className="select"
						value={itemsPerPage}
						onChange={updateItemsPerPage}>
						<option value={10}>10</option>
						<option value={25}>25</option>
						<option value={50}>50</option>
						<option value={100}>100</option>
					</select>
					entries
				</label>

				<input
					type="text"
					placeholder="Search..."
					value={searchTerm}
					className="search"
					onChange={(e) => setSearchTerm(e.target.value)}
					aria-label="Search data"
					role="searchbox"
				/>
			</div>

			<div className="tableContainer">
				<Table jsonData={currentItems} sortConfig={sortConfig} setSortConfig={setSortConfig} />
			</div>

			<Pagination
				itemsPerPage={itemsPerPage}
				totalItems={filteredData.length}
				paginate={paginate}
				currentPage={currentPage}
			/>
		</>
	);
};

DataTable.propTypes = {
	jsonData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTable;
