import { describe, test, expect } from "vitest";
import { DataTable } from "../lib";

describe("Module Exports", () => {
	// vérifier que le module DataTable est bien exporté et défini dans le projet.
	test("should export dataTable", () => {
		expect(DataTable).toBeDefined();
	});
});
