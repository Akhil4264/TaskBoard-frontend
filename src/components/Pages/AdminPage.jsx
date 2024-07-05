import React from 'react';
import Teams from '../Sections/Teams';
import IndUsers from '../Sections/IndUsers';
import Header from '../Sections/Header';
import UserInvite from '../Sections/UserInvite';
import CreateTeam from '../Sections/CreateTeam'


const AdminPage = () => {
  const userData = {
    username: "johndoe",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com"
  };
  return (
    <>
      <div className='m-2'>
        <Header {...userData} />
      </div>
      <div className="container-fluid m-1">
        <div className="row">
          <div className="col-md-3">
            <IndUsers />
            <div className='row justify-content-around m-2 p-4'>
              <div className='col-md-6'>
                <UserInvite />
              </div>
              <div className='col-md-6'>
                <CreateTeam />
              </div>
            </div>
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
