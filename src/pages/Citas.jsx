import { useState, useEffect } from 'react';
import { getPatients, getDoctors, getAvailability, createAppointment } from '../services/api';

function Citas() {
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    async function loadData() {
      setPacientes(await getPatients());
      setMedicos(await getDoctors());
    }
    loadData();
  }, []);

  useEffect(() => {
    async function fetchSlots() {
      if (selectedDoctor && selectedDate) {
        setSelectedSlot(null);
        setHorarios(await getAvailability(selectedDoctor, selectedDate));
      } else {
        setHorarios([]);
      }
    }
    fetchSlots();
  }, [selectedDoctor, selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !selectedDoctor || !selectedDate || !selectedSlot) {
      setAlert({ show: true, type: 'error', message: 'Complete todos los campos y seleccione un horario.' });
      return;
    }

    setIsSubmitting(true);
    const horaInicio = selectedSlot.start.includes('T') ? selectedSlot.start.split('T')[1].substring(0, 8) : `${selectedSlot.start}:00`;

    try {
      const resp = await createAppointment({
        dateTime: `${selectedDate}T${horaInicio}`,
        patientId: parseInt(selectedPatient),
        doctorId: parseInt(selectedDoctor),
        officeId: 1,
        typeId: 1
      });
      setAlert({ show: true, type: 'success', message: `¡Cita agendada con éxito! ID Reserva: #${resp.id || 'OK'}` });
      setSelectedSlot(null);
      setHorarios(await getAvailability(selectedDoctor, selectedDate));
    } catch (error) {
      setAlert({ show: true, type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Gestión de Citas</h1>
        <p>Agende una nueva cita seleccionando paciente, médico y horario.</p>
      </div>

      {alert.show && (
        <div style={{
          padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '500',
          background: alert.type === 'success' ? '#dcfce7' : '#fee2e2',
          color: alert.type === 'success' ? 'var(--success)' : 'var(--danger)',
          border: `1px solid ${alert.type === 'success' ? '#bbf7d0' : '#fecaca'}`
        }}>
          {alert.message}
        </div>
      )}

      <div className="content-grid">
        {/* Formulario Izquierdo */}
        <div className="card">
          <div className="card-header">
            <h3>Registrar Nueva Cita</h3>
            <p>Información requerida</p>
          </div>
          <div style={{ padding: '24px' }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Paciente</label>
                <select className="form-control" value={selectedPatient} onChange={e => setSelectedPatient(e.target.value)}>
                  <option value="">-- Seleccione un paciente --</option>
                  {pacientes.map(p => <option key={p.id} value={p.id}>{p.name} {p.lastName} (ID: {p.id})</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Médico Especialista</label>
                <select className="form-control" value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)}>
                  <option value="">-- Seleccione un médico --</option>
                  {medicos.map(m => <option key={m.id} value={m.id}>{m.name || m.firstName}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Fecha de Cita</label>
                <input type="date" className="form-control" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Consultorio (Asignado)</label>
                <select className="form-control" disabled><option>Consultorio 101 - Piso 1</option></select>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '10px' }} disabled={isSubmitting}>
                {isSubmitting ? 'Procesando...' : 'Confirmar Reserva'}
              </button>
            </form>
          </div>
        </div>

        {/* Panel Derecho de Horarios */}
        <div className="card">
          <div className="card-header">
            <h3>Horarios Disponibles</h3>
            <p>Seleccione un bloque para confirmar</p>
          </div>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {horarios.length === 0 && <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>Por favor, seleccione médico y fecha para consultar horarios.</p>}
            
            {horarios.map((slot, i) => {
              const horaInicio = slot.start.includes('T') ? slot.start.split('T')[1].substring(0, 5) : slot.start;
              const horaFin = slot.end.includes('T') ? slot.end.split('T')[1].substring(0, 5) : slot.end;
              const isSelected = selectedSlot === slot;

              return (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '8px', 
                  border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`, background: isSelected ? '#f0f9ff' : '#f8fafc'
                }}>
                  <span style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text-dark)' }}>{horaInicio} - {horaFin}</span>
                  {slot.available ? (
                    <button type="button" onClick={() => setSelectedSlot(slot)}
                      style={{ background: isSelected ? 'var(--success)' : 'white', color: isSelected ? 'white' : 'var(--primary)', border: `1px solid ${isSelected ? 'var(--success)' : 'var(--border)'}`, padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                      {isSelected ? '✓ Elegido' : 'Seleccionar'}
                    </button>
                  ) : (
                    <span style={{ color: 'var(--danger)', fontSize: '13px', fontWeight: '600' }}>Ocupado</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Citas;