import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Páginas
import Dashboard from "./pages/Dashboard";
import Citas from "./pages/Citas";
import Reportes from "./pages/Reportes";
import Pacientes from "./pages/Pacientes";
import Doctores from "./pages/Doctores";
import Consultorios from "./pages/Consultorios";
import Disponibilidad from "./pages/Disponibilidad";


function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      
      <main className="main-content">
        <Navbar />
        
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/doctores" element={<Doctores />} />
            <Route path="/consultorios" element={<Consultorios />} />
            <Route path="/disponibilidad" element={<Disponibilidad />} />
            
            {/* Rutas en construcción (Pacientes, Doctores, etc) */}
            <Route path="*" element={
              <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--primary)', marginBottom: '10px' }}>En Construcción 🚧</h2>
                <p style={{ color: 'var(--text-light)' }}>Esta vista estará disponible en la próxima versión.</p>
              </div>
            } />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;