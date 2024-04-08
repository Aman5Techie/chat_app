import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Logout from "./logout";
import { PropTypes } from "prop-types";
import ChatInput from "./chat_input";
// import Messages from "./messages";
import { addmessages, getmessages } from "../utils/ApiRoutes";

const ChatContainer = ({ currentuser, anotheruser }) => {
  const [currentchat, setcurrentchat] = useState([]);
  const [isloading, setloading] = useState(true);
  const [user, setuser] = useState({});

  useEffect(() => {
    async function getmsg() {
      const { data } = await axios.post(getmessages, {
        from: user._id,
        to: anotheruser._id,
      });
      setcurrentchat(data.projectmessages);
    }
    if (!isloading) {
      getmsg();
    }
  }, [currentchat, isloading]);

  async function handlesendmessage(msg) {
    if (!isloading) {
      const { data } = await axios.post(addmessages, {
        from: user._id,
        to: anotheruser._id,
        message: msg,
      });
    }
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
          <div className="chat-messages">
            {currentchat.map((msg, index) => {
              return (
                <div key={index}>
                  <div
                    className={`message ${
                      msg.fromSelf == true ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{msg.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handlesendmessage={handlesendmessage} />
        </Container>
      )}
    </>
  );
};
ChatContainer.propTypes = {
  currentuser: PropTypes.string,
  anotheruser: PropTypes.object,
};

const Container = styled.div`
  padding-top: 1rem;
  display:grid;
  grid-template-rows: 10% 78% 12%;
  @media screen and (min-width: 720px) and (min-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  
  .chat-header {
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    gap:0.1rem;
    overflow: hidden;
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
  .chat-messages {
    &::-webkit-scrollbar{
      width: 0.4rem;
      &-thumb{
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 0.1rem;

      }
    }
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }

    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatContainer;
