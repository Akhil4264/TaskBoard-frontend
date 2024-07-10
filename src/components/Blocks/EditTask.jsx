import React, { useState, useEffect } from 'react';

const TaskModal = ({ show, handleClose, task, teamMembers, handleUpdate }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  useEffect(() => {
    setEditedTask({ ...task });
  }, [task]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = () => {
    handleUpdate(editedTask);
  };

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={editedTask.title} onChange={handleChange} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="priority" className="form-label">Priority</label>
                <select className="form-select" id="priority" name="priority" value={editedTask.priority} onChange={handleChange} required >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select className="form-select" id="status" name="status" value={editedTask.status} onChange={handleChange} required>
                  <option value="ongoing">Ongoing</option>
                  <option value="not started">Not Started</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" rows="3" name="description" value={editedTask.description} onChange={handleChange} required></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="assigned_to" className="form-label">Assigned To</label>
                <select className="form-select" id="assigned_to" name="assigned_to" value={editedTask.assigned_to} onChange={handleChange} required>
                  {teamMembers.map((member, index) => (
                    <option key={index} value={member.name}>{member.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="deadline" className="form-label">Deadline</label>
                <input type="date" className="form-control" id="deadline" name="deadline" value={editedTask.deadline} onChange={handleChange} required/>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
