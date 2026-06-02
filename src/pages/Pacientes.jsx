import { useState, useEffect } from 'react';
import { getPatients } from '../services/api';

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarPacientes() {
      const data = await getPatients();
      setPacientes(data);
      setCargando(false);
    }
    cargarPacientes();
  }, []);

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Directorio de Pacientes</h1>
          <p>Gestión y registro de pacientes de la clínica.</p>
        </div>
        <button className="btn-primary" style={{ width: 'auto' }}>
          + Nuevo Paciente
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Documento</th>
              <th>Contacto</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-light)' }}>
                  Cargando información...
                </td>
              </tr>
            ) : pacientes.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-light)' }}>
                  No hay pacientes registrados en el sistema.
                </td>
              </tr>
            ) : (
              pacientes.map((p) => (
                <tr key={p.id}>
                  <td><span className="patient-id">#{p.id}</span></td>
                  <td>
                    <div className="patient-name">{p.name} {p.lastName}</div>
                  </td>
                  <td>{p.document || 'No registrado'}</td>
                  <td>{p.email || 'Sin correo'}</td>
                  <td>
                    <span className="status confirmed" style={{ background: '#dcfce7', color: 'var(--success)' }}>
                      Activo
                    </span>
                  </td>
                  <td>
                    <button style={{ 
                      background: 'none', border: 'none', color: 'var(--primary)', 
                      cursor: 'pointer', fontWeight: '600', fontSize: '13px' 
                    }}>
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pacientes;