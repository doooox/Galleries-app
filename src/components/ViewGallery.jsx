import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  selectCurrentPicture,
  selectGallery,
} from "../store/gallery/selectors";
import { getGallery, setCurrentPicture } from "../store/gallery/slice";
function ViewGallery() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGallery(id));
  }, []);
  const currentPicture = useSelector(selectCurrentPicture);
  const gallery = useSelector(selectGallery);

  return (
    <div>
      <h1 className='text-center display-4'>{gallery.name}</h1>
      {gallery && (
        <h2 className='text-center'>
          <Link to={`/authors/${gallery.user_id}`}>
            {gallery.user.first_name} {gallery.user.last_name}
          </Link>{" "}
          {gallery.created_at}
        </h2>
      )}
      <p className='text-center'>{gallery.description}</p>
      {/* carousel */}
      <div
        id='carouselExampleControls'
        className='carousel slide'
        data-ride='carousel'
      >
        {gallery && (
          <div className='carousel-inner'>
            <div className='carousel-item active m-auto'>
              <img
              style={{
                width: "300px",
                height: "300px",
              }}
                src={gallery.images[currentPicture]?.image_url}
               
                alt='1 slide'
              />
            </div>
          </div>
        )}{" "}
        <button
          className='carousel-control-prev'
          type='button'
          onClick={() => dispatch(setCurrentPicture("prev"))}
        >
          <span
            className='carousel-control-prev-icon'
            // aria-hidden='true'
          ></span>
          <span className='sr-only'>Previous</span>
        </button>
        <button
          className='carousel-control-next'
          type='button'
          onClick={() => dispatch(setCurrentPicture("next"))}
        >
          <span
            className='carousel-control-next-icon'
            aria-hidden='true'
          ></span>
          <span className='sr-only'>Next</span>
        </button>
      </div>
    </div>
  );
}

export default ViewGallery;