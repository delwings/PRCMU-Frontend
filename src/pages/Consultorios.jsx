// src/pages/Consultorios.jsx
import { useState, useEffect } from 'react';
import { getOffices } from '../services/api';

function Consultorios() {
  const [consultorios, setConsultorios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getOffices()
      .then(data => {
        setConsultorios(data);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al cargar consultorios:", err);
        setCargando(false);
      });
  }, []);

  const handleNuevoConsultorio = () => {
    alert("Funcionalidad en desarrollo: Aquí se abrirá el modal para crear un Consultorio.");
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Catálogo de Consultorios</h1>
          <p>Administre los espacios físicos y consultorios disponibles.</p>
        </div>
        <button className="btn-primary" onClick={handleNuevoConsultorio} style={{ width: 'auto' }}>
          + Nuevo Consultorio
        </button>
      </div>

      {cargando ? (
        <p style={{ color: 'var(--text-light)' }}>Cargando desde la base de datos...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {consultorios.map((cons) => (
            <div className="card" key={cons.id}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px' }}>{cons.name}</h3>
                <span className="status confirmed">Activo</span>
              </div>
              
              <div style={{ padding: '20px' }}>
                <p style={{ margin: '8px 0', fontSize: '14px' }}>
                  <strong style={{ color: 'var(--text-light)', width: '80px', display: 'inline-block' }}>Ubicación: </strong> {cons.location}
                </p>
                {/* Agrega más campos si tu API de Spring Boot los retorna */}
                
                <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                  <button onClick={() => alert(`Editando consultorio: ${cons.name}`)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>
                    Editar detalles &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Consultorios;