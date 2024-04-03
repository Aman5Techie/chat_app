// import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getcontacts } from "../utils/ApiRoutes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/chat_container";

function Chat() {
  const [contacts, setcontacts] = useState([]);
  const [user, setUser] = useState(undefined);
  const [currentselected , setcurrentselected] = useState(undefined);
  const navigate = useNavigate();

  async function getusers() {
    console.log(user);
    const { data } = await axios.get(
      `${getcontacts}/${localStorage.getItem("chat-app-user")}`
    );

    if (!data.status) {
      toast.error("Error occured");
      return;
    }
    setcontacts(data.users);
  }

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setUser(localStorage.getItem("chat-app-user"));
    }
  }, []);

  useEffect(() => {
    getusers();
  }, [user]);

  const handlecurrentchat = (chat)=>{
    setcurrentselected(chat)
  }

  return (
      <Container>
    {
        user !== undefined &&
        <div className="container">
        <Contacts contacts={contacts} currentuser={user} changechat = {handlecurrentchat}></Contacts>
        {
          currentselected==undefined?( <Welcome currentuser={user} />):(<ChatContainer  currentuser={user} />)
        }
       
      </div>
    }
    </Container>
  );
}

const Container = styled.div`
  heigth: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  height : 40rem;
  .container {
    height: 85vh;
    width: 76vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (min-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
