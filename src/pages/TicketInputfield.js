import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosAddCircle } from 'react-icons/io';
import axios from 'axios';
import Swal from 'sweetalert2';

const Fulldiv = styled.div`
  overflow: hidden;
  background-color: #f0f0f0;
  margin-top: 80px;
  width: 82%;
  margin-left: 20%;
`;

const Innerdiv = styled.div`
  background-color: white;
  margin-left: 20px;
  margin-right: 20px;
  & .marginb {
    margin-bottom: 20px;
  }
`;

const FormSpace = styled.div`
  width: 300px;
  margin: auto;
  padding-top: 2em;
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

export const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;
export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

export const StyledButton = styled.button`
  background-color: #505f98 !important;
  height: 38px;
  color: white;
  width: 100%;
  margin-top: 30px;
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

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: none;
`;

const Board = styled.div`
  font-weight: bold;
  color: #333;
  padding: 8px;
`;

const Button = styled.button`
  background-color: #505f98 !important;
  color: white;
  border: none;
  padding: 10px 30px;
  margin-right: 8px;
  text-align: center;
  text-decoration: none;
  display: flex;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  gap: 10px;
`;

function CreateTicket({ handleViewTickets }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 0,
    priority: 0,
    assignedTo: '',
  });

  const userId = localStorage.getItem('Id');
  console.log(userId);
  const projectId = localStorage.getItem('projectid');
  console.log(projectId);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedValue =
      name === 'status' || name === 'priority' ? parseInt(value, 10) : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `https://localhost:7075/api/Ticket/add-ticket?userId=${userId}&projectId=${projectId}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Ticket created successfully!',
        showConfirmButton: false,
        timer: 3000,
      });
      const handleViewAllProjecs = () => {
        handleViewTickets();
      };
      handleViewAllProjecs();
      // console.log('Ticket created successfully:', response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred: ' + error.message,
        confirmButtonText: 'OK',
      });
      console.error('Error creating ticket:', error.response.data);
    }
  };

  return (
    <Fulldiv>
      <Container>
        <Board>Ticket</Board>
        <Button>
          <div>
            <IoIosAddCircle />{' '}
          </div>
          <div>Create a Ticket</div>
        </Button>
      </Container>

      <Innerdiv>
        <FormSpace>
          <StyledForm onSubmit={handleSubmit}>
            <h1 style={{ textAlign: 'left', gap: '5px' }}>
              Work Collaboratively with <br />
              team members.{' '}
              <span style={{ color: '#505f98' }}> Create a Ticket</span>{' '}
            </h1>
            <StyledLabel>Title:</StyledLabel>
            <StyledInput
              type="text"
              required
              placeholder=""
              value={formData.title}
              onChange={handleChange}
              name="title"
            />
            <StyledLabel>Description:</StyledLabel>
            <StyledInput
              type="text"
              required
              placeholder=""
              value={formData.description}
              onChange={handleChange}
              name="description"
            />

            <StyledLabel>Status:</StyledLabel>
            <StyledSelect
              value={formData.status.toString()} // Convert number to string for rendering
              onChange={handleChange}
              name="status"
            >
              <option value="0">To Do</option>
              <option value="1">In Progress</option>
              <option value="2">Completed</option>
            </StyledSelect>

            <StyledLabel>Priority:</StyledLabel>
            <StyledSelect
              value={formData.priority.toString()} // Convert number to string for rendering
              onChange={handleChange}
              name="priority"
            >
              <option value="0">Low</option>
              <option value="1">Medium</option>
              <option value="2">High</option>
            </StyledSelect>

            <StyledLabel>Assigned To:</StyledLabel>
            <StyledInput
              type="text"
              placeholder=""
              value={formData.assignedTo}
              onChange={handleChange}
              name="assignedTo"
            />
            <StyledButton
              type="submit"
              style={{ backgroundColor: '#505f98', height: '50px' }}
            >
              Create a New Ticket
            </StyledButton>
          </StyledForm>
        </FormSpace>
      </Innerdiv>
    </Fulldiv>
  );
}

export default CreateTicket;
