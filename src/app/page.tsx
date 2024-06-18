import { LoadMoreButton } from "./LoadMoreButton";
import { Card } from "./Card";
import { List } from "./List";
import { getItems } from "./getItems";

export default async function Home() {
  const items = await getItems({ limit: 12, offset: 0 });
  return (
    <main>
      <div className="p-4">
        <ul className="col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-6 gap-x-4 gap-y-4">
          {items.map((item) => {
            return (
              <li key={item.id}>
                <Card name={item.name} imageUrl={item.imageUrl} />
              </li>
            );
          })}
          <List initialOffset={12} />
        </ul>
      </div>
    </main>
  );
}
