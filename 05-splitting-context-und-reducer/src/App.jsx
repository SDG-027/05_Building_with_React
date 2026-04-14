import { Routes, Route } from 'react-router';
import MainLayout from './layouts/MainLayout';
import {
  About,
  Contact,
  Destinations,
  Home,
  NotFound,
  SingleDestination,
} from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="destinations/:slug" element={<SingleDestination />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin">
        <Route index element={<h1>ADMIN</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
