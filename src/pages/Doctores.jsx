import { useState, useEffect } from 'react';
import { getDoctors } from '../services/api';

function Doctores() {
  const [doctores, setDoctores] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDoctores() {
      const data = await getDoctors();
      setDoctores(data);
      setCargando(false);
    }
    cargarDoctores();
  }, []);

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Personal Médico</h1>
          <p>Administre el catálogo de doctores y sus especialidades.</p>
        </div>
        <button className="btn-primary" style={{ width: 'auto' }}>
          + Nuevo Doctor
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor</th>
              <th>Especialidad</th>
              <th>Consultorio Asignado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-light)' }}>
                  Cargando información...
                </td>
              </tr>
            ) : doctores.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-light)' }}>
                  No hay doctores registrados.
                </td>
              </tr>
            ) : (
              doctores.map((doc) => (
                <tr key={doc.id}>
                  <td><span className="patient-id">MED-{doc.id}</span></td>
                  <td>
                    <div className="patient-name">{doc.name || doc.firstName} {doc.lastName}</div>
                  </td>
                  <td>{doc.specialty || 'Medicina General'}</td>
                  <td>{doc.office || 'Consultorio 101'}</td>
                  <td>
                    <button style={{ 
                      background: 'none', border: 'none', color: 'var(--primary)', 
                      cursor: 'pointer', fontWeight: '600', fontSize: '13px' 
                    }}>
                      Configurar Horario
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

export default Doctores;