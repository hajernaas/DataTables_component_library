import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: "src/lib/index.jsx",
			name: "DataTableComponentLibrary",
			fileName: (format) => `datatable-component-library.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
	},
});
