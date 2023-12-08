import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AxiosInstance from '../Request/AxiosInstance';
import edit from '../../src/assets/edit.svg';
import Swal from 'sweetalert2';

const Form = styled.form`
  max-width: 300px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  &.address {
    margin-top: -19px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
`;

const Icon = styled.img`
  position: relative;
  top: -60px;
  right: -350px;
  transform: translateY(100%);
  height: 20px;
  z-index: 1;
`;

const Input = styled.input`
  width: 350px;
  padding: 8px;
  padding-left: 30px;
  height: 38px;
  font-size: 14px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.04);
  &::placeholder {
    color: rgba(151, 151, 151, 1);
    font-family: Mulish;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  &.state {
    background: rgba(246, 246, 246, 0.49);
  }
  &.businessPhone {
    position: relative;
    background: rgba(251, 251, 251, 1);
  }
`;

const SubmitButton = styled.button`
  background-color: rgba(80, 95, 152, 1);
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 350px;
  height: 48px;
  margin-top: 58px;
  margin-bottom: 94px;
  margin-left: 3px;
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 12px;
`;

const Inputs = () => {
  const [formData, setFormData] = useState({
    CompanyName: '',
    BusinessEmail: '',
    BusinessPhone: '',
    CompanyAddress: '',
    State: '',
  });

  const [errors, setErrors] = useState('');

  useEffect(() => {
    const fetchManagerDetails = async () => {
      try {
        const response = await AxiosInstance.get(
          // '/managers/GetById?id={managerId}'
          `/managers/GetById?id=${localStorage.getItem('userId')}`
        );
        console.log('Fetched manager details:', response.data);
        const managerDetails = response.data;

        setFormData((prevFormData) => ({
          ...prevFormData,
          CompanyName: managerDetails.CompanyName,
          BusinessEmail: managerDetails.BusinessEmail,
          BusinessPhone: managerDetails.BusinessPhone,
          CompanyAddress: managerDetails.CompanyAddress,
          State: managerDetails.State,
        }));
      } catch (error) {
        console.error('Error fetching manager details:', error.message);
      }
    };

    fetchManagerDetails();
  }, []); // Run only once on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Setting ${name} to ${value}`);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Form Data:', formData);

      // Make a PUT request to the UpdateManager endpoint
      const response = await AxiosInstance.put(
        `/managers/updateManager/${localStorage.getItem('userId')}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('API response:', response.data);

      // Check if the request was successful
      if (response.status === 200) {
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Manager updated successfully!',
        });

        // Clear the form
        setFormData({
          CompanyName: '',
          BusinessEmail: '',
          BusinessPhone: '',
          CompanyAddress: '',
          State: '',
        });
      } else {
        // Handle unsuccessful update
        setErrors(response.data.message);

        // Show error alert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'Failed to update manager.',
        });

        console.error('Failed to update manager:', response.data.message);
      }
    } catch (error) {
      // Handle the error from the API request
      setErrors('Error updating manager. Please try again.');

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error updating manager. Please try again.',
      });

      console.error('Error updating manager:', error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="CompanyName">Company Name</Label>
        <Input
          type="text"
          id="CompanyName"
          name="CompanyName"
          value={formData.CompanyName}
          onChange={handleChange}
          placeholder="Enter company name"
        />
        {errors && <ErrorMsg>{errors}</ErrorMsg>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="BusinessEmail">Business Email</Label>
        <Input
          type="email"
          id="BusinessEmail"
          name="BusinessEmail"
          value={formData.BusinessEmail}
          onChange={handleChange}
          placeholder="Enter business name"
        />
        {errors.BusinessEmail && <ErrorMsg>{errors.BusinessEmail}</ErrorMsg>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="BusinessPhone">Business Phone</Label>
        <Input
          type="tel"
          id="BusinessPhone"
          name="BusinessPhone"
          value={formData.BusinessPhone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="businessPhone"
        />
        {errors.BusinessPhone && <ErrorMsg>{errors.BusinessPhone}</ErrorMsg>}
        <Icon src={edit} alt="edit Icon" />
      </FormGroup>

      <FormGroup className="address">
        <Label htmlFor="CompanyAddress">Company Address</Label>
        <Input
          type="text"
          id="CompanyAddress"
          name="CompanyAddress"
          value={formData.CompanyAddress}
          onChange={handleChange}
          placeholder="Enter company address"
        />
        {errors.CompanyAddress && <ErrorMsg>{errors.CompanyAddress}</ErrorMsg>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="State">State</Label>
        <Input
          type="text"
          id="State"
          name="State"
          value={formData.State}
          onChange={handleChange}
          placeholder="Enter your state"
          className="state"
        />
        {errors.State && <ErrorMsg>{errors.State}</ErrorMsg>}
      </FormGroup>

      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  );
};

export default Inputs;
