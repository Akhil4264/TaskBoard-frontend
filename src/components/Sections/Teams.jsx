import React, { useState,useEffect } from 'react';
import CreateTeam from './CreateTeam';
import request from '../request';
// const teams = [
//     { id: 1, num_people: 5, pending_tasks: 3 },
//     { id: 2, num_people: 8, pending_tasks: 1 },
//     { id: 3, num_people: 6, pending_tasks: 5 },
//     { id: 4, num_people: 4, pending_tasks: 0 },
//     { id: 5, num_people: 7, pending_tasks: 2 },
//     { id: 6, num_people: 7, pending_tasks: 4 },
//     { id: 7, num_people: 7, pending_tasks: 1 },
//     { id: 8, num_people: 7, pending_tasks: 3 },
//     { id: 9, num_people: 7, pending_tasks: 0 },
//     { id: 10, num_people: 7, pending_tasks: 2 },
//     { id: 11, num_people: 7, pending_tasks: 1 },
//     { id: 12, num_people: 7, pending_tasks: 5 },
//     { id: 7, num_people: 7, pending_tasks: 1 },
//     { id: 8, num_people: 7, pending_tasks: 3 },
//     { id: 9, num_people: 7, pending_tasks: 0 },
//     { id: 10, num_people: 7, pending_tasks: 2 },
//     { id: 11, num_people: 7, pending_tasks: 1 },
//     { id: 12, num_people: 7, pending_tasks: 5 },
//     { id: 1, num_people: 5, pending_tasks: 3 },
//     { id: 2, num_people: 8, pending_tasks: 1 },
//     { id: 3, num_people: 6, pending_tasks: 5 },
//     { id: 4, num_people: 4, pending_tasks: 0 },
//     { id: 5, num_people: 7, pending_tasks: 2 },
//     { id: 6, num_people: 7, pending_tasks: 4 },
//     { id: 7, num_people: 7, pending_tasks: 1 },
//     { id: 8, num_people: 7, pending_tasks: 3 },
//     { id: 9, num_people: 7, pending_tasks: 0 },
//     { id: 10, num_people: 7, pending_tasks: 2 },
//     { id: 11, num_people: 7, pending_tasks: 1 },
//     { id: 12, num_people: 7, pending_tasks: 5 },
//     { id: 7, num_people: 7, pending_tasks: 1 },
//     { id: 8, num_people: 7, pending_tasks: 3 },
//     { id: 9, num_people: 7, pending_tasks: 0 },
//     { id: 10, num_people: 7, pending_tasks: 2 },
//     { id: 11, num_people: 7, pending_tasks: 1 },
//     { id: 12, num_people: 7, pending_tasks: 5 }
// ];






function AdminTeams() {
    const [teams,setTeams] = useState([]);
    useEffect(() => {
        const getTeams = () => {
            request.get('/admin/getTeams')
            .then((res) => {
                if(!res.data){
                    return 
                }
                setTeams([...res.data])
            })
            .catch((err) => {
                // alert(err)
                console.log(err)
            })

        }
        getTeams()
    },[])
    return (
        <div className="container bg-light p-4" >
            <div className='d-flex  justify-content-between'>
                <h2 className="mb-4">Teams</h2>
                <div className=''>
                    <CreateTeam teams={teams} setTeams={setTeams}/>
                </div>
            </div>
            <div className='container bg-light' style={{height : '800px'}}>
            <div className="row row-cols-1 row-cols-md-4 g-4 p-2 rounded" style={{ maxHeight: '800px', overflowY: 'auto' }}>
                {teams.map(team => (
                    <div key={team.id} className="col">
                        <a href={`/admin/teams/${team.id}`} className="card text-decoration-none text-dark " style={{ width: '18rem' }}>
                            <div className="card-body text-center">
                                <h5 className="card-title fw-bold">{team.name}</h5>
                                <p className="card-text">Team Strength: {team.count}</p>
                                <p className="card-text">Team Description: {team.description}</p>
                                {/* <p className="card-text">Pending Tasks: {team.pending_tasks}</p> */}
                            </div>
                        </a>
                    </div>
                ))}
            </div>
            </div>
            <div className='col-md-6 m-1'>
                
              </div>
        </div>
    );
}

export default AdminTeams;
