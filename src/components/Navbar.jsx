import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../store/auth/selectors'
import { setIsAuthenticated } from '../store/auth/slice'


const Navbar = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const dispatch = useDispatch();
    return (
        <>
            <nav className='navbar navbar-expand bg-light'>
                <ul className='navbar-nav'>
                    <span className='navbar-brand'>Galleries App</span>
                    <li className='nav-item'>
                        <Link className='nav-link text-dark' to='/'>
                            All Galleries
                        </Link>
                    </li>
                    {!isAuthenticated && (
                        <li className='nav-item'>
                            <Link className='nav-link text-dark' to='/login'>
                                Login
                            </Link>
                        </li>
                    )}
                    {!isAuthenticated && (
                        <li className='nav-item'>
                            <Link className='nav-link text-dark' to='/register'>
                                Register
                            </Link>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li className='nav-item'>
                            <Link className='nav-link text-dark' to='/my-galleries'>
                                My Galleries
                            </Link>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li className='nav-item'>
                            <Link className='nav-link text-dark' to='/create'>
                                Create new Gallery
                            </Link>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li className='nav-item'>
                            <Link className='nav-link text-dark' to='/logout'>
                                Logout
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    )
}

export default Navbar