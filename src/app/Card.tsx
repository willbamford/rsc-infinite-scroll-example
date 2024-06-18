import Image from "next/image";

export const Card = ({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl: string;
}) => {
  return (
    <div className="p-4 flex flex-col items-center bg-slate-100">
      <Image src={imageUrl} width={240} height={240} alt={name} />
      <h3 className="text-xl mt-2 text-center">{name}</h3>
    </div>
  );
};
