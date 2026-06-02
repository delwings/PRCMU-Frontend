// src/pages/Disponibilidad.jsx
import { useState, useEffect } from 'react';
import { getDoctors, getAvailability } from '../services/api';

function Disponibilidad() {
  const [doctores, setDoctores] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Cargar doctores reales al montar la vista
  useEffect(() => {
    getDoctors().then(setDoctores).catch(console.error);
  }, []);

  // Buscar disponibilidad cuando el usuario hace clic en el botón
  const handleBuscar = async () => {
    if (!selectedDoctor || !selectedDate) {
      alert("Por favor seleccione un médico y una fecha");
      return;
    }
    setCargando(true);
    try {
      const data = await getAvailability(selectedDoctor, selectedDate);
      setHorarios(data);
    } catch (error) {
      alert("Error al cargar disponibilidad: " + error.message);
    } finally {
      setCargando(false);
    }
  };

  const handleAsignar = (slot) => {
    // Aquí puedes redirigir al formulario de citas pasando los datos
    alert(`Redirigiendo a reserva para el horario: ${slot.start}`);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Disponibilidad Médica</h1>
        <p>Consulte los horarios libres y ocupados del personal médico.</p>
      </div>

      {/* Filtros */}
      <div className="card" style={{ padding: '24px', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div className="form-group" style={{ margin: 0, flex: '1 1 200px' }}>
          <label className="form-label">Médico</label>
          <select className="form-control" value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)}>
            <option value="">-- Seleccione --</option>
            {doctores.map(doc => (
              <option key={doc.id} value={doc.id}>{doc.name} {doc.lastName}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group" style={{ margin: 0, flex: '1 1 200px' }}>
          <label className="form-label">Fecha</label>
          <input type="date" className="form-control" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
        </div>

        <button className="btn-primary" onClick={handleBuscar} disabled={cargando} style={{ width: 'auto', padding: '10px 24px' }}>
          {cargando ? 'Buscando...' : 'Buscar Horarios'}
        </button>
      </div>

      {/* Resultados */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Horario</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {horarios.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-light)' }}>
                  Seleccione filtros y presione buscar para ver los horarios.
                </td>
              </tr>
            ) : (
              horarios.map((slot, index) => {
                // Formatear horas si vienen en formato ISO (ej: 2026-06-01T08:00:00)
                const inicio = slot.start.includes('T') ? slot.start.split('T')[1].substring(0,5) : slot.start;
                const fin = slot.end.includes('T') ? slot.end.split('T')[1].substring(0,5) : slot.end;
                
                return (
                  <tr key={index}>
                    <td style={{ fontWeight: '500' }}>{inicio} - {fin}</td>
                    <td>
                      <span className={`status ${slot.available ? 'confirmed' : 'warning'}`} style={{ background: slot.available ? '#dcfce7' : '#fee2e2', color: slot.available ? 'var(--success)' : 'var(--danger)' }}>
                        {slot.available ? 'Disponible' : 'Ocupado'}
                      </span>
                    </td>
                    <td>
                      {slot.available && (
                        <button onClick={() => handleAsignar(slot)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>
                          Asignar +
                        </button>
                      )}
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

export default Disponibilidad;