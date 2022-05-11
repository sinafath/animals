import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { fetchAnimals, setList } from "./features/List/ListSlice";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);
if (localStorage.getItem("animals") === null) {
  console.log("fetching data");
  store.dispatch(fetchAnimals());
} else {
  console.log("setting data");
  store.dispatch(setList());
}

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
