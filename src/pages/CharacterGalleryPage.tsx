import { useEffect, useState } from 'react';
import { getCharacters } from '../services/characterApi';
import type { Character } from '../types/character';
import { Link } from 'react-router-dom';

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'upvotes-desc';

type CharacterGalleryPageProps = {
  localCharacters: Character[];
  votedCharacters: Record<number, boolean>;
  onUpvote: (characterId: number) => void;
};

export default function CharacterGalleryPage({
  localCharacters,
  votedCharacters,
  onUpvote,
}: CharacterGalleryPageProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const allCharacters =
    currentPage === 1 ? [...localCharacters, ...characters] : characters;

  const filteredCharacters = allCharacters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const visibleCharacters = [...filteredCharacters].sort((a, b) => {
    if (sortOption === 'name-asc') {
      return a.name.localeCompare(b.name);
    }

    if (sortOption === 'name-desc') {
      return b.name.localeCompare(a.name);
    }

    if (sortOption === 'upvotes-desc') {
      return (
        Number(Boolean(votedCharacters[b.id])) -
        Number(Boolean(votedCharacters[a.id]))
      );
    }

    return 0;
  });

  useEffect(() => {
    async function loadCharacters(): Promise<void> {
      try {
        setIsLoading(true);
        setError('');

        const data = await getCharacters(currentPage);

        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch {
        setError('Could not load characters. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    void loadCharacters();
  }, [currentPage]);

  function handlePreviousPage(): void {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage(): void {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  if (isLoading) {
    return (
      <main>
        <p>Loading characters...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Characters</h1>

      <label htmlFor="character-search">Search characters</label>

      <input
        id="character-search"
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search by name..."
      />

      <label htmlFor="character-sort">Sort by</label>

      <select
        id="character-sort"
        value={sortOption}
        onChange={(event) => setSortOption(event.target.value as SortOption)}
      >
        <option value="default">Default</option>
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="upvotes-desc">Most Upvoted</option>
      </select>

      {visibleCharacters.length === 0 ? (
        <p>No characters found.</p>
      ) : (
        visibleCharacters.map((character) => (
          <article key={character.id}>
            <img src={character.image} alt={character.name} />

            <h2>{character.name}</h2>

            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
            <p>Upvotes: {votedCharacters[character.id] ? 1 : 0}</p>

            <button type="button" onClick={() => onUpvote(character.id)}>
              {votedCharacters[character.id] ? 'Remove Upvote' : 'Upvote'}
            </button>
            <Link to={`/characters/${character.id}`}>View Details</Link>
          </article>
        ))
      )}

      <nav aria-label="Character pagination">
        <button
          type="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </nav>
    </main>
  );
}
