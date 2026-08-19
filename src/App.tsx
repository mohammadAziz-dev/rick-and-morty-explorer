import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CharacterGalleryPage from './pages/CharacterGalleryPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import CreateCharacterPage from './pages/CreateCharacterPage';
import NotFoundPage from './pages/NotFoundPage';
import { useState } from 'react';
import type { Character } from './types/character';

function App() {
  const [localCharacters, setLocalCharacters] = useState<Character[]>([]);

  function addCharacter(character: Character): void {
    setLocalCharacters((currentCharacters) => [
      character,
      ...currentCharacters,
    ]);
  }

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/characters"
          element={<CharacterGalleryPage localCharacters={localCharacters} />}
        />

        <Route
          path="/characters/add"
          element={<CreateCharacterPage onAddCharacter={addCharacter} />}
        />

        <Route path="/characters/:id" element={<CharacterDetailPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
