import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';
import TicketEaseLogo from '../../assets/TicketEaseLogo.svg';
import ErrorIcon from './ErrorIcon.svg';
import image from './Login.png';
import eyeIcon from './eyeIcon.svg';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-left: 230px;
  margin-top: 10px;
`;

const LogoContainer = styled.span`
  margin-top: 20%;
  @media screen and (max-width: 1024px) {
    max-width: 80%;
  }
`;

const Logo = styled.img`
  width: 170px;
  height: 70px;
  margin-left: -15px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginToYourAccount = styled.h3`
  font-family: Mulish;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  width: 253px;
  height: 30px;
  margin-top: 0px;
  margin-bottom: 50px;
`;

const StyledLabel = styled.label`
  text-align: left;
  padding: 0.25rem 0;
  color: #505f98;
`;

const StyledInputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  border: none;
  padding: 20px;
  border-radius: 4px;
  color: #505f98;
  display: block;
  margin-bottom: 3px;
  width: 75%;
  height: 45px;
`;

const ShowPassword = styled.div`
  position: absolute;
  bottom: 0px;
  right: 170px;
  padding: 10px;
  min-width: 40px;
`;

const PasswordWarning = styled.h6`
  display: inline-block;
  position: relative;
  bottom: 7px;
  margin-top: 0px;
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #505f98;
`;

const StyledButton = styled.button`
  border: none;
  background-color: #505f98;
  padding: 20px;
  border-radius: 4px;
  cursor: pointer;
  color: #f6f6f6;
  height: 45px;
  width: 75%;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://localhost:7075/api/Authentication/login',
        {
          email: email,
          password: password,
        }
      );
      console.log(response);

      if (response.data.statusCode === 200) {
        const token = response.data.data;
        console.log(token);
        localStorage.setItem('authToken', token);
        navigate('/ManagerDashBoard');

        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          showConfirmButton: false,
          timer: 1500,
          position: 'top-end',
        });
      } else {
        console.error('Error:', response.data);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error: ${response.data.message}`,
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.status);
        console.error('Error Message:', error.response.data.message);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred: ' + error.message,
          confirmButtonText: 'OK',
        });
      } else if (error.request) {
        console.error('No Response from Server');

        Swal.fire({
          icon: 'error',
          title: 'No Response from Server',
          text: 'No response from the server. Please try again.',
          confirmButtonText: 'OK',
        });
      } else {
        console.error('Unexpected Error:', error.message);

        Swal.fire({
          icon: 'error',
          title: 'Error during login.',
          text: 'An unexpected error occurred during login.',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  return (
    <Container>
      <FormContainer>
        <LogoContainer>
          <Link to="/Footer-header">
            <Logo src={TicketEaseLogo} alt="TicketEaseLogo" />
          </Link>
        </LogoContainer>

        <LoginToYourAccount>Login to your account</LoginToYourAccount>
        <form onSubmit={handleSubmit}>
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <StyledInput
            type="email"
            placeholder="TicketEase@gmail.com"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledLabel htmlFor="password">Password</StyledLabel>
          <StyledInputContainer>
            <StyledInput
              type={showPassword ? 'text' : 'password'}
              placeholder="*********"
              id="epasswordmail"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ShowPassword onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VscEye /> : <VscEyeClosed />}
            </ShowPassword>
          </StyledInputContainer>

          <img src={ErrorIcon} alt="" style={{ marginTop: '0px' }} />
          <PasswordWarning>
            Please input the password that was sent to you
          </PasswordWarning>
          <StyledButton type="submit">Login</StyledButton>
          {loginError && <p>{loginError}</p>}
        </form>
      </FormContainer>
      <div className="FirstLoginImagery frame">
        <img
          src={image}
          alt=""
          className="Firstimage"
          style={{ width: '85%', height: '85%' }}
        />
      </div>
    </Container>
  );
};

export default Login;
