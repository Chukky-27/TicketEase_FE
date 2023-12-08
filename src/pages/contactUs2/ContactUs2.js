import React, { useState } from 'react';
import './ContactUs2.css';
import Logo from '../../assets/images/Logo.svg';
import Call from '../../assets/images/Call-Icon.svg';
import Mail from '../../assets/images/Mail-Icon.svg';
import Map from '../../assets/images/Map-Icon.svg';
import Button from '../../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

//import Input from "../../components/common/Input";

const ContactUs2Form = () => {
  const [companyName, setCompanyName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [companyDescription, setreasonToOnboard] = useState('');
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName || !businessEmail || !companyDescription) {
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
      companyDescription,
    };

    try {
      // Make a POST request to your API endpoint
      const response = await fetch(
        'https://localhost:7075/api/managers/sendManagerInformation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Email sent successfully!',
          showConfirmButton: false,
          timer: 1500, // Automatically close after 1.5 seconds
          position: 'top-end',
        });
        // navigate('/contactResponse');
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
    <div className="app-container">
      <div className="left-partition"></div>
      <div className="middle-partition">
        <div className="logo">
          <img src={Logo} alt="Logo" width="100px" className="logo" />
        </div>
        <div className="card1">
          <p className="getStarted">Get Started ?</p>
          <br />
          <p className="contactAdmin">Contact Admin</p>
          <br />
          <p className="fill">
            Fill up the form and an admin will get in <br /> touch with you
          </p>
          <div className="card2">
            <div className="phone-container">
              <img src={Call} alt="call" className="call-icon" />
              <p className="call">+234 8036903126</p>
            </div>
            <br />
            <div className="Email-container">
              <img src={Mail} alt="email" className="email-icon" />
              <p className="email">hello@ticketease.com</p>
            </div>
            <br />
            <div className="map-container">
              <img src={Map} alt="map" className="map-icon" />
              <p className="map">34, Lekki Road, Lekki, Lagos</p>
            </div>
          </div>
        </div>
      </div>
      <div className="right-partition">
        <form className="form-container" onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="Company Name">
            Company Name
          </label>
          <input
            className="form-input"
            style={{ backgroundColor: 'white', color: 'black' }}
            type="text"
            id="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <br />
          <label className="form-label" htmlFor="Business Email">
            Business Email
          </label>
          <input
            className="form-input"
            style={{ backgroundColor: 'white', color: 'black' }}
            type="text"
            id="Business Email"
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
          />

          <br />
          <label className="form-label" htmlFor="Company Description">
            Company Description
          </label>
          <textarea
            className="form-textarea"
            style={{ backgroundColor: 'white', color: 'black' }}
            id="Company Description"
            value={companyDescription}
            onChange={(e) => setreasonToOnboard(e.target.value)}
          ></textarea>

          <br />
          {/* <button className="form-button">Send</button> */}
          <Button
            type="submit"
            className="form-button"
            style={{ background: '#505f98', width: '470px' }}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs2Form;
