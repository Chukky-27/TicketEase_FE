import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

const PasswordErrorMessage = styled.p`
  position: absolute;
  bottom: -6px;
  color: red;
  font-size: 12px;
`;

const PasswordFieldset = styled.fieldset`
  display: flex;
  width: 80%;
  padding: 16px;
  border: none;
  border-radius: 4px;
  flex-direction: column;
  padding-bottom: 0%;
  margin-left: 0% !important;
  margin-right: auto !important;

  @media only screen and (max-width: 1024px) {
    label {
      margin-bottom: 4px;
      font-size: 10px;
      text-align: left;
    }
  }
`;

const PasswordLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  text-align: left;
`;

const PasswordInput = styled.input`
  border-radius: 4px;
  border: 1px solid #ccc;
  height: 42px;
  padding: 0 8px;

  &::placeholder {
    font-size: 10px;
  }

  @media only screen and (max-width: 1024px) {
    height: 24px;
  }
`;

const PasswordField = styled.div`
  position: relative;
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1024px) {
    padding-bottom: 10px;
  }
`;

const StyledButton = styled.button`
  padding: 12px !important;
  width: auto;
  border-radius: 4px;
  border: 1px solid #ccc !important;
  background-color: #505f98;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:disabled,
  &[disabled] {
    border: 1px solid #999999;
    background-color: #505f98;
    color: white;
    cursor: not-allowed;
  }
`;

function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState({
    value: '',
    isTouched: false,
  });
  const [newPassword, setNewPassword] = useState({
    value: '',
    isTouched: false,
  });
  const [confirmNewPassword, setConfirmNewPassword] = useState({
    value: '',
    isTouched: false,
  });

  const validateAuthToken = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        // Redirect or handle unauthenticated user as needed
        return false;
      }

      const response = await axios.post(
        'https://localhost:7075/api/Authentication/validate-token',
        {
          token: authToken,
        }
      );

      return response.status === 200;
    } catch (error) {
      console.error('Token validation error:', error);

      // Swal.fire({
      //   icon: 'error',
      //   title: 'Error',
      //   text: 'An unexpected error occurred: ' + error.message,
      //   confirmButtonText: 'OK',
      // });
      return false;
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      const isValidToken = await validateAuthToken();
    };

    validateToken();
  }, []);

  const getIsFormValid = () => {
    return (
      currentPassword.value.length >= 8 &&
      newPassword.value.length >= 8 &&
      confirmNewPassword.value.length >= 8
    );
  };

  const clearForm = () => {
    setCurrentPassword({
      value: '',
      isTouched: false,
    });
    setNewPassword({
      value: '',
      isTouched: false,
    });
    setConfirmNewPassword({
      value: '',
      isTouched: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!getIsFormValid()) {
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');

      if (!(await validateAuthToken())) {
        // Redirect or handle unauthenticated user as needed
        return;
      }

      const response = await axios.post(
        'https://localhost:7075/api/Authentication/update-password',
        {
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
          confirmNewPassword: confirmNewPassword.value,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Password changed successfully!',
          showConfirmButton: false,
          timer: 3000,
        });
        clearForm();
      } else {
        console.error('Error:', response.data);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error: ${response.data.message}`,
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.status);
        console.error('Error Message:', error.response.data.message);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred: ' + error.message,
          confirmButtonText: 'OK',
        });
      } else if (error.request) {
        console.error('No Response from Server');

        Swal.fire({
          icon: 'error',
          title: 'No Response from Server',
          text: 'No response from the server. Please try again.',
          confirmButtonText: 'OK',
        });
      } else {
        console.error('Unexpected Error:', error.message);

        Swal.fire({
          icon: 'error',
          title: 'Error changing password',
          text: 'An unexpected error occurred while changing the password.',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  return (
    <div className="ChangePasswordForm">
      <form onSubmit={handleSubmit}>
        <PasswordFieldset className="password-fieldset">
          <PasswordField className="password-field">
            <PasswordLabel>Current Password</PasswordLabel>
            <PasswordInput
              className="password-input"
              value={currentPassword.value}
              type="password"
              onChange={(e) => {
                setCurrentPassword({
                  ...currentPassword,
                  value: e.target.value,
                });
              }}
              onBlur={() => {
                setCurrentPassword({ ...currentPassword, isTouched: true });
              }}
              placeholder="Current Password"
            />
            {currentPassword.isTouched && currentPassword.value.length < 8 ? (
              <PasswordErrorMessage>
                Must be at least 8 characters
              </PasswordErrorMessage>
            ) : null}
          </PasswordField>

          <PasswordField className="password-field">
            <PasswordLabel>New Password</PasswordLabel>
            <PasswordInput
              className="password-input"
              value={newPassword.value}
              type="password"
              onChange={(e) => {
                setNewPassword({ ...newPassword, value: e.target.value });
              }}
              onBlur={() => {
                setNewPassword({ ...newPassword, isTouched: true });
              }}
              placeholder="New password"
            />
            {newPassword.isTouched && newPassword.value.length < 8 ? (
              <PasswordErrorMessage>
                Must be at least 8 characters
              </PasswordErrorMessage>
            ) : null}
          </PasswordField>

          <PasswordField className="password-field">
            <PasswordLabel>Confirm New Password</PasswordLabel>
            <PasswordInput
              className="password-input"
              value={confirmNewPassword.value}
              type="password"
              onChange={(e) => {
                setConfirmNewPassword({
                  ...confirmNewPassword,
                  value: e.target.value,
                });
              }}
              onBlur={() => {
                setConfirmNewPassword({
                  ...confirmNewPassword,
                  isTouched: true,
                });
              }}
              placeholder="Confirm new password"
            />
            {confirmNewPassword.isTouched &&
            confirmNewPassword.value.length < 8 ? (
              <PasswordErrorMessage>
                Must be at least 8 characters
              </PasswordErrorMessage>
            ) : null}
          </PasswordField>

          <StyledButton type="submit" disabled={!getIsFormValid()}>
            Update Password
          </StyledButton>
        </PasswordFieldset>
      </form>
    </div>
  );
}

export default PasswordForm;
