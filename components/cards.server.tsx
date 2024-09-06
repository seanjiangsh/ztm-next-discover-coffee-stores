import Card from "@/components/card.server";

type CardsProps = {
  stores: Array<{ name: string; imgUrl: string }>;
};
export default function Cards(props: CardsProps) {
  const { stores } = props;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
      {stores.map(({ name, imgUrl }, index) => (
        <Card
          key={`${name}-${index}`}
          name={name}
          imgUrl={imgUrl}
          href={`/coffee-store/${index}`}
        />
      ))}
    </div>
  );
}
