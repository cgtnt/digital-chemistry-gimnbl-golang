import './styles.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Element from './components/Element';
import PeriodicTable from './components/PeriodicTable';
import { NotFound } from './components/Errors';
import Editor from './components/Editor';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PeriodicTable />} />
        <Route  path="/elementi" element={<PeriodicTable />} />
        <Route  path="/editor" element={<Editor />} />
        <Route path="/elementi/:name" element={<Element />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
