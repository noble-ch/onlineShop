// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
// 	plugins: [react()],

// 	server: {
// 		https: {
// 			key: "./private.key",
// 			cert: "./certificate.crt"
// 		}
// 	}
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	server: {
		proxy: {
			"/api": "http://127.0.0.1:9000",
			host: "0.0.0.0"
		}
	}
});
