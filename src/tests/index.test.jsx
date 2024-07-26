import { describe, test, expect } from "vitest";
import { DataTable } from "../lib";

describe("Module Exports", () => {
	test("should export dataTable", () => {
		expect(DataTable).toBeDefined();
	});
});
