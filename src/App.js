import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import LandingPage from './landing-pages/LandingPage';
import Login from './login/Login';
import IndividualUser from './individual-user/IndividualUser';
import AdminUser from './admin-user/AdminUser';
import SuperAdmin from './super-admin/SuperAdmin';
import NotFound from './not-found/NotFound';

function App() {
    const [viewComponentState, setViewComponentState] = useState(null);
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/user" element={<IndividualUser viewComponentState={viewComponentState} setViewComponentState={setViewComponentState}/>}/>
                <Route path="/admin" element={<AdminUser viewComponentState={viewComponentState} setViewComponentState={setViewComponentState}/>}/>
                <Route path="/superadmin" element={<SuperAdmin viewComponentState={viewComponentState} setViewComponentState={setViewComponentState}/>}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
