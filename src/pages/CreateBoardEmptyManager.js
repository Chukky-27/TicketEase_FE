import styled from 'styled-components';
import NoBoard from '../assets/NoBoard.svg';
import AddIcon from '../assets/addIcon.svg';
import { useState } from 'react';
import CreateBoard from './Boards/CreateBoard';

const Fulldiv = styled.div`
  overflow: hidden;
  margin-top: 100px;
  margin-left: 310px;
  background-color: white !important;
  height: 689px;
`;
const StyledMain = styled.div`
  margin-top: 130px;
  margin-left: 100px;
`;

const ImgTag = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;
`;

const StyledFirstText = styled.p`
  color: #1d2126;
  font-family: 'Mulish', sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: block;
  text-align: center;
`;

const StyledSecondText = styled.p`
  color: #8c92a2;
  font-family: 'Mulish', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: block;
  text-align: center;
`;
const Board = styled.div`
  color: #1d2126;
  font-family: Mulish;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  display: flex;
  width: 231px;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 6px;
  background-color: #505f98;
  color: #fff;
  font-family: Mulish;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 40px !important;
  margin: 0 auto;
`;

function CreateBoardEmptyManager({ handleBoardMain }) {
  const [steps, setsteps] = useState(0);
  return (
    <>
      {steps === 0 && (
        <>
          <Board>Boards</Board>
          <Fulldiv>
            <StyledMain>
              <div>
                <ImgTag src={NoBoard} alt="No Board" />

                <StyledFirstText className="FirstText">
                  No Board Created
                </StyledFirstText>
                <StyledSecondText className="SecondText">
                  You have not created any Board yet
                </StyledSecondText>

                <div>
                  <StyledButton
                    className="btn"
                    onClick={() => setsteps(1)}
                    style={{
                      background: '#505f98',
                      width: '270px',
                      cursor: 'pointer',
                    }}
                  >
                    <img src={AddIcon} alt="AddIcon" />
                    Create Board
                  </StyledButton>
                </div>
              </div>
            </StyledMain>
          </Fulldiv>
        </>
      )}
      {steps === 1 && <CreateBoard handleBoardMain={handleBoardMain} />}
    </>
  );
}

export default CreateBoardEmptyManager;
