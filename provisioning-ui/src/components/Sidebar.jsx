import { useNavigate, useLocation } from "react-router-dom";
import { SiPostgresql } from "react-icons/si";
import { MdDashboard } from "react-icons/md";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "Dashboard", icon: <MdDashboard size={18} />, path: "/" },
    { label: "PostgreSQL", icon: <SiPostgresql size={18} color="#336791" />, path: "/postgresql" },
  ];

  return (
    <div style={{
      width: "220px", backgroundColor: "#1b1b1b", color: "#ccc",
      height: "100vh", display: "flex", flexDirection: "column",
      flexShrink: 0, fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Logo area */}
      <div style={{
        height: "48px", display: "flex", alignItems: "center",
        padding: "0 16px", borderBottom: "1px solid #333", flexShrink: 0
      }}>
        <div style={{
          width: "24px", height: "24px", backgroundColor: "#0078d4",
          borderRadius: "3px", marginRight: "10px", flexShrink: 0
        }} />
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#e5e7eb" }}>Provisioning</span>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, paddingTop: "8px", overflow: "auto" }}>
        {items.map(item => {
          const active = location.pathname === item.path;
          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 16px", cursor: "pointer", fontSize: "13px",
                color: active ? "white" : "#9ca3af",
                backgroundColor: active ? "#0078d4" : "transparent",
                borderLeft: active ? "3px solid #50b4f8" : "3px solid transparent",
                transition: "background 0.1s",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = "#2a2a2a"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
