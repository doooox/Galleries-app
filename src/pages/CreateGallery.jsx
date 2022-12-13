import React, { useEffect, useState } from "react";
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { selectUserId } from "../store/auth/selectors";
import { selectGallery } from "../store/gallery/selectors";
import { createGallery, editGallery, getGallery } from "../store/gallery/slice";



const CreateNewGallery = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const [imageList, setImageList] = useState([{ image_url: "" }]);
    const [gallery, setGallery] = useState({
        name: "",
        description: "",
        images: [],
    });

    useEffect(() => {
        if (id) {
            dispatch(getGallery(id));
        }
    }, []);

    const fetchedGallery = useSelector(selectGallery);

    useEffect(() => {
        if (id) {
            setGallery({
                name: fetchedGallery.name,
                description: fetchedGallery.description,
                images: fetchedGallery.images,
            });
            setImageList(fetchedGallery.images);
        }
    }, [fetchedGallery]);

    useEffect(() => {
        setGallery({ ...gallery, images: imageList });
    }, [imageList]);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (id) {
            dispatch(
                editGallery({
                    content: { gallery, id },
                    meta: {
                        onSuccess: () => {
                            history.push(`/edit/${id}`);
                            history.push(`/my-galleries`);
                        },
                    },
                })
            );
        }

        else {
            dispatch(
                createGallery({
                    gallery,
                    meta: { onSuccess: () => history.push("/my-galleries") },
                })
            );
        }
    };


    const editImageUrl = (image, url) => {
        const index = imageList.findIndex((img) => img == image);
        setImageList([
            ...imageList.slice(0, index),
            { image_url: url },
            ...imageList.slice(index + 1, imageList.length),
        ]);
    }

    const removeHandler = (image) => {
        setImageList(imageList.filter((img) => img !== image));
    };

    const moveUp = (image) => {
        let newImageList = [...imageList];
        const index = imageList.findIndex((img) => img == image);
        let temp = newImageList[index];
        newImageList[index] = newImageList[index - 1];
        newImageList[index - 1] = temp;
        setImageList(newImageList);
    };
    const moveDown = (image) => {
        let newImageList = [...imageList];
        const index = imageList.findIndex((img) => img == image);
        let temp = newImageList[index];
        newImageList[index] = newImageList[index + 1];
        newImageList[index + 1] = temp;
        setImageList(newImageList);
        setImageList(newImageList);
    };

  
    return (
        <div className='container d.flex my-5'>
            <h1 className="m-4"><FaPlusCircle /> Create New Gallery</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='form-group'>
                    <input
                        type='text'
                        name='name'
                        required
                        min='2'
                        max='255'
                        value={gallery.name}
                        placeholder='Enter gallery name...'
                        className='form-control'
                        onChange={(e) => setGallery({ ...gallery, name: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        max='1000'
                        name='description'
                        value={gallery.description}
                        placeholder='Enter description...'
                        className='form-control'
                        onChange={(e) =>
                            setGallery({ ...gallery, description: e.target.value })
                        }
                    />
                </div>

                {imageList &&
                    imageList.map((image, index) => (
                        <div key={index}>
                            <div className='d-inline-block form-group'>
                                <input
                                    type='text'
                                    name='image'
                                    value={image.image_url}
                                    placeholder='Enter image URL...'
                                    className='form-control'
                                    onChange={(e) => editImageUrl(image, e.target.value)}
                                />
                            </div>
                            {imageList.length > 1 && (
                                <div className='d-inline-block'>
                                    <button
                                        className='btn btn-light m-1'
                                        onClick={() => moveUp(image)}
                                        type='button'
                                        disabled={index === 0}
                                    >
                                        Move &#8593;
                                    </button>
                                    <button
                                        className='btn btn-light m-1'
                                        onClick={() => moveDown(image)}
                                        type='button'
                                        disabled={index === imageList.length - 1}
                                    >
                                        Move &#8595;
                                    </button>
                                    <button
                                        type='button'
                                        className='btn m-3'
                                        onClick={() => removeHandler(image)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                <button
                    type='button'
                    onClick={() => {
                        setImageList([...imageList, { image_url: "", order: "" }]);
                    }}
                    className='mb-3 d-block btn btn-light'
                >
                    Add another URL
                </button>
                <button type='submit' className='btn btn-primary mr-3'>
                    Submit
                </button>
                <button
                    type='button'
                    className='btn btn-light'
                    onClick={() => history.push("/my-galleries")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default CreateNewGallery;