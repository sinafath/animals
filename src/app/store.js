import { configureStore } from "@reduxjs/toolkit";
import animalsReducer from "../features/List/ListSlice";

const store = configureStore({
  reducer: {
    animals: animalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),

});

store.subscribe(() => {
  if (store.getState().animals.value !== null) {
    localStorage.setItem(
      "animals",
      JSON.stringify(store.getState().animals.value)
    );
  }
});
export { store };
