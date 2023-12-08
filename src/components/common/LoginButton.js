import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
  margin-right: 80px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #505f98;
  border: 1px solid black;
  border-radius: 4px;
  padding: 9px 8px 9px 0;
  background-color: #ebecf2;
  cursor: pointer;
`;
const Span = styled.span`
  padding: 0px 10px;
`;

function LoginButton() {
  return (
    <Container>
      <StyledLink to="/Regularlogin">
        <Span>&#129120;</Span>Back to Login
      </StyledLink>
    </Container>
  );
}

export default LoginButton;
