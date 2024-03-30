import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/ApiRoutes";
function Login() {
  const navigate = useNavigate();
  const [value, setvalue] = useState({
    username: "",
    password: "",
  });

  const [isture, settrue] = useState(false);

  const toastOption = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handelChange = (event) => {
    setvalue({ ...value, [event.target.name]: event.target.value });
  };
  useEffect(() => {
   if(localStorage.getItem("chat-app-user")){
    navigate("/")
   }
  });



  async function handelsubmit(event) {
      event.preventDefault();
    const {username,password} = value;
    const {data} = await axios.post(loginRoute,{username,password});
    console.log(data);
    if(!data.status){
        toast.error(data.msg,toastOption)
        return;
    }else{
        localStorage.setItem("chat-app-user",username);
        navigate("/")
    }
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
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              handelChange(e);
              if(e.target.value !== ""){
                settrue(true);
              }else{
                settrue(false);
              }
            }}
          ></input>
         
            {isture?(<button type="submit">submit</button>):""}
          <span>
            Donot Have an Account ? <Link to="/register">Register</Link>
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


export default Login;