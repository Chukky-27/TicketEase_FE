import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/Logo.svg';
import { Link } from 'react-router-dom';

const StyledBox = styled.div`
  height: 73px;
  position: relative;
  width: 255px;
`;

const StyledGroup = styled.div`
  height: 31px;
  width: 179px;
`;

const StyledTextWrapper = styled.div`
  color: #031839;
  font-family: 'Mulish-Black', Helvetica;
  font-size: 26px;
  font-weight: 900;
  left: 76px;
  position: absolute;
  top: 27px;
  white-space: nowrap;
  width: 179px;
`;

const StyledOverlapWrapper = styled.div`
  height: 73px;
  position: absolute;
  width: 74px;
  top: 12px;

  .logo{
     Width: 73.85px;
     Height: 72.94px;
     Top: 10px
     Left: 19px
  }
`;

export const Logo = () => {
  return (
    <StyledBox>
      <StyledGroup>
        <StyledTextWrapper>TICKET EASE</StyledTextWrapper>
        <StyledOverlapWrapper>
          <Link to="/Footer-header">
            <img
              className="logo"
              alt="logo"
              src={logo}
              style={{ marginTop: 0 }}
            />
          </Link>
        </StyledOverlapWrapper>
      </StyledGroup>
    </StyledBox>
  );
};
