import { useNavigate } from "react-router-dom";
import { SiPostgresql } from "react-icons/si";
import Sidebar from "../components/Sidebar.jsx";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", backgroundColor: "#f3f4f6", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Sidebar active="dashboard" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{
          height: "48px", backgroundColor: "#0078d4", display: "flex", alignItems: "center",
          padding: "0 20px", flexShrink: 0, gap: "16px"
        }}>
          <span style={{ color: "white", fontSize: "14px", fontWeight: 600 }}>
              Distributed Provisioning Engine
          </span>
        </div>

        {/* Breadcrumb */}
        <div style={{
          backgroundColor: "white", borderBottom: "1px solid #e5e7eb",
          padding: "8px 24px", display: "flex", alignItems: "center", gap: "6px", flexShrink: 0
        }}>
          <span style={{ fontSize: "12px", color: "#6b7280" }}>Home</span>
          <span style={{ fontSize: "12px", color: "#6b7280" }}>›</span>
          <span style={{ fontSize: "12px", color: "#0078d4" }}>Dashboard</span>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflow: "auto", padding: "24px 32px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#1f2937", margin: "0 0 4px 0" }}>
            Distributed Provisioning Engine
          </h1>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 28px 0" }}>
            Manage and provision cloud database resources
          </p>

          {/* Section label */}
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "14px" }}>
            Services
          </div>

          {/* Resource cards */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div
              onClick={() => navigate("/postgresql")}
              style={{
                width: "220px", backgroundColor: "white", border: "1px solid #e5e7eb",
                borderRadius: "4px", padding: "20px", cursor: "pointer",
                transition: "box-shadow 0.15s, border-color 0.15s", flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,120,212,0.15)";
                e.currentTarget.style.borderColor = "#0078d4";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <SiPostgresql size={36} color="#336791" />
              </div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937", marginBottom: "4px" }}>
                PostgreSQL
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.5" }}>
                Managed database provisioning platform
              </div>
              <div style={{
                marginTop: "14px", display: "inline-flex", alignItems: "center", gap: "4px",
                fontSize: "12px", color: "#0078d4", fontWeight: 500
              }}>
                Open →
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
