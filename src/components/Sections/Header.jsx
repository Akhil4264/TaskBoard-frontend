import React from 'react';

const Header = ({ username, firstName, lastName, email }) => {
    const initials = username ? `${firstName.charAt(0)}${lastName.charAt(0)}` : 'U'; // First letters of first and last names

    return (
        <div className="d-flex align-items-center justify-content-between bg-light p-3">
            <div className="d-flex align-items-center">
                <div className="me-3">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}>
                        {initials}
                    </div>
                </div>
                <div className="text-dark">Hi, <strong>{username}</strong></div>
            </div>
            <button className="btn btn-light text-primary">
                Logout
            </button>
        </div>
    );
}

export default Header;
