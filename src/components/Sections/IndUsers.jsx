import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const IndUsers = () => {
    const names = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Michael Brown" },
        { id: 4, name: "Emily Johnson" },
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Michael Brown" },
        { id: 4, name: "Emily Johnson" },
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Michael Brown" },
        { id: 4, name: "Emily Johnson" },
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Michael Brown" },
        { id: 4, name: "Emily Johnson" },
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Michael Brown" },
        { id: 4, name: "Emily Johnson" }
    ]; // Example list of users with IDs

    return (
        <div className="ind-users-container bg-light rounded p-4">
            <h2 className="mb-4">Individual Users</h2>
            <div className="names-list overflow-auto" style={{ maxHeight: '680px' }}>
                <ul className="list-group">
                    {names.map((user) => (
                        <li key={user.id} className="list-group-item">
                            <Link to={`/admin/user/${user.id}`} className='text-decoration-none'>
                                <div className="d-flex align-items-center">
                                    <span style={{color : 'black'}}>{user.name}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default IndUsers;
