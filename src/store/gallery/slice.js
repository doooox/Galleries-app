import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const middlewareActions = {
  getGalleries: () => {},
  loadMore: () => {},
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleries: [],
    currentPage: 1,
    isHidden: false,
    search: "",
  },
  reducers: {
    setGalleries: (state, actions) => {
      state.galleries = actions.payload;
    },
    setCurrentPage: (state) => {
      state.currentPage++;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  setGalleries,
  getGalleries,
  loadMore,
  setCurrentPage,
  setSearch,
  setIsHidden,
} = gallerySlice.actions;
export default gallerySlice.reducer;
