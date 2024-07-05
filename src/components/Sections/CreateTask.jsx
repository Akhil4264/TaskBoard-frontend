import React, { useState } from 'react';

const NewTaskModal = ({ teamMembers }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('medium');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleClose = (e) => {
    e.preventDefault()
    setTaskName('');
    setPriority('medium');
    setDescription('');
    setAssignedTo('');
    setDeadline('');
    setAttachments([]);
    setShowModal(false);
    setShowModal(false);
  }
  const handleShow = () => setShowModal(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to backend or update state
    console.log({
      taskName,
      priority,
      description,
      assignedTo,
      deadline,
      attachments
    });
    setTaskName('');
    setPriority('medium');
    setDescription('');
    setAssignedTo('');
    setDeadline('');
    setAttachments([]);
    setShowModal(false);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
        Create New Task
      </button>
      {showModal && (
        <div className="modal-backdrop fade show"></div>
      )}
      <div className={`modal ${showModal ? 'd-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create New Task</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group m-2">
                  <label htmlFor="taskName">Task Name</label>
                  <input type="text" className="form-control" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
                </div>
                <div className="form-group m-2">
                  <label htmlFor="priority">Priority</label>
                  <select className="form-control" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} required>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="form-group m-2">
                  <label htmlFor="description">Description</label>
                  <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3"></textarea>
                </div>
                <div className="form-group m-2">
                  <label htmlFor="assignedTo">Assigned To</label>
                  <select className="form-control" id="assignedTo" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
                    <option value="">Select...</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group m-2">
                  <label htmlFor="deadline">Deadline</label>
                  <input type="date" className="form-control" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                </div>
                <div className="form-group m-2">
                  <label htmlFor="attachments">Attachments</label>
                  <input type="file" className="form-control" id="attachments" onChange={(e) => setAttachments(e.target.files)} multiple />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTaskModal;
