// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { getAppointments } from '../services/api';

function Dashboard() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    // Carga las citas reales de la DB
    getAppointments().then(data => {
      // Tomamos solo las primeras 5 para no saturar el dashboard
      setCitas(data.slice(0, 5));
    }).catch(console.error);
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard Principal</h1>
        <p>Resumen de actividad y citas programadas para hoy.</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Próximas citas</h3>
          <p>Listado de los siguientes pacientes a atender</p>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID Reserva</th>
              <th>Paciente (ID)</th>
              <th>Doctor (ID)</th>
              <th>Fecha/Hora</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {citas.length === 0 ? (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No hay citas registradas en la Base de Datos.</td></tr>
            ) : (
              citas.map((cita) => {
                // Ajustar visualización según la estructura de tu JSON
                const fecha = cita.dateTime ? cita.dateTime.replace('T', ' ') : 'Sin fecha';
                return (
                  <tr key={cita.id}>
                    <td><span className="patient-id">RES-{cita.id}</span></td>
                    <td>{cita.patientId}</td>
                    <td>{cita.doctorId}</td>
                    <td style={{ fontWeight: '500' }}>{fecha}</td>
                    <td>
                      <span className="status confirmed">Agendada</span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;