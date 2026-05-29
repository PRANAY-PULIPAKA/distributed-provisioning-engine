function ResourceCard({
    title,
    description,
    color,
    onClick,
}) {

    return (

        <div
            onClick={onClick}
            style={{
                width: "300px",
                backgroundColor: "#1e293b",
                borderRadius: "16px",
                padding: "24px",
                cursor: "pointer",
                border: `1px solid ${color}`,
                transition: "0.3s",
                marginBottom: "20px",
            }}
        >

            <h2
                style={{
                    color: color,
                    marginBottom: "10px",
                }}
            >
                {title}
            </h2>

            <p
                style={{
                    color: "#cbd5e1",
                }}
            >
                {description}
            </p>

        </div>
    );
}

export default ResourceCard;