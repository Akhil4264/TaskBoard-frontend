import React, { useState,useEffect } from 'react';
import CreateTeam from './CreateTeam';
import request from '../request';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AdminTeams() {
    const navigate = useNavigate()
    const [teams,setTeams] = useState([]);
    useEffect(() => {
        const getTeams = () => {
            request.post('/admin/getTeams',{token : localStorage.getItem("token")})
            .then((res) => {
                if(!res.data){
                    return 
                }
                if(res.data.tokenMsg){
                    console.log(res.data.tokenMsg)
                    navigate("/")
                    return
                }
                if(res.data.InvalidToken || res.data.ExpiredToken){
                    localStorage.removeItem("token")
                    navigate("/")
                    return
                    // console.log(res.data.InvalidToken)
                }
                if(res.data.accessStatus){
                    alert(res.data.accessStatus)
                    return
                }
                if(res.data.error){
                    alert(res.data.error)
                    return
                }
                // console.log("Teams : ",res.data)
                setTeams([...res.data])
            })
            .catch((err) => {
                alert("Error in retrieving all the teams")
                console.log(err)
            })

        }
        getTeams()
    },[])
    return (
        <>
            <ToastContainer />
            <div className="container border rounded m-1" >
                <div className='d-flex  justify-content-between m-1'>
                    <h2 className="mb-4 mt-2">Teams</h2>
                    <div className='mt-2'>
                        <CreateTeam teams={teams} setTeams={setTeams}/>
                    </div>
                </div>
                <div className='container' style={{height : '825px'}}>
                <div className="row row-cols-1 row-cols-md-4 g-4 p-2 rounded" style={{ maxHeight: '800px', overflowY: 'auto' }}>
                    {teams.map(team => (
                        <div key={team.id} className="col">
                            <a href={`/admin/teams/${team.id}`} className="card text-decoration-none text-dark " style={{ width: '18rem' }}>
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold">{team.name}</h5>
                                    <p className="card-text">Team Strength: {team.count}</p>
                                    <p className="card-text">Team Description: {team.description}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
                </div>
                <div className='col-md-6 m-1'>
                    
                </div>
            </div>
        </>
    );
}

export default AdminTeams;
