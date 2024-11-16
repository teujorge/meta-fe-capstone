import { Nav } from "./Nav";

export function Footer() {
  return (
    <div className="w-full p-8 bg-accent mt-32">
      <footer className="flex flex-col md:flex-row gap-12 justify-between limit-width">
        <img src="logo.png" alt="logo" className="object-contain h-24" aria-label="Little Lemon Logo" />

        <section className="flex flex-col gap-4">
          <h3>Site</h3>
          <Nav className="flex flex-col gap-2" />
        </section>

        <section className="flex flex-col gap-4">
          <h3>Our Address</h3>
          <p>1234 South Courtyard</p>
          <p>Nowhere, NA 12345</p>
          <p>555-555-5555</p>
        </section>

        <section className="flex flex-col gap-4">
          <h3>Social Media</h3>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            Facebook
          </a>
          <a href="https://www.x.com" target="_blank" rel="noreferrer" aria-label="Twitter / X">
            Twitter / X
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            Instagram
          </a>
        </section>
      </footer>
    </div>
  );
}
