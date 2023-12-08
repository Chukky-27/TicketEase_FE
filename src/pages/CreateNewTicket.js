import React from 'react';
import styled from 'styled-components';
import HeaderArea from '../components/CreateNewTicket/HeaderArea';
import ImageArea from '../components/CreateNewTicket/ImageArea';
import NoTicketFound from '../components/CreateNewTicket/NoTicketFound';
import NewTicketArea from '../components/CreateNewTicket/NewTicketArea';

const MainContainer = styled.div`
  border-radius: 4px;
  width: 900px;
  height: 728px;
  background-color: #fff;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-left: 350px;
  margin-right: 100px;
  margin-top: 130px;
  margin-bottom: 57px;
  width: 75%;
`;

const Separator = styled.div`
  background-color: #d3d3d3;
  align-self: stretch;
  min-height: 1px;
  width: 100%;
  margin-top: 6px;
  margin-bottom: 30px;
`;
const CreateNewTicket = ({ props, handleCreateTicket }) => {
  return (
    <MainContainer>
      <HeaderArea />
      <Separator />
      <ImageArea />
      <NoTicketFound />
      <NewTicketArea handleCreateTicket={handleCreateTicket} />
    </MainContainer>
  );
};

export default CreateNewTicket;
