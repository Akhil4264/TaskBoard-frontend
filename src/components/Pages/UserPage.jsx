import React, { useEffect, useState } from 'react';
import AddTeamMember from '../Sections/AddTeamMember';
import UserCard from '../Blocks/UserCard'
import CreateTask from '../Sections/CreateTask'
import EditTask from '../Blocks/EditTask'
import Tasks from '../Sections/Tasks';

const TeamPage = () => {
  const [allTasks] = useState([
    { id: 1, title: 'Task 1', priority: 'High', status: 'Ongoing', assigned_date: '2024-07-08', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', assigned_to: 'John Doe', deadline: '2024-07-10', attachments: ['attachment1.pdf', 'attachment2.png'] },
    { id: 2, title: 'Task 2', priority: 'Medium', status: 'Not Started', assigned_date: '2024-07-05', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', assigned_to: 'Jane Smith', deadline: '2024-07-12', attachments: ['attachment3.docx'] },
    { id: 3, title: 'Task 3', priority: 'Low', status: 'Done', assigned_date: '2024-07-06', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', assigned_to: 'Michael Brown', deadline: '2024-07-15', attachments: [] },
    { id: 4, title: 'Task 4', priority: 'High', status: 'Ongoing', assigned_date: '2024-07-07', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', assigned_to: 'John Doe', deadline: '2024-07-20', attachments: ['attachment4.txt'] },
    { id: 5, title: 'Task 5', priority: 'Medium', status: 'Not Started', assigned_date: '2024-07-08', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', assigned_to: 'Jane Smith', deadline: '2024-07-25', attachments: ['attachment5.xlsx'] },
    { id: 6, title: 'Task 6', priority: 'Low', status: 'Done', assigned_date: '2024-07-09', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', assigned_to: 'Michael Brown', deadline: '2024-07-14', attachments: [] }
  ]);

  const [teamMembers,setTeamMembers] = useState([
    { name: 'John Doe', team: 'Development', email: 'john@example.com' },
  ]);

  const [filteredTeamMembers, setFilteredTeamMembers] = useState(teamMembers);
  const [searchText, setSearchText] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMember, setModalMember] = useState({});

  useEffect(()=>{
    const filteredMembers = teamMembers.filter(member =>
      member.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredTeamMembers(filteredMembers);
    
    // change tasks
  },[teamMembers, searchText]);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);

    const filteredMembers = teamMembers.filter(member =>
      member.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    
    setFilteredTeamMembers(filteredMembers);
  };

  const filterTasksByPriority = (priority) => {
    setFilterPriority(priority.toLowerCase());
  };

  const filterTasksByStatus = (status) => {
    setFilterStatus(status.toLowerCase());
  };

  const clearFilters = () => {
    setFilterPriority('');
    setFilterStatus('');
    setSelectedMember('');
    setSortBy('');
    setSearchText('');
  };

  const handleMemberClick = (memberName) => {
    setSelectedMember(memberName.toLowerCase());
    const member = teamMembers.find(member => member.name.toLowerCase() === memberName.toLowerCase());
    if(memberName === "") return;
    setModalMember(member);
    setShowModal(true);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const getSortedTasks = () => {
    let sortedTasks = [...filteredTasks];

    switch (sortBy) {
      case 'assigned_date':
        sortedTasks.sort((a, b) => new Date(a.assigned_date) - new Date(b.assigned_date));
        break;
      case 'priority':
        sortedTasks.sort((a, b) => {
          const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
          return priorityOrder[b.priority.toLowerCase()] - priorityOrder[a.priority.toLowerCase()];
        });
        break;
      case 'status':
        sortedTasks.sort((a, b) => {
          const statusOrder = { 'ongoing': 3, 'not started': 2, 'done': 1 };
          return statusOrder[b.status.toLowerCase()] - statusOrder[a.status.toLowerCase()];
        });
        break;
      default:
        break;
    }

    return sortedTasks;
  };

  const filteredTasks = allTasks.filter(task => (
    (filterPriority === '' || task.priority.toLowerCase() === filterPriority) &&
    (filterStatus === '' || task.status.toLowerCase() === filterStatus) &&
    (selectedMember === '' || task.assigned_to.toLowerCase() === selectedMember)
  ));

  const sortedTasks = getSortedTasks();

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-3">
          <h3>Team Members</h3>
          <div className="member-list" >
            <input type="text" className="form-control mb-3" placeholder="Search members by name"  onChange={handleSearch} />
            <ul className="list-group" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <li className="list-group-item cursor-pointer" onClick={() => handleMemberClick('')}>
                All Members
              </li>
              {filteredTeamMembers.map((member, index) => (
                <li key={index} className="list-group-item cursor-pointer" onClick={() => handleMemberClick(member.name)}>
                  {member.name}
                </li>
              ))}
            </ul>
          </div>
          <AddTeamMember  teamMembers={teamMembers} setTeamMembers={setTeamMembers}/>
          <CreateTask teamMembers={teamMembers}/>
        </div>
        <div className="col-md-9">
          <div className="row mb-3">
            <div className="col">
              <select className="form-select" value={filterPriority} onChange={(e) => filterTasksByPriority(e.target.value)}>
                <option value="">Filter by Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="col">
              <select className="form-select" value={filterStatus} onChange={(e) => filterTasksByStatus(e.target.value)}>
                <option value="">Filter by Status</option>
                <option value="ongoing">Ongoing</option>
                <option value="not started">Not Started</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="col">
              <select className="form-select" value={sortBy} onChange={handleSortChange}>
                <option value="">Sort by</option>
                <option value="assigned_date">Assigned Date</option>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
              </select>
            </div>
            <div className="col">
              <button className="btn btn-outline-secondary" onClick={clearFilters}>Clear Filters</button>
            </div>
          </div>
          <Tasks sortedTasks={sortedTasks} teamMembers={teamMembers}/>
        </div>
      </div>
      <UserCard
        show={showModal}
        handleClose={() => setShowModal(false)}
        member={modalMember}
        teamMembers = {teamMembers}
        setTeamMembers = {setTeamMembers}
      />
    </div>
  );
};

export default TeamPage;
