import type { Item } from "./types";

const getImageUrl = (id: string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const getItems = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  const url = `https://pokeapi.co/api/v2/pokemon-species?limit=${limit}&offset=${offset}`;
  const result = await fetch(url);

  const data = (await result.json()) as {
    results: { name: string; url: string }[];
  };

  const items = data.results.map<Item>((item) => {
    const id = item.url.split("/")[6];
    return {
      ...item,
      id,
      imageUrl: getImageUrl(id),
    };
  });

  return items;
};
