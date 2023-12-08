import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../../Request/AxiosInstance';

const MergedComponent = ({ handleCreateOrganization }) => {
  return (
    <StyledDiv1>
      <StyledDiv2 style={{ marginLeft: '7.5em' }}>Organizations</StyledDiv2>
      <img
        alt=""
        src="create_organisation.svg"
        style={{ cursor: 'pointer', marginRight: '-2em' }}
        onClick={handleCreateOrganization}
      />
    </StyledDiv1>
  );
};

const CardContainer = ({ organizationName }) => {
  const navigate = useNavigate();
  const [memberPhotos, setMemberPhotos] = useState([]);
  const [totalMembersCount, setTotalMembersCount] = useState(0);

  // Function to fetch member photos
  const fetchMemberPhotos = async () => {
    try {
      const response = await AxiosInstance.get(
        `/User/get-Users-By-ManagerId?managerId=${localStorage.getItem(
          'userId'
        )}`
      );
      console.log(response.data); // Log the response to inspect its structure

      // Assuming the images are nested under a property like 'data' or 'members'
      const membersData = response.data?.data || response.data?.members || [];

      // Ensure that membersData is an array before extracting images
      if (Array.isArray(membersData)) {
        // Extract images and filter out null or undefined values
        const photos = membersData
          .map((member) => member.imageUrl)
          .filter(Boolean);

        // Take only the first 4 images
        const firstFourPhotos = photos.slice(0, 4);

        setMemberPhotos(firstFourPhotos);
        setTotalMembersCount(photos.length);

        // Log the actual images
        console.log('Fetched Images:', firstFourPhotos);
      } else {
        console.error('Invalid data structure:', membersData);
      }
    } catch (error) {
      console.error('Error fetching member photos:', error.message);
    }
  };

  useEffect(() => {
    fetchMemberPhotos();
  }, []); // Fetch member photos on component mount

  return (
    <StyledCardContainer>
      <StyledDiv5 style={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <StyledDiv6 style={{ width: '295px', padding: '10px' }}>
            {organizationName}
          </StyledDiv6>
          <StyledClickableContainer
            onClick={() => console.log('StyledImg2 clicked')}
          >
            <StyledImg2
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/68ffaddb-8e9d-4a42-94fa-324ab898210e?"
            />
          </StyledClickableContainer>
        </div>
      </StyledDiv5>
      <StyledDiv7 />
      <StyledDiv8>
        <StyledDiv9>TOTAL MEMBERS</StyledDiv9>
        <StyledDiv10>
          <StyledDiv11>
            <StyledMemberPhotosContainer>
              {memberPhotos.slice(0, 4).map((photo, index) => (
                <StyledMemberPhoto key={index} loading="lazy" src={photo} />
              ))}
            </StyledMemberPhotosContainer>
            <StyledDiv12>STATUS</StyledDiv12>
            <StyledDiv13>Active</StyledDiv13>
            <StyledDiv14>
              {memberPhotos.length > 2 && (
                <StyledViewAllMembersButton
                // onClick={() => console.log('View all Members clicked')}
                >
                  View all Members
                </StyledViewAllMembersButton>
              )}
              {/* <StyledChevronLeft onClick={() => console.log('Chevron Left clicked')} /> */}
            </StyledDiv14>
          </StyledDiv11>
          <StyledDiv15>
            <StyledDiv16>{totalMembersCount}</StyledDiv16>
          </StyledDiv15>
        </StyledDiv10>
      </StyledDiv8>
    </StyledCardContainer>
  );
};

const StyledDiv1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 10em;
  gap: 20px;
  padding-right: 80px;
  margin-top: 6em;
  margin-bottom: -2em;

  @media (max-width: 991px) {
    flex-wrap: wrap;
    padding-right: 20px;
  }
`;

const StyledDiv2 = styled.div`
  color: #1d2126;
  flex-grow: 1;
  white-space: nowrap;
  font: 700 24px Mulish, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const StyledCardContainer = styled.div`
  width: 320px;
  height: 300px;
  border: 1px solid white;
  border-radius: 4px;
  background: #fff;
  margin-top: 30px;
  // margin-left: -2em !important;
  gap: 0px;
`;

const StyledDiv5 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 20px;
`;

const StyledDiv6 = styled.div`
  color: #1d2126;
  flex-grow: 1;
  white-space: nowrap;
  font: 600 20px Mulish, sans-serif;
`;

const StyledClickableContainer = styled.div`
  cursor: pointer;
  margin-top: 1.2em;
  float: right;
`;

const StyledImg2 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  overflow: hidden;
  align-self: stretch;
  max-width: 100%;
`;

const StyledDiv7 = styled.div`
  background-color: #e5e5e5;
  align-self: stretch;
  margin-top: 12px;
  height: 1px;
`;

const StyledDiv8 = styled.div`
  align-self: stretch;
  display: flex;
  margin-top: 19px;
  flex-direction: column;
  padding: 0 20px;
`;

const StyledDiv9 = styled.div`
  color: #c4c4c4;
  white-space: nowrap;
  font: 400 12px Mulish, sans-serif;
`;

const StyledMemberPhotosContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-top: 10px;
`;

const StyledMemberPhoto = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  width: 40px;
  border-radius: 50%;
  margin-right: -10px; /* Adjust as needed for spacing */
`;

const StyledDiv12 = styled.div`
  color: #c4c4c4;
  align-self: stretch;
  margin-top: 23px;
  white-space: nowrap;
  font: 400 12px Mulish, sans-serif;
`;

const StyledDiv13 = styled.div`
  color: #505f98;
  white-space: nowrap;
  justify-content: center;
  align-items: start;
  background-color: rgba(80, 95, 152, 0.05);
  align-self: stretch;
  margin-top: 7px;
  padding: 10px;
  font: 700 16px Mulish, sans-serif;
`;

const StyledDiv14 = styled.div`
  color: #21334f;
  align-self: stretch;
  margin-top: 34px;
  white-space: nowrap;
  font: 700 14px Mulish, sans-serif;
  width: 250px;
`;

const StyledDiv15 = styled.div`
  display: flex;
  flex-basis: 0%;
  flex-direction: column;
`;

const StyledDiv10 = styled.div`
  display: flex;
  margin-top: 7px;
  justify-content: space-between;
  gap: 20px;
`;

const StyledDiv16 = styled.div`
  color: #fff;
  white-space: nowrap;
  background-color: #505f98;
  aspect-ratio: 1;
  width: 50px;
  padding: 0 11px;
  font: 700 24px Mulish, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  right: 40px;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const StyledDiv11 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
`;
const StyledViewAllMembersButton = styled.button`
  color: #505f98;
  margin-bottom: 16px;
`;

export default CardContainer;
export { MergedComponent, CardContainer };
