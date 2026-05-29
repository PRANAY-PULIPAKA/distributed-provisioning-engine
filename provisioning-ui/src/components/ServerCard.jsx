import { SiPostgresql } from "react-icons/si";

function ServerCard({
    request,
    onDelete,
}) {

    const getStatusColor = () => {

        switch (request.status) {

            case "SUCCESS":
                return "#22c55e";

            case "FAILED":
                return "#ef4444";

            case "IN_PROGRESS":
                return "#f59e0b";

            default:
                return "#94a3b8";
        }
    };

    return (

        <div
            style={{
                backgroundColor: "#1e293b",
                borderRadius: "20px",
                padding: "24px",
                marginBottom: "20px",
                border: "1px solid #334155",
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >

                    <SiPostgresql
                        size={40}
                        color="#38bdf8"
                    />

                    <div>

                        <h2>
                            {request.serverName}
                        </h2>

                        <p
                            style={{
                                color: "#94a3b8",
                            }}
                        >
                            PostgreSQL Server
                        </p>

                    </div>

                </div>

                <div
                    style={{
                        backgroundColor:
                            getStatusColor(),
                        padding:
                            "8px 14px",
                        borderRadius:
                            "999px",
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    {request.status}
                </div>

            </div>

            <div
                style={{
                    marginTop: "20px",
                    color: "#cbd5e1",
                }}
            >

                <p>
                    <strong>Port:</strong>
                    {" "}
                    {request.port}
                </p>

                <p>
                    <strong>Endpoint:</strong>
                    {" "}
                    localhost:{request.port}
                </p>

                <p>
                    <strong>Container:</strong>
                    {" "}
                    {request.serverName}
                </p>

                <p>
                    <strong>Retries:</strong>
                    {" "}
                    {request.retryCount}
                </p>

            </div>

            <button
                onClick={() =>
                    onDelete(request)
                }
                style={{
                    marginTop: "20px",
                    backgroundColor:
                        "#dc2626",
                    color: "white",
                    border: "none",
                    padding:
                        "10px 16px",
                    borderRadius:
                        "10px",
                    cursor: "pointer",
                }}
            >
                Delete Server
            </button>

        </div>
    );
}

export default ServerCard;