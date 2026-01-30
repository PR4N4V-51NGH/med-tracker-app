import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './components/ui/hover-card';

function App() {
  const [medicines, setMedicines] = useState([]);
  const [editingStock, setEditingStock] = useState(null);
  const [editingDose, setEditingDose] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [pendingOrders, setPendingOrders] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMedicine, setNewMedicine] = useState({ name: '', tabletsPerStrip: '', currentStock: '', dosagePerDay: '' });

  const fetchMeds = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/medicines');
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Backend not found! Make sure Java is running on port 8080.");
    }
  };

  useEffect(() => {
    fetchMeds();
  }, []);

  const handleAddStrip = (id) => {
    setPendingOrders(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleRemoveStrip = (id) => {
    setPendingOrders(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0)
    }));
  };

  const handlePlaceAllOrders = async () => {
    const ordersToPlace = Object.entries(pendingOrders).filter(([_, qty]) => qty > 0);
    if (ordersToPlace.length === 0) {
      alert("No orders to place!");
      return;
    }
    try {
      // Update pendingStrips for each medicine
      for (const [id, qty] of ordersToPlace) {
        await axios.post(`http://localhost:8080/api/medicines/${id}/add-strips`, { strips: qty });
      }
      
      // Then call place-order to process all pending orders
      await axios.post('http://localhost:8080/api/medicines/place-order');
      
      fetchMeds();
      setPendingOrders({});
      alert("Orders placed successfully!");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order. Check console for details.");
    }
  };

  const handleStockUpdate = async (id, newStock) => {
    try {
      await axios.put(`http://localhost:8080/api/medicines/${id}/stock`, { stock: parseInt(newStock) });
      fetchMeds();
      setEditingStock(null);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDoseUpdate = async (id, newDose) => {
    try {
      await axios.put(`http://localhost:8080/api/medicines/${id}/dose`, { dose: parseFloat(newDose) });
      fetchMeds();
      setEditingDose(null);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleAddMedicine = async () => {
    if (!newMedicine.name || !newMedicine.tabletsPerStrip || !newMedicine.currentStock || !newMedicine.dosagePerDay) {
      alert("Please fill all fields!");
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/medicines', newMedicine);
      fetchMeds();
      setShowAddModal(false);
      setNewMedicine({ name: '', tabletsPerStrip: '', currentStock: '', dosagePerDay: '' });
      alert("Medicine added successfully!");
    } catch (error) {
      console.error("Add failed:", error);
      alert("Failed to add medicine.");
    }
  };

  const handleDeleteMedicine = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      await axios.delete(`http://localhost:8080/api/medicines/${id}`);
      fetchMeds();
      alert("Medicine deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete medicine.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getAvailableTillDate = (currentStock, dosagePerDay) => {
    const daysRemaining = currentStock / dosagePerDay;
    const availableTill = new Date();
    availableTill.setDate(availableTill.getDate() + daysRemaining);
    return availableTill.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getLastOrderDate = () => {
    const lastOrders = medicines.filter(m => m.lastOrderDate).map(m => new Date(m.lastOrderDate));
    if (lastOrders.length === 0) return 'Never';
    const mostRecent = new Date(Math.max(...lastOrders));
    return formatDate(mostRecent);
  };

  const getSuggestedQuantity = (currentStock, dosagePerDay, tabletsPerStrip) => {
    const neededFor30Days = dosagePerDay * 30;
    const shortage = neededFor30Days - currentStock;
    if (shortage <= 0) return 0;
    return Math.ceil(shortage / tabletsPerStrip);
  };

  const totalPendingOrders = Object.values(pendingOrders).reduce((sum, qty) => sum + qty, 0);
  const hasOrders = totalPendingOrders > 0;

  return (
    <TooltipProvider>
    <div style={{ 
      background: '#0a0a0a', 
      minHeight: '100vh', 
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            color: 'white', 
            fontSize: '48px', 
            fontWeight: '700',
            marginBottom: '10px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            💊 Medicine Stock Tracker
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>Manage your medication inventory with ease</p>
          <div style={{ marginTop: '15px', color: 'rgba(255,255,255,0.95)', fontSize: '16px', fontWeight: '600' }}>
            Last Order Placed: {getLastOrderDate()}
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            style={{ 
              marginTop: '20px',
              padding: '12px 30px', 
              cursor: 'pointer', 
              background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
              color: 'white', 
              border: 'none', 
              borderRadius: '10px', 
              fontWeight: '600', 
              fontSize: '16px',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            + Add Medicine
          </button>
          <Tooltip>
            <TooltipTrigger asChild>
              <button style={{ 
                marginLeft: '20px',
                marginTop: '20px',
                padding: '12px 30px', 
                cursor: 'pointer', 
                background: '#2a2a2a',
                color: 'white', 
                border: 'none', 
                borderRadius: '10px', 
                fontWeight: '600', 
                fontSize: '16px'
              }}>
                ℹ️ Info
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>This is a shadcn/ui Tooltip component</p>
            </TooltipContent>
          </Tooltip>
        </div>
      
        <div style={{ 
          backgroundColor: '#1a1a1a', 
          borderRadius: '20px', 
          overflow: 'hidden', 
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          marginBottom: '30px'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ 
                background: '#2a2a2a', 
                color: '#e0e0e0'
              }}>
                <th style={{ padding: '20px', fontSize: '16px', fontWeight: '600', textAlign: 'left' }}>Medicine</th>
                <th style={{ padding: '20px', fontSize: '16px', fontWeight: '600', textAlign: 'left' }}>Stock</th>
                <th style={{ padding: '20px', fontSize: '16px', fontWeight: '600', textAlign: 'left' }}>Daily Dose</th>
                <th style={{ padding: '20px', fontSize: '16px', fontWeight: '600', textAlign: 'left' }}>Days Left</th>
                <th style={{ padding: '20px', fontSize: '16px', fontWeight: '600', textAlign: 'left' }}>Available Till</th>
                <th style={{ padding: '20px', fontSize: '16px', fontWeight: '600', textAlign: 'left' }}>Suggested Qty</th>
                <th style={{ padding: '20px', fontSize: '16px', fontWeight: '600', textAlign: 'left' }}>Order Qty</th>
                <th style={{ padding: '20px', fontSize: '16px', fontWeight: '600', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med) => {
                const daysRemaining = (med.currentStock / med.dosagePerDay).toFixed(1);
                const pendingQty = pendingOrders[med.id] || 0;
                
                const rowStyle = {
                  borderBottom: '1px solid #2a2a2a',
                  backgroundColor: daysRemaining < 7 ? '#2a1a1a' : '#1a1a1a',
                  transition: 'all 0.3s ease'
                };

                return (
                  <tr key={med.id} style={rowStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = daysRemaining < 7 ? '#3a2a2a' : '#252525'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = daysRemaining < 7 ? '#2a1a1a' : '#1a1a1a'}>
                    <td style={{ padding: '20px', fontWeight: '600', color: '#e0e0e0', fontSize: '16px' }}>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                              <span style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: daysRemaining < 7 ? '#dc2626' : '#16a34a',
                                display: 'inline-block'
                              }}></span>
                              {med.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px', marginLeft: '18px' }}>
                              ({med.tabletsPerStrip} tabs/strip)
                            </div>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent side="inline-end">
                          <div style={{ color: '#000' }}>
                            <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>{med.name}</h4>
                            <p style={{ fontSize: '14px', marginBottom: '4px' }}>Tablets per strip: {med.tabletsPerStrip}</p>
                            <p style={{ fontSize: '14px', marginBottom: '4px' }}>Current stock: {med.currentStock}</p>
                            <p style={{ fontSize: '14px' }}>Daily dose: {med.dosagePerDay}</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </td>
                    <td style={{ padding: '20px', color: '#e0e0e0', cursor: 'pointer', fontSize: '15px' }} onClick={() => { setEditingStock(med.id); setEditValue(med.currentStock); }}>
                      {editingStock === med.id ? (
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => handleStockUpdate(med.id, editValue)}
                          onKeyPress={(e) => e.key === 'Enter' && handleStockUpdate(med.id, editValue)}
                          autoFocus
                          style={{ width: '70px', padding: '8px 12px', border: '2px solid #555', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#2a2a2a', color: '#e0e0e0' }}
                        />
                      ) : (
                        <span style={{ padding: '6px 12px', backgroundColor: '#2a2a2a', borderRadius: '8px', fontWeight: '600', color: '#888' }}>{med.currentStock}</span>
                      )}
                    </td>
                    <td style={{ padding: '20px', color: '#e0e0e0', cursor: 'pointer', fontSize: '15px' }} onClick={() => { setEditingDose(med.id); setEditValue(med.dosagePerDay); }}>
                      {editingDose === med.id ? (
                        <input
                          type="number"
                          step="0.5"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => handleDoseUpdate(med.id, editValue)}
                          onKeyPress={(e) => e.key === 'Enter' && handleDoseUpdate(med.id, editValue)}
                          autoFocus
                          style={{ width: '70px', padding: '8px 12px', border: '2px solid #555', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#2a2a2a', color: '#e0e0e0' }}
                        />
                      ) : (
                        <span style={{ padding: '6px 12px', backgroundColor: '#2a2a2a', borderRadius: '8px', fontWeight: '600', color: '#888' }}>{med.dosagePerDay}</span>
                      )}
                    </td>
                    <td style={{ padding: '20px', fontSize: '15px' }}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            backgroundColor: daysRemaining < 7 ? '#2a1a1a' : '#1a2a1a',
                            borderRadius: '12px',
                            fontWeight: '600',
                            color: daysRemaining < 7 ? '#f87171' : '#4ade80',
                            cursor: 'pointer'
                          }}>
                            {daysRemaining < 7 ? '⚠️' : '✓'} {daysRemaining}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>{daysRemaining < 7 ? 'Low stock! Order soon' : 'Stock is adequate'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    <td style={{ padding: '20px', fontSize: '14px' }}>
                      <span style={{
                        padding: '6px 12px',
                        backgroundColor: daysRemaining < 10 ? '#3a3a1a' : '#2a2a2a',
                        borderRadius: '8px',
                        fontWeight: '600',
                        color: daysRemaining < 10 ? '#fbbf24' : '#888'
                      }}>
                        {getAvailableTillDate(med.currentStock, med.dosagePerDay)}
                      </span>
                    </td>
                    <td style={{ padding: '20px', fontSize: '15px' }}>
                      <span style={{
                        padding: '8px 16px',
                        backgroundColor: '#2a2a2a',
                        borderRadius: '12px',
                        fontWeight: '600',
                        color: '#888',
                        display: 'inline-block'
                      }}>
                        {getSuggestedQuantity(med.currentStock, med.dosagePerDay, med.tabletsPerStrip)} strips
                      </span>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button 
                          onClick={() => handleRemoveStrip(med.id)}
                          style={{ 
                            padding: '8px 12px', 
                            cursor: 'pointer', 
                            background: '#2a2a2a',
                            color: '#f87171', 
                            border: '1px solid #3a3a3a', 
                            borderRadius: '8px', 
                            fontWeight: '600', 
                            fontSize: '16px'
                          }}
                        >
                          −
                        </button>
                        <span style={{ 
                          padding: '8px 16px', 
                          backgroundColor: pendingQty > 0 ? '#2a2a1a' : '#2a2a2a', 
                          borderRadius: '8px', 
                          fontWeight: '700', 
                          color: pendingQty > 0 ? '#fbbf24' : '#888',
                          minWidth: '40px',
                          textAlign: 'center'
                        }}>
                          {pendingQty}
                        </span>
                        <button 
                          onClick={() => handleAddStrip(med.id)}
                          style={{ 
                            padding: '8px 12px', 
                            cursor: 'pointer', 
                            background: '#2a2a2a',
                            color: '#4ade80', 
                            border: '1px solid #3a3a3a', 
                            borderRadius: '8px', 
                            fontWeight: '600', 
                            fontSize: '16px'
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button style={{ 
                            padding: '8px 16px', 
                            cursor: 'pointer', 
                            background: '#2a2a2a',
                            color: '#f87171',
                            border: '1px solid #3a3a3a', 
                            borderRadius: '8px', 
                            fontWeight: '600', 
                            fontSize: '14px'
                          }}>
                            🗑️ Delete
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="inline-start">
                          <DropdownMenuItem onClick={() => handleDeleteMedicine(med.id, med.name)}>
                            Confirm Delete
                          </DropdownMenuItem>
                          <DropdownMenuItem>Cancel</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={handlePlaceAllOrders}
            disabled={!hasOrders}
            style={{ 
              padding: '18px 50px', 
              cursor: hasOrders ? 'pointer' : 'not-allowed', 
              background: hasOrders ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
              color: 'white', 
              border: 'none', 
              borderRadius: '15px', 
              fontWeight: '700', 
              fontSize: '20px',
              boxShadow: hasOrders ? '0 10px 25px rgba(251, 191, 36, 0.5)' : '0 5px 15px rgba(107, 114, 128, 0.3)',
              transition: 'all 0.3s ease',
              opacity: hasOrders ? 1 : 0.6
            }}
            onMouseEnter={(e) => hasOrders && (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {hasOrders ? `📦 Place Order (${totalPendingOrders} strips)` : '📦 No Orders to Place'}
          </button>
        </div>

        {showAddModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: '#1a1a1a', borderRadius: '20px', padding: '40px', maxWidth: '500px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <h2 style={{ marginTop: 0, color: '#e0e0e0', marginBottom: '30px' }}>Add New Medicine</h2>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#e0e0e0', fontWeight: '600' }}>Medicine Name</label>
                <input
                  type="text"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                  style={{ width: '100%', padding: '12px', border: '2px solid #2a2a2a', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#2a2a2a', color: '#e0e0e0' }}
                  placeholder="Enter medicine name"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#e0e0e0', fontWeight: '600' }}>Tablets Per Strip</label>
                <input
                  type="number"
                  value={newMedicine.tabletsPerStrip}
                  onChange={(e) => setNewMedicine({...newMedicine, tabletsPerStrip: e.target.value})}
                  style={{ width: '100%', padding: '12px', border: '2px solid #2a2a2a', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#2a2a2a', color: '#e0e0e0' }}
                  placeholder="e.g., 10"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#e0e0e0', fontWeight: '600' }}>Current Stock (tablets)</label>
                <input
                  type="number"
                  value={newMedicine.currentStock}
                  onChange={(e) => setNewMedicine({...newMedicine, currentStock: e.target.value})}
                  style={{ width: '100%', padding: '12px', border: '2px solid #2a2a2a', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#2a2a2a', color: '#e0e0e0' }}
                  placeholder="e.g., 50"
                />
              </div>
              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#e0e0e0', fontWeight: '600' }}>Daily Dose (tablets)</label>
                <input
                  type="number"
                  step="0.5"
                  value={newMedicine.dosagePerDay}
                  onChange={(e) => setNewMedicine({...newMedicine, dosagePerDay: e.target.value})}
                  style={{ width: '100%', padding: '12px', border: '2px solid #2a2a2a', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#2a2a2a', color: '#e0e0e0' }}
                  placeholder="e.g., 2"
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={handleAddMedicine}
                  style={{ flex: 1, padding: '14px', cursor: 'pointer', background: '#2a2a2a', color: '#e0e0e0', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '16px' }}
                >
                  Add Medicine
                </button>
                <button 
                  onClick={() => { setShowAddModal(false); setNewMedicine({ name: '', tabletsPerStrip: '', currentStock: '', dosagePerDay: '' }); }}
                  style={{ flex: 1, padding: '14px', cursor: 'pointer', background: '#0a0a0a', color: '#888', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '16px' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </TooltipProvider>
  );
}

export default App;
