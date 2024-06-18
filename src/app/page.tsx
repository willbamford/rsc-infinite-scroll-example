import Image from "next/image";

import { LoadMoreButton } from "./LoadMoreButton";

const getImageUrl = (id: string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

const getItems = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon-species?limit=${24}&offset=${0}`;
  const result = await fetch(url);

  const data = (await result.json()) as {
    results: { name: string; url: string }[];
  };

  const items = data.results.map<{
    id: string;
    name: string;
    url: string;
    imageUrl: string;
  }>((item) => {
    const id = item.url.split("/")[6];
    return {
      ...item,
      id,
      imageUrl: getImageUrl(id),
    };
  });

  return items;
};

export default async function Home() {
  const items = await getItems();
  return (
    <main>
      <div className="p-4">
        <ul className="col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-6 gap-x-4 gap-y-4">
          {items.map((item) => {
            return (
              <li key={item.id}>
                <div className="p-4 flex flex-col justify-center items-center bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    width={240}
                    height={240}
                    alt={item.name}
                  />
                  <h3 className="text-xl mt-2 text-center">{item.name}</h3>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-center mt-5">
          <LoadMoreButton />
        </div>
      </div>
    </main>
  );
}
