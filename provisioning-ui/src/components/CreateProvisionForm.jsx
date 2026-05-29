import { useState } from "react";
import api from "../services/api";

function CreateProvisionForm({ onCreated }) {
  const [serverName, setServerName] = useState("");
  const [resourceType, setResourceType] = useState("POSTGRESQL");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!serverName.trim()) return;
    setLoading(true);
    try {
      await api.post(
        "/provision",
        { resourceType, serverName },
        { headers: { "Idempotency-key": crypto.randomUUID() } }
      );
      setServerName("");
      onCreated();
    } catch (err) {
      alert(err.response?.data?.error || "Provisioning failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "7px 10px", fontSize: "13px",
    border: "1px solid #d1d5db", borderRadius: "4px", outline: "none",
    fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#111827",
    boxSizing: "border-box", backgroundColor: "white",
  };

  const labelStyle = { fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div>
        <label style={labelStyle}>Server name *</label>
        <input
          type="text"
          placeholder="e.g. my-postgres-server"
          value={serverName}
          onChange={e => setServerName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleCreate()}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Resource type</label>
        <select
          value={resourceType}
          onChange={e => setResourceType(e.target.value)}
          style={inputStyle}
        >
          <option value="POSTGRESQL">PostgreSQL</option>
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "4px" }}>
        <button
          onClick={handleCreate}
          disabled={!serverName.trim() || loading}
          style={{
            padding: "7px 20px", fontSize: "13px", fontWeight: 500,
            backgroundColor: serverName.trim() ? "#0078d4" : "#93c5fd",
            color: "white", border: "none", borderRadius: "4px",
            cursor: serverName.trim() ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}

export default CreateProvisionForm;
