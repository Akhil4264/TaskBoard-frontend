import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import request from '../request'

const UserCard = ({ show, handleClose, member, teamMembers, setTeamMembers, loggedUser, team, teams }) => {
  const navigate = useNavigate()
  const [editingTeam, setEditingTeam] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");


  const handleRemoveUser = () => {
    request.post(`/admin/removeUserFromTeam/${team.id}/${member.id}`,{token : localStorage.getItem("token")})
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
        if (res.data.message) {
          // toast.success(res.data.message)
          alert(res.data.message)
        }

        setTeamMembers(teamMembers => teamMembers.filter((ele) => {
          return ele.id !== member.id
        }))


      })
      .catch((err) => {
        // alert(err)
        alert("couldn't remove the user from team")
      })
      .finally(() => {
        handleClose()
      })
  }

  const ToggleStatus = () => {
    request.post(`/admin/toggleRole/${member.id}`,{token : localStorage.getItem("token")})
      .then((res) => {
        console.log(res.data);
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
        if (res.data.message) {
          // handleClose()
          setTeamMembers(teamMembers.map((ele) => {
            return ele.id === member.id ? { ...ele, role: res.data.roles } : ele
          }))
          
          member.role = res.data.roles
          
          console.log(member)
          // toast.success(res.data.message)
          return ;
        }
      })
      .catch((err) => {
        console.log(err)
        alert("Error changing role of the user")
      });
  };

  const handleTeamChange = (team) => {
    // setSelectedTeam(team.id)
    setEditingTeam(false)

    // console.log("select team : ",selectedTeam)

    request.post(`/admin/changeUserTeam/${member.id}`, { teamId: selectedTeam,token : localStorage.getItem("token") })
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
        if (res.data.message) {
          // toast(res.data.message)
          alert(res.data.message)
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
      {/* <ToastContainer /> */}
      <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{team ? "Team Member Details" : "Member Details"}</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <p><strong>Name:</strong> {member && member.name ? member.name : "user"}</p>
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
                    <span style={{ color: team ? "black" : "red" }}> {team ? team.name : "not a part of any team"} </span>
                    {loggedUser && loggedUser.role.includes("ROLE_ADMIN") && <button className="btn btn-outline-primary ms-2" onClick={() => setEditingTeam(true)}>Change Team</button>}
                  </>
                )}
              </div>
              <p><strong>Email:</strong> {member && member.email ? member.email : "user"}</p>
              {loggedUser && loggedUser.role.includes("ROLE_ADMIN") && <button className="btn btn-primary ms-2" onClick={() => handleRemoveUser(member.id)}>Remove User From Team</button>}
              {loggedUser && loggedUser.role.includes("ROLE_ADMIN") && <button className="btn btn-primary ms-2" onClick={() => ToggleStatus()}>{member &&member.role && member.role.includes("ROLE_ADMIN") ? "remove as admin" : "make admin"}</button>}
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
