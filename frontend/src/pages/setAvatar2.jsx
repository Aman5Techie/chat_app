import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getAvatar, setAvatar } from "../utils/ApiRoutes";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";

const SetAvatar2 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an avatar as an Your profile Picture</h1>
        </div>
        <Avatars_com />
      </Container>
      <ToastContainer />
    </>
  );
};

function Avatars_com() {
  const [selectedavatar, setselectedavatar] = useState(undefined);
  const [isloading, setisloading] = useState(true);
  const [change, setchange] = useState(true);
  const [avatars, setavatar] = useState([]);
  async function setdata() {
    const images = await axios.get(getAvatar)
    if(images.data.status){
        console.log((images));
        setavatar(images.data.data);
        setisloading(false);
    }else{
        console.log(images.data);
    }
    
  }

  useEffect(() => {
    setdata();
  }, [change]);

  return (
    <>
      <div className="avatars">
        {avatars.map((avatar, index) => {
          return (
            <div
              key={index}
              className={`avatar ${selectedavatar === index ? "selected" : ""}`}
            >
              <img
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                onClick={() => {
                  setselectedavatar(index);
                }}
              ></img>
            </div>
          );
        })}
      </div>
      <button onClick={()=>setchange(!change)}>Re-Render</button>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      border: 0.4rem solid transparent;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
`;
export default SetAvatar2;
