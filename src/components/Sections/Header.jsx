import React from 'react';
import { useNavigate } from 'react-router';

const Header = ({ loggedUser, setloggedUser }) => {
    const navigate = useNavigate()
    const logout = () => {
        setloggedUser(null);
        navigate("/")
        localStorage.removeItem("token")
    };

    const initials = loggedUser && loggedUser.name ? `${loggedUser.name.charAt(0)}` : 'U';

    return (
        loggedUser && loggedUser.name ? (
            <div className="d-flex align-items-center justify-content-between bg-light p-3">
                <div className="d-flex align-items-center">
                    <div className="me-3">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}>
                            {initials}
                        </div>
                    </div>
                    <div className="text-dark">Hi, <strong>{loggedUser.name}</strong></div>
                </div>
                <button className="btn btn-light text-primary" onClick={logout}>
                    Logout
                </button>
            </div>
        ) : null
    );
}

export default Header;
