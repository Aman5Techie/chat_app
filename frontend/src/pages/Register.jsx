import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/ApiRoutes";
function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("chat-app-user")){
     navigate("/")
    }
   });
  const [value, setvalue] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [isture, settrue] = useState(false);

  const toastOption = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setbutton = (event) => {
    if (
      value.password === event.target.value ||
      value.confirmpassword === event.target.value
    ) {
      settrue(true);
    } else {
      settrue(false);
    }
  };
  const handelChange = (event) => {
    setvalue({ ...value, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, email, password, confirmpassword } = value;
    if (password != confirmpassword) {
      toast.error(
        "Password donot match with the Confirm Password",
        toastOption
      );
      return false;
    } else if (username.length < 3) {
      toast.error("Username length should greater than 3", toastOption);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should greater than 8", toastOption);
      return false;
    } else if (email === "") {
      toast.error("Email is Required", toastOption);
      return false;
    }

    return true;
  };

  async function handelsubmit(event) {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password, confirmpassword } = value;
      const {data}  = await axios.post(registerRoute, {
        username,
        email,
        password,
        confirmpassword,
      });
      if(!data.status){
        toast.error(data.msg,toastOption)
        return;
      }
      localStorage.setItem("chat-app-user" ,JSON.stringify(data.user_created.username))
      toast.success("Created Successfulyy",toastOption)
      navigate('/')

    }
    // event.preventDefault();
  }
  return (
    <>
      <FormContainer>
        <form
          onSubmit={(event) => {
            handelsubmit(event);
          }}
        >
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>ChitChat</h1>
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => {
              handelChange(e);
            }}
          ></input>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              handelChange(e);
            }}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              handelChange(e);
              setbutton(e);
            }}
          ></input>
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confrim Password"
            onChange={(e) => {
              handelChange(e);
              setbutton(e);
            }}
          ></input>
          {isture ? <button type="submit">submit</button> : ""}
          <span>
            Already Have an Account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  weidth: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rm;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: aliceblue;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #977af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem;
      border: none;
      font-weight: bold;
      cursor: pointer;

      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register;
