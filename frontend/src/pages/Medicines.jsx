import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import App from '../App';

export default function Medicines() {
  const { selectedMember, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedMember) {
      navigate('/family');
    }
  }, [selectedMember, navigate]);

  if (!selectedMember) return null;

  return (
    <div>
      <div style={{ 
        background: '#1a1a1a', 
        padding: '15px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #2a2a2a'
      }}>
        <div style={{ color: 'white' }}>
          <button 
            onClick={() => navigate('/family')}
            style={{ 
              background: '#2a2a2a', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '8px', 
              cursor: 'pointer',
              marginRight: '15px'
            }}
          >
            ← Back to Family
          </button>
          <span style={{ fontSize: '18px', fontWeight: '600' }}>
            Medicines for: {selectedMember.name}
          </span>
        </div>
        <button 
          onClick={logout}
          style={{ 
            background: '#dc2626', 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '8px', 
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      <App familyMemberId={selectedMember.id} />
    </div>
  );
}
