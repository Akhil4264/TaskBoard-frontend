import React, { useEffect, useState } from 'react';
import Teams from '../Sections/Teams';
import IndUsers from '../Sections/IndUsers';
import Header from '../Sections/Header';
import UserInvite from '../Sections/UserInvite';
import CreateTeam from '../Sections/CreateTeam'
import request from '../request'
import { useNavigate } from 'react-router';
import Admins from '../Sections/Admins';

const AdminPage = () => {
  const navigate = useNavigate()
  const [loggedUser,setloggedUser] = useState()


  useEffect(() => {
    request.post('/api/checkToken',{token : localStorage.getItem("token")})
    .then((res) => {
      if(res.data.InvalidToken || res.data.ExpiredToken){
        localStorage.removeItem("token")
        navigate("/")
        return 
      }
      if(res.data.tokenMsg){
        console.log(res.data)
        navigate("/")
        return 
      }
      if(!res.data.user.role.includes('ROLE_ADMIN')){
        // localStorage.removeItem("token")
        navigate("/") 
        return 
      }
      if(res.data.user){
        setloggedUser({...res.data.user})
      }

    })
    .catch(err => {
      // alert(err)
      if(err.response.status === 401){
        console.log("Token expired")
        localStorage.removeItem("token")
      }
      console.log(err)
    })
  },[])
  return (
    <>
      <div className='m-2'>
      <Header loggedUser={loggedUser} setloggedUser={setloggedUser} />
      </div>
      <div className="container-fluid m-1">
        <div className="row">
          <div className="col-md-3">
            {/* <div className='d-flex'> */}
              <IndUsers />
              <Admins />
            {/* </div> */}
            {/* <div className='row justify-content-around m-2 p-4'>
            </div> */}
          </div>
          <div className="col-md-9">
            <Teams />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
