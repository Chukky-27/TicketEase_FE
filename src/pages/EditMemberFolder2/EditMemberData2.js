import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { validateEmail } from '../../utils/validateEmail';
import Edit from './Editimg/Edit.svg';
import AxiosInstance from '../../Request/AxiosInstance';
import Swal from 'sweetalert2';

const Container = styled.div`
  display: grid;
  grid-template-columns: 120% 120%;
  justify-content: center;
`;
const Fieldset = styled.fieldset`
  margin-left: 16px;
  margin-right: 16px;
  border: none;
`;
const Input = styled.input`
  background: rgba(246, 246, 246, 1);
  border: none;
  height: 48px;
  border-radius: 10px;
  padding: 10px;
  &::placeholder {
    padding-left: 4m0px;
    color: rgba(151, 151, 151, 1);
  }
`;
const Field = styled.div`
  width: 90%;
  position: relative;
`;
const Label = styled.label`
  font-size: 14px;
`;
const ImageIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 4px;
  background: rgba(80, 95, 152, 1);
  color: white;
  margin: 16px auto 16px auto;
`;

const EditMemberData2 = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');

  const getIsFormValid = () => {
    return (
      firstName &&
      lastName &&
      validateEmail(email) &&
      phoneNumber &&
      gender &&
      address &&
      state
    );
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setGender('');
    setAddress('');
    setState('');
  };

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(
        `/User/${localStorage.getItem('Id')}`
      );
      console.log(response);
      const managerData = response.data;
      console.log(response.status);
      console.log(managerData.email);
      if (response.status === 200) {
        setFirstName(managerData.firstName);
        setLastName(managerData.lastName);
        setEmail(managerData.email);
        setPhoneNumber(managerData.phoneNumber);
        setGender(managerData.gender);
        setAddress(managerData.address);
        setState(managerData.state);
      } else {
        clearForm();
        console.error(
          'API Error:',
          'Unexpected status code:',
          response.data.statusCode
        );
      }
    } catch (error) {
      console.error('API Error:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBusinessPhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (getIsFormValid()) {
      try {
        const response = await AxiosInstance.put(
          `/User/update/${localStorage.getItem('Id')}`,
          {
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            address,
            state,
          }
        );
        console.log(response);

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Data updated successfully',
            showConfirmButton: false,
            timer: 1500, // Automatically close after 1.5 seconds
            position: 'top-end',
          });
          fetchData(); // Fetch updated data after successful save
        } else {
          Swal.fire({
            icon: 'error',
            title: response.status,
            showConfirmButton: false,
            timer: 1500, // Automatically close after 1.5 seconds
            position: 'top-end',
          });
          console.error('API Error:', response.status);
        }
      } catch (error) {
        console.error('API Error:', error.message);
        Swal.fire({
          icon: 'error',
          title: error.status,
          showConfirmButton: false,
          timer: 1500, // Automatically close after 1.5 seconds
          position: 'top-end',
        });
      }
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <Fieldset>
          <Container>
            <div>
              <Field className="Field">
                <Label>First Name</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
                <ImageIcon src={Edit} alt="Edit Icon" />
              </Field>
              <Field className="Field">
                <Label>Last Name</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
                <ImageIcon src={Edit} alt="Edit Icon" />
              </Field>

              <Field className="Field">
                <Label> Email</Label>
                <Input value={email} placeholder=" Email" readOnly />
              </Field>
              <Field className="Field">
                <Label> Phone Number</Label>
                <Input
                  value={phoneNumber}
                  onChange={handleBusinessPhoneChange}
                  placeholder="Contact Phone"
                />
                <ImageIcon src={Edit} alt="Edit Icon" />
              </Field>
            </div>

            <div>
              <Field className="Field">
                <Label>Gender</Label>
                <Input
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Gender"
                />
                <ImageIcon src={Edit} alt="Edit Icon" />
              </Field>

              <Field className="Field">
                <Label>State</Label>
                <Input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                />
                <ImageIcon src={Edit} alt="Edit Icon" />
              </Field>

              <Field className="Field">
                <Label>Address</Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                />
                <ImageIcon src={Edit} alt="Edit Icon" />
              </Field>
            </div>
          </Container>
          <Button
            type="submit"
            style={{ cursor: 'pointer' }}
            disabled={!getIsFormValid()}
          >
            Save
          </Button>
        </Fieldset>
      </form>
    </div>
  );
};

export default EditMemberData2;
