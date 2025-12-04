import {Routes, Route} from 'react-router-dom'
import {Dashboard} from "./pages/Dashboard/Dashboard.jsx"
import {Login} from "./pages/Login/Login.jsx"
import {Register} from './pages/Register/Register.jsx'
import {MainPage} from './pages/MainPage/MainPage.jsx'
import {ModulePage} from "./pages/ModulePage/ModulePage.jsx";
import {Layout} from "./components/Layout/Layout.jsx";
import {useDispatch} from "react-redux";
import {refreshUser} from "./redux/auth/authOperations.js";
import {useAuth} from "./hooks/useAuth.js";
import {useEffect} from "react";
import {FolderPage} from "./pages/FolderPage/FolderPage.jsx";
import {DictionaryPage} from "./pages/DictionaryPage/DictionaryPage.jsx";
import {LearnDefinitionPage} from "./pages/LearnDefinitionPage/LearnDefinitionPage.jsx";
import {ResultPage} from "./pages/ResultPage/ResultPage.jsx";
import {ProfilePage} from "./pages/ProfilePage/ProfilePage.jsx";
import {RestrictedRoute} from "./components/CustomRouts/RestrictedRoute/RestrictedRoute.jsx";
import {PrivateRoute} from "./components/CustomRouts/PrivateRoute/PrivateRoute.jsx";
import {AdminPanel} from "./pages/AdminPanel/AdminPanel.jsx";
import {AdminStudents} from "./pages/AdminStudents/AdminStudents.jsx";
import {AdminTeachers} from "./pages/AdminTeachers/AdminTeachers.jsx";
import {TeacherPanel} from "./pages/TeacherPanel/TeacherPanel.jsx";
import {ContinueLearnDefinitionPage} from "./pages/ContinueLearnDefinitionPage/ContinueLearnDefinitionPage.jsx";
import {InfoTestPage} from "./pages/InfoTestPage/InfoTestPage.jsx";

function App() {

    const dispatch = useDispatch();
    const {refresing} = useAuth();

    useEffect(() => {
        dispatch(refreshUser());
    },[dispatch])
  return ( refresing? <p>
          ...
          </p>:
    <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="/" element={<MainPage/>} />
        <Route path="/login" element={<RestrictedRoute redirectTo="/dashboard" component={<Login/>}/>} />
        <Route path="/register" element={<RestrictedRoute redirectTo="/dashboard" component={<Register/>}/>}/>
        <Route path="/dashboard" element={<PrivateRoute redirectTo="/" component={<Dashboard/>} />} />
        <Route path="/dashboard/module/:id" element={<PrivateRoute redirectTo="/" component={<ModulePage/>}/>} />
        <Route path="/folder/:id" element={<PrivateRoute redirectTo="/" component={<FolderPage/>}/>}/>
        <Route path="/dictionary/:id" element={<PrivateRoute redirectTo="/" component={<DictionaryPage/>}/>}/>
        <Route path="/quiz/:cardId" element={<PrivateRoute redirectTo="/" component={<LearnDefinitionPage/>}/>}/>
        <Route path="/test/info/:cardId" element={<PrivateRoute redirectTo="/" component={<InfoTestPage/>}/>}/>
        <Route path="/secondquiz/:cardId" element={<PrivateRoute redirectTo="/" component={<ContinueLearnDefinitionPage/>}/>}/>
        <Route path="/quiz/result/:cardId" element={<PrivateRoute redirectTo="/" component={<ResultPage/>}/>}/>
        <Route path="/profile" element={<PrivateRoute redirectTo="/" component={<ProfilePage/>}/>}/>
        <Route path="/admin/panel" element={<PrivateRoute redirectTo="/" component={<AdminPanel/>}/>}/>
        <Route path="/admin/students" element={<PrivateRoute redirectTo="/" component={<AdminStudents/>}/>}/>
        <Route path="/admin/teachers" element={<PrivateRoute redirectTo="/" component={<AdminTeachers/>}/>}/>
        <Route path="/admin/teacher/:teacherId" element={<PrivateRoute redirectTo="/" component={<TeacherPanel/>}/>}/>
        <Route path="/teacher/:teacherId" element={<PrivateRoute redirectTo="/" component={<TeacherPanel/>}/>}/>
        </Route>
    </Routes>
  )
}

export default App
