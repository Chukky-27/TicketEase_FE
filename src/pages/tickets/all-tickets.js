import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import TicketCard from './TicketCard';
import styled from 'styled-components';

const ParentDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 8em;
`;

const App = () => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]); // New list

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await axios.get(url);
        const apiData = response.data.data.data;

        apiData.forEach((item) => {
          if (item.status === 0) {
            setList1((prevList) => [...prevList, item]);
          }
          if (item.status === 1) {
            setList2((prevList) => [...prevList, item]);
          }
          if (item.status === 2) {
            setList3((prevList) => [...prevList, item]);
          }
        });
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };
    const apiUrl1 = `https://localhost:7075/api/Ticket/project/${localStorage.getItem(
      'projectid'
    )}?page=1&perPage=5000`;

    fetchData(apiUrl1);
  }, []);

  async function updateStatus(item, destinationStatus) {
    console.log(item, destinationStatus);
    const data = {
      title: item.title,
      description: item.description,
      status: destinationStatus,
      priority: item.priority,
      resolvedAt: item.resolvedAt,
      assignedTo: item.assignedTo,
    };

    await fetch('https://localhost:7075/api/Ticket/edit-ticket/' + item.id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  const dragStart = (e, position, sourceList) => {
    dragItem.current = { position, sourceList };
  };

  const dragEnter = (e, position, targetList) => {
    dragOverItem.current = { position, targetList };
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnd = () => {
    if (!dragItem.current || !dragOverItem.current) return;

    const sourceList =
      dragItem.current.sourceList === 'list1'
        ? list1
        : dragItem.current.sourceList === 'list2'
        ? list2
        : list3; // Determine the source list
    const targetList =
      dragOverItem.current.targetList === 'list1'
        ? list1
        : dragOverItem.current.targetList === 'list2'
        ? list2
        : list3; // Determine the target list

    if (targetList === list1) {
      if (sourceList !== list1) {
        const newList1 = [...list1];
        const [draggedItem] = sourceList.splice(dragItem.current.position, 1);
        newList1.splice(dragOverItem.current.position, 0, draggedItem);
        setList1(newList1);
        updateStatus(draggedItem, 0);
      }
    } else if (targetList === list2) {
      if (sourceList !== list2) {
        const newList2 = [...list2];
        const [draggedItem] = sourceList.splice(dragItem.current.position, 1);
        newList2.splice(dragOverItem.current.position, 0, draggedItem);
        setList2(newList2);
        updateStatus(draggedItem, 1);
      }
    } else if (targetList === list3) {
      if (sourceList !== list3) {
        const newList3 = [...list3];
        const [draggedItem] = sourceList.splice(dragItem.current.position, 1);
        newList3.splice(dragOverItem.current.position, 0, draggedItem);
        setList3(newList3);
        updateStatus(draggedItem, 2);
      }
    }

    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <>
      <ParentDiv onDragOver={dragOver}>
        {/* <div
          style={{
            flex: 1,
            marginTop: '2em',
            marginLeft: '20em',
            marginRight: '2em',
            backgroundColor: 'white',
          }}
        >
          <div style={{ fontWeight: 'bold', margin: '1em' }}>To Do</div>

          {list1.length === 0 ? (
            <div
              style={{ margin: '1em' }}
              onDragEnter={(e) => dragEnter(e, 0, 'list1')}
              onDragEnd={dragEnd}
            >
              No pending tickets
            </div>
          ) : (
 
            list1.map((item, index) => (
              <div
                style={{ marginLeft: '1em', marginBottom: '1em' }}
                onDragStart={(e) => dragStart(e, index, 'list1')}
                onDragEnter={(e) => dragEnter(e, index, 'list1')}
                onDragEnd={dragEnd}
                key={index}
                draggable
              >
                <TicketCard
                  reference={item.ticketReference}
                  date={item.createdAt}
                  description={item.description}
                  key={index}
                  title={item.title}
                  priority={
                    item.priority === 0
                      ? 'Low'
                      : item.priority === 1
                      ? 'Medium'
                      : 'High'
                  }
                />
              </div>
            ))
          )}
        </div> */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'white',
            marginBottom: '2em',
            marginRight: '2em',
            marginTop: '2em',
            marginLeft: '20em',
          }}
        >
          <div style={{ fontWeight: 'bold', margin: '1em' }}>To Do</div>
          {list1.length === 0 ? (
            <div
              style={{ margin: '1em' }}
              onDragEnter={(e) => dragEnter(e, 0, 'list1')}
              onDragEnd={dragEnd}
            >
              No tickets in To Do
            </div>
          ) : (
            // Loop through the list when it is not empty
            list1.map((item, index) => (
              <div
                style={{ marginLeft: '1em', marginBottom: '1em' }}
                onDragStart={(e) => dragStart(e, index, 'list1')}
                onDragEnter={(e) => dragEnter(e, index, 'list1')}
                onDragEnd={dragEnd}
                key={index}
                draggable
              >
                <TicketCard
                  reference={item.ticketReference}
                  date={item.createdAt}
                  description={item.description}
                  key={index}
                  title={item.title}
                  priority={
                    item.priority === 0
                      ? 'Low'
                      : item.priority === 1
                      ? 'Medium'
                      : 'High'
                  }
                />
              </div>
            ))
          )}
        </div>
        <div style={{ flex: 1, backgroundColor: 'white', margin: '2em' }}>
          <div style={{ fontWeight: 'bold', margin: '1em' }}>In Progress</div>
          {list2.length === 0 ? (
            <div
              style={{ margin: '1em' }}
              onDragEnter={(e) => dragEnter(e, 0, 'list2')}
              onDragEnd={dragEnd}
            >
              No tickets in progress
            </div>
          ) : (
            // Loop through the list when it is not empty
            list2.map((item, index) => (
              <div
                style={{ marginLeft: '1em', marginBottom: '1em' }}
                onDragStart={(e) => dragStart(e, index, 'list2')}
                onDragEnter={(e) => dragEnter(e, index, 'list2')}
                onDragEnd={dragEnd}
                key={index}
                draggable
              >
                <TicketCard
                  reference={item.ticketReference}
                  date={item.createdAt}
                  description={item.description}
                  key={index}
                  title={item.title}
                  priority={
                    item.priority === 0
                      ? 'Low'
                      : item.priority === 1
                      ? 'Medium'
                      : 'High'
                  }
                />
              </div>
            ))
          )}
        </div>
        <div style={{ flex: 1, backgroundColor: 'white', margin: '2em' }}>
          <div style={{ fontWeight: 'bold', margin: '1em' }}>Completed</div>
          {list3.length === 0 ? (
            <div
              style={{ margin: '1em' }}
              onDragEnter={(e) => dragEnter(e, 0, 'list3')}
              onDragEnd={dragEnd}
            >
              No completed projects
            </div>
          ) : (
            // Loop through the list when it is not empty
            list3.map((item, index) => (
              <div
                style={{ marginLeft: '1em', marginBottom: '1em' }}
                onDragStart={(e) => dragStart(e, index, 'list3')}
                onDragEnter={(e) => dragEnter(e, index, 'list3')}
                onDragEnd={dragEnd}
                key={index}
                draggable
              >
                <TicketCard
                  reference={item.ticketReference}
                  date={item.createdAt}
                  description={item.description}
                  key={index}
                  title={item.title}
                  priority={
                    item.priority === 0
                      ? 'Low'
                      : item.priority === 1
                      ? 'Medium'
                      : 'High'
                  }
                />
              </div>
            ))
          )}
        </div>
      </ParentDiv>
    </>
  );
};

export default App;
