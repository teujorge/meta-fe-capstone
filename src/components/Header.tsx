import { Nav } from "./Nav";

export function Header() {
  return (
    <header className="w-full bg-primary shadow-lg px-4">
      <div className="flex h-full items-center flex-row gap-4 justify-between limit-width">
        <img src="logo192.png" alt="logo" className="object-contain h-14" />
        <Nav className="flex flex-row gap-8 font-semibold" />
      </div>
    </header>
  );
}
