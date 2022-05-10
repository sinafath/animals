import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  status: "idle",
};

export const fetchAnimals = createAsyncThunk(
  "animals/fetchAnimals",
  async () => {
    const response = await fetch(
      "https://zoo-animal-api.herokuapp.com/animals/rand/10"
    );
    const data = await response.json();
    return data;
  }
);

export const animalsSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {
    editName: (state, action) => {
      state.value[action.payload.number].name = action.payload.newName;
    },
    setList: (state) => {
      state.value = JSON.parse(localStorage.getItem("animals"));
    },
    saveItem: (state, action) => {
      state.value[action.payload.id] = {
        ...state.value[action.payload.id],
        ...action.payload.item,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnimals.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export const { editName, setList, saveItem } = animalsSlice.actions;

export const selectAnimals = (state) => state.animals.value;

export const selectAnimal = (Id) => (state) => state.animals.value[Id];
export const selectStatus = (state) => state.animals.status;

export default animalsSlice.reducer;
