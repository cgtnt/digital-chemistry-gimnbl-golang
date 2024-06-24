import './styles.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Element from './components/Base/Pages/Element';
import PeriodicTable from './components/Base/Pages/PeriodicTable';
import { NotFound } from './components/Base/Pages/Errors';
import Editor from './components/Editor/Editor';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PeriodicTable />} />
        <Route  path="/elementi" element={<PeriodicTable />} />
        <Route  path="/editor/:name" element={<Editor />} />
        <Route path="/elementi/:name" element={<Element />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
