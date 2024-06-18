"use client";

import { useEffect, useRef, useState } from "react";
import { getItems } from "./getItems";
import type { Item } from "./types";
import { Card } from "./Card";
import { LoadMoreButton } from "./LoadMoreButton";

const waitFor = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });

export const List = ({ initialOffset }: { initialOffset: number }) => {
  const offsetRef = useRef(initialOffset);

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLoadMoreClick = () => {
    const doFetch = async () => {
      setLoading(true);
      await waitFor(1000);
      const fetchedItems = await getItems({
        limit: 12,
        offset: offsetRef.current,
      });
      offsetRef.current += 12;
      setItems((items) => [...items, ...fetchedItems]);
      setLoading(false);
    };

    doFetch();
  };

  const text = loading ? "Loading" : "Load More";

  return (
    <>
      {items.map((item) => {
        return <Card key={item.id} name={item.name} imageUrl={item.imageUrl} />;
      })}
      <li>
        <LoadMoreButton
          disabled={loading}
          onClick={handleLoadMoreClick}
          text={text}
        />
      </li>
    </>
  );
};
