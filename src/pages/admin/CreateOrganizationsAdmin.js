import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CardContainer, {
  MergedComponent,
} from '../../components/organization/CardContainer.js';
import AxiosInstance from '../../Request/AxiosInstance.js';
import Pagination from '../../components/organization/Pagination.js';

const NoOrganizationsMessage = styled.div`
  margin-top: 2em;
  margin-left: 22em;
  font-size: 18px;
  color: #505f98;
  white-space: nowrap;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important;
  grid-template-columns: 1fr 1fr 1fr !important;
  gap: 0px;
  justify-content: center;
  margin-left: 21em;
  margin-right: em;
  margin-top: 2em;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1em;
  margin-right: 1em;
`;

const CreateOrganizationsAdmin = ({ handleCreateOrganization }) => {
  const [managerData, setManagerData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const fetchManagerData = async (page) => {
    try {
      const response = await AxiosInstance.get(
        `/managers/GetAll?page=${page}&perPage=6`
      );

      const responseData = response.data?.result?.data || [];

      setTotalItems(responseData.totalCount || 0);
      setTotalPageCount(responseData.totalPageCount || 0);

      setManagerData(responseData.data || []);
    } catch (error) {
      console.error('Error fetching manager data:', error.message);
    }
  };

  useEffect(() => {
    fetchManagerData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <StyledContainer>
      <MergedComponent handleCreateOrganization={handleCreateOrganization} />

      <CardsContainer>
        {managerData.length > 0 ? (
          managerData.map((manager) => (
            <CardContainer
              handleCreateOrganization={handleCreateOrganization}
              key={manager.id}
              organizationName={manager.companyName}
            />
          ))
        ) : (
          <NoOrganizationsMessage>
            No Available Organizations
          </NoOrganizationsMessage>
        )}
      </CardsContainer>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPageCount={totalPageCount}
      />
    </StyledContainer>
  );
};

export default CreateOrganizationsAdmin;
