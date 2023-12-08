// import React, { useEffect, useState } from 'react';
// import BoardCard, { MergedComponent } from './BoardCard.js';
// import styled from 'styled-components';

// const CardsContainer = styled.div`
//   display: grid;
//   grid-template-columns: 30% 30% 30%;
//   flex-wrap: wrap;
//   justify-content: center;
//   marging-left: 54em !important;
//   gap: 10px;
// `;

// const BoardMain = ({ handleCreateProject }) => {
//   // State to store the board data
//   const [boardData, setBoardData] = useState([]);

//   // Function to fetch data from the API
//   const fetchBoardData = async () => {
//     try {
//       const response = await fetch(
//         'https://localhost:7075/api/Board/get-all-board-by-pagination?page=1&perPage=6'
//       );
//       const data = await response.json();

//       // Assuming the response structure is an array of board objects
//       setBoardData(data?.boards || []);
//     } catch (error) {
//       console.error('Error fetching board data:', error);
//     }
//   };

//   // Use useEffect to fetch data when the component mounts
//   useEffect(() => {
//     fetchBoardData();
//   }, []); // Empty dependency array ensures the effect runs only once on mount

//   return (
//     <div style={{ marginLeft: '10em' }}>
//       {/* Render MergedComponent above the CardsContainer */}
//       <MergedComponent />

//       {/* CardsContainer with board data */}
//       <CardsContainer>
//         {boardData.length > 0 ? (
//           boardData.map((board) => (
//             <BoardCard
//               handleCreateProject={handleCreateProject}
//               key={board.id}
//               boardName={board.name}
//             />
//           ))
//         ) : (
//           <div>No Available boards</div>
//         )}
//       </CardsContainer>
//     </div>
//   );
// };

// export default BoardMain;

import React, { useEffect, useState } from 'react';
import BoardCard, { MergedComponent } from './BoardCard.js';
import styled from 'styled-components';
import Pagination from '../../components/organization/Pagination'; // Import the Pagination component

const CardssContainer = styled.div`
  display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important;
  grid-template-columns: 1fr 1fr 1fr !important;
  gap: 0px;
  justify-content: center;
  margin-left: 11em;
  margin-top: 2em;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const BoardMain = ({
  handleCreateProject,
  handleViewAllProjecs,
  handleCreateBoard,
  handleViewTickets,
  handleBoardMain,
}) => {
  // State to store the board data
  //   const [boardData, setBoardData] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const itemsPerPage = 1;

  //   // Function to fetch data from the API
  //   const fetchBoardData = async (page) => {
  //     try {
  //       const response = await fetch(
  //         `https://localhost:7075/api/Board/GetBoardByManagerId?managerId=${localStorage.getItem(
  //           'userId'
  //         )}&page=${currentPage}&perPage=${itemsPerPage}`
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //       // Assuming the response structure is an array of board objects
  //       setBoardData(data?.data?.boards || []);
  //     } catch (error) {
  //       console.error('Error fetching board data:', error);
  //     }
  //   };

  //   // Use useEffect to fetch data when the component mounts or when the currentPage changes
  //   useEffect(() => {
  //     fetchBoardData(currentPage);
  //   }, [currentPage]);

  //   // Function to handle page change
  //   const handlePageChange = (page) => {
  //     setCurrentPage(page);
  //   };

  //   return (
  //     <div style={{ marginLeft: '10em' }}>
  //       {/* Render MergedComponent above the CardsContainer */}
  //       <MergedComponent handleCreateBoard={handleCreateBoard} />

  //       {/* CardsContainer with board data */}
  //       <CardssContainer>
  //         {boardData.length > 0 ? (
  //           boardData.map((board) => (
  //             <BoardCard
  //               handleCreateProject={handleCreateProject}
  //               handleViewAllProjecs={handleViewAllProjecs}
  //               handleViewTickets={handleViewTickets}
  //               key={board.id}
  //               boardName={board.name}
  //             />
  //           ))
  //         ) : (
  //           <div>No Available boards</div>
  //         )}
  //       </CardssContainer>

  //       {/* Pagination component */}
  //       <Pagination
  //         currentPage={currentPage}
  //         setCurrentPage={setCurrentPage}
  //         totalItems={boardData.length > 0 ? boardData[0].totalCount : 0}
  //         itemsPerPage={6}
  //         handlePageChange={handlePageChange}
  //         totalPageCount={Math.ceil(
  //           (boardData.length > 0 ? boardData[0].totalCount : 0) / 6
  //         )}
  //       />
  //     </div>
  //   );
  // };

  // export default BoardMain;

  const [boardData, setBoardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [totalPages, setTotalPages] = useState(0);

  // Function to fetch data from the API
  const fetchBoardData = async (page) => {
    try {
      const response = await fetch(
        `https://localhost:7075/api/Board/GetBoardByManagerId?managerId=${localStorage.getItem(
          'userId'
        )}&page=${itemsPerPage}&perPage=${currentPage}`
      );
      const data = await response.json();
      console.log(data);

      // Assuming the response structure is an array of board objects
      setBoardData(data?.data?.boards || []);
      setTotalPages(data?.data?.totalPageCount || 0);
    } catch (error) {
      console.error('Error fetching board data:', error);
    }
  };

  // Use useEffect to fetch data when the component mounts or when the currentPage changes
  useEffect(() => {
    fetchBoardData(currentPage);
  }, [currentPage]);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ marginLeft: '10em' }}>
      {/* Render MergedComponent above the CardsContainer */}
      <MergedComponent handleCreateBoard={handleCreateBoard} />

      {/* CardsContainer with board data */}
      <CardssContainer>
        {boardData.length > 0 ? (
          boardData.map((board) => (
            <BoardCard
              handleCreateProject={handleCreateProject}
              handleViewAllProjecs={handleViewAllProjecs}
              handleViewTickets={handleViewTickets}
              handleBoardMain={handleBoardMain}
              key={board.id}
              boardName={board.name}
              boardId={board.id}
            />
          ))
        ) : (
          <div>No Available boards</div>
        )}
      </CardssContainer>

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={boardData.length > 0 ? boardData[0].totalCount : 0}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
        totalPageCount={totalPages}
      />
    </div>
  );
};

export default BoardMain;
