import React, { useState } from 'react';
import request from '../request'
import { useNavigate } from 'react-router';

const Tasks = ({ sortedTasks, teamMembers, allTasks, setAllTasks }) => {

  const navigate = useNavigate()

  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedTask, setEditedTask] = useState();
  const tm = teamMembers
  console.log(allTasks)

  const handleTaskClick = (task) => {
    console.log(task)
    setSelectedTask(task);
    setShowModal(true);
    setEditedTask({...task});

  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if(name === "deadline"){
      console.log("deadline is changing")
      if(new Date(value) < Date.now()){
        return ;
      }
    }
    setEditedTask({ ...editedTask, [name]: value });

  };

  const handleAssignedToChange = (e) => {
    let val = e.target.value
    let foundMemberArray = teamMembers.filter(member => member.id === parseInt(val));
    const foundMember = foundMemberArray[0]
    const tempTask = editedTask
    tempTask.assignedTo = foundMember
    setEditedTask({...tempTask})
  };


  const handleDeleteTask = () => {
    // console.log(editedTask)
    request.post(`/task/${editedTask.id}`,{token : localStorage.getItem("token")})
      .then((res) => {
        console.log(res.data)
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
        setAllTasks(allTasks => allTasks.filter((tsk) => {
          return tsk.id !== editedTask.id
        }))
        handleCloseModal()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
    setEditedTask(null);
  };

  const handleSubmit = async () => {

    // console.log("selected Task : " ,selectedTask)
    console.log("edited Task : ",editedTask)
    if(editedTask.title==="" || editedTask.priority==="" || editedTask.status==="" || editedTask.description==="" ||!editedTask.assignedTo){
      alert("enter valid inputs")
      return ;
    }

    try {
      const res = await request.post(`/task/${editedTask.id}/edit`, { ...editedTask ,token : localStorage.getItem('token')})
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
      console.log(res.data)
      setAllTasks(allTasks => allTasks.map((tsk) => {
        if(tsk.id === editedTask.id) return editedTask
        return tsk
      }))
    }

    catch (e) {
      console.log(e)
    }
    handleCloseModal();
  };

  return (
    <div className='border rounded' style={{height : '800px'}}>
      <div className="row row-cols-1 row-cols-md-3 g-4 p-4" style={{maxHeight : '800px',overflowY : 'auto'}}>
        {sortedTasks.length >0 && sortedTasks.map(task => (
          <div key={task.id} className="col">
            <div className="card h-100" onClick={() => handleTaskClick(task)} style={{ cursor: 'pointer' }}>
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text"><strong>Priority:</strong> {task.priority}</p>
                <p className="card-text"><strong>Status:</strong> {task.status}</p>
                <p className="card-text"><strong>Assigned Date:</strong> {task.assignedDate}</p>
                <p className="card-text"><strong>Description:</strong> {task.description}</p>
                <p className="card-text"><strong>Assigned To:</strong> {task.assignedTo.name ? task.assignedTo.name : "user"}</p>
                <p className="card-text"><strong>Deadline:</strong> {task.deadline}</p>
                {task.attachments && task.attachments.length > 0 &&
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
                      <input type="text" className="form-control" id="title" name="title" value={editedTask.title} onChange={handleFieldChange} required/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="priority" className="form-label">Priority</label>
                      <select className="form-select" id="priority" name="priority" value={editedTask.priority} onChange={handleFieldChange} required>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">Status</label>
                      <select className="form-select" id="status" name="status" value={editedTask.status} onChange={handleFieldChange} required>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Not Started">Not Started</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="assignedDate" className="form-label">Assigned Date</label>
                      <input type="date" className="form-control" id="assignedDate" name="assignedDate" value={editedTask.assignedDate} readOnly />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea className="form-control" id="description" name="description" value={editedTask.description} onChange={handleFieldChange} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="assignedTo" className="form-label">Assigned To</label>
                      <select className="form-select" id="assignedTo" name="assignedTo" value={editedTask.assignedTo.id} onChange={handleAssignedToChange} required>
                        {tm.map(member => (
                          <option key={member.id} value={member.id} >{member.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="deadline" className="form-label">Deadline</label>
                      <input type="date" className="form-control" id="deadline" name="deadline" value={editedTask.deadline} onChange={handleFieldChange} required/>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleDeleteTask}>Delete Task</button>
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

    </div>
  );
};

export default Tasks;
