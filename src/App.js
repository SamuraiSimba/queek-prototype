import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CandidateOnboarding from './CandidateOnboarding';
import EmployerLanding from './EmployerLanding';
import EmployerSignup from './EmployerSignup';
import JobPosting from './JobPosting';
import Matches from './Matches';
import HireConfirmation from './HireConfirmation';
import HireSuccess from './HireSuccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CandidateOnboarding />} />
        <Route path="/employers" element={<EmployerLanding />} />
        <Route path="/employers/signup" element={<EmployerSignup />} />
        <Route path="/employers/post-job" element={<JobPosting />} />
        <Route path="/employers/matches" element={<Matches />} />
        <Route path="/employers/hire-confirm" element={<HireConfirmation />} />
<Route path="/employers/hire-success" element={<HireSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;