"use client";

export const LoadMoreButton = () => {
  return (
    <button
      className="p-6 bg-green-500 hover:bg-green-400"
      onClick={() => {
        window.alert("Clicked!");
      }}
    >
      Load more...
    </button>
  );
};
