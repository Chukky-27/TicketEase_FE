import React, { useState } from 'react';
import styled from 'styled-components';

const Fulldiv = styled.div`
  overflow: hidden;
  background-color: #f0f0f0;
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

const CreateProject = ({ boardId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [existingProjects, setExistingProjects] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      // Handle validation error, display a message, or prevent submission
      return;
    }

    // Check if the project with the same title already exists
    if (existingProjects.some((project) => project.title === title)) {
      alert(
        'Project with the same title already exists. Please choose a different title.'
      );
      return;
    }

    // Create a data object with the form values
    const data = {
      title,
      description,
      boardId,
    };

    try {
      // Make a POST request to your API endpoint

      const response = await fetch(
        `https://localhost:7075/Project/AddProject/${boardId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // Update the list of existing projects with the new project
        setExistingProjects([...existingProjects, { title, description }]);
        console.log('Project created successfully');
        alert('Project created successfully');

        // Clear the input fields
        setTitle('');
        setDescription('');
      } else {
        console.error('Error creating project');
        alert('Error creating project');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <Fulldiv>
      <Innerdiv>
        <FormSpace>
          <StyledForm onSubmit={handleSubmit}>
            <h1 style={{ textAlign: 'left', gap: '5px' }}>
              Work Collaboratively with <br />
              team members.{' '}
              <span style={{ color: '#505f98' }}> Create Project</span>{' '}
            </h1>
            <StyledLabel>Title:</StyledLabel>
            <StyledInput
              type="text"
              placeholder=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <StyledLabel>Description:</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Cc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <StyledButton type="submit">Create Project</StyledButton>
          </StyledForm>
        </FormSpace>
      </Innerdiv>
    </Fulldiv>
  );
};

export default CreateProject;