import React from "react";

const Table = ({ jsonData, sortConfig, setSortConfig }) => {
	const headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];

	const filteredHeaders = headers.filter((header) => header !== "id");

	const sortByField = (key) => {
		let direction = "ascending";
		if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const renderSortIcon = (key) => {
		if (!sortConfig || sortConfig.key !== key) return null;
		return sortConfig.direction === "ascending" ? "▲" : "▼";
	};

	return (
		<table className="table">
			<thead>
				<tr>
					{filteredHeaders.map((header, index) => (
						<th key={index} onClick={() => sortByField(header)}>
							{header} {renderSortIcon(header)}
						</th>
					))}
				</tr>
			</thead>

			<tbody>
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
