import axios from 'axios';
import type { CharacterApiResponse } from '../types/character';

const CHARACTER_API_URL = 'https://rickandmortyapi.com/api/character';

export async function getCharacters(page = 1): Promise<CharacterApiResponse> {
  const response = await axios.get<CharacterApiResponse>(CHARACTER_API_URL, {
    params: {
      page,
    },
  });

  return response.data;
}
