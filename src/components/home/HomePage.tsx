import { About } from "./About";
import { Hero } from "./Hero";
import { Highlights } from "./Highlights";
import { Testimonials } from "./Testimonials";

export function HomePage() {
  return (
    <main className="flex flex-col gap-28">
      <Hero />
      <Highlights />
      <Testimonials />
      <About />
    </main>
  );
}
