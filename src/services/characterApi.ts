import axios from 'axios';
import type { Character, CharacterApiResponse } from '../types/character';

const CHARACTER_API_URL = 'https://rickandmortyapi.com/api/character';

export async function getCharacters(page = 1): Promise<CharacterApiResponse> {
  const response = await axios.get<CharacterApiResponse>(CHARACTER_API_URL, {
    params: {
      page,
    },
  });

  return response.data;
}

export async function getCharacterById(id: number): Promise<Character> {
  const response = await axios.get<Character>(`${CHARACTER_API_URL}/${id}`);

  return response.data;
}
