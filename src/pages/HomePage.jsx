import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPage,
  selectGalleries,
  selectSearch,
} from "../store/gallery/selectors";
import { getGalleries, reset } from "../store/gallery/slice";
import GalleryList from "../components/GalleryList";
import FilterGallery from "../components/FilterGallery";

const Home = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const search = useSelector(selectSearch);

  useEffect(() => {
    dispatch(reset());
    dispatch(getGalleries());
  }, []);

  useEffect(() => {
    dispatch(getGalleries({ page: currentPage, filter: search }));
  }, [currentPage, search]);

  const galleries = useSelector(selectGalleries);

  return (
    <>
      <FilterGallery />
      <GalleryList galleries={galleries} />
    </>
  );
}

export default Home;