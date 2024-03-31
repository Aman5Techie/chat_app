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
  const toastOption = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const setProfilePicture = async () => {
    if (selectedavatar == undefined) {
      toast.error("Please Select An avatar", toastOption);
      return;
    }

    const userid = localStorage.getItem("chat-app-user");

    const { data } = await axios.post(`${setAvatar}/${userid}`, {
      image: avatars[selectedavatar],
    });
    if (!data.isSet) {
      toast.error("Not Set Successfully try again Later", toastOption);
      return;
    }
    navigate("/");
    // if(data)
  };

  async function setdata() {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(`${api}/${Math.random() * 1000}`);
      const buffer = new Buffer(image.data);

      data.push(buffer.toString("base64"));
    }
    setavatar(data);
    setisloading(false);
  }

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
    setdata();
  });

  return (
    <>
      {isloading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
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
          <button className="submit-btn" onClick={setProfilePicture}>
            Set As Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

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
  .submit-btn {
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
`;
export default SetAvatar;
