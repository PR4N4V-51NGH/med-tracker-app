import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function FamilyMembers() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [relationship, setRelationship] = useState('');
  const { user, logout, selectMember } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) fetchMembers();
  }, [user]);

  const fetchMembers = async () => {
    const res = await fetch(`http://localhost:8080/api/family-members/user/${user.id}`);
    const data = await res.json();
    setMembers(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8080/api/family-members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, name, age: parseInt(age), relationship })
    });
    setName('');
    setAge('');
    setRelationship('');
    setShowForm(false);
    fetchMembers();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/family-members/${id}`, { method: 'DELETE' });
    fetchMembers();
  };

  const handleSelect = (member) => {
    selectMember(member);
    navigate('/medicines');
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(118, 75, 162, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '700' }}>Family Members</h1>
          <button onClick={logout} style={{ background: '#dc2626', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Logout</button>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)' }}
        >
          {showForm ? 'Cancel' : '+ Add Family Member'}
        </button>

        {showForm && (
          <form onSubmit={handleAdd} style={{ background: 'rgba(26, 26, 26, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '30px', borderRadius: '20px', marginBottom: '30px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '2px solid #2a2a2a', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#2a2a2a', color: '#e0e0e0' }}
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '2px solid #2a2a2a', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#2a2a2a', color: '#e0e0e0' }}
            />
            <input
              type="text"
              placeholder="Relationship (e.g., Father, Mother, Son)"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '2px solid #2a2a2a', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#2a2a2a', color: '#e0e0e0' }}
            />
            <button type="submit" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Save</button>
          </form>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {members.map(member => (
            <div key={member.id} style={{ background: 'rgba(26, 26, 26, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '30px', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <h3 style={{ color: '#e0e0e0', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>{member.name}</h3>
              <p style={{ color: '#888', marginBottom: '20px' }}>{member.relationship} {member.age && `• ${member.age} years`}</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => handleSelect(member)}
                  style={{ flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '12px', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}
                >
                  View Medicines
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  style={{ background: '#dc2626', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
