import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useState } from "react";
import { PropTypes } from "prop-types";

const ChatInput = ({handlesendmessage}) => {
  const [showemojipicker, setemojipicker] = useState(false);
  const [msg, setmsg] = useState("");

  const handleEmojiPickerhandler = () => {
    setemojipicker(!showemojipicker);
  };

  const handleEmojiclicker = (emoji) => {
    let message = msg;
    message += emoji.emoji;
    setmsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handlesendmessage(msg);
      setmsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhandler} />
          {showemojipicker && (
            <Picker
              style={{ position: " absolute", top: "-451px", width: "372px" }}
              pickerStyle={{}}
              onEmojiClick={(emoji) => {
                handleEmojiclicker(emoji);
              }}
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e)=>{sendChat(e);}}>
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setmsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

ChatInput.propTypes = {
  handlesendmessage : PropTypes.func
}

const Container = styled.div`
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  display: flex;
  gap: 3rem;
  padding-bottom: 0.3rem;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
    }
  }
  emoji-picker-react {
    position: absolute;
    top: -350px;
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;
