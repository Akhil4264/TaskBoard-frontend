import React, { useState } from 'react'
import request from '../request'
import { useNavigate } from 'react-router';


const UserCard = ({ member, loggedUser , teams }) => {
    console.log(member)
    const [editingTeam, setEditingTeam] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState("");
    const navigate = useNavigate()
    const handleTeamChange = (team) => {
        setSelectedTeam(team)
        setEditingTeam(false)
        request.post(`/admin/changeUserTeam/${member.id}`,{teamId : selectedTeam,token : localStorage.getItem("token")})
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
            setSelectedTeam("")
            navigate(`/admin`)
        })
        .catch(err => {
            // alert(err)
            console.log(err)
        })
    };
    return (
        <div>
            <p><strong>Name:</strong> {member && member.name ? member.name : "user"}</p>
            <div className="mb-3">
                <strong>Team:</strong>&nbsp;
                {editingTeam ? (
                    <>
                        <select className="form-select" value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
                            <option value={""} disabled>Select</option>
                            {teams.map((tm) => (
                                // tm.id !== member.team.id && 
                                (<option key={tm.id} value={tm.id}>{tm.name}</option>)
                            ))}
                        </select>
                        <button className="btn btn-primary ms-2" onClick={() => handleTeamChange(selectedTeam)}>Move to This team</button>
                    </>
                ) : (
                    <>
                        {member && member.team ? member.team.name : "Not a part of any team"}
                        <button className="btn btn-outline-primary ms-2" onClick={() => setEditingTeam(true)}>Move to a Team</button>
                    </>
                )}
            </div>
            {member && member.email && <p><strong>Email:</strong> {member.email}</p>}
        </div>
    )
}

export default UserCard