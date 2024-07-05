import React, { useState } from 'react';

const AddTeamMember = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUsers, setselectedUsers] = useState([]);

  const [users,setUsers] = useState([
    { id: 1, name: 'User A' },
    { id: 2, name: 'User B' },
    { id: 3, name: 'User C' },
  ]);
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
	props.setTeamMembers([...props.teamMembers,...selectedUsers])
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
