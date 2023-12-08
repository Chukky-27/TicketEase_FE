import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const LogoutPopout = ({ onLogout }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleYesClick = async () => {
    setIsVisible(false);
    try {
      const response = await axios.post(
        'https://localhost:7075/api/Authentication/logout'
      );
      if (response.status === 200) {
        navigate('/Footer-header');
        //  toast.success('Logout successful');
        //alert('Logout Successful');
        localStorage.removeItem('userId');
        localStorage.removeItem('boardid');
        localStorage.removeItem('userRole');
        localStorage.removeItem('projectid');
        localStorage.removeItem('Id');
        localStorage.removeItem('authToken');
        Swal.fire({
          icon: 'success',
          title: 'Logout Successful',
          showConfirmButton: false,
          timer: 1500, // Automatically close after 1.5 seconds
          position: 'top-end',
        });
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleNoClick = () => {
    setIsVisible(false);
    // navigate('/logout');
  };

  return (
    <>
      <Moodal>
        <Logout className={`popout ${isVisible ? 'visible' : 'hidden'}`}>
          <Head>Logout Confirmation</Head>
          <hr />
          <p style={{ marginLeft: '30px' }}>
            Are you sure you want to logout from your account?
          </p>
          <Btnwrap>
            <Btn
              onClick={handleNoClick}
              isActive={false} // You can style the "No" button differently if needed
            >
              No
            </Btn>
            <Btn
              onClick={handleYesClick}
              isActive={true} // You can style the "Yes" button differently if needed
            >
              Yes
            </Btn>
          </Btnwrap>
        </Logout>
      </Moodal>
      {/* <ToastContainer/> */}
      {/* <ToastContainer/> */}
    </>
  );
};

const Moodal = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #f6f6f6;
  align-items: center;
  jsutify-content: center;
  padding-top: 50px;
  position: absolute;
`;

const Logout = styled.div`
  width: 590px;
  height: 200px;
  background: white;
  color: black;
  margin: auto;
  position: relative;
  margin-top: 190px;
`;

const Btn = styled.button`
  background: ${({ isActive }) => (isActive ? '#505f98' : '#fcfcfc')};
  height: 30px;
  width: 60px;
  padding: auto;
  border: none;
  font-size: 16px;
  border-radius: 4px;
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
`;

const Btnwrap = styled.div`
  //gap: 3px;
  margin-left: 356px;
  margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
`;

const Head = styled.h3`
  font-family: Mulish;
  font-size: 16px;
  font-weight: 700;
  margin-left: 30px;
  padding-top: 20px;
`;

export default LogoutPopout;
