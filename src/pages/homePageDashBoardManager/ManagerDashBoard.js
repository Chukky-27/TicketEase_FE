import React, { useEffect, useState } from 'react';
import '../homePageDashBoardManager/ManagerDashBoard.css';
import HorizontalBarChart2 from '../homePageDashBoardManager/HorizontalBarChart2.js';
import Sider from '../../components/SideBar/Sider.jsx';
import AxiosInstance from '../../Request/AxiosInstance.js';
import AxiosInstance2 from '../../Request/AxiosInstance.js';
import { Frame } from '../../components/Header/Header/Header.js';
import ManagerTable from './ManagerTable.js';
import CreateBoardEmptyManager from '../CreateBoardEmptyManager.js';
import RegisteredMembers from '../RegisteredMembers.js';
import LogoutPopout from '../../components/logout/Logout.js';
import ContactUs2Form from '../contactUs2/ContactUs2.js';
import ChangePassword from '../ChangePassword.js';
import BoardMain from '../BoardPage/BoardMain.js';
import AllMembers from '../AllMembersPage/AllMembersPage.js';
import CreateProject from '../Projects/CreateProject.js';
import AllProjects from '../AllProjectsPage/AllProjects.jsx';
import CreateBoard from '../Boards/CreateBoard.js';
import AllTickets from '../tickets/all-tickets.js';
import CreateNewTicket from '../CreateNewTicket.js';
import CreateTicket from '../TicketInputfield.js';
import EditMember from '../EditMemberFolder/EditMember.js';
import { useNavigate } from 'react-router-dom';
import MemberProfile from '../../pages/MemberProfile.js';
import EditMember2 from '../EditMemberFolder2/EditMember2.js';

function ManagerDashBoard() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalItems, setTotalItems] = useState(0);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  var userid = localStorage.getItem('userId');
  var boardid = localStorage.getItem('boardid');

  if (userid === null) {
    console.log('userId is null');
    navigate('/regularlogin');
  }

  var userole = localStorage.getItem('userRole');
  console.log('userRole ' + userole);

  if (userole === 'SuperAdmin') {
    navigate('/admindashboard');
  }

  const handleBoardMain = () => {
    setStep(8);
  };
  const handleAllMembers = () => {
    setStep(16);
  };

  const handleCreateProject = (e) => {
    setStep(9);
  };

  const handleViewAllProjecs = () => {
    setStep(10);
  };

  const handleCreateBoard = () => {
    setStep(11);
  };

  const handleViewTickets = () => {
    setStep(13);
  };

  const handleCreateTicket = () => {
    setStep(15);
  };

  const getUsers = async () => {
    try {
      const res = await AxiosInstance.get(
        `/User/get-Users-By-ManagerId?managerId=${userid}&page=${currentPage}&perPage=${itemsPerPage}`
        // `/User/get-Users-By-ManagerId?managerId=6db01435-a30c-44ae-9e23-95e1fecf0180&page=${currentPage}&perPage=${itemsPerPage}`
      );

      setUsers(res.data.data);
      setTotalItems(res.data.totalCount);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const handleViewClick = (users) => {
    console.log('View clicked:', users);
  };

  return (
    <section className="mothercard">
      <Frame
        logout={() => setStep(5)}
        ChangePassword={() => setStep(14)}
        managerdetails={() => setStep(12)}
        personaldetails={() => setStep(18)}
      />
      <Sider step={step} selectstep={(step) => setStep(step)} />
      <>
        {step === 0 && (
          <>
            <h2 className="dashboard">Manager DashBoard</h2>
            <div className="containe" style={{ width: '1100px' }}>
              <h2 className="text" style={{ paddingTop: '0.5em' }}>
                Total Members
              </h2>
              <div className="inner-box">
                <h1 className="text2">{totalItems}</h1>
              </div>

              <div />
            </div>

            <div>
              <div className="card">
                <div className="graphwork">
                  <div className="card4">
                    <h1 className="active">ACTIVITIES</h1>
                  </div>
                  <div className="chartdiv">
                    <HorizontalBarChart2 />
                  </div>
                </div>
              </div>
              <h1 className="org"> Registered Members</h1>
            </div>
            <div className="tablecard">
              <div className="tableit">
                <ManagerTable
                  registeredUsers={users}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  handleViewClick={handleViewClick}
                  totalItems={totalItems}
                  setCurrentPage={setCurrentPage}
                  getUsers={getUsers}
                />
              </div>
            </div>
          </>
        )}
        {step === 1 && <MemberProfile handleAllMembers={handleAllMembers} />}
        {step === 2 && (
          <BoardMain
            handleBoardMain={handleBoardMain}
            handleCreateProject={handleCreateProject}
            handleViewAllProjecs={handleViewAllProjecs}
            handleCreateBoard={handleCreateBoard}
            handleViewTickets={handleViewTickets}
          />
        )}
        {/* {step === 3 && (
          <CreateProject handleViewAllProjecs={handleViewAllProjecs} />
        )} */}
        {/* {step === 4 && (
          <CreateNewTicket handleCreateTicket={handleCreateTicket} />
        )} */}
        {step === 3 && <ContactUs2Form />}
        {step === 5 && <LogoutPopout />}
        {step === 14 && <ChangePassword />}
        {step === 8 && (
          <BoardMain
            handleBoardMain={handleBoardMain}
            handleCreateProject={handleCreateProject}
            handleViewAllProjecs={handleViewAllProjecs}
            handleCreateBoard={handleCreateBoard}
            handleViewTickets={handleViewTickets}
          />
        )}
        {step === 16 && <AllMembers />}
        {step === 9 && (
          <CreateProject handleViewAllProjecs={handleViewAllProjecs} />
        )}
        {step === 10 && (
          <AllProjects
            handleViewTickets={handleViewTickets}
            handleCreateTicket={handleCreateTicket}
          />
        )}
        {step === 11 && <CreateBoard handleBoardMain={handleBoardMain} />}
        {step === 12 && <EditMember />}
        {step === 18 && <EditMember2 />}
        {step === 13 && <AllTickets />}
        {step === 15 && <CreateTicket handleViewTickets={handleViewTickets} />}
      </>
    </section>
  );
}

export default ManagerDashBoard;
