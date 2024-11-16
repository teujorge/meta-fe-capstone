import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function Highlights() {
  return (
    <div className="flex flex-col gap-8 p-4 limit-width">
      <h2>Specials</h2>

      <div className="flex flex-wrap gap-4 items-center justify-center">
        <HighlightCard
          img="/images/food-1.jpg"
          name="Lemonade"
          price={5}
          description="Freshly squeezed lemons with a hint of mint."
        />
        <HighlightCard
          img="/images/food-2.jpg"
          name="Lemon Tart"
          price={8}
          description="A sweet and tangy lemon tart adorned with fresh berries."
        />
        <HighlightCard
          img="/images/food-3.jpg"
          name="Lemon Sorbet"
          price={6}
          description="A refreshing lemon sorbet with a hint of basil."
        />
      </div>
    </div>
  );
}

function HighlightCard({
  img,
  name,
  price,
  description,
}: {
  img: string;
  name: string;
  price: number;
  description: string;
}) {
  return (
    <Card className="w-full sm:w-60">
      <CardHeader>
        <img src={img} alt={`${name}`} className="w-full h-20 object-cover" />
        <CardTitle>
          <span className="w-full">{name}</span>
          <span className="pl-2 ml-auto font-normal text-base text-accent-foreground">
            ${price}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>

      <CardFooter>
        <Button variant="ghost" size="sm">
          Order Online
        </Button>
      </CardFooter>
    </Card>
  );
}
