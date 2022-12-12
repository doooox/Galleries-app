import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const middlewareActions = {
  getGalleries: () => {},
  loadMore: () => {},
  getMyGalleries: () => {},
  getUserGalleries: () => {},
  getGallery: () => {},
  createGallery: () => {},
  editGallery: () => {},
  deleteGallery: () => {},
  addComment: () => {},
  removeComment: () => {},
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
    addCommentToGallery: (state, action) => {
      state.gallery.comments.push(action.payload);
    },
    removeCommentFromGallery: (state, action) => {
      state.gallery.comments = state.gallery.comments.filter(
        (comment) => comment.id != action.payload
      );
    },
    setCurrentPicture: (state, action) => {
      if (action.payload === "prev") {
        state.currentPicture--;
      } else if (action.payload === "next") {
        state.currentPicture++;
      } else {
        state.currentPicture = action.payload;
      }

      if (state.gallery.images) {
        if (state.currentPicture < 0) {
          state.currentPicture = state.gallery.images.length - 1;
        }
        if (state.currentPicture >= state.gallery.images.length) {
          state.currentPicture = 0;
        }
      }
    },
    addGallery: (state, action) => {
      state.galleries = action.payload;
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
  addGallery,
  createGallery,
  editGallery,
  deleteGallery,
  reset,
  addComment,
  addCommentToGallery,
  removeComment,
  removeCommentFromGallery,
} = gallerySlice.actions;
export default gallerySlice.reducer;