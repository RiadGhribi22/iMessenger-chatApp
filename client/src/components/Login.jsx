import React, { useState, useEffect } from 'react';
import { userLogin } from '../store/action/authAction';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/types/authType';


const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch();
  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );
  
  const navigate = useNavigate()

  const handleChanegs = (e) => {

    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  const login = async (e) => {
    e.preventDefault();
    dispatch(userLogin(state))


  }
  useEffect(() => {


    if (authenticate) {
      navigate('/')
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: SUCCESS_MESSAGE_CLEAR })
    }
    if (error) {
      console.log(error)
      error.map(err => toast.error(err))
      dispatch({ type: ERROR_CLEAR })

    }
  }, [successMessage, error]);

  return (
    <div className='login'>
      <div className="card">
        <div className="card-header">
          <h3>
            Login
          </h3>
        </div>
        <div className="card-body">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor='email' className="username">email</label>
              <input type="email" className='form-control' onChange={handleChanegs} name='email' value={state.email} placeholder='email' id="email" />
            </div>
            <div className="form-group">
              <label htmlFor='password' className="username">password</label>
              <input type="password" className='form-control' onChange={handleChanegs} name='password' value={state.password} placeholder='password' id="password" />
            </div>
            <div className="form-group">
              <input type="submit" value="Login" className="btn" />
            </div>

            <div className="form-group">
              <span><Link to="/messenger/register">Create account if you don't have </Link></span>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login