import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUserAlt, FaImages, FaPlusCircle } from 'react-icons/fa'
import { GrGallery } from 'react-icons/gr';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../store/auth/selectors'
import { logout } from '../store/auth/slice'
import Routes from '../Routes'


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
                           <FaImages /> All Galleries
                        </Link>
                    </li>
                    {!isAuthenticated && (
                        <li className='nav-item'>
                            <Link className='nav-link text-dark' to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                    )}
                    {!isAuthenticated && (
                        <li className='nav-item'>
                            <Link className='nav-link text-dark' to='/register'>
                              <FaUserAlt/>  Register
                            </Link>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li className='nav-item'>
                            <Link className='nav-link text-dark' to='/my-galleries'>
                            <FaImages />  My Galleries
                            </Link>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li className='nav-item'>
                            <Link className='nav-link text-dark' to='/create'>
                               <FaPlusCircle/> Create new Gallery
                            </Link>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li className='nav-item'>
                            <button className='btn' onClick={() => dispatch(logout())}>
                               <FaSignOutAlt/> Logout
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
            <Routes />
        </>
    )
}

export default Navbar