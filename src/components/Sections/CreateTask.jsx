import React, { useState } from 'react';
import request from '../request'

const CreateTask = ({ teamMembers,allTasks,setAllTasks }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('medium');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleClose = (e) => {
    e.preventDefault();
    setTaskName('');
    setPriority('medium');
    setDescription('');
    setAssignedTo('');
    setDeadline('');
    setAttachments([]);
    setShowModal(false);
  };

  const handleShow = () => setShowModal(true);

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log({
      taskName,
      priority,
      description,
      assignedTo,
      deadline,
      attachments
    });

    try {
      const res = await request.post('/task/new', {
        name : taskName,
        priority,
        description,
        assignedTo : assignedTo,
        deadline,
      })
      // console.log(res.data)
      setAllTasks([...allTasks,res.data])
    }
    catch(e){
      console.log(e)
    }


    setTaskName('');
    setPriority('medium');
    setDescription('');
    setAssignedTo('');
    setDeadline('');
    setAttachments([]);
    setShowModal(false);
  };


  const handleDeleteTask = () => {

  }

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
                    <option key="1" value="High">High</option>
                    <option key="2" value="Medium">Medium</option>
                    <option key="3" value="Low">Low</option>
                  </select>
                </div>
                <div className="form-group m-2">
                  <label htmlFor="description">Description</label>
                  <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3"></textarea>
                </div>
                <div className="form-group m-2">
                  <label htmlFor="assignedTo">Assigned To</label>
                  <select className="form-control" id="assignedTo" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
                    <option value="" disabled>Select...</option>
                    {teamMembers.map((mem) => (
                      <option key={mem.id} value={mem.id}>
                        {mem.name ? mem.name : "user"}
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
                  <input type="file" className="form-control" id="attachments" onChange={(e) => setAttachments(Array.from(e.target.files))} multiple />
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

export default CreateTask;
