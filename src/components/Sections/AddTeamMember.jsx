import React, { useEffect, useState } from 'react';
import request from '../request'
const AddTeamMember = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUsers, setselectedUsers] = useState([]);
  console.log(selectedUsers)

  useEffect(()=>{
    request.get(`/admin/getIndUsers`)
    .then((res) => {
      console.log(res.data)
      setUsers(res.data)
    })
    .catch((err) => {
      alert(err)
    })
  },[])

  const [users,setUsers] = useState([]);
  const openModal = () => {
    setModalIsOpen(true);
    
  };

  const closeModal = () => {
	setselectedUsers([]);
    setModalIsOpen(false);
    // setSelectedUser(null);
  };

  const handleUserClick = (user) => {
    // setSelectedUser(user);
  };

  const handleToggleMember = (user) => {
    if (selectedUsers.some((member) => member.id === user.id)) {
      const updatedTeam = selectedUsers.filter((member) => member.id !== user.id);
      setselectedUsers(updatedTeam);
    } else {
      setselectedUsers([...selectedUsers, user]);
    }
  };

  const handleSubmit = () => {
    console.log('Team members:', selectedUsers);
    if(selectedUsers.length === 0) {closeModal(); return ;}
    const userids = selectedUsers.map((mem) => {
      return mem.id
    })
    request.post(`/admin/addUserToTeam/${props.teamId}`,{"user_ids" : userids})
    .then((res) => {
      if(!res.data.message) return ;
      
      props.setTeamMembers([...props.teamMembers,...selectedUsers])
      setUsers(users => users.filter(user => !userids.includes(user.id)));
    })
    .catch((err) => {
      alert(err)
    })
    closeModal();
	 
  };

  return (
    <div className="my-2">
      <button className="btn btn-primary" onClick={openModal}>
        Add a team member
      </button>

      <div className={`modal ${modalIsOpen ? 'show' : ''}`} style={{ display: modalIsOpen ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select team members</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <ul className="list-group">
                {users.map((user) => (
                  <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {user.name}
                    <button
                      className={`btn ${selectedUsers.some((member) => member.id === user.id) ? 'btn-danger' : 'btn-success'}`}
                      onClick={() => handleToggleMember(user)}
                    >
                      {selectedUsers.some((member) => member.id === user.id) ? '-' : '+'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal-backdrop fade ${modalIsOpen ? 'show' : ''}`} style={{ display: modalIsOpen ? 'block' : 'none' }}></div>

    </div>
  );
};

export default AddTeamMember;
