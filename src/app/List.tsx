"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getItems } from "./getItems";
import type { Item } from "./types";
import { Card } from "./Card";
import { LoadMoreButton } from "./LoadMoreButton";
import { ITEM_LIMIT } from "./constants";

const waitFor = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });

export const List = ({ initialOffset }: { initialOffset: number }) => {
  const offsetRef = useRef(initialOffset);

  const [loadMoreElement, setLoadMoreElement] = useState<HTMLLIElement | null>(
    null
  );

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(() => {
    const doFetch = async () => {
      setLoading(true);
      // await waitFor(1000);
      const fetchedItems = await getItems({
        limit: ITEM_LIMIT,
        offset: offsetRef.current,
      });
      offsetRef.current += ITEM_LIMIT;
      setItems((items) => [...items, ...fetchedItems]);
      setLoading(false);
    };

    if (!loading) {
      doFetch();
    }
  }, [loading]);

  const handlLoadMoreClick = () => {
    loadMore();
  };

  useEffect(() => {
    if (!loadMoreElement) {
      return;
    }

    const options: IntersectionObserverInit = {
      rootMargin: "100%",
      threshold: 0,
    };

    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(loadMoreElement);

    return () => {
      observer.disconnect();
    };
  }, [loadMore, loadMoreElement]);

  const liRef = useCallback((element: HTMLLIElement) => {
    setLoadMoreElement(element);
  }, []);

  return (
    <>
      {items.map((item) => {
        return <Card key={item.id} name={item.name} imageUrl={item.imageUrl} />;
      })}
      <li ref={liRef}>
        <LoadMoreButton
          disabled={loading}
          onClick={handlLoadMoreClick}
          text={loading ? "Loading" : "Load More"}
        />
      </li>
    </>
  );
};
