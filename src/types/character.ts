export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;

  origin: {
    name: string;
    url: string;
  };

  location: {
    name: string;
    url: string;
  };
};

export type CharacterApiResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};
