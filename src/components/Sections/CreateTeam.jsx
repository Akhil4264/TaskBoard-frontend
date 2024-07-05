import React, { useState } from 'react';

const CreateTeam = () => {
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSave = () => {
    console.log('Team Name:', teamName);
    console.log('Team Description:', teamDescription);
    handleClose();
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
        Create New Team
      </button>
      <div className="container">

        <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Team</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <div className="form-group m-2">
                  <label htmlFor="teamName" className='mx-1 p-1'>Team Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="teamName"
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>
                <div className="form-group m-2">
                  <label htmlFor="teamDescription" className='mx-1 p-1'>Team Description</label>
                  <textarea
                    className="form-control"
                    id="teamDescription"
                    rows="3"
                    placeholder="Enter team description"
                    value={teamDescription}
                    onChange={(e) => setTeamDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button> */}
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save Team
                </button>
              </div>
            </div>
          </div>
        </div>

        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </>
  );
};

export default CreateTeam;
