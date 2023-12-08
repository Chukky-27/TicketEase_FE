import React, { useEffect, useState } from 'react';
import '../homePageDashboardAdmin/AdminDashboard.css';
import notification from '../../assets/images/notification 1.svg';
import HorizontalBarChart from './HorizontalBarChart.js';
import CompanyTable from './CompanyTable.js';
import AxiosInstance from '../../Request/AxiosInstance.js';
import SideBar from './SideBar.js';
import { Frame } from '../../components/Header/Header/Header.js';
import NoOrganisation from '../manager/EmptyOrganisation.js';
import CreateOrganizationsAdmin from '../admin/CreateOrganizationsAdmin.js';
import LogoutPopout from '../../components/logout/Logout.js';
import ChangePassword from '../ChangePassword.js';
import AddManager2 from '../manager/AddManagerFom.js';
import { useNavigate } from 'react-router-dom';

function AdminDashBoard() {
  const [managers, setManagers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalItems, setTotalItems] = useState(0);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  var userid = localStorage.getItem('userId');

  if (userid === null) {
    console.log('userId is null');
    navigate('/regularlogin');
  }

  var userole = localStorage.getItem('userRole');
  if (userole !== 'SuperAdmin') {
    navigate('/managerdashboard');
  }
  console.log('userRole ' + userole);

  const handleCreateOrganization = () => {
    setStep(7);
  };

  const getManagers = async () => {
    try {
      const res = await AxiosInstance.get(
        `/managers/GetAll?page=${currentPage}&perPage=${itemsPerPage}`
      );

      setManagers(res.data.result.data.data);
      setTotalItems(res.data.result.data.totalCount);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewClick = (manager) => {
    console.log('View clicked:', manager);
  };

  useEffect(() => {
    getManagers();
  }, [currentPage]);

  return (
    <section className="mothercard">
      <Frame logout={() => setStep(5)} ChangePassword={() => setStep(6)} />
      <SideBar step={step} selectStep={(step) => setStep(step)} />
      <>
        {step === 0 && (
          <>
            <h2 className="dashboard">Admin Dashboard</h2>
            <div className="container">
              <h2 className="text">Total Organizations</h2>
              <div className="inner-box">
                <h1 className="text2">{totalItems}</h1>
              </div>
            </div>

            <div>
              <div className="cardd">
                <div className="graphwork">
                  <div className="card4">
                    <h1 className="active">ACTIVITIES</h1>
                  </div>
                  <div className="chartdiv">
                    <HorizontalBarChart />
                  </div>
                </div>
              </div>
              <div className="bellCard">
                <div className="bellImg">
                  <img src={notification} alt="bell" />
                </div>
                <div className="bellText">
                  <h1>No notification yet</h1>
                  <h2>
                    You currently have no notification. <br />
                    We'll notify you when something new arrives!
                  </h2>
                </div>
              </div>
              <h1 className="org"> Registered Organizations</h1>
            </div>

            <div className="tablecard">
              <div className="tableit">
                <CompanyTable
                  companies={managers}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  handleViewClick={handleViewClick}
                  totalItems={totalItems}
                  setCurrentPage={setCurrentPage}
                  getManagers={getManagers}
                />
              </div>
            </div>
          </>
        )}
        {step === 1 && <NoOrganisation />}
        {step === 2 && (
          <CreateOrganizationsAdmin
            handleCreateOrganization={handleCreateOrganization}
          />
        )}
        {step === 5 && <LogoutPopout />}
        {step === 6 && <ChangePassword />}
        {step === 7 && <AddManager2 />}
      </>
    </section>
  );
}

export default AdminDashBoard;
