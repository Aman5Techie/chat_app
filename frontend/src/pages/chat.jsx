// import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getcontacts } from "../utils/ApiRoutes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/contacts";

function Chat() {
  const [contacts, setcontacts] = useState([]);
  const [user, setUser] = useState(undefined);
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

  return (
      <Container>
    {
        user !== undefined &&
        <div className="container">
        <Contacts contacts={contacts} currentuser={user}></Contacts>
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
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (min-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
