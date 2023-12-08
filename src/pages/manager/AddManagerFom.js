import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Fulldiv = styled.div`
  overflow: hidden;
  background-color: #f0f0f0;
  margin-left: 280px;
  margin-top: 78px;
  width: 1233px;
  height: 899px;
`;
const Hnomargin = styled.h2`
  text-align: left;
  font-weight: bold;
  font-size: 18px;
  color: black;
  margin: 20px 20px 20px;
`;
const Pcreatemanager = styled.p`
  font-size: 14px;
  margin-left: 20px;
`;
const Innerdiv = styled.div`
  background-color: white;
  margin-left: 20px;
  margin-right: 20px;
  height: 899px;
  .marginb {
    margin-bottom: 20px;
  }
`;
const FormSpace = styled.div`
  width: 300px;
  margin: auto;
  padding-top: 4em;
  background-color: white;
`;
export const StyledForm = styled.form`
  border-radius: 5px;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  padding-top: 1em;
  color: ${(props) => (props.invalid ? 'red' : 'black')};
`;

export const StyledInput = styled.input`
  width: 465px;
  padding: 10px;
  margin: 10px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

export const StyledButton = styled.button`
  color: white;
  width: 465px;
  height: 40px;
  margin-top: 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 17em;
`;

export const StyledAlert = styled.div`
  padding: 10px;
  background-color: #f44336;
  color: white;
  margin-top: 10px;
  border-radius: 5px;
`;

function AddManager2() {
  const [companyName, setCompanyName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName || !businessEmail) {
      Swal.fire({
        icon: 'error',
        title: 'Empty input',
        text: 'Please fill input',
        confirmButtonText: 'OK',
      });
      return;
    }
    // Create a data object with the form values
    const data = {
      companyName,
      businessEmail,
      companyDescription: '-',
    };

    try {
      // Make a POST request to your API endpoint
      const response = await fetch(
        'https://localhost:7075/api/managers/AddManager',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        Swal.fire(
          {
            icon: 'success',
            title: 'Email sent successfully!',
            showConfirmButton: false,
            timer: 1500, // Automatically close after 1.5 seconds
            position: 'top-end',
          },
          function () {
            navigate('/admindashboard');
          }
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to send email',
          text: 'There was an error while sending email.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred: ' + error.message,
        confirmButtonText: 'OK',
      });

      // Log the full error object for more details
      console.error('Full error object:', error);
    }
  };
  return (
    <Fulldiv>
      <Hnomargin>Create manager's account</Hnomargin>
      <Pcreatemanager>
        Fill the form below with the correct details as specified
      </Pcreatemanager>
      <Innerdiv>
        <FormSpace>
          <StyledForm onSubmit={handleSubmit}>
            <StyledLabel>Company Name:</StyledLabel>
            <StyledInput
              type="text"
              name="companyName"
              placeholder="Tickectease Company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <StyledLabel>Business Email:</StyledLabel>
            <StyledInput
              type="email"
              name="businessEmail"
              placeholder="example@gmail.com"
              value={businessEmail}
              onChange={(e) => setBusinessEmail(e.target.value)}
            />
            <input
              type="hidden"
              name="companyDescription"
              value="companyDescription"
              onChange={(e) => setCompanyDescription(e.target.value)}
            />

            <StyledButton
              style={{ backgroundColor: '#505F98', color: 'white' }}
            >
              Submit
            </StyledButton>
          </StyledForm>
        </FormSpace>
      </Innerdiv>
    </Fulldiv>
  );
}
export default AddManager2;
