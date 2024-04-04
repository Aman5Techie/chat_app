import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Logout from "./logout";
import { PropTypes } from "prop-types";
import ChatInput from "./chat_input";
import Messages from "./messages";
const ChatContainer = ({ currentuser }) => {
  const [isloading, setloading] = useState(true);
  const [user, setuser] = useState({});
  const handlesendmessage = async (msg)=>{
    console.log(msg);
  }
  async function getUser() {
    const { data } = await axios.get(
      `http://localhost:3000/api/auth/user/${currentuser}`
    );
    if (data.status) {
      setuser(data.user[0]);
      setloading(false);
    } else {
      console.log("error/chat_con");
    }
  }
  useEffect(() => {
    getUser();
  });

  return (
    <>
      {isloading == true ? (
        <h1>Loading</h1>
      ) : (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64, ${user.avatarImage}`}
                  alt="avatar"
                ></img>
              </div>
              <div className="username">
                <h3>{user.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-message"></div>
          <Messages/>
          <ChatInput handlesendmessage = {handlesendmessage}/>
        </Container>
      )}
    </>
  );
};
ChatContainer.propTypes = {
  currentuser: PropTypes.string,
};

const Container = styled.div`
  padding-top: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
`;

export default ChatContainer;
