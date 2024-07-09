import React, { useEffect, useState } from 'react';
import request from '../request';
import { useNavigate } from 'react-router';

function LoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('');
  useEffect(() => {
    request.post('/api/checkToken',{token : localStorage.getItem("token")})
    .then((res) => {
      
      if(res.data.InvalidToken || res.data.ExpiredToken){
        localStorage.removeItem("token")
        return 
      }
      if(res.data.tokenMsg){
        console.log(res.data)
        return 
      }
      if(res.data.user && res.data.user.role.includes("ROLE_ADMIN")){
        navigate('/admin')
        return 
      }
      else if(res.data.user && res.data.user.role.includes("ROLE_USER")){
        navigate('/employee')
        return 
      }

      

    })
    .catch(err => {
      // alert(err)
      if(err.response.status === 401){
        console.log("Token expired")
        localStorage.removeItem("token")
      }
      console.log(err)
    })
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Capture form data
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
      token : localStorage.getItem("token")
    };

    try {
      const res = await request.post(`/api/login_check`, formData);
      if(res.data && res.data.token){
        localStorage.setItem("token",res.data.token)
        if(res.data.redirect === '/api/admin' || res.data.redirect === '/admin') navigate('/admin')
        else if(res.data.redirect === '/api/home' || res.data.redirect === '/employee') navigate('/employee')
      }
    }
    catch(e){
      console.log(e)
    }
  };

  return (
    <div style={styles.body}>
      <div className="content" style={styles.content}>
        <h1 className="title" style={styles.title}>TaskBoard</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} method="post">
          <div className="form-group m-1">
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input type="text" id="email" name="email" className="form-control" required />
          </div>
          <div className="form-group m-1">
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input type="password" id="password" name="password" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary mt-3" style={styles.loginButton}>Login</button>
          <a href="/forgot-password" style={styles.loginLink}>Forgot password?</a>
        </form>
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: '#ffffff',
    backgroundImage: 'url("/bg/image1.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  content: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: '300px',
    left: '300px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '600',
    marginBottom: '20px',
    textAlign: 'center',
  },
  loginLink: {
    display: 'block',
    textAlign: 'center',
    marginTop: '20px',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  label: {
    display: 'block',
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  inlineBlock: {
    display: 'inline-block',
    marginRight: '5px',
    padding: '0px 5px',
  },
  radioLabel: {
    display: 'inline-block',
    margin: '5px',
    padding: '5px',
  },
  loginButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#6e8efb',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
  },
};

export default LoginPage;
