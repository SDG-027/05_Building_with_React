import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import AlphaCentauri from './pages/AlphaCentauri';
import Stars from './pages/Stars';
import SingleStar from './pages/SingleStar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Stars />} />
        <Route path="/alpha-centauri" element={<AlphaCentauri />} />
        <Route path="/stars/:slug" element={<SingleStar />} />
        <Route path="*" element={<h1>Not found...</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
