import { useEffect, useState } from "react";
import { SiPostgresql } from "react-icons/si";
import api from "../services/api";
import Sidebar from "../components/Sidebar.jsx";
import CreateProvisionForm from "../components/CreateProvisionForm.jsx";

function StatusBadge({ status }) {
  const map = {
    SUCCESS:     { bg: "#dcfce7", color: "#166534", dot: "#16a34a" },
    FAILED:      { bg: "#fee2e2", color: "#991b1b", dot: "#dc2626" },
    IN_PROGRESS: { bg: "#fef9c3", color: "#854d0e", dot: "#ca8a04" },
  };
  const s = map[status] || { bg: "#f3f4f6", color: "#374151", dot: "#9ca3af" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      backgroundColor: s.bg, color: s.color,
      fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "10px",
    }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: s.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function DeleteDialog({ server, onClose, onDeleted }) {
  const [confirmName, setConfirmName] = useState("");
  const [loading, setLoading] = useState(false);

  const canDelete = confirmName === server.serverName;

  const handleDelete = async () => {
    if (!canDelete) return;
    setLoading(true);
    try {
      await api.delete(`/provision/${server.id}`);
      onDeleted();
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed");
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <div style={{
        backgroundColor: "white", borderRadius: "4px", width: "460px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px", borderBottom: "1px solid #e5e7eb",
          display: "flex", alignItems: "center", gap: "10px"
        }}>
          <div style={{
            width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#fee2e2",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <span style={{ fontSize: "14px" }}>⚠</span>
          </div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "#111827" }}>Delete server</div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>{server.serverName}</div>
          </div>
          <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" }}>×</button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px" }}>
          <div style={{
            backgroundColor: "#fff7ed", border: "1px solid #fed7aa",
            borderRadius: "4px", padding: "12px 14px", marginBottom: "16px"
          }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#9a3412", marginBottom: "4px" }}>
              ⚠ This action cannot be undone
            </div>
            <div style={{ fontSize: "12px", color: "#7c2d12", lineHeight: "1.5" }}>
              All data will be permanently deleted. Recovery is <strong>NOT</strong> supported once the server is deleted.
            </div>
          </div>

          <div style={{ fontSize: "13px", color: "#374151", marginBottom: "8px" }}>
            To confirm deletion, type the server name:
            <span style={{
              display: "inline-block", marginLeft: "6px", fontFamily: "monospace",
              backgroundColor: "#f3f4f6", padding: "1px 6px", borderRadius: "3px",
              fontWeight: 600, color: "#1f2937", fontSize: "12px"
            }}>{server.serverName}</span>
          </div>

          <input
            type="text"
            value={confirmName}
            onChange={e => setConfirmName(e.target.value)}
            placeholder="Enter server name"
            autoFocus
            style={{
              width: "100%", padding: "8px 10px", fontSize: "13px",
              border: `1px solid ${canDelete ? "#dc2626" : "#d1d5db"}`,
              borderRadius: "4px", outline: "none", boxSizing: "border-box",
              fontFamily: "monospace", color: "#111827",
            }}
          />
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 20px", borderTop: "1px solid #e5e7eb",
          display: "flex", justifyContent: "flex-end", gap: "8px"
        }}>
          <button onClick={onClose} style={{
            padding: "7px 16px", fontSize: "13px", border: "1px solid #d1d5db",
            borderRadius: "4px", backgroundColor: "white", cursor: "pointer", color: "#374151"
          }}>
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={!canDelete || loading}
            style={{
              padding: "7px 16px", fontSize: "13px", border: "none",
              borderRadius: "4px", cursor: canDelete ? "pointer" : "not-allowed",
              backgroundColor: canDelete ? "#dc2626" : "#fca5a5", color: "white", fontWeight: 500,
            }}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailPanel({ server, onDelete, onClose }) {
  const fields = [
    { label: "Server name", value: server.serverName },
    { label: "Resource type", value: "PostgreSQL" },
    { label: "Status", value: <StatusBadge status={server.status} /> },
    { label: "Port", value: server.port || "—" },
    { label: "Endpoint", value: server.port ? `localhost:${server.port}` : "—" },
    { label: "Container", value: server.serverName },
    { label: "Retry count", value: server.retryCount ?? 0 },
  ];

  return (
    <div style={{
      width: "380px", flexShrink: 0, backgroundColor: "white",
      borderLeft: "1px solid #e5e7eb", display: "flex", flexDirection: "column",
      overflow: "hidden", fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Panel header */}
      <div style={{
        padding: "14px 16px", borderBottom: "1px solid #e5e7eb",
        display: "flex", alignItems: "center", gap: "10px", flexShrink: 0
      }}>
        <SiPostgresql size={22} color="#336791" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {server.serverName}
          </div>
          <div style={{ fontSize: "11px", color: "#6b7280" }}>PostgreSQL Server</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#9ca3af" }}>×</button>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid #e5e7eb", padding: "0 16px", display: "flex", gap: "0", flexShrink: 0 }}>
        <div style={{
          padding: "10px 12px", fontSize: "13px", fontWeight: 600,
          color: "#0078d4", borderBottom: "2px solid #0078d4", cursor: "pointer"
        }}>Overview</div>
      </div>

      {/* Overview content */}
      <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
        <div style={{ marginBottom: "20px" }}>
          {fields.map(f => (
            <div key={f.label} style={{
              display: "flex", padding: "8px 0",
              borderBottom: "1px solid #f3f4f6", alignItems: "center"
            }}>
              <div style={{ width: "130px", fontSize: "12px", color: "#6b7280", flexShrink: 0 }}>{f.label}</div>
              <div style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>{f.value}</div>
            </div>
          ))}
        </div>

        {/* Delete section */}
        <div style={{
          border: "1px solid #fecaca", borderRadius: "4px",
          padding: "14px", backgroundColor: "#fff5f5"
        }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#991b1b", marginBottom: "6px" }}>Danger zone</div>
          <div style={{ fontSize: "12px", color: "#7f1d1d", marginBottom: "10px", lineHeight: "1.5" }}>
            Deleting this server will permanently remove all data. This action cannot be reversed.
          </div>
          <button
            onClick={() => onDelete(server)}
            style={{
              padding: "7px 14px", fontSize: "12px", fontWeight: 500,
              backgroundColor: "#dc2626", color: "white", border: "none",
              borderRadius: "4px", cursor: "pointer"
            }}
          >
            Delete server
          </button>
        </div>
      </div>
    </div>
  );
}

function PostgreSQLPage() {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/provision");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
    const id = setInterval(fetchRequests, 3000);
    return () => clearInterval(id);
  }, []);

  const handleDeleted = () => {
    setDeleteTarget(null);
    setSelected(null);
    fetchRequests();
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: "#f3f4f6" }}>
        {/* Top Azure bar */}
        <div style={{
          height: "48px", backgroundColor: "#0078d4", display: "flex",
          alignItems: "center", padding: "0 20px", flexShrink: 0, gap: "16px"
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
          <span style={{ fontSize: "12px", color: "#6b7280" }}>Dashboard</span>
          <span style={{ fontSize: "12px", color: "#6b7280" }}>›</span>
          <span style={{ fontSize: "12px", color: "#0078d4" }}>PostgreSQL servers</span>
        </div>

        {/* Page header */}
        <div style={{
          backgroundColor: "white", borderBottom: "1px solid #e5e7eb",
          padding: "14px 24px", display: "flex", alignItems: "center", gap: "12px", flexShrink: 0
        }}>
          <SiPostgresql size={28} color="#336791" />
          <div>
            <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#111827" }}>PostgreSQL servers</h1>
            <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>Managed PostgreSQL provisioning</p>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <button
              onClick={() => setShowCreate(true)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "7px 14px", fontSize: "13px", fontWeight: 500,
                backgroundColor: "#0078d4", color: "white", border: "none",
                borderRadius: "4px", cursor: "pointer"
              }}
            >
              + Create
            </button>
          </div>
        </div>

        {/* Main area */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Server list */}
          <div style={{ flex: 1, overflow: "auto", padding: "0" }}>
            {/* Column headers */}
            <div style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
              padding: "8px 20px", borderBottom: "1px solid #e5e7eb",
              backgroundColor: "#f9fafb", position: "sticky", top: 0, zIndex: 1
            }}>
              {["Name", "Status", "Port", "Retry count"].map(h => (
                <div key={h} style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</div>
              ))}
            </div>

            {requests.length === 0 ? (
              <div style={{ padding: "60px 20px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>
                No servers provisioned yet. Click <strong>+ Create</strong> to get started.
              </div>
            ) : (
              requests.map(req => {
                const isSelected = selected?.id === req.id;
                return (
                  <div
                    key={req.id}
                    onClick={() => setSelected(isSelected ? null : req)}
                    style={{
                      display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
                      padding: "12px 20px", borderBottom: "1px solid #f3f4f6",
                      cursor: "pointer", alignItems: "center",
                      backgroundColor: isSelected ? "#eff6ff" : "white",
                      borderLeft: isSelected ? "3px solid #0078d4" : "3px solid transparent",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.backgroundColor = "#f9fafb"; }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.backgroundColor = "white"; }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <SiPostgresql size={18} color="#336791" />
                      <span style={{ fontSize: "13px", fontWeight: 500, color: "#0078d4" }}>{req.serverName}</span>
                    </div>
                    <div><StatusBadge status={req.status} /></div>
                    <div style={{ fontSize: "13px", color: "#374151" }}>{req.port || "—"}</div>
                    <div style={{ fontSize: "13px", color: "#374151" }}>{req.retryCount ?? 0}</div>
                  </div>
                );
              })
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <DetailPanel
              server={selected}
              onClose={() => setSelected(null)}
              onDelete={setDeleteTarget}
            />
          )}
        </div>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div style={{
          position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{ backgroundColor: "white", borderRadius: "4px", width: "420px", boxShadow: "0 20px 60px rgba(0,0,0,0.25)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center" }}>
              <div style={{ fontSize: "15px", fontWeight: 600, color: "#111827" }}>Create PostgreSQL server</div>
              <button onClick={() => setShowCreate(false)} style={{ marginLeft: "auto", background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" }}>×</button>
            </div>
            <div style={{ padding: "20px" }}>
              <CreateProvisionForm onCreated={() => { setShowCreate(false); fetchRequests(); }} />
            </div>
          </div>
        </div>
      )}

      {/* Delete dialog */}
      {deleteTarget && (
        <DeleteDialog
          server={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}

export default PostgreSQLPage;
