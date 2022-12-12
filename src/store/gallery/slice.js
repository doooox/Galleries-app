import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getGalleries: () => {},
  loadMore: () => {},
  getMyGalleries: () => {},
  getUserGalleries: () => {},
  getGallery: () => {},
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleries: [],
    currentPage: 1,
    isHidden: false,
    search: "",
    gallery: "",
    currentPicture: 0,
  },
  reducers: {
    setGalleries: (state, action) => {
      state.galleries = action.payload;
    },
    addGalleries: (state, action) => {
      state.galleries.push(...action.payload);
    },
    setIsHidden: (state, action) => {
      state.isHidden = action.payload;
    },
    setCurrentPage: (state) => {
      state.currentPage++;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    reset: (state) => {
      state.search = "";
      state.currentPage = 1;
    },
    setGallery: (state, action) => {
      state.gallery = action.payload;
    },
    setCurrentPicture: (state, action) => {
      if (action.payload === "prev") {
        state.currentPicture--;
      }
      if (action.payload === "next") {
        state.currentPicture++;
      }
      // carousel functionality
      if (state.gallery.images) {
        if (state.currentPicture < 0) {
          state.currentPicture = state.gallery.images.length - 1;
        }
        if (state.currentPicture >= state.gallery.images.length) {
          console.log(state.gallery.images.length - 1);
          state.currentPicture = 0;
        }
      }
    },
    ...middlewareActions,
  },
});

export const {
  setGalleries,
  getGalleries,
  loadMore,
  addGalleries,
  setIsHidden,
  setCurrentPage,
  setSearch,
  getMyGalleries,
  getUserGalleries,
  getGallery,
  setGallery,
  setCurrentPicture,
  reset,
} = gallerySlice.actions;
export default gallerySlice.reducer;