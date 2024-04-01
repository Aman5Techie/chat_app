// import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import styled from "styled-components";
import { getcontacts } from "../utils/ApiRoutes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Chat() {
    const [contacts , setcontacts] = useState([]);
    const [user,setUser] = useState(undefined);
    const navigate = useNavigate();
    useState(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login");
        }else{
            setUser(localStorage.getItem("chat-app-user"))
        }
    })
    async function getusers(){
        const {data} = await axios.get(`${getcontacts}/${localStorage.getItem("chat-app-user")}`)
        
        if(!data.status){
            toast.error("Error occured")
            return;
        }
        // setcontacts(data.users);
        console.log(data);
    
    }


    useEffect(()=>{
        getusers();
    },[user])
    
  return (
   

      <Container>
        <div className="container">
        <h1>asjdhksjad</h1>
        </div>
      </Container>

  );
}

const Container = styled.div`
  heigth: 100vh;
  weidth: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    margin-top: 35px;
    margin-bottom: 71px;
    height: 89vh;
    width: 86vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (min-width:1080px){
        grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
