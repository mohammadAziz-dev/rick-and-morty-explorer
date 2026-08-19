import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCharacterById } from '../services/characterApi';
import type { Character } from '../types/character';

export default function CharacterDetailPage() {
  const { id } = useParams();

  const [character, setCharacter] = useState<Character | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCharacter(): Promise<void> {
      const characterId = Number(id);

      if (Number.isNaN(characterId)) {
        setError('Invalid character ID.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError('');

        const data = await getCharacterById(characterId);

        setCharacter(data);
      } catch {
        setError('Could not load this character.');
      } finally {
        setIsLoading(false);
      }
    }

    loadCharacter();
  }, [id]);

  if (isLoading) {
    return (
      <main>
        <p>Loading character...</p>
      </main>
    );
  }

  if (error || !character) {
    return (
      <main>
        <p>{error || 'Character not found.'}</p>

        <Link to="/characters">Back to characters</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/characters">← Back to characters</Link>

      <article>
        <img src={character.image} alt={character.name} />

        <h1>{character.name}</h1>

        <p>
          <strong>Status:</strong> {character.status}
        </p>

        <p>
          <strong>Species:</strong> {character.species}
        </p>

        <p>
          <strong>Gender:</strong> {character.gender}
        </p>

        <p>
          <strong>Origin:</strong> {character.origin.name}
        </p>

        <p>
          <strong>Location:</strong> {character.location.name}
        </p>

        {character.type && (
          <p>
            <strong>Type:</strong> {character.type}
          </p>
        )}
      </article>
    </main>
  );
}
