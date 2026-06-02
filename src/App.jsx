import { useState } from 'react';

function App() {
  // Estados mockeados para simular la interacción visual de las listas desplegables
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [slotSelected, setSlotSelected] = useState(null);

  // Datos de simulación (Mock) para ver cómo lucirá la UI con datos
  const horariosMock = [
    { start: '08:00', end: '08:30', available: true },
    { start: '08:30', end: '09:00', available: true },
    { start: '09:00', end: '09:30', available: false },
    { start: '09:30', end: '10:00', available: true },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '10px' }}>
      
      {/* Encabezado Principal al estilo UMO */}
      <header style={{ marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid var(--border)' }}>
        <h1 style={{ color: 'var(--primary)', fontSize: '1.8rem', fontWeight: '700' }}>RCMCU — Gestión de Reservas</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Sistema de Control de Consultorios Médicos Universitarios</p>
      </header>

      {/* Grid de doble columna */}
      <div className="grid">
        
        {/* Columna Izquierda: Formulario de Nueva Cita */}
        <div className="card">
          <h2 style={{ marginBottom: '18px', fontSize: '1.25rem', color: 'var(--text)' }}>Nueva Reserva</h2>
          
          <form onSubmit={(e) => e.preventDefault()}>
            
            {/* Combo 1: Selección de Paciente */}
            <div className="form-group">
              <label>Paciente</label>
              <select className="form-control" value={patient} onChange={(e) => setPatient(e.target.value)}>
                <option value="">-- Seleccione el paciente --</option>
                <option value="1">John Smith (ID: 1)</option>
                <option value="2">Jane Doe (ID: 2)</option>
              </select>
            </div>

            {/* Combo 2: Selección de Médico */}
            <div className="form-group">
              <label>Médico / Especialista</label>
              <select className="form-control" value={doctor} onChange={(e) => setDoctor(e.target.value)}>
                <option value="">-- Seleccione el médico --</option>
                <option value="1">Dr. Gregory House (Medicina General)</option>
                <option value="2">Dra. Lisa Cuddy (Endocrinología)</option>
              </select>
            </div>

            {/* Campo 3: Fecha de la Consulta */}
            <div className="form-group">
              <label>Fecha de la Cita</label>
              <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            {/* Combo 4: Consultorios (Estructura fija requerida) */}
            <div className="form-group">
              <label>Consultorio Asignado</label>
              <select className="form-control" style={{ backgroundColor: '#f8fafc' }}>
                <option value="1">Consultorio 101 - Piso 1</option>
              </select>
            </div>

            {/* Combo 5: Tipo de Cita */}
            <div className="form-group">
              <label>Tipo de Atención</label>
              <select className="form-control" style={{ backgroundColor: '#f8fafc' }}>
                <option value="1">Consulta General</option>
              </select>
            </div>

            {/* Botón de envío */}
            <button type="submit" className="btn" style={{ marginTop: '10px' }}>
              Confirmar y Agendar Cita
            </button>
          </form>
        </div>

        {/* Columna Derecha: Bloques de Horarios Disponibles */}
        <div className="card">
          <h2 style={{ marginBottom: '6px', fontSize: '1.25rem' }}>Horarios Disponibles</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '18px' }}>
            Selecciona un bloque libre calculado para el médico especialista.
          </p>

          <div className="slot-container">
            {horariosMock.map((slot, index) => (
              <div 
                key={index} 
                className="slot-card"
                style={{ 
                  opacity: slot.available ? 1 : 0.6,
                  backgroundColor: slotSelected === index ? '#eff6ff' : '#f8fafc',
                  borderColor: slotSelected === index ? 'var(--primary)' : 'var(--border)'
                }}
              >
                <div>
                  <span style={{ fontWeight: '600' }}>{slot.start}</span>
                  <span style={{ color: 'var(--text-muted)', margin: '0 6px' }}>a</span>
                  <span style={{ fontWeight: '600' }}>{slot.end}</span>
                </div>

                {slot.available ? (
                  <button 
                    type="button" 
                    className="btn-slot"
                    style={{ backgroundColor: slotSelected === index ? 'var(--success)' : 'var(--primary)' }}
                    onClick={() => setSlotSelected(index)}
                  >
                    {slotSelected === index ? '✓ Elegido' : 'Seleccionar'}
                  </button>
                ) : (
                  <span style={{ color: 'var(--error)', fontSize: '0.85rem', fontWeight: '500' }}>Ocupado</span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;