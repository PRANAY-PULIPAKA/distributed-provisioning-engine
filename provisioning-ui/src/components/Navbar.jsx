function Navbar({ title }) {

    return (
        <div
            style={{
                height: "80px",
                backgroundColor: "#111827",
                borderBottom: "1px solid #1e293b",
                display: "flex",
                alignItems: "center",
                padding: "0 30px",
                color: "white",
            }}
        >
            <h1>{title}</h1>
        </div>
    );
}

export default Navbar;