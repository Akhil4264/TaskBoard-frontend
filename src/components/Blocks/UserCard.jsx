import React, { useState } from 'react';

const UserCard = ({ show, handleClose, member,teamMembers,setTeamMembers }) => {
  const [editingTeam, setEditingTeam] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(member.team);
  console.log(member.team)
  const teams = [member.team, 'Team B', 'Team C'];

  const handleTeamChange = (team) => {
    setSelectedTeam(team)
    setEditingTeam(false)
    setTeamMembers(teamMembers => teamMembers.filter((ele) =>{
        return ele.name !== member.name 
    }))
    handleClose()
  };

  return (
    <>
      <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Team Member Details</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <p><strong>Name:</strong> {member.name}</p>
              <div className="mb-3">
                <strong>Team:</strong>&nbsp;
                {editingTeam ? (
                  <>
                    <select className="form-select" value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
                      {teams.map((team) => (
                        team===member.team ? <></> : (<option key={team} value={team}>{team}</option>)
                      ))}
                    </select>
                    <button className="btn btn-primary ms-2" onClick={() => handleTeamChange(selectedTeam)}>Change</button>
                  </>
                ) : (
                  <>
                    {member.team}
                    <button className="btn btn-outline-primary ms-2" onClick={() => setEditingTeam(true)}>Change Team</button>
                  </>
                )}
              </div>
              <p><strong>Email:</strong> {member.email}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default UserCard;
