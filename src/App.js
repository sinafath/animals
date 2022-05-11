import List from './features/List/List';
import { Route, Routes } from 'react-router-dom';
import Item from './features/List/Item/Index';

function App() {
  return (
      <Routes>
        <Route path="/" element={<List/>} />
        <Route path="/:id" element={<Item/>} />
      </Routes>
  );
}

export default App;
