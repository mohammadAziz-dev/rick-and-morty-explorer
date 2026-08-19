import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CharacterGalleryPage from './pages/CharacterGalleryPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import CreateCharacterPage from './pages/CreateCharacterPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/characters" element={<CharacterGalleryPage />} />

        <Route path="/characters/add" element={<CreateCharacterPage />} />

        <Route path="/characters/:id" element={<CharacterDetailPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
