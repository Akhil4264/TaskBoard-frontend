import React, { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import request from '../request'
import UserInvite from './UserInvite';

const Admins = () => {
    const navigate = useNavigate()
    const [admins,setAdmins] = useState([])
    useEffect(() => {
        const getIndUsers = () => {
            request.post('/getAdmin',{token : localStorage.getItem("token")})
            .then((res) => {
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
                    alert("access denied")
                    return 
                }
                // console.log("admin : ",res.data)

        
                setAdmins([...res.data])
            })
            .catch((err) => {
                // alert(err)
                console.log(err)
            })

        }
        getIndUsers()
    },[])




    return (
        <>
        <div className="ind-users-container border rounded p-4 m-1">
            <div className='d-flex  justify-content-between'>
            <h2 className="mb-4">Admins</h2>
                <div className=''>
                {/* <UserInvite indUsers={indUsers} setIndUsers = {setIndUsers}/> */}
                </div>
            </div>
            <div style={{height : '330px'}}>
            <div className="names-list overflow-auto" style={{ maxHeight: '680px' }}>
                <ul className="list-group">
                    {admins.map((user) => (
                        <li key={user.id} className="list-group-item">
                            <Link to={user.team ? `/admin/team/${user.team.id}` : `/admin/user/${user.id}`} className='text-decoration-none'>
                                <div className="d-flex align-items-center">
                                    <span style={{color : 'black'}}>{user.name ? user.name : "user"}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </div>
        <div className='col-md-6'>
            
        </div>
      </>
    );
}

export default Admins;
