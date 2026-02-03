import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const body = isRegister ? { username, password, name, email } : { username, password };

    const res = await fetch(`http://localhost:8080${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      const user = await res.json();
      login(user);
      navigate('/family');
    } else {
      alert(isRegister ? 'Registration failed' : 'Invalid credentials');
    }
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(118, 75, 162, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }} />
      
      <div style={{ background: 'rgba(26, 26, 26, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', width: '400px', position: 'relative', zIndex: 1 }}>
        <h2 style={{ color: '#e0e0e0', fontSize: '32px', fontWeight: '700', marginBottom: '30px', textAlign: 'center' }}>{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '2px solid #2a2a2a', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#2a2a2a', color: '#e0e0e0' }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '2px solid #2a2a2a', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#2a2a2a', color: '#e0e0e0' }}
            required
          />
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '2px solid #2a2a2a', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#2a2a2a', color: '#e0e0e0' }}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '2px solid #2a2a2a', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#2a2a2a', color: '#e0e0e0' }}
              />
            </>
          )}
          <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '14px', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)' }}>
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <button
          onClick={() => setIsRegister(!isRegister)}
          style={{ width: '100%', marginTop: '16px', background: 'transparent', color: '#667eea', border: 'none', cursor: 'pointer', fontSize: '14px' }}
        >
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
}
