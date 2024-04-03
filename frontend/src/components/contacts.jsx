import axios from "axios";
import  { useEffect, useState } from "react";
import styled from "styled-components";
import { getuser } from "../utils/ApiRoutes";
import Logo from "../assets/logo.svg";
import { PropTypes } from "prop-types";

const Contacts = ({ contacts, currentuser,changechat }) => {
  const [currentusername, setusername] = useState(undefined);
  const [currentuserImage, setuserImage] = useState(undefined);
  const [currentselecteduser, setselectuser] = useState(undefined);
  const getUser = async () => {
    console.log(currentuser);
    const { data } = await axios.get(`${getuser}/${currentuser}`);
    if (data.status) {
      setuserImage(data.user[0].avatarImage);
      setselectuser(data.user[0].username);
      setusername(currentuser)

    }
  };

  useEffect(() => {
    getUser();
  }, [currentusername]);

  const chanegCurrentChat = (index, contact) => {
    setselectuser(index);
    changechat(contact)
  };

  return (
    <Container>
      <div className="brand">
        <img src={Logo} alt="logo" />
        <h3>ChittChat</h3>
      </div>
      <div className="contacts">
        {contacts.map((contact, index) => {
          return (
            <div
              className={`contact ${
                index == currentselecteduser ? "Selected" : ""
              }`}
              key={index}
              onClick={()=>{chanegCurrentChat(index,contact)}}
            >
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64, ${contact.avatarImage}`}
                  alt="avatar"
                ></img>
              </div>
              <div className="username"><h3>{contact.username}</h3></div>
            </div>
          );
        })}
      </div>
      <div className="current-user">
        <div className="avatar">
          <img
            src={`data:image/svg+xml;base64, ${currentuserImage}`}
            alt="avatar"
          ></img>
        </div>
        <div className="username"><h2>{currentuser}</h2></div>
      </div>
    </Container>
  );
};

Contacts.propTypes = {
  contacts : PropTypes.any,
  currentuser : PropTypes.any,
  changechat : PropTypes.any,
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
 
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar{
      width: 0.4rem;
      &-thumb{
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 0.1rem;

      }
    }
    .contact{
        background-color: #ffffff39;
        min-height: 5rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        gap:1rem;
        align-items: center;
        display: flex;
        transition: 0.5s ease-in-out;
        .avatar{
            img{
                height: 3rem;

            }
        }
        .username{
            h3{
            color: white
            }
        }
    }
    .Selected{
        background-color: #9186f3
    }
  }

  .current-user{
    background-color: #ffffff39;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar{
        img{
            height: 4rem;
            max-inline-size: 100%;
        }
    }
    .username{
        h2{
            color: white;
        }
    }

    @media screen and (min-width:720px) and (max-width:1080px) {
        gap: 0.5rem;
        .username{
            h2{
                font-size: 1rem; 
            }
        }   
    }
  }


`;
export default Contacts;
