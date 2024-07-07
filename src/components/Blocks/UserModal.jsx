import React, { useState } from 'react';
import request from '../request'

const UserCard = ({ show, handleClose, member, teamMembers, setTeamMembers, loggedUser, team, teams }) => {
  const [editingTeam, setEditingTeam] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");



  const handleRemoveUser = () => {
    request.post(`/admin/removeUserFromTeam/${team.id}/${member.id}`)
    .then((res) => {
      if(!res.data.message){
        return
      }

      setTeamMembers(teamMembers => teamMembers.filter((ele) => {
        return ele.id !== member.id
      }))


    })
    .catch((err) => {
      alert(err)
    })
    .finally(() => {
      handleClose()
    })
  }

  const ToggleStatus = () => {
    request.post(`/admin/toggleRole/${member.id}`)
      .then((res) => {
        console.log(res.data);
        if (!res.data.message) return;
        
        let changedRole;
        if (member.role === "admin") changedRole = "user";
        else if(member.role === "user") changedRole = "admin";
        
        // console.log("Changed Role:", changedRole);
        
        // Update the role in the teamMembers state
        // setTeamMembers(prevTeamMembers =>
        //   prevTeamMembers.map(ele => 
        //     ele.id === member.id ? { ...ele, role: changedRole } : ele
        //   )
        // );

        setTeamMembers(teamMembers.map((ele) => {
          return ele.id === member.id ? { ...ele, role: changedRole } : ele
        }))

        member.role = changedRole

        // console.log(teamMembers)
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleTeamChange = (team) => {
    // setSelectedTeam(team.id)
    setEditingTeam(false)

    // console.log("select team : ",selectedTeam)

    request.post(`/admin/changeUserTeam/${member.id}`, { teamId: selectedTeam })
      .then((res) => {
        console.log(res.data)
        if (res.data.message) {
          setTeamMembers(teamMembers => teamMembers.filter((ele) => {
            return ele.id !== member.id
          }))
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
          setSelectedTeam("")
          handleClose()
      })


  };


  const closeModal = () => {
    setEditingTeam(false)
    handleClose()
  }

  return (
    <>
      <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Team Member Details</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <p><strong>Name:</strong> {member.name}</p>
              <div className="mb-3">
                <strong>Team:</strong>&nbsp;
                {editingTeam ? (
                  <>
                    <select className="form-select" value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
                      <option value={""} disabled>Select</option>
                      {teams.map((tm) => (
                        tm.id !== team.id && (<option key={tm.id} value={tm.id}>{tm.name}</option>)
                      ))}
                    </select>
                    <button className="btn btn-primary ms-2" onClick={() => handleTeamChange(selectedTeam)}>Change</button>
                  </>
                ) : (
                  <>
                    {/* {team.title} */}
                    {loggedUser && loggedUser.role === "admin" && <button className="btn btn-outline-primary ms-2" onClick={() => setEditingTeam(true)}>Change Team</button>}
                  </>
                )}
              </div>
              <p><strong>Email:</strong> {member.email}</p>
              {loggedUser.role==="admin" && <button className="btn btn-primary ms-2" onClick={() => handleRemoveUser(member.id)}>Remove User From Team</button>}
              {loggedUser.role==="admin" && <button className="btn btn-primary ms-2" onClick={() => ToggleStatus()}>{member.role === "admin" ? "remove as admin" : "make admin"}</button>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default UserCard;
