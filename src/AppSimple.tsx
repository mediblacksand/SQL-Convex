// Simple test app

function AppSimple() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>MEDIBLACKSAND SQL Learning Platform</h1>
      <p>Testing basic deployment...</p>
      <div style={{ 
        background: 'linear-gradient(45deg, #0891b2, #0e7490)',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <h2>Status: Deployment Test</h2>
        <p>If you can see this, the basic React app is working.</p>
        <p>URL: {window.location.href}</p>
        <p>Hostname: {window.location.hostname}</p>
      </div>
    </div>
  );
}

export default AppSimple;