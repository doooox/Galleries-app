import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsHidden } from "../store/gallery/selectors";
import { setCurrentPage } from "../store/gallery/slice";


const GalleriesList = ({ galleries }) => {

  const dispatch = useDispatch();
  const isHidden = useSelector(selectIsHidden);

  return (
    <div className=' m-3 text-center'>
      {galleries ? (
        galleries.map((gallery, index) => (
          <div key={index}>
            <h1>
              <Link to={`galleries/${gallery.id}`}>
                {gallery.name}
              </Link>
            </h1>
            <img
              style={{
                width: "300px",
                height: "250px",
              }}
              src={
                gallery.images[0]?.image_url
              }
              alt='picture'
            />
            <p>{gallery.description}</p>
            <span>
              Created by{" "}
              <Link to={`/authors/${gallery.user_id}`}>
                {gallery.user.first_name} {gallery.user.last_name}
              </Link>{" "}
              <em>{gallery.created_at}</em>
            </span>
            <hr />
          </div>
        ))
      ) : (
        <>
          <div>There were no galleries found</div>
          <Link to="/create"> <button className="btn">Create New Gallery</button> </Link>
        </>
      )}
      {!isHidden  && (
        <button
          className='btn'
          type='button'
          onClick={() => dispatch(setCurrentPage())}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default GalleriesList;