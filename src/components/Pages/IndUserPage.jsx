import React, { useEffect, useState } from 'react';
import AddTeamMember from '../Sections/AddTeamMember';
import UserModal from '../Blocks/UserModal'
import CreateTask from '../Sections/CreateTask'
import EditTask from '../Blocks/EditTask'
import Tasks from '../Sections/Tasks';
import UserCard from '../Blocks/UserCard';
import request from '../request'
import { useParams } from 'react-router';

const TeamPage = () => {

  const params = useParams()

  const [loggedUser, setloggedUser] = useState({
    "role": "admin"
  })

  const [allTasks,setAllTasks] = useState([]);
  const [indUser, setIndUser] = useState({ name: 'John Doe', team: '', email: 'john@example.com' })
  const [teamMembers, setTeamMembers] = useState([]);
  const [teams,setTeams] = useState([])
  const [team,setTeam] = useState()
  const [searchText, setSearchText] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMember, setModalMember] = useState({});



  useEffect(() => {
    request.get('/admin/getTeams')
            .then((res) => {
                if(!res.data){
                    return 
                }
                setTeams([...res.data])
            })
            .catch((err) => {
                alert(err)
            })


    request.get(`/getUser/${params.id}`)
    .then((res) => {
      console.log(res.data)
      setIndUser(res.data.user)
      setTeamMembers([res.data.user])
    })
    .catch(err => {
      console.log(err)
    })

    request.get(`/task/user/${params.id}`)
    .then((res) => {
      console.log(res.data)
      setAllTasks([...res.data.teamTasks])
    })
    .catch(err => {
      console.log(err)
    })


  },[])


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
    if (memberName === "") return;
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
        <div className="col-md-3 border rounded ">
          <div>
            <UserCard member={indUser} loggedUser={loggedUser} teams={teams}/>
            <CreateTask teamMembers={teamMembers} allTasks={allTasks} setAllTasks={setAllTasks}/>
          </div>
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
          <Tasks sortedTasks={sortedTasks} teamMembers={teamMembers} allTasks={allTasks} setAllTasks={setAllTasks}/>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
