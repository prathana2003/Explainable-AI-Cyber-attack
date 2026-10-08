import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Overview from '@/pages/Overview';
import SingleAnalysis from '@/pages/SingleAnalysis';
import BatchAnalysis from '@/pages/BatchAnalysis';
import ModelPerformance from '@/pages/ModelPerformance';
import Explainability from '@/pages/Explainability';
import RiskAssessment from '@/pages/RiskAssessment';
import About from '@/pages/About';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/single-analysis" element={<SingleAnalysis />} />
          <Route path="/batch-analysis" element={<BatchAnalysis />} />
          <Route path="/model-performance" element={<ModelPerformance />} />
          <Route path="/explainability" element={<Explainability />} />
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
