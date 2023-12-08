import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import image from '../../../assets/image.jpeg';
import arrow from '../../../assets/ArrowRight.svg';

const ProfileDropdownContainer = styled.div`
  justify-content: flex-start;
  display: flex;
  gap: 6px;
  position: relative;
  align-items: flex-start;
  margin-top: -12px;
  margin-left: -30px;
`;

const ProfileButton = styled.button`
  display: inline-flex;
  background-color: #fff;
  border: none;
  padding: 0;
  outline: none;
  overflow: hidden;
  cursor: pointer;
  color: black;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  width: 316px;
  height: 375px;
`;

const InteractiveMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: #505f98;
    color: #fff;
  }
`;

const MenuItemText = styled.div`
  color: #1d2126;
  text-align: center;
  white-space: nowrap;
  font: 400 14px/24px Mulish, sans-serif;
  cursor: pointer;
`;

const Icon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  overflow: hidden;
  margin-left: 16px;
`;

const Separator = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  align-self: stretch;
  min-height: 1px;
  margin-top: 15px;
  width: 100%;
`;

const PrivacyPolicy = styled.div`
  color: #1d2126;
  text-align: left;
  align-self: start;
  white-space: nowrap;
  margin: 15px 0 140px 28px;
  font: 400 14px/20px Mulish, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
    margin: 0 0 40px 10px;
  }
`;

export const ProfileDropdown = ({
  name,
  logout,
  ChangePassword,
  managerdetails,
  personaldetails,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  let timeoutId;

  const toggleDropdown = () => {
    clearTimeout(timeoutId);
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(closeDropdown, 1000);
  };

  useEffect(() => {
    if (isOpen) {
      dropdownRef.current.addEventListener('mouseenter', handleMouseEnter);
      dropdownRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (dropdownRef.current) {
        dropdownRef.current.removeEventListener('mouseenter', handleMouseEnter);
        dropdownRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isOpen]);

  return (
    <ProfileDropdownContainer>
      <ProfileButton onClick={toggleDropdown}>
        <img
          src="https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-2.jpg"
          alt="Profile"
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            marginRight: '8px',
          }}
        />
        <span style={{ paddingTop: '6px' }}>{name}</span>
      </ProfileButton>
      <DropdownContent isOpen={isOpen} ref={dropdownRef}>
        <Dropdown
          logout={logout}
          ChangePassword={ChangePassword}
          managerdetails={managerdetails}
          personaldetails={personaldetails}
          name={name}
        />
      </DropdownContent>
    </ProfileDropdownContainer>
  );
};

// const Dropdown = ({ logout, ChangePassword, managerdetails, name }) => {
//   return (
//       if (name === "SuperAdmin"){
//     <>
//       <InteractiveMenuItem onClick={managerdetails}>
//         <MenuItemText>Personal Info</MenuItemText>
//         <Icon src={arrow} alt="Personal Info Icon" />
//       </InteractiveMenuItem>
//       <InteractiveMenuItem onClick={ChangePassword}>
//         <MenuItemText>Change Password</MenuItemText>
//         <Icon src={arrow} alt="Change Password Icon" />
//       </InteractiveMenuItem>
//       <InteractiveMenuItem onClick={logout}>
//         <MenuItemText>Log Out</MenuItemText>
//         <Icon src={arrow} alt="Log Out Icon" />
//       </InteractiveMenuItem>
//       <Separator />
//       <PrivacyPolicy>Privacy Policy</PrivacyPolicy>
//     </>
//       }
//   );
// };

const Dropdown = ({
  logout,
  ChangePassword,
  managerdetails,
  name,
  personaldetails,
}) => {
  return (
    <>
      {name === 'SuperAdmin' ? (
        <>
          <InteractiveMenuItem onClick={managerdetails}>
            <MenuItemText>Personal Info</MenuItemText>
            <Icon src={arrow} alt="Personal Info Icon" />
          </InteractiveMenuItem>
          <InteractiveMenuItem onClick={ChangePassword}>
            <MenuItemText>Change Password</MenuItemText>
            <Icon src={arrow} alt="Change Password Icon" />
          </InteractiveMenuItem>
          <InteractiveMenuItem onClick={logout}>
            <MenuItemText>Log Out</MenuItemText>
            <Icon src={arrow} alt="Log Out Icon" />
          </InteractiveMenuItem>
          <Separator />
          <PrivacyPolicy>Privacy Policy</PrivacyPolicy>
        </>
      ) : (
        <>
          <InteractiveMenuItem onClick={personaldetails}>
            <MenuItemText>Personal Details</MenuItemText>
            <Icon src={arrow} alt="Company Info Icon" />
          </InteractiveMenuItem>
          <InteractiveMenuItem onClick={managerdetails}>
            <MenuItemText>Company Info</MenuItemText>
            <Icon src={arrow} alt="Personal Info Icon" />
          </InteractiveMenuItem>
          <InteractiveMenuItem onClick={ChangePassword}>
            <MenuItemText>Change Password</MenuItemText>
            <Icon src={arrow} alt="Change Password Icon" />
          </InteractiveMenuItem>
          <InteractiveMenuItem onClick={logout}>
            <MenuItemText>Log Out</MenuItemText>
            <Icon src={arrow} alt="Log Out Icon" />
          </InteractiveMenuItem>
          <Separator />
          <PrivacyPolicy>Privacy Policy</PrivacyPolicy>
        </>
      )}
    </>
  );
};
