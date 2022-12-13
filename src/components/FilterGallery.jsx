import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { reset, setSearch } from "../store/gallery/slice";


const GalleriesFilter = () => {
    const [filter, setFilter] = useState("");
    const dispatch = useDispatch();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(setSearch(filter));
    };
    const onResetHandler = () => {
        dispatch(reset());
        setFilter("");
    };
    return (
        <div className='containter-fluit m-3'>
            <form onSubmit={onSubmitHandler}>
                <div className='form-group d-inline-block'>
                    <input
                        type='text'
                        name='filter'
                        value={filter}
                        className='form-control'
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
                <button type='submit' className='btn btn-info mb-1 ml-1'>
                    Filter
                </button>
                <button className='btn' type='button' onClick={onResetHandler}>
                    Reset
                </button>
            </form>
        </div>
    );
}

export default GalleriesFilter;