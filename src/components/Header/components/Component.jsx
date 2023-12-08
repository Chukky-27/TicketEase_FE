import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { ProfileDropdown } from './Profile';
import SearchInput from './SearchInput';
import { NotificationBell } from './NotificationBell';
import { Settings } from './Settings';

const StyledComponent = styled.div`
  position: fixed;
  height: 80px;
  width: 100vw;
  margin-left: -165px;

  .overlap-group {
    background-color: #ffffff;
    height: 17px;
    left: 4px;
    position: relative;
    top: 4px;
    width: 16px;
  }

  .div {
    background-color: #ffffff;
    border: 1px solid;
    border-color: #e5e5e5;
    border-radius: 4px;
    height: 48px;
    left: 430px;
    position: absolute;
    top: 16px;
    width: 445px;
  }

  .text-wrapper {
    color: #000000;
    font-family: 'Mulish', Helvetica;
    font-size: 14px;
    font-weight: 400;
    left: 49px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 13px;
  }

  .stockholm-icons {
    height: 24px;
    left: 15px;
    position: absolute;
    top: 11px;
    width: 24px;
  }

  .stockholm-icons-wrapper {
    background-color: #f6f6f6;
    border-radius: 19px;
    height: 38px;
    left: 1065px;
    overflow: hidden;
    position: absolute;
    top: 21px;
    width: 38px;
  }

  .img {
    height: 24px;
    left: 7px;
    position: absolute;
    top: 7px;
    width: 24px;
  }

  .img-wrapper {
    background-color: #f6f6f6;
    border-radius: 19px;
    height: 38px;
    left: 1133px;
    overflow: hidden;
    position: absolute;
    top: 21px;
    width: 38px;
  }

  .frame-2 {
    align-items: center;
    display: inline-flex;
    gap: 6px;
    justify-content: center;
    left: 1262px;
    position: absolute;
    top: 21px;
  }

  .unsplash {
    height: 38px;
    position: relative;
    width: 38px;
  }

  .text-wrapper-2 {
    color: #000000;
    font-family: 'Mulish', Helvetica;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: normal;
    position: relative;
    width: 100vw;
  }

  .stockholm-icons-navigation-angle-down-2 {
    height: 24px !important;
    position: relative !important;
    width: 24px !important;
  }
`;

export const Component = ({
  className,
  logout,
  ChangePassword,
  personaldetails,
  managerdetails,
  overlapGroupClassName,
}) => {
  return (
    <StyledComponent className={`component ${className}`}>
      <div className={`overlap-group ${overlapGroupClassName}`}>
        <div className="div">
          <SearchInput />
        </div>
        <div className="stockholm-icons-wrapper">
          <NotificationBell />
        </div>
        <div className="img-wrapper">
          <Settings />
        </div>
        <div className="frame-2" style={{ marginTop: '10px' }}>
          <ProfileDropdown
            logout={logout}
            ChangePassword={ChangePassword}
            managerdetails={managerdetails}
            personaldetails={personaldetails}
            name={localStorage.getItem('userRole')}
          />
        </div>
      </div>
    </StyledComponent>
  );
};

Component.propTypes = {
  stockholmIcons: PropTypes.string,
  unsplash: PropTypes.string,
};
