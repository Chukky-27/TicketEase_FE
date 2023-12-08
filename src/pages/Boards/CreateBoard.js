import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosAddCircle } from 'react-icons/io';
import Swal from 'sweetalert2';

const Fulldiv = styled.div`
  overflow: hidden;
  margin-top: 90px;
  margin-left: 290px;
`;

const Innerdiv = styled.div`
  background-color: #fff;
  margin-left: 40px;
  margin-right: 20px;

  & .marginb {
    margin-bottom: 20px;
  }
`;

const FormSpace = styled.div`
  width: 300px;
  margin: auto;
  margin-top: 20px;
  margin-left: 400px;
  padding-top: 2em;
  background-color: ##8c92a2;
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
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

export const StyledButton = styled.button`
  color: white;
  width: 100%;
  margin-top: 10px;
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
  color: #1d2126;
  font-family: Mulish;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Button = styled.button`
  background-color: #505f98;
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

function AddManager({ handleBoardMain }) {
  const [steps] = useState(0);
  const [formData, setFormData] = useState({
    Name: '',
    managerId: localStorage.getItem('userId'),
    description: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Handling submit...');

    if (!formData.Name) {
      console.error('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch(
        'https://localhost:7075/api/Board/AddBoard',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Name: formData.Name,
            ManagerId: formData.managerId,
            Description: formData.description,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred: ' + errorData.message,
          confirmButtonText: 'OK',
        });
        return;
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      Swal.fire({
        icon: 'success',
        title: 'Board created successfully!',
        showConfirmButton: false,
        timer: 1500, // Automatically close after 1.5 seconds
      });

      const handleBoard = () => {
        handleBoardMain();
      };

      handleBoard();
    } catch (error) {
      console.error('Error occurred:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred: ' + error.message,
        confirmButtonText: 'OK',
      });
    }
  };
  return (
    <>
      {steps === 0 && (
        <>
          <Fulldiv>
            <Container>
              <Board>Boards</Board>
              <Button>
                <div>
                  <IoIosAddCircle />{' '}
                </div>
                <div>Create Boards</div>
              </Button>
            </Container>

            <Innerdiv>
              <FormSpace>
                <StyledForm onSubmit={handleSubmit}>
                  <h1 style={{ textAlign: 'left', gap: '5px' }}>
                    Work Collaboratively with <br />
                    team members.{' '}
                    <span style={{ color: '#505f98' }}> Create Board</span>{' '}
                  </h1>
                  <StyledLabel>Name:</StyledLabel>
                  <StyledInput
                    type="text"
                    placeholder=""
                    value={formData.Name}
                    onChange={(e) =>
                      setFormData({ ...formData, Name: e.target.value })
                    }
                  />
                  <StyledLabel style={{ display: 'none' }}>
                    Manager's Id:
                  </StyledLabel>
                  <StyledInput
                    style={{ display: 'none' }}
                    type="text"
                    placeholder=""
                    value={localStorage.getItem('userId')}
                    onChange={(e) =>
                      setFormData({ ...formData, managerId: e.target.value })
                    }
                  />
                  <StyledLabel>Description:</StyledLabel>
                  <StyledInput
                    type="text"
                    placeholder=""
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                  <StyledButton
                    type="submit"
                    style={{
                      background: '#505f98',
                      width: '300px',
                      height: '55px',
                    }}
                  >
                    Create Board
                  </StyledButton>
                </StyledForm>
              </FormSpace>
            </Innerdiv>
          </Fulldiv>
        </>
      )}
    </>
  );
}

export default AddManager;
