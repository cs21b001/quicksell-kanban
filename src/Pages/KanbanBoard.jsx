import React, { useEffect, useState } from 'react';

import './KanbanBoard.css';
import Column from '../Components/Column';
import DisplayDropdown from '../Components/Display/DisplayDropdown';


const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('');

  const priorityLabels = {
    0: 'No Priority',
    1: 'Low Priority',
    2: 'Medium Priority',
    3: 'High Priority',
    4: 'Urgent Priority'
  };

  useEffect(() => {
    const storedTickets = localStorage.getItem('tickets');
    const storedUsers = localStorage.getItem('users');

    if (storedTickets && storedUsers) {
      setTickets(JSON.parse(storedTickets));
    } else {
      fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
        .then(response => response.json())
        .then(data => {
          setTickets(data.tickets);

          localStorage.setItem('tickets', JSON.stringify(data.tickets));
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, []);

  const handleGroupChange = (group) => {
    setGrouping(group);
  };

  const handleSortChange = (sort) => {
    setSorting(sort);
  };

  const getGroupedTickets = () => {
    let groupedTickets= {};
    if(grouping === 'status'){
      groupedTickets = {
        'Todo': [],
        'In progress': [],
        'Done': [],
        'Backlog': [],
        'Cancelled': []
      };
    }
    tickets.forEach(ticket => {
      const groupKey = String(ticket[grouping]); // Convert to string for consistency
      if (!groupedTickets[groupKey]) {
        groupedTickets[groupKey] = [];
      }
      groupedTickets[groupKey].push(ticket);
    });

    if (sorting) {
      Object.keys(groupedTickets).forEach(key => {
        groupedTickets[key].sort((a, b) => {
          if (sorting === 'priority') {
            return b.priority - a.priority;
          } else if (sorting === 'title') {
            return a.title.localeCompare(b.title);
          }
          return 0;
        });
      });
    }

    return groupedTickets;
  };

  const groupedTickets = getGroupedTickets();

  console.log('Grouped Tickets:', groupedTickets);

  return (
    <div>
      <DisplayDropdown onGroupChange={handleGroupChange} onSortChange={handleSortChange} />
      <div className="kanban-board">
        {Object.keys(groupedTickets).map(groupKey => (
          <Column
          key={groupKey}
          title={grouping === 'priority' ? priorityLabels[groupKey] : groupKey}
          cards={groupedTickets[groupKey]}
          grouping= {grouping}
        />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;