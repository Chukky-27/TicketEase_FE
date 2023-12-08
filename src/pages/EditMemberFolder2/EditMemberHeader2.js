import styled from 'styled-components';
import { useRef, useState } from 'react';
import { RxAvatar } from 'react-icons/rx';

const Header = styled.div`
  height: 120px;
  background: #505f98;
  //
`;

const Ellipse = styled.div`
  background: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  left: 150px;
  top: 160px;
  box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.5);
  margin-left: 300px;
`;

const Description = styled.div`
  padding-left: 26%;
  margin-left: 150px;
  margin-top: 3em;
  //
`;

const EditMemberHeader2 = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Header></Header>
      {/* <div onClick={handleImageClick}>
        {image ? (
          <img
            src={image}
            alt="Selected Avatar"
            style={{
              width: '150px',
              height: '150px',
              marginLeft: '100px',
              marginTop: '-40px',
              borderRadius: 100,
            }}
          />
        ) : (
          <RxAvatar
            style={{
              width: '150px',
              height: '150px',
              marginLeft: '100px',
              marginTop: '-40px',
              backgroundColor: 'gray',
              borderRadius: 100,
            }}
          />
        )}
        <input
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div> */}
      <Description>
        <h3> Personal Details</h3>
        <p> Edit and Save the Below Details</p>
      </Description>
    </div>
  );
};

export default EditMemberHeader2;
