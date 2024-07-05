import React from 'react'

function LoginPage() {
  return (
    <div style={styles.body}>
      <div className="content" style={styles.content}>
        <h1 className="title" style={styles.title}>TaskBoard</h1>
        <form action="/login" method="post">
          <div className="form-group m-1">
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input type="text" id="email" name="email" className="form-control" required />
          </div>
          <div className="form-group m-1">
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input type="password" id="password" name="password" className="form-control" required />
          </div>
          <div className="form-group m-1">
            <label style={styles.label}>Role:</label>
            <div>
              <span style={styles.inlineBlock}>
                <input type="radio" id="role_admin" name="role" value="Admin" />
                <label htmlFor="role_admin" style={styles.radioLabel}>Admin</label>
              </span>
              <span style={styles.inlineBlock}>
                <input type="radio" id="role_employee" name="role" value="Employee" defaultChecked />
                <label htmlFor="role_employee" style={styles.radioLabel}>Employee</label>
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={styles.loginButton}>Login</button>
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
  label1: {
    display: 'block',
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: '2px',
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
};

export default LoginPage;
