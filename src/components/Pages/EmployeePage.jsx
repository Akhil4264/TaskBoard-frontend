import React, { useEffect, useState } from 'react';
import AddTeamMember from '../Sections/AddTeamMember';
import UserCard from '../Blocks/UserModal'
import CreateTask from '../Sections/CreateTask'
import EditTask from '../Blocks/EditTask'
import Tasks from '../Sections/Tasks';
import request from '../request'

import Header from '../Sections/Header'
import { useNavigate } from 'react-router';



const TeamPage = () => {
  const navigate = useNavigate()
  const [loggedUser,setloggedUser] = useState()

  const [team,setTeam] = useState()
  const [allTasks,setAllTasks] = useState([]);

  const [teamMembers,setTeamMembers] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await request.post(`/getUser`,{token : localStorage.getItem("token")})
        console.log(res.data)
        if (res.data.InvalidToken || res.data.ExpiredToken) {
          localStorage.removeItem("token")
          return
        }
        if (res.data.tokenMsg) {
          console.log(res.data)
          navigate('/')
          return
        }
        if(res.data.InvalidToken || res.data.ExpiredToken){
          localStorage.removeItem("token")
          navigate('/')
          return 
        }
        if (res.data.user) {
          setloggedUser({...res.data.user})
          setTeam(res.data.team)
          res.data.members.length===0 ? setTeamMembers([res.data.user]) : setTeamMembers([...res.data.members])
          request.post(`/task/user/${res.data.user.id}`,{token : localStorage.getItem("token")})
            .then((res) => {
              if (res.data.tokenMsg) {
                console.log(res.data.tokenMsg)
                navigate("/")
                return
              }
              if (res.data.InvalidToken || res.data.ExpiredToken) {
                localStorage.removeItem("token")
                navigate("/")
                return
                // console.log(res.data.InvalidToken)
              }
              if (res.data.accessStatus) {
                // alert("access denied")
                alert(res.data.accessStatus)
                return
              }
              if (res.data.error) {
                // alert("access denied")
                alert(res.data.error)
                return
              }
              console.log(res.data)
              setAllTasks([...res.data.teamTasks])
            })
            .catch(err => {
              console.log(err)
            })
        }
        
      }
      catch(e){
        console.log(e)
      }

      // try {
      //   const res = await request.post('/api/checkToken', { token: localStorage.getItem("token") })
      //   if (res.data.InvalidToken || res.data.ExpiredToken) {
      //     localStorage.removeItem("token")
      //     return
      //   }
      //   if (res.data.tokenMsg) {
      //     console.log(res.data)
      //     return
      //   }
      //   if (res.data.user) {
      //     // console.log(res.data)
      //     setloggedUser({...res.data.user})
      //     request.get(`/task/user/${res.data.user.id}`)
      //       .then((res) => {
      //         console.log(res.data)
      //         setAllTasks([...res.data.teamTasks])
      //       })
      //       .catch(err => {
      //         console.log(err)
      //       })
      //   }
      // }
      // catch (err) {
      //   console.log(err)
      // }

    }
    fetchData()
  }, [])


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
    (selectedMember === '' || task.assignedTo.name.toLowerCase() === selectedMember)
  ));

  const sortedTasks = getSortedTasks();

  return (
    <>
      <Header loggedUser={loggedUser} setloggedUser={setloggedUser} />
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-3">
            {loggedUser && loggedUser.team && <h3>Team Members</h3>}
            <div className="member-list" >
              {team && <input type="text" className="form-control mb-3" placeholder="Search members by name"  onChange={handleSearch} />}
              <ul className="list-group" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {team && <li className="list-group-item cursor-pointer" onClick={() => handleMemberClick('')}>
                  All Members
                </li>}
                {filteredTeamMembers.map((member, index) => (
                  <li key={index} className="list-group-item cursor-pointer" onClick={() => handleMemberClick(member.name)}>
                    {member.name}
                  </li>
                ))}
              </ul>
            </div>
            {loggedUser && loggedUser.role.includes("ROLE_ADMIN") && <AddTeamMember  teamMembers={teamMembers} setTeamMembers={setTeamMembers}/>}
            <CreateTask teamMembers={teamMembers} allTasks={allTasks} setAllTasks={setAllTasks}/>
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
        <UserCard
          show={showModal}
          handleClose={() => setShowModal(false)}
          member={modalMember}
          teamMembers = {teamMembers}
          setTeamMembers = {setTeamMembers}
          loggedUser = {loggedUser}
          team = {team}
        />
      </div>
    </>
  );
};

export default TeamPage;
