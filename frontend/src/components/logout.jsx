import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handle_logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Container>
      <BiPowerOff onClick={handle_logout} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

export default Logout;
