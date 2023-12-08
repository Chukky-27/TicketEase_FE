import React from 'react';
import styled from 'styled-components';
import { Component } from '../components/Component';

//   width: 100%;
//   margin: 0 auto;
//   height: 80px;
//   background-color: #FFFFFF;
//   position: fixed;
//   top: 0;
//   left:270px;
//   z-index: 1000;

// .overlap-group-2 {
//   background-color: #ffffff;
//   height: 17px;
//   left: 4px;
//   position: relative;
//   top: 4px;
//   width: 16px;
// }

//   height: 80px;
//   width: 1440px;
//   }
//   .overlap-group-2 {
//     background-color: #ffffff;
//     height: 17px;
//     left: 4px;
//     position: relative;
//     top: 4px;
//     width: 16px;
//   }

//   .component-1 {
//     left: 0 !important;
//     position: absolute !important;
//     top: 0 !important;
//   }

//   .component-instance {
//     height: 80px !important;
//     left: unset !important;
//     top: unset !important;
//     width: 1445px !important;
//   }

//   .group {
//     height: 73px;
//     left: 19px;
//     position: absolute;
//     top: 4px;
//     width: 257px;
//   }

//   .text-wrapper-3 {
//     color: #031839;
//     font-family: "Mulish", Helvetica;
//     font-size: 26px;
//     font-weight: 900;
//     left: 95px;
//     letter-spacing: 0;
//     line-height: 32.63px;
//     position: absolute;
//     top: 25px;
//     white-space: nowrap;
//     width: 179px;
//     text-align: center;
//   }

//   .overlap-wrapper {
//     height: 73px;
//     left: 0;
//     position: absolute;
//     top: 0;
//     width: 74px;
//   }

//   @media (max-width: 768px) {
//     .text-wrapper-3 {
//       font-size: 18px;
//     }
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

const StyledFrame = styled.div`
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 270px;
  z-index: 1000;

  .overlap-group-2 {
    background-color: #ffffff;
    height: 17px;
    left: 4px;
    position: relative;
    top: 4px;
    width: 16px;
  }

  .group {
    height: 73px;
    left: 19px;
    position: absolute;
    top: 4px;
    width: 257px;
  }

  .text-wrapper-3 {
    color: #031839;
    font-family: 'Mulish', Helvetica;
    font-size: 26px;
    font-weight: 900;
    left: 95px;
    letter-spacing: 0;
    line-height: 32.63px;
    position: absolute;
    top: 25px;
    white-space: nowrap;
    width: 179px;
    text-align: center;
  }

  .overlap-wrapper {
    height: 73px;
    left: 0;
    position: absolute;
    top: 0;
    width: 74px;
  }

  @media (max-width: 768px) {
    left: 0; /* Adjust the position for smaller screens */
    .text-wrapper-3 {
      font-size: 18px;
    }
    /* Add more specific styles for smaller screens if needed */
  }
`;

export const Frame = ({
  logout,
  ChangePassword,
  managerdetails,
  personaldetails,
}) => {
  return (
    <StyledFrame>
      <div className="overlap-group-2">
        <Component
          logout={logout}
          ChangePassword={ChangePassword}
          managerdetails={managerdetails}
          personaldetails={personaldetails}
        />
      </div>
    </StyledFrame>
  );
};
