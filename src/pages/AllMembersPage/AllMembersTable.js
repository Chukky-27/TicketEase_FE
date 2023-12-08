import React, { useState } from 'react';
import ProfileDetails from '../ProfileDetails.js';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 220px;
  margin-right: 16em;
`;

const AllMembersTable = ({
  data,
  currentPage,
  itemsPerPage,
  totalItems,
  setCurrentPage,
  getMembers,
}) => {
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  const changePage = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (
      direction === 'next' &&
      currentPage < Math.ceil(totalItems / itemsPerPage)
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getMembers(pageNumber);
  };

  const handleViewDetails = (userDetails) => {
    setSelectedUserDetails(userDetails);
  };

  const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = [];
    const ellipsis = <span style={{ margin: '0 5px' }}>...</span>;

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            style={{
              padding: '3px 8px',
              cursor: 'pointer',
              background: '#505F98',
              color: 'white',
              fontWeight: currentPage === i ? 'bold' : 'normal',
            }}
          >
            {i}
          </button>
        );
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pageNumbers.push(
          <button
            key={1}
            onClick={() => handlePageChange(1)}
            style={{
              padding: '3px 8px',
              cursor: 'pointer',
              background: '#505F98',
              color: 'white',
            }}
          >
            1
          </button>
        );
        pageNumbers.push(ellipsis);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            style={{
              padding: '3px 8px',
              cursor: 'pointer',
              background: '#505F98',
              color: 'white',
              fontWeight: currentPage === i ? 'bold' : 'normal',
            }}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        pageNumbers.push(ellipsis);
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            style={{
              padding: '3px 8px',
              cursor: 'pointer',
              background: '#505F98',
              color: 'white',
            }}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <>
      <Container>
        <div>
          {/* Table content */}
          <table
            style={{
              width: '125%',
              borderCollapse: 'collapse',
              marginTop: '10px',
              background: '#FFF',
              height: '100%',
            }}
          >
            <thead>
              <tr style={{ background: '#E5E5E5', color: '#444' }}>
                <th style={tableCellStyle}>SN</th>
                <th style={tableCellStyle}>First Name</th>
                <th style={tableCellStyle}>Last Name</th>
                <th style={tableCellStyle}>Email</th>
                <th style={tableCellStyle}>Phone Number</th>
                <th style={tableCellStyle}></th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td style={tableCellStyle}>
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td style={tableCellStyle}>{item.firstName}</td>
                    <td style={tableCellStyle}>{item.lastName}</td>
                    <td style={tableCellStyle}>{item.email}</td>
                    <td style={tableCellStyle}>{item.phoneNumber}</td>
                    <td style={tableCellStyle}>
                      <button
                        style={{
                          padding: '3px 8px',
                          cursor: 'pointer',
                          background: '#505F98',
                          color: 'white',
                        }}
                        onClick={() => handleViewDetails(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              onClick={() => changePage('prev')}
              style={{
                padding: '3px 8px',
                cursor: 'pointer',
                background: '#505F98',
                color: 'white',
              }}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'center',
                margin: '0 10px',
              }}
            >
              {renderPageNumbers()}
            </ul>

            <button
              onClick={() => changePage('next')}
              style={{
                padding: '3px 8px',
                cursor: 'pointer',
                background: '#505F98',
                color: 'white',
              }}
              disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
        {selectedUserDetails && (
          <ProfileDetails
            userDetails={selectedUserDetails}
            onClose={() => setSelectedUserDetails(null)}
          />
        )}
      </Container>
    </>
  );
};

export default AllMembersTable;
