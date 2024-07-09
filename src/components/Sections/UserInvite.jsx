import React, { useState } from 'react';
import request from '../request'
const UserInvite = ({indUsers,setIndUsers}) => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  // const [fname, setFname] = useState('');
  const [name, setname] = useState('');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setEmail('');
    setname('')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await request.post('admin/inviteUser', { email, fullName: name,token : localStorage.getItem("token") });
      if (res.status !== 200) {
        handleCloseModal();
        alert(res.data.message || 'An error occurred');
        return 
      }
      console.log(res.data);
      await setIndUsers([...indUsers, res.data.user]);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      handleCloseModal();
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <>
      <button className="btn btn-primary " onClick={handleShowModal}>
        Invite User
      </button>

      {showModal && (
        <div className="modal-backdrop fade show"></div>
      )}

      <div className={`modal ${showModal ? 'd-block' : ''}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Invite User</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* <div className="form-group m-2">
                  <label htmlFor="inputFname" className='mx-1 p-1'>First Name : </label>
                  <input type="text" className="form-control" id="inputFname" placeholder="Enter First name" value={fname} onChange={(e) => setFname(e.target.value)} required />
                </div> */}
                <div className="form-group m-2">
                  <label htmlFor="inputname" className='mx-1 p-1'>Name : </label>
                  <input type="text" className="form-control" id="inputname" placeholder="Enter name" value={name} onChange={(e) => setname(e.target.value)} required />
                </div>
                <div className="form-group m-2">
                  <label htmlFor="inputEmail" className='mx-1 p-1'>Email address : </label>
                  <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary m-2">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInvite;
