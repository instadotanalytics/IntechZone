// Pages/Admin/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../utils/apiService';
import styles from './Admin.module.css';
import { FiMail, FiLock, FiLogIn, FiShield, FiAlertCircle } from 'react-icons/fi';
import WaveCanvas from '../Home/Wavecanvas';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('Attempting login with:', { email });

    try {
      const response = await ApiService.adminLogin(email, password);

      console.log('Login response:', response.data);

      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminInfo', JSON.stringify(response.data.admin));
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <WaveCanvas/>
      
      <div className={styles.loginContainer}>
        <div className={styles.loginLeft}>
          <div className={styles.logo}>
            <FiShield size={40} />
            <h1>Intech Zone</h1>
          </div>
          <h2>Admin Login</h2>
          <p>Access your admin dashboard to manage website content and settings.</p>
          <div className={styles.demoCredentials}>
            <FiAlertCircle size={14} />
            <span>Demo Credentials:</span>
            <code>info@intechzone.in</code>
            <code>IntechZone24</code>
          </div>
        </div>
        <div className={styles.loginRight}>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h3>Sign In</h3>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <div className={styles.inputGroup}>
              <FiMail className={styles.inputIcon} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <FiLock className={styles.inputIcon} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading} className={styles.loginBtn}>
              {loading ? 'Logging in...' : 'Login'} <FiLogIn />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;