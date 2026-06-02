import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: "📊" },
  { name: "Citas (Reservas)", path: "/citas", icon: "🗓️" },
  { name: "Pacientes", path: "/pacientes", icon: "👥" },
  { name: "Doctores", path: "/doctores", icon: "⚕️" },
  { name: "Consultorios", path: "/consultorios", icon: "🏥" },
  { name: "Reportes", path: "/reportes", icon: "📈" },
  { name: "Disponibilidad", path: "/disponibilidad", icon: "🕒" }
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="logo">
          <div className="logo-icon">+</div>
          <div className="logo-text">
            <h2>UMO</h2>
            <span>CONSULTORIOS</span>
          </div>
        </div>

        <div className="menu">
          {menuItems.map((item) => (
            <NavLink 
              key={item.name} 
              to={item.path} 
              className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
            >
              <span style={{ marginRight: '8px' }}>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="sidebar-footer">
        Universidad — Sistema Médico<br/>v1.0.0
      </div>
    </aside>
  );
}
export default Sidebar;