import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AxiosInstance from '../../Request/AxiosInstance';
import managerView from './managerView.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  padding-bottom: 30px
  align-items: flex-start;
  border: 2px solid #505F98;
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  position: relative;
  margin-top: 99px;
  margin-right: 30em;
 
 
  /* Adding a blue strip at the top */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 100%;
    background-color: #505F98;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;
const EmptyProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  // background-color: lightgray;
  margin-bottom: 20px;
  object-fit: cover;
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
  padding-bottom: 40px;
  text-align: left;
`;

function App() {
  const [user, setUser] = useState(null);

  const fetchManagerDetails = async () => {
    try {
      const res = await AxiosInstance.get(
        `/managers/GetbyId?id=${localStorage.getItem('userId')}`
      );
      console.log(res.data);
      setUser(res.data.data);
    } catch (error) {
      console.error('Error fetching manager details:', error); // Log the entire error object
      setUser({
        companyName: 'nill',
        businessPhone: 'nill',
        businessEmail: 'nill',
        companyAddress: 'nill',
        companyDescription: 'nill',
        state: 'nill',
        imgUrl: null, // Or provide a default image URL here if needed
      });
    }
  };

  useEffect(() => {
    fetchManagerDetails();
  }, []);

  return (
    <Container>
      {user && (
        <>
          {user.imgUrl ? (
            <ProfileImage src={user.imgUrl} alt="Profile" />
          ) : (
            <EmptyProfileImage src={managerView} alt="profile" />
          )}

          <InfoItem>
            <strong>Company Name:</strong>{' '}
            {user.companyName ? user.companyName : 'nill'}
          </InfoItem>
          <InfoItem>
            {' '}
            <strong>Business Number:</strong>{' '}
            {user.businessPhone ? user.businessPhone : 'nill'}
          </InfoItem>
          <InfoItem>
            <strong>Business Email:</strong>{' '}
            {user.businessEmail ? user.businessEmail : 'nill'}
          </InfoItem>
          <InfoItem>
            <strong>Company Address:</strong>{' '}
            {user.companyAddress ? user.companyAddress : 'nill'}
          </InfoItem>
          <InfoItem>
            <strong>Company Description:</strong>{' '}
            {user.companyDescription ? user.companyDescription : 'nill'}
          </InfoItem>
          <InfoItem>
            <strong>State:</strong> {user.state ? user.state : 'nill'}
          </InfoItem>
        </>
      )}
    </Container>
  );
}

export default App;
