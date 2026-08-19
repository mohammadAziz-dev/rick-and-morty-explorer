import {useEffect, useState} from "react";
import {getCharacters} from "../services/characterApi";
import type {Character} from "../types/character";

export default function CharacterGalleryPage() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCharacters(): Promise<void> {
            try {
                setIsLoading(true);
                setError("");

                const data = await getCharacters();

                setCharacters(data.results);
            } catch {
                setError("Could not load characters. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }

        loadCharacters();
    }, []);

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
        </main>
    );
}