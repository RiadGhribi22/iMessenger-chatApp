import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/action/authAction";
import { toast } from "react-toastify";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../store/types/authType";

const Register = () => {
  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [laodImg, setLoadImg] = useState("");

  const inputHendle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLoadImg(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const registerHandle = (e) => {
    const { userName, email, password, confirmPassword, image } = state;
    e.preventDefault();
    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);

    dispatch(userRegister(formData));
  };

  useEffect(() => {
    console.log(`hello success ${successMessage}`)


    if(authenticate){
      navigate('/')
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch({type : SUCCESS_MESSAGE_CLEAR})
    }
    if (error) {
      error.map(err => toast.error(err))
      dispatch({type : ERROR_CLEAR})

    }
  }, [successMessage, error]);

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
        </div>
        <div className="card-body">
          <form onSubmit={registerHandle}>
            <div className="form-group">
              <label htmlFor="userName" className="username">
                User name
              </label>
              <input
                type="text"
                onChange={inputHendle}
                name="userName"
                value={state.userName}
                className="form-control"
                placeholder="user name"
                id="userName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="username">
                email
              </label>
              <input
                type="email"
                onChange={inputHendle}
                name="email"
                value={state.email}
                className="form-control"
                placeholder="email"
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="username">
                password
              </label>
              <input
                type="password"
                onChange={inputHendle}
                name="password"
                value={state.password}
                className="form-control"
                placeholder="password"
                id="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="username">
                confirm password
              </label>
              <input
                type="password"
                onChange={inputHendle}
                name="confirmPassword"
                value={state.confirmPassword}
                className="form-control"
                placeholder="confirm password"
                id="confirmPassword"
              />
            </div>

            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {laodImg ? <img src={laodImg} /> : ""}
                </div>
                <div className="file">
                  <label htmlFor="image">Select Image</label>
                  <input
                    type="file"
                    onChange={fileHandle}
                    name="image"
                    className="form-control"
                    id="image"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input type="submit" value="register" className="btn" />
            </div>

            <div className="form-group">
              <span>
                <Link to="/messenger/login">login to your account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
