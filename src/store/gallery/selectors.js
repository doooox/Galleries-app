export const selectGalleries = (state) => {
  let galleries = state.gallery.galleries;
  return galleries;
};
export const selectCurrentPage = (state) => state.gallery.currentPage;
export const selectSearch = (state) => state.gallery.search;