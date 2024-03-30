import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatar } from "../utils/ApiRoutes";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setavatar] = useState([]);
  const [selectedavatar, setselectedavatar] = useState(undefined);
  const [isloading, setisloading] = useState(true);

  async function setdata() {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(`${api}/${Math.random() * 1000}`);
      const buffer = new Buffer(image.data);
      // console.log(buffer);
      data.push(buffer.toString("base64"));
    }
    setavatar(data);
    setisloading(false);
  }

  useEffect(() => {
    setdata();
  }, []);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an avatar as an Your profile Picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`avatar ${
                  selectedavatar === index ? "selected" : ""
                }`}
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
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
display : flex;
justify-content : center;
align-items: center;
flex-direction : column;
gap : 3rem;
background-color: #131324;
height : 100vh;
width : 100vw;
.loader{
    max-inline-size: 100%;

}
.title-container{
    h1{
        color: white
    }
}
.avatars{
    display: flex;
    gap: 2rem;
    .avatar{
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        border: 0.4rem solid transparent;
        img{
            height: 6rem
        }
    }
    .selected {
        border: 0.4rem solid #4e0eff
    }
}

`;
export default SetAvatar;
