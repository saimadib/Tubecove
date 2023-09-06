import {RecoilRoot} from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "./Home/Landing";
import CreatorSignUp from './Creator/Singup';
import CreatorSignIn from './Creator/Login';
import EditorSignIn from './Editor/Login';
import EditorSignUp from './Editor/Singup';
import CreatorDashboard from './Creator/Dashboard';
import EditorDashboard from './Editor/Dashboard';

function App() {
 
  return (
    <RecoilRoot>
        <Router>
            <Routes>     
                <Route path="/" element={<Landing />} />
                <Route path="/creator/signup" element={<CreatorSignUp />} />
                <Route path="/creator/login" element={<CreatorSignIn />} />
                <Route path="/editor/login" element={<EditorSignIn />} />
                <Route path="/editor/signup" element={<EditorSignUp />} />
                <Route path="/creator/dashboard" element={<CreatorDashboard />} />
                <Route path="/editor/dashboard" element={<EditorDashboard />} />
            </Routes>
        </Router>
    </RecoilRoot>
  )
}

export default App
