import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";

import "./index.css";
import "./media.css";
import "./config.css";
import "./bootstrap.min.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
