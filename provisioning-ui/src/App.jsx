import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import PostgreSQLPage
    from "./pages/PostgreSQLPage";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/postgresql"
                    element={<PostgreSQLPage />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;