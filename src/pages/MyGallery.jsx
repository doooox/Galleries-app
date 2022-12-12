import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GalleryList from "../components/GalleryList";
import FilterGallery from "../components/FilterGallery";
import {
  selectCurrentPage,
  selectGalleries,
  selectSearch,
} from "../store/gallery/selectors";
import { getMyGalleries, reset } from "../store/gallery/slice";
function MyGalleries() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const search = useSelector(selectSearch);
  useEffect(() => {
    dispatch(reset());
    dispatch(getMyGalleries({ page: 1, filter: "" }));
  }, []);
  useEffect(() => {
    dispatch(getMyGalleries({ page: currentPage, filter: search }));
  }, [currentPage, search]);
  const galleries = useSelector(selectGalleries);
  return (
    <div>
      <FilterGallery />
      <GalleryList galleries={galleries} />
    </div>
  );
}

export default MyGalleries;