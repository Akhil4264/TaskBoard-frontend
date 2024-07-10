import React, { useState } from 'react';
import request from '../request'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';



const UserInvite = ({ indUsers, setIndUsers }) => {
  const navigate = useNavigate()
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
      handleCloseModal();
      const res = await request.post('admin/inviteUser', { email, fullName: name, token: localStorage.getItem("token") })
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
      // console.log(res.data);

      alert("Please check your inbox for login credentials");

      await setIndUsers([...indUsers, res.data.user]);
      // handleCloseModal();
    } catch (error) {
      handleCloseModal();
      alert("Error In sending mail")
      // console.log(error);
      // alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <>
      <ToastContainer />
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
