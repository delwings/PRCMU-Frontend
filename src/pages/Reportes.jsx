function Reportes() {
  const reports = [
    { office: "Consultorio 101", location: "Piso 1", total: 40, occupied: 32, percentage: 80 },
    { office: "Consultorio 102", location: "Piso 1", total: 40, occupied: 15, percentage: 37 },
    { office: "Consultorio 201", location: "Piso 2", total: 40, occupied: 38, percentage: 95 }
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Reportes y Analíticas</h1>
        <p>Estadísticas de uso y productividad de los consultorios.</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Ocupación de consultorios</h3>
          <p>Porcentaje de bloques horarios utilizados en la semana</p>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Consultorio</th>
              <th>Ubicación</th>
              <th>Slots Totales</th>
              <th>Ocupados</th>
              <th>Ocupación</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((item) => (
              <tr key={item.office}>
                <td><strong>{item.office}</strong></td>
                <td>{item.location}</td>
                <td>{item.total}</td>
                <td>{item.occupied}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div className="progress-wrapper">
                      <div className="progress-bar" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <strong>{item.percentage}%</strong>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reportes;