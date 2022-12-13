import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { selectIsAuthenticated } from "../store/auth/selectors";
import {
  selectCurrentPicture,
  selectGallery,
} from "../store/gallery/selectors";
import {
  addComment,
  deleteGallery,
  getGallery,
  removeComment,
  setCurrentPicture,
} from "../store/gallery/slice";

const ViewGallery = () => {
  const { id } = useParams();
  console.log(id);
  const history = useHistory();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const currentPicture = useSelector(selectCurrentPicture);
  const gallery = useSelector(selectGallery);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(getGallery(id));
    dispatch(setCurrentPicture(0));
  }, [comment]);

  const deleteHandler = () => {
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

  const deleteCommentHandler = (id) => {
    const deleteCommentPropmpt = prompt(
      "Are you sure you want to delete this comment(Y/N)?",
      "Y"
    );
    if (deleteCommentPropmpt.toLowerCase() === "y") {
      dispatch(removeComment(id));
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addComment({ id, content: comment }));
    setComment("");
  };
  return (
    <div className='containter'>
      {gallery.user_id === +localStorage.userId && (
        <div className='m-3  text-right'>
          <button
            className='btn btn-success'
            onClick={() => history.push(`/edit/${id}`)}
          >
            Edit
          </button>
          <button
            type='button'
            className='btn btn-danger ml-2'
            onClick={deleteHandler}
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
          <br />
          <small>{new Date(gallery.created_at).toLocaleString()}</small>
        </h2>
      )}
      <p className='text-center'>{gallery.description}</p>
      {/* carousel */}
      <div
        id='carouselExampleControls'
        className='carousel slide'
        style={{ background: "#7d7777" }}
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
                  style={{ width: "40%", height: "30%" }}
                  alt='First slide'
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
      {/* comments */}
      <hr />
      <div>
        <ul className='list-group list-group-flush'>
          {gallery.comments &&
            gallery.comments.map((comment) => (
              <div className='m-3 d-flex justify-content-center' key={comment.id}>
                <li className='list-group-item w-75'>
                  <p>{comment.content}</p>
                  {comment.user && (
                    <span>
                      <Link
                        to={`/authors/${comment.user_id}`}
                        className='text-dark'
                      >
                        {comment.user?.first_name} {comment.user?.last_name}
                      </Link>
                    </span>
                  )}
                  <span className='ml-2'>
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                  {+localStorage.userId === comment.user_id && (
                    <div className="d-flex justify-content-center my-3">
                      <button
                      style={{ display: "flex" }}
                      type='button'
                      onClick={() => deleteCommentHandler(comment.id)}
                      className='btn btn-danger mb-2'
                    >
                      Delete
                    </button></div>

                  )}
                </li>
              </div>
            ))}
        </ul>
        {isAuthenticated && (
          <form className='m-3' onSubmit={submitHandler}>
            <textarea
              name='content'
              cols='50'
              rows='5'
              required
              max='1000'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Enter your comment...'
            ></textarea>
            <br />
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ViewGallery;