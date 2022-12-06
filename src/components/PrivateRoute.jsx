import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { selectIsAuthenticated } from '../store/auth/selectors'

const PrivateRoute = () => {
  return (
    <div>
        <Route {...props}>
            {isAuthenticated ? children : <Redirect to='/login' />}
        </Route>
    </div>
  )
}

export default PrivateRoute