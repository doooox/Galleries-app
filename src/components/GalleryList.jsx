import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentPage } from "../store/gallery/slice";

const GalleriesList = ({ galleries }) => {
    const dispatch = useDispatch();
    return (
        <div className='p-3 text-center'>
            {galleries.length ? (
                galleries.map((gallery, index) => (
                    <div key={index}>
                        <h1>
                            <Link className='text-dark' to={`${gallery.id}`}>
                                {gallery.name}
                            </Link>
                        </h1>
                        <a target="_blank" href={gallery?.images[0]?.image_url} >
                            <img
                                className='rounded mx-auto'
                                style={{
                                    width: "300px",
                                    height: "200px",
                                }}
                                key={gallery?.images[0]?.id}
                                src={gallery?.images[0]?.image_url}
                                alt="Image" />
                        </a>
                        <p style={{ fontSize: "1.5em" }}>{gallery.description}</p>
                        <span>
                            Created by{" "}
                            <Link className='text-dark' to={`/autors/${gallery.user_id}`}>
                                {gallery.user.first_name} {gallery.user.last_name}
                            </Link>{" "}
                            <em>{Date(gallery.created_at).toLocaleString()}</em>
                        </span>
                        <hr />
                    </div>
                ))
            ) : (
                <div className='display-4'>No galleries have been created</div>
            )}
            {galleries.length % 10 === 0 ? <button
                className='btn'
                type='button'
                onClick={() => dispatch(setCurrentPage())}
            >
                Load More
            </button> :
                null
            }
        </div>
    );
}

export default GalleriesList;