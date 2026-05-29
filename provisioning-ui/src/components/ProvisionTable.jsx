import { useState } from "react";

import api from "../services/api";

import ServerCard from "./ServerCard";

function ProvisionTable({
    requests,
    onDeleted,
}) {

    const [selectedServer, setSelectedServer] =
        useState(null);

    const [confirmationName, setConfirmationName] =
        useState("");

    const openDeleteDialog = (request) => {

        setSelectedServer(request);

        setConfirmationName("");
    };

    const closeDialog = () => {

        setSelectedServer(null);

        setConfirmationName("");
    };

    const confirmDelete = async () => {

        if (
            confirmationName !==
            selectedServer.serverName
        ) {

            alert(
                "Server name does not match"
            );

            return;
        }

        try {

            await api.delete(
                `/provision/${selectedServer.id}`
            );

            closeDialog();

            onDeleted();

        } catch (error) {

            alert(
                error.response?.data?.error
                || "Delete failed"
            );
        }
    };

    return (

        <div
            style={{
                marginTop: "30px",
            }}
        >

            {requests.map((request) => (

                <ServerCard
                    key={request.id}
                    request={request}
                    onDelete={
                        openDeleteDialog
                    }
                />
            ))}

            {selectedServer && (

                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor:
                            "rgba(0,0,0,0.7)",
                        display: "flex",
                        justifyContent:
                            "center",
                        alignItems:
                            "center",
                        zIndex: 999,
                    }}
                >

                    <div
                        style={{
                            backgroundColor:
                                "#111827",
                            padding: "30px",
                            borderRadius:
                                "16px",
                            width: "420px",
                            color: "white",
                        }}
                    >

                        <h2
                            style={{
                                color:
                                    "#ef4444",
                            }}
                        >
                            Delete Server
                        </h2>

                        <p>
                            All data will be
                            permanently deleted.
                        </p>

                        <p>
                            Recovery is NOT
                            supported.
                        </p>

                        <p>
                            Type server name
                            to confirm:
                        </p>

                        <strong>
                            {
                                selectedServer.serverName
                            }
                        </strong>

                        <input
                            type="text"
                            value={
                                confirmationName
                            }
                            onChange={(e) =>
                                setConfirmationName(
                                    e.target.value
                                )
                            }
                            placeholder="Enter server name"
                            style={{
                                width: "100%",
                                marginTop:
                                    "16px",
                                padding:
                                    "12px",
                                borderRadius:
                                    "8px",
                                border:
                                    "1px solid #374151",
                                backgroundColor:
                                    "#1f2937",
                                color:
                                    "white",
                            }}
                        />

                        <div
                            style={{
                                display:
                                    "flex",
                                gap: "12px",
                                marginTop:
                                    "24px",
                            }}
                        >

                            <button
                                onClick={
                                    closeDialog
                                }
                                style={{
                                    flex: 1,
                                    padding:
                                        "12px",
                                    backgroundColor:
                                        "#374151",
                                    color:
                                        "white",
                                    border:
                                        "none",
                                    borderRadius:
                                        "8px",
                                    cursor:
                                        "pointer",
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={
                                    confirmDelete
                                }
                                disabled={
                                    confirmationName !==
                                    selectedServer.serverName
                                }
                                style={{
                                    flex: 1,
                                    padding:
                                        "12px",
                                    backgroundColor:
                                        confirmationName ===
                                        selectedServer.serverName
                                            ? "#dc2626"
                                            : "#7f1d1d",
                                    color:
                                        "white",
                                    border:
                                        "none",
                                    borderRadius:
                                        "8px",
                                    cursor:
                                        "pointer",
                                }}
                            >
                                Confirm Delete
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default ProvisionTable;