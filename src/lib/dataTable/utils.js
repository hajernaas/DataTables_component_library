import { parse } from "date-fns";

export const isDate = (date, dateFormat = "dd/MM/yyyy") => {
	try {
		const parsedDate = parse(date, dateFormat, new Date());
		return !isNaN(parsedDate);
	} catch {
		return false;
	}
};

export const PaginationRange = (currentPage, totalPages, maxPageNumbersToShow) => {
	/*Déterminer le nombre maximum de numéros de pages qui seront affichés , 
	en excluant les éventuels points de suspension ("...") et les numéros de page de début et de fin */
	const totalPagesToShow = Math.min(totalPages, maxPageNumbersToShow);
	//c'est un tableau qui utilisé pour stocker les numéros de pages qui seront affichés dans un composant de pagination
	const pages = [];

	// Ajouter la première page
	pages.push(1);

	// Ajouter les points de suspension avant la page actuelle si nécessaire
	if (currentPage > Math.floor(totalPagesToShow / 2) + 1) {
		pages.push("...");
	}

	//startPage et endPage définissent la plage de pages à afficher autour de la page actuelle,
	// en s'assurant que cette plage reste dans les limites des pages disponibles et de garantir que la page actuelle
	//est bien centrée dans la vue de pagination,
	const startPage = Math.max(2, currentPage - Math.floor(totalPagesToShow / 2));
	const endPage = Math.min(totalPages - 1, currentPage + Math.floor(totalPagesToShow / 2));

	//Ajouter les pages autour de la page actuelle en veillant à ne pas dépasser le nombre de pages spécifié par totalPagesToShow
	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}

	// Ajouter les points de suspension après la dernière page si nécessaire
	if (endPage < totalPages - 1) {
		pages.push("...");
	}

	// Ajouter la dernière page
	if (totalPages > 1) {
		pages.push(totalPages);
	}

	return pages;
};
