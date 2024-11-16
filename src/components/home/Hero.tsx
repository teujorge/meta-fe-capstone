import { Button } from "../ui/button";

export function Hero() {
  return (
    <div className="w-full p-4 bg-primary">
      <div className="flex flex-row gap-4 limit-width">
        <section className="flex-1 flex flex-col gap-4 justify-center">
          <h1>Little Lemon</h1>
          <p>Chicago</p>
          <p>
            Lore ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
            odio ac justo ultricies fermentum. Nullam in urna nec felis
            ultricies tempor vel nec odio. Donec eget odio ac justo ultricies
            fermentum. Nullam in urna nec felis ultricies tempor vel nec odio.
            Donec eget odio ac justo ultricies fermentum. Nullam in urna nec
            felis ultricies tempor vel nec odio.
          </p>
          <Button variant="secondary" size="lg" className="w-fit">
            Book A Table
          </Button>
        </section>

        <img
          src="/images/hero.jpg"
          alt="hero"
          className="flex-1 p-4 object-contain rounded"
        />
      </div>
    </div>
  );
}
