/*
 cette fonction permet de génèrer une liste de numéros de pages pour la pagination d'une interface utilisateur. 
 Elle calcule les pages à afficher en fonction de la page actuelle (currentPage), du nombre total de pages (totalPages),
  et du nombre maximum de pages à afficher (maxPageNumbersToShow). 
*/

export const PaginationRange = (currentPage, totalPages, maxPageNumbersToShow) => {
	//Calcule le nombre total de numéros de pages à afficher,
	//y compris les numéros de début et de fin ainsi que les points de suspension (s'il y en a).
	const totalNumbers = maxPageNumbersToShow + 2;

	// Calcule le nombre total de blocs (ou d'éléments) nécessaires pour la pagination,
	// y compris les points de suspension supplémentaires pour le début et la fin.
	const totalBlocks = totalNumbers + 2;

	//Elle gère les points de suspension ("...") pour indiquer des pages omises lorsque la pagination est trop longue pour être affichée entièrement.
	if (totalPages > totalBlocks) {
		//Calcule la première page à afficher dans la pagination.
		const startPage = Math.max(2, currentPage - Math.floor(maxPageNumbersToShow / 2));
		//Calcule la dernière page à afficher dans la pagination.
		const endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPageNumbersToShow / 2));

		let pages = [1];

		if (startPage > 2) {
			pages.push("...");
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (endPage < totalPages - 1) {
			pages.push("...");
		}

		pages.push(totalPages);

		return pages;
	}

	const pageNumbers = [];

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}
	console.log("pageNumbers", pageNumbers);
	return pageNumbers;
};
