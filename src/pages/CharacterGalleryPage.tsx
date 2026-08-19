import {useEffect, useState} from "react";
import {getCharacters} from "../services/characterApi";
import type {Character} from "../types/character";

export default function CharacterGalleryPage() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function loadCharacters(): Promise<void> {
            try {
                setIsLoading(true);
                setError("");

                const data = await getCharacters(currentPage);

                setCharacters(data.results);
                setTotalPages(data.info.pages);
            } catch {
                setError("Could not load characters. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }

        loadCharacters();
    }, [currentPage]);

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

    return (
        <main>
            <h1>Characters</h1>

            {characters.map((character) => (
                <article key={character.id}>
                    <img
                        src={character.image}
                        alt={character.name}
                    />

                    <h2>{character.name}</h2>

                    <p>Status: {character.status}</p>
                    <p>Species: {character.species}</p>
                </article>
            ))}

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