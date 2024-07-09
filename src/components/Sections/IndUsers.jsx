import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom'; 
import request from '../request'
import UserInvite from './UserInvite';

const IndUsers = () => {
    const [indUsers,setIndUsers] = useState([])
    useEffect(() => {
        const getIndUsers = () => {
            request.get('/admin/getIndUsers')
            .then((res) => {
                if(!res.data){
                    return 
                }
                setIndUsers([...res.data])
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
        <div className="ind-users-container bg-light rounded p-4">
            <div className='d-flex  justify-content-between'>
            <h2 className="mb-4">Individual Users</h2>
                <div className=''>
                <UserInvite indUsers={indUsers} setIndUsers = {setIndUsers}/>
                </div>
            </div>
            <div style={{height : '750px'}}>
            <div className="names-list overflow-auto" style={{ maxHeight: '680px' }}>
                <ul className="list-group">
                    {indUsers.map((user) => (
                        <li key={user.id} className="list-group-item">
                            <Link to={`/admin/user/${user.id}`} className='text-decoration-none'>
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

export default IndUsers;
