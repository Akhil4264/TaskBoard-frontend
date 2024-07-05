import React, { useState } from 'react';

const UserInvite = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setEmail('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Inviting user with email: ${email}`);
    handleCloseModal();
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
                <div className="form-group m-2">
                  <label htmlFor="inputFname" className='mx-1 p-1'>First Name : </label>
                  <input type="text" className="form-control" id="inputFname" placeholder="Enter First name" value={fname} onChange={(e) => setFname(e.target.value)} required />
                </div>
                <div className="form-group m-2">
                  <label htmlFor="inputLname" className='mx-1 p-1'>Last Name : </label>
                  <input type="text" className="form-control" id="inputLname" placeholder="Enter Last name" value={lname} onChange={(e) => setLname(e.target.value)} required />
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
