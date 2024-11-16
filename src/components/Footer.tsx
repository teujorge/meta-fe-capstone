import { Nav } from "./Nav";

export function Footer() {
  return (
    <div className="w-full p-8 bg-accent mt-32">
      <footer className="flex flex-row gap-24 limit-width">
        <img src="logo192.png" alt="logo" className="object-contain" />

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
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href="https://www.x.com" target="_blank" rel="noreferrer">
            Twitter / X
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </section>
      </footer>
    </div>
  );
}
