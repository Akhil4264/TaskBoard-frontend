import React, { useState } from 'react';

const Tasks = ({ sortedTasks, teamMembers }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
    setEditedTask({ ...task });
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleAssignedToChange = (e) => {
    const { value } = e.target;
    setEditedTask({ ...editedTask, assigned_to: value });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
    setEditedTask(null);
  };

  const handleSubmit = () => {
    // Handle submit logic here, like updating the task
    console.log('Updated task:', editedTask);
    handleCloseModal();
  };

  return (
    <>
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {sortedTasks.map(task => (
        <div key={task.id} className="col">
          <div className="card h-100" onClick={() => handleTaskClick(task)} style={{ cursor: 'pointer' }}>
            <div className="card-body">
              <h5 className="card-title">{task.title}</h5>
              <p className="card-text"><strong>Priority:</strong> {task.priority}</p>
              <p className="card-text"><strong>Status:</strong> {task.status}</p>
              <p className="card-text"><strong>Assigned Date:</strong> {task.assigned_date}</p>
              <p className="card-text"><strong>Description:</strong> {task.description}</p>
              <p className="card-text"><strong>Assigned To:</strong> {task.assigned_to}</p>
              <p className="card-text"><strong>Deadline:</strong> {task.deadline}</p>
              {task.attachments.length > 0 &&
                <div className="attachments">
                  <strong>Attachments:</strong>
                  <ul>
                    {task.attachments.map((attachment, index) => (
                      <li key={index}><a href={`/path/to/attachments/${attachment}`} target="_blank" rel="noopener noreferrer">{attachment}</a></li>
                    ))}
                  </ul>
                </div>
              }
            </div>
          </div>
        </div>
      ))}

      
      {selectedTask && (
        <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task: {selectedTask.title}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={editedTask.title} onChange={handleFieldChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="priority" className="form-label">Priority</label>
                    <select className="form-select" id="priority" name="priority" value={editedTask.priority} onChange={handleFieldChange}>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select className="form-select" id="status" name="status" value={editedTask.status} onChange={handleFieldChange}>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Not Started">Not Started</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="assigned_date" className="form-label">Assigned Date</label>
                    <input type="date" className="form-control" id="assigned_date" name="assigned_date" value={editedTask.assigned_date} contentEditable={false} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={editedTask.description} onChange={handleFieldChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="assigned_to" className="form-label">Assigned To</label>
                    <select className="form-select" id="assigned_to" name="assigned_to" value={editedTask.assigned_to} onChange={handleAssignedToChange}>
                      {teamMembers.map(member => (
                        <option key={member.name} value={member.name}>{member.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="deadline" className="form-label">Deadline</label>
                    <input type="date" className="form-control" id="deadline" name="deadline" value={editedTask.deadline} onChange={handleFieldChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    {selectedTask && (
      <div className="modal-backdrop fade show"></div>
    )}
    
    </>
  );
};

export default Tasks;
