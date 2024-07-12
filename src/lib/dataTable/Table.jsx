import React from "react";

/*const Table = ({ infoEmployees }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Start Date</th>
					<th>Department</th>
					<th>Date of Birth</th>
					<th>Street</th>
					<th>City</th>
					<th>State</th>
					<th>Zip Code</th>
				</tr>
			</thead>
			<tbody>
				{infoEmployees.map((employee, index) => (
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
*/

const Table = ({ infoEmployees, sortConfig, setSortConfig }) => {
	const sortByField = (key) => {
		let direction = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const renderSortIcon = (key) => {
		if (sortConfig.key !== key) return null;
		if (sortConfig.direction === "ascending") return "▲";
		return "▼";
	};

	return (
		<table>
			<thead>
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
					<th onClick={() => sortByField("zipCode")} data-testid="th-zipCode">
						Zip Code{renderSortIcon("zipCode")}
					</th>
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
