import styled from "styled-components";
import Robot from "../assets/robot.gif";
import { PropTypes } from "prop-types";
const Welcome = ({ currentuser }) => {
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentuser}!</span>
      </h1>
      <h3>Please select a chat to Message</h3>
    </Container>
  );
};

Welcome.propTypes = {
    currentuser : PropTypes.string
}
const Container = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;
export default Welcome;
