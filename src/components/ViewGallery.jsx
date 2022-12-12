import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {

  selectCurrentPicture,
  selectGallery,
} from "../store/gallery/selectors";
import {
  deleteGallery,
  getGallery,
  setCurrentPicture,
} from "../store/gallery/slice";

const ViewGallery = () => {

  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGallery(id));
    dispatch(setCurrentPicture(0));
  }, []);

  const currentPicture = useSelector(selectCurrentPicture);

  const gallery = useSelector(selectGallery);

  const handleDelete = () => {
    const deletePrompt = prompt(
      "Are you sure you want to delete this gallery(Y/N)?",
      "Y"
    );
    if (deletePrompt.toLowerCase() === "y") {
      dispatch(
        deleteGallery({
          id: id,
          meta: { onSuccess: () => history.push("/my-galleries") },
        })
      );
    }
  };
  
  return (
    <div className='containter'>
      {gallery.user_id === +localStorage.userId && (
        <div className='m-3  text-right'>
          <button
            className='btn btn-secondary'
            onClick={() => history.push(`/edit/${id}`)}
          >
            Edit
          </button>
          <button
            type='button'
            className='btn btn-danger ml-2'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
      <h1 className='text-center display-4'>{gallery.name}</h1>
      {gallery && (
        <h2 className='text-center'>
          <Link to={`/authors/${gallery.user_id}`}>
            {gallery.user.first_name} {gallery.user.last_name}
          </Link>{" "}
          {new Date(gallery.created_at).toLocaleString}
        </h2>
      )}
      <p className='text-center'>{gallery.description}</p>
      {/* carousel */}
      <div
        id='carouselExampleControls'
        className='carousel slide'
        style={{ background: "#88835f92" }}
        data-ride='carousel'
      >
        {gallery && (
          <div className='carousel-inner'>
            <div className='carousel-item active '>
              <a
                href={gallery.images[currentPicture]?.image_url}
                target='_blank'
              >
                <img
                  src={gallery.images[currentPicture]?.image_url}
                  className='d-block mx-auto'
                  style={{
                    width: "800px",
                    height: "500px",
                  }}
                  alt='1 slide'
                />
              </a>
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
            aria-hidden='true'
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