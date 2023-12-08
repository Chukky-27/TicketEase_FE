import React from 'react';
import EditMemberData2 from './EditMemberData2';
import EditMemberHeader2 from '../../pages/EditMemberFolder2/EditMemberHeader2';
import styled from 'styled-components';

const Container = styled.div`
  //   background: white;
  width: 1084px;
  height: 1034px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #fff;
  margin-left: 20em;
  margin-top: 8em;
`;
const Form = styled.div`
  margin-top: 5%;
  margin-left: 350px;
`;

const PersonalInfo = () => {
  return (
    <Container>
      <EditMemberHeader2 />
      <Form>
        <EditMemberData2 />
      </Form>
    </Container>
  );
};

export default PersonalInfo;
