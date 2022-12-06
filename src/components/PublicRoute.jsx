import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { selectIsAuthenticated } from '../store/auth/selectors'

const PublicRoute = ({children, ...props}) => {
  return (
    <div>
        <Route {...props}>
            {isAuthenticated ? <Redirect to="/" /> : children}
        </Route>
    </div>
  )
}

export default PublicRoute