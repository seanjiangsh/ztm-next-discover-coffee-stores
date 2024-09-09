import Card from "@/components/card.server";
import { CoffeeStoreType } from "@/types";

type CardsProps = {
  stores: Array<CoffeeStoreType>;
};
export default function Cards(props: CardsProps) {
  const { stores } = props;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
      {stores.map(({ id, name, imgUrl }) => (
        <Card
          key={`${name}-${id}`}
          name={name}
          imgUrl={imgUrl}
          href={`/coffee-store/${id}`}
        />
      ))}
    </div>
  );
}
