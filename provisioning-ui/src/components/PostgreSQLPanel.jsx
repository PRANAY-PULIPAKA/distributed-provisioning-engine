import { useState } from "react";
import CreateProvisionForm from "./CreateProvisionForm";
import ProvisionTable from "./ProvisionTable";
import ResourceCard from "./ResourceCard";

function PostgreSQLPanel({ requests, onRefresh }) {

    const [open, setOpen] = useState(false);

    return (

        <div>

            <ResourceCard
                title="PostgreSQL"
                description="Managed database provisioning"
                color="#38bdf8"
                onClick={() => setOpen(!open)}
            />

            {open && (

                <div
                    style={{
                        marginTop: "30px",
                        backgroundColor: "#111827",
                        padding: "24px",
                        borderRadius: "16px",
                    }}
                >

                    <h2>
                        PostgreSQL Servers
                    </h2>

                    <CreateProvisionForm
                        onCreated={onRefresh}
                    />

                   <ProvisionTable
                       requests={requests}
                       onDeleted={onRefresh}
                   />

                </div>
            )}

        </div>
    );
}

export default PostgreSQLPanel;