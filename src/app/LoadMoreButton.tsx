"use client";

export const LoadMoreButton = ({
  onClick,
  disabled,
  text,
}: {
  onClick: () => void;
  disabled: boolean;
  text: string;
}) => {
  return (
    <button
      className="p-6 bg-green-500 hover:bg-green-400 text-white disabled:bg-slate-700 w-full"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
