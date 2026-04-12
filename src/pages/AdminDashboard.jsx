import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/APS_LOGO.png'

const AdminDashboard = () => {
  // Demo Admin Info

  const nav = useNavigate();

  const admin = {
    name: "Madan Mahto",
    designation: "Chief Transport Manager"
  };

  // Demo Data for display
  const [buses] = useState([
    { id: "B01", route: "Marang- Marcha to Gola", driver: "Ramesh Prashad" },
    { id: "B02", route: "Gola to Murudih", driver: "Suresh Kumar" },
    { id: "B03", route: "Marang-Marcha to Ramgarh", driver: "Mukesh Mahto" },
    { id: "B04", route: "Gola to Ormanjhi", driver: "Narayan Mahto" }
  ]);

  const [activeView, setActiveView] = useState('all-buses');

  const renderContent = () => {
    switch (activeView) {
      case 'all-buses':
        return (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-4">Active Fleet</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Bus ID</th>
                  <th>Route</th>
                  <th>Driver</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {buses.map(bus => (
                  <tr key={bus.id} className="border-b">
                    <td className="py-2">{bus.id}</td>
                    <td>{bus.route}</td>
                    <td>{bus.driver}</td>
                    <td><button onClick={(e)=>{nav('/driverDashBoard')}} className='bg-blue-600 text-white  rounded-xl text-[12px] p-1 font-bold cursor-pointer'>Show Location</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'add-bus':
        return <div className="p-4 bg-blue-50 border border-blue-200 rounded text-blue-700">Form to register a new bus would load here...</div>;
      case 'remove-bus':
        return <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">Select a bus ID to decommission from the fleet.</div>;
      case 'change-driver':
        return <div className="p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-700">Reassigning drivers for Route B01 and B02.</div>;
      case 'add-student':
        return <div className="p-4 bg-green-50 border border-green-200 rounded text-green-700">Enter student ID and assign a bus route.</div>;
    case 'driver-payment':
        return <div className="p-4 bg-green-50 border border-green-200 rounded text-green-700">Select driver</div>;
      default:
        return <div>Select an option from the menu.</div>;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Sidebar */}
      <div style={{ width: '280px', backgroundColor: '#ffffff', borderRight: '1px solid #e5e7eb', padding: '20px' }}>
        {/* Admin Info Section */}
        <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
          <div className="img-and-adminName flex gap-5">
          <img className='w-12' src={logo} alt="" />
           <div className="adim-info">
             <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0' }}>{admin.name}</h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{admin.designation}</p>
           </div>
          </div>
        </div>

        {/* Options Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setActiveView('all-buses')} style={buttonStyle(activeView === 'all-buses')}>Show All Buses</button>
          <button onClick={() => setActiveView('add-bus')} style={buttonStyle(activeView === 'add-bus')}>Add Buses</button>
          <button onClick={() => setActiveView('remove-bus')} style={buttonStyle(activeView === 'remove-bus')}>Remove Buses</button>
          <button onClick={() => setActiveView('change-driver')} style={buttonStyle(activeView === 'change-driver')}>Change Driver</button>
          <button onClick={() => setActiveView('add-student')} style={buttonStyle(activeView === 'add-student')}>Add Student</button>
          <button onClick={() => setActiveView('driver-payment')} style={buttonStyle(activeView === 'driver-payment')}>Driver Payment</button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
          Management Portal
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};

// Simple helper for dynamic button styling
const buttonStyle = (isActive) => ({
  textAlign: 'left',
  padding: '12px 16px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: isActive ? '#2563eb' : 'transparent',
  color: isActive ? '#ffffff' : '#4b5563',
  fontWeight: isActive ? '600' : '400',
  transition: 'all 0.2s'
});

export default AdminDashboard;