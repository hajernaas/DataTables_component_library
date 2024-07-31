# DataTable Component Library

A powerful and flexible data table component for React applications. It provides sorting, filtering, pagination, and other features out-of-the-box.

## Installation 

- To install the DataTable component library, use npm:

```bash
npm install datatable-component-library
```

- Run the application in development mode:

```bash
npm run dev
```

- Build the project:

```bash
npm run build
```

- Test the project:

```bash
npm run test
npm run coverage
```

## Usage

The DataTable component displays a table with sorting, searching, and pagination capabilities.

```javascript
import React from "react";
import { DataTable } from "datatable-component-library";

const App = () => {
	const Data = [
		{ id: 1, name: "John Doe", date: "12/01/2022", position: "Developer" },
		{ id: 2, name: "Jane Smith", date: "13/01/2022", position: "Designer" },
	];

	return (
		<div>
			<h1>Table des employés</h1>
			<DataTable jsonData={Data} />
		</div>
	);
};
export default App;
```

## Props

- jsonData (array): The data to be displayed in the table. This should be an array of objects.

* Table Component
  The Table component is a low-level component used internally by DataTable to render the actual table.

```javascript
<Table jsonData={currentItems} sortConfig={sortConfig} setSortConfig={setSortConfig} />
```

- jsonData (array): The data to be displayed in the table.
- sortConfig (object): The current sorting configuration with key and direction.
- setSortConfig (function): Function to update the sorting configuration.

* Pagination Component
  The Pagination component handles pagination controls.

```javascript
<Pagination
	itemsPerPage={itemsPerPage}
	totalItems={filteredData.length}
	paginate={paginate}
	currentPage={currentPage}
/>
```

- itemsPerPage (number): Number of items per page.
- totalItems (number): Total number of items to paginate.
- paginate (function): Function to handle page changes.
- currentPage (number): The currently active page.

## License

This project is licensed under the MIT License.

## Contributing

If you have suggestions for how this component could be improved, or want to report a bug, open an issue! I'd love all and any contributions. For more details, check out the contributing guidelines.

To get started:

- Fork the repository.
- Create a new branch for your feature or fix.
- Make your changes.
- Test your changes.
- Submit a pull request.
