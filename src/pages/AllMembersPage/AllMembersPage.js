import React, { useEffect, useState } from 'react';
import * as S from '../../components/AllMembers/AllMembers';
import { FaArrowLeft } from 'react-icons/fa';
import AllMembersTable from '../AllMembersPage/AllMembersTable';
import AxiosInstance from '../../Request/AxiosInstance.js';

const AllMembers = () => {
  const [allMembers, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);

  const getMembers = async () => {
    try {
      const res = await AxiosInstance.get(
        `/User/get-Users-By-ManagerId?managerId=${localStorage.getItem(
          'userId'
        )}&page=${currentPage}&perPage=${itemsPerPage}`
        // `/User/get-Users-By-ManagerId?managerId=6db01435-a30c-44ae-9e23-95e1fecf0180&page=${currentPage}&perPage=${itemsPerPage}`
      );
      // console.log('API Response:', res.data);
      const { data, totalCount } = res.data;

      setMembers(data);
      setTotalItems(totalCount);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewClick = (member) => {
    console.log('View clicked:', member);
  };

  useEffect(() => {
    getMembers();
  }, [currentPage]);

  return (
    <section>
      <S.StyledContainer>
        <div style={{ position: 'relative' }}>
          <S.Leftarrow>
            <FaArrowLeft size={24} />
            <S.Text>Go Back</S.Text>
          </S.Leftarrow>

          <S.Show>
            <S.MainTop style={{ whiteSpace: 'nowrap' }}>
              All Registered Members
            </S.MainTop>
            {/* <S.Sort>
              Sort By{' '}
              <select>
                <option value="all">All</option>
                <option value="Newest">Newest</option>
              </select>
            </S.Sort> */}
          </S.Show>

          {/* Updated prop name from 'companies' to 'data' */}
          <AllMembersTable
            data={allMembers} // Updated prop name
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            handleViewClick={handleViewClick}
            totalItems={totalItems}
            setCurrentPage={setCurrentPage}
            getMembers={getMembers}
          />
        </div>
      </S.StyledContainer>
    </section>
  );
};

export default AllMembers;
