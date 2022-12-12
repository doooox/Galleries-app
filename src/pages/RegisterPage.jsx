import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../store/auth/slice'
import { FaUserAlt } from 'react-icons/fa'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms_and_conditions: false
  })
  const dispatch = useDispatch();


  const onChangeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()
    const userData = {
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
      terms_and_conditions
    }
    dispatch(register(formData))
  }
  const { first_name, last_name, email, password, password_confirmation, terms_and_conditions } = formData;

  return (
    <div className='container d.flex my-5'>
      <h1> <FaUserAlt className='m-2' />Register Page</h1>
      <div className=' m-3 text-center'>
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <input
              className='form-control'
              type="text"
              name="first_name"
              id="first_name"
              placeholder='Please enter your name'
              value={first_name}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <input
              className='form-control'
              type="text"
              name="last_name"
              id="last_name"
              placeholder='Please enter your last name'
              value={last_name}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <input
              className='form-control'
              type="email"
              name="email"
              id="email"
              placeholder='Please enter your email'
              value={email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <input
              className='form-control'
              type="password"
              name="password"
              id="password"
              placeholder='Please enter your password'
              value={password}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <input
              className='form-control'
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              placeholder='Please confirm your password'
              value={password_confirmation}
              onChange={onChangeHandler}
            />
          </div>
          <div className='form-group form-check'>
            <input
              type='checkbox'
              required
              className='form-check-input'
              name='terms_and_conditions'
              checked={terms_and_conditions}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  terms_and_conditions: e.target.checked,
                })
              }
              id='terms_and_conditions'
            />
            <label htmlFor='terms_and_conditions' className='form-check-label'>
              I accept the terms and conditions
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className='btn btn-primary'>Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage