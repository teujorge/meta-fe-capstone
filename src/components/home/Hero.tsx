import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="w-full p-4 bg-primary">
      <div className="flex flex-col-reverse md:flex-row gap-4 limit-width">
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
          <Button
            variant="secondary"
            size="lg"
            className="w-fit"
            onClick={() => navigate("/booking")}
          >
            Book A Table
          </Button>
        </section>

        <div className="m-4 flex-1 rounded-md overflow-hidden">
          <img
            src="/assets/about/cookies.jpg"
            alt="hero"
            className="object-contain"
            aria-label="Hero Image"
          />
        </div>
      </div>
    </div>
  );
}
