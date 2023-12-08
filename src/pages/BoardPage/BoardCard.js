import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AxiosInstance2 } from '../../Request/AxiosInstance';

const MergedComponent = ({ handleCreateBoard }) => {
  return (
    <StyledDiv1 style={{ marginTop: '6em', marginLeft: '11em' }}>
      <StyledDiv2>Boards</StyledDiv2>
      <img
        alt=""
        src="create_board_button.svg"
        style={{
          cursor: 'pointer',
          marginRight: '5em',
        }}
        onClick={handleCreateBoard}
      />
    </StyledDiv1>
  );
};

const StyledDiv1 = styled.div`
  align-self: stretch;
  display: flex;
  width: 100%;
  padding-right: 80px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    padding-right: 20px;
  }
`;

const StyledDiv2 = styled.div`
  color: #1d2126;
  flex-grow: 1;
  white-space: nowrap;
  margin: auto 0;
  font: 700 24px Mulish, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const StyledCardContainer = styled.div`
  width: 336px;
  height: 320px;
  border: 1px solid white;
  border-radius: 4px;
  background: #fff;
  margin-top: 30px;
  // margin-left: 160px;
  // margin-right: -10px;
  // gap: 80px;
  margin: 20px;
`;

const StyledClickableContainer = styled.div`
  cursor: pointer;
  margin-top: 1.2em;
  float: right;
`;

const StyledDiv5 = styled.div`
  display: flex;
  width: 296px;
  max-width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const StyledDiv6 = styled.div`
  color: #1d2126;
  flex-grow: 1;
  white-space: nowrap;
  margin-left: 10px;
  margin-top: 1em;
  font: 600 20px Mulish, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
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
  color: black;
  white-space: nowrap;
  font: 500 14px Mulish, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const StyledDiv10 = styled.div`
  display: flex;
  margin-top: 7px;
  justify-content: space-between;
  gap: 20px;
`;

const StyledDiv11 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
`;

const StyledImg3 = styled.img`
  aspect-ratio: 3.13;
  object-fit: contain;
  object-position: center;
  width: 163px;
  overflow: hidden;
  align-self: center;
`;

const StyledDiv12 = styled.div`
  color: #c4c4c4;
  align-self: stretch;
  margin-top: 23px;
  white-space: nowrap;
  font: 400 12px Mulish, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
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
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const StyledDiv14 = styled.div`
  color: #21334f;
  align-self: stretch;
  margin-top: 34px;
  white-space: nowrap;
  font: 700 14px Mulish, sans-serif;
  width: 250px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const StyledDiv15 = styled.div`
  display: flex;
  flex-basis: 0%;
  flex-direction: column;
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
  margin-top: -20px;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const StyledImg4 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 18px;
  overflow: hidden;
  align-self: end;
  margin-top: 110px;
  max-width: 100%;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const BoardCard = ({
  boardName,
  handleCreateProject,
  handleViewAllProjecs,
  handleViewTickets,
  boardId,
}) => {
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    const fetchProjectsCount = async () => {
      try {
        const response = await AxiosInstance2.get(
          'Project/GetProjectsByBoardId',
          {
            params: {
              boardId: localStorage.getItem('boardid'), // Replace with the actual board ID
              perPage: 10, // Adjust as needed
              page: 1, // Adjust as needed
            },
          }
        );
        console.log('Fetched Project Data:', response.data?.data.totalCount);

        // Assuming the response data has a property named 'totalProjects'
        setTotalProjects(response.data?.data.totalCount);
      } catch (error) {
        console.error('Error fetching project count:', error);
      }
    };

    fetchProjectsCount();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleClick = () => {
    localStorage.setItem('boardid', boardId);
  };

  return (
    <StyledCardContainer>
      <StyledDiv5 style={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <StyledDiv6 style={{ width: '295px' }}>{boardName}</StyledDiv6>
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
        <StyledDiv9>TOTAL PROJECTS</StyledDiv9>
        <StyledDiv10>
          <StyledDiv11>
            {/* <StyledImg3 loading="lazy" srcSet="..." /> */}
            <StyledDiv12>STATUS</StyledDiv12>
            <StyledDiv13>Active</StyledDiv13>
            <StyledDiv14>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '30px',
                }}
              >
                <div>
                  <button
                    style={{
                      marginBottom: '16px',
                      marginRight: '3em',
                      background: '#505f98',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '10px 20px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      handleViewAllProjecs();
                      handleClick();
                    }}
                  >
                    View all Projects
                  </button>
                </div>

                <button
                  style={{
                    marginBottom: '16px',
                    background: '#505f98',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '10px 20px',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    handleCreateProject();
                    handleClick();
                  }}
                >
                  Create Project
                </button>
              </div>
            </StyledDiv14>
          </StyledDiv11>
          <StyledDiv15>
            <StyledDiv16>{totalProjects}</StyledDiv16>
          </StyledDiv15>
        </StyledDiv10>
      </StyledDiv8>
    </StyledCardContainer>
  );
};

export default BoardCard;
export { MergedComponent, BoardCard };
