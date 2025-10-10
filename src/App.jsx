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

function App() {

    const dispatch = useDispatch();
    const {isRefreshing} = useAuth();

    useEffect(() => {
        dispatch(refreshUser());
    },[dispatch])

  return ( isRefreshing? <p>
          ...
          </p>:
    <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="/" element={<MainPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/module/:id" element={<ModulePage/>} />
        <Route path="/folder/:id" element={<FolderPage/>}/>
        <Route path="/dictionary/:id" element={<DictionaryPage/>}/>
        <Route path="/quiz/:cardId" element={<LearnDefinitionPage/>}/>
        </Route>
    </Routes>
  )
}

export default App
