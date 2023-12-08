import styled from 'styled-components';

const InProgress1 = styled.div`
  position: relative;
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;
const Medium = styled.div`
  position: relative;
  font-size: 11px;
`;
const Prioritymedium = styled.div`
  border-radius: var(--br-xl);
  background-color: var(--color-burlywood);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-9xs) var(--padding-5xs);
`;
const AddMoreUser = styled.div`
  position: relative;
  font-size: var(--font-size-xs);
  font-weight: 500;
  display: inline-block;
  width: 100%;
`;
const Tagmobile = styled.div`
  border-radius: var(--br-9xs);
  background-color: var(--color-deeppink);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-9xs);
`;
const Tagweb = styled.div`
  border-radius: var(--br-9xs);
  background-color: #505f98;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-9xs);
`;
const TagmobileParent = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-5xs);
  color: var(--color-gray-100);
`;
const Mar32020 = styled.div`
  position: relative;
  font-size: var(--font-size-2xs);
  color: var(--support-dark-grey);
`;
const Useruser01Icon = styled.img`
  position: relative;
  width: 32px;
  height: 32px;
`;
const Useruser01Parent = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const Cardnormal = styled.div`
  border-radius: var(--br-9xs);
  background-color: var(--color-white);
  border: 1px solid var(--support-dark-grey);
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xs);
  gap: var(--gap-5xs);
`;
const Prioritylow = styled.div`
  border-radius: var(--br-xl);
  background-color: var(--color-darkseagreen);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-9xs) var(--padding-5xs);
`;
const Tagmobile1 = styled.div`
  border-radius: var(--br-9xs);
  background-color: var(--color-deeppink);
  overflow: hidden;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-9xs);
`;

const Bod = styled.div`
  /* fonts */
  --font-poppins: Poppins;

  /* font sizes */
  --font-size-2xs: 11px;
  --font-size-3xs: 10px;
  --font-size-xs: 12px;

  /* Colors */
  --support-white-grey: #f9f9f9;
  --support-light-grey: #e5e5e5;
  --color-white: #fff;
  --support-dark-grey: #666;
  --color-mediumblue: #4f1dde;
  --primary-black: #221c1d;
  --color-gray-100: rgba(255, 255, 255, 0.9);
  --color-deeppink: #de1d6e;
  --color-darkseagreen: #b8ebb0;
  --color-burlywood: #f0ca81;

  width: 95%;
  /* Gaps */
  --gap-5xs: 8px;

  /* Paddings */
  --padding-5xs: 8px;
  --padding-9xs: 4px;

  /* Border radiuses */
  --br-9xs: 4px;
  --br-xl: 20px;
`;
const Low = styled.div`
  position: relative;
  font-size: 12px;
`;

const Priorityhigh = styled.div`
  border-radius: var(--br-xl);
  background-color: #de1d3e;
  overflow: hidden;
  display: flex;
  color: white;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-9xs) var(--padding-5xs);
`;
const Title = styled.span`
  overflow: hidden;
  align-items: right;
  float: right;
  justify-content: flex-end;
  font-weight: bold;
  font-size: 12px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const TicketCard = (props) => {
  const { title, priority, description, date, reference } = props;
  const PriorityComponent =
    priority === 'Low'
      ? Prioritylow
      : priority === 'Medium'
      ? Prioritymedium
      : Priorityhigh;

  return (
    <Bod>
      <Cardnormal>
        <Header>
          <PriorityComponent>
            <Low>{priority}</Low>
          </PriorityComponent>
          <Title>{title}</Title>
        </Header>

        <AddMoreUser>{description}</AddMoreUser>
        <TagmobileParent>
          <Tagweb>
            <Medium>{reference}</Medium>
          </Tagweb>
        </TagmobileParent>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Mar32020>{date}</Mar32020>
          <Useruser01Parent>
            <Useruser01Icon
              alt=""
              src="https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-2.jpg"
            />
          </Useruser01Parent>
        </div>
      </Cardnormal>
    </Bod>
  );
};

export default TicketCard;
