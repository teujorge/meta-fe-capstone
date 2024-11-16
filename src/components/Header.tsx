import { useState } from "react";
import { cn } from "../utils";
import { Nav } from "./Nav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function Header() {
  return (
    <header className="w-full bg-primary px-4">
      <div className="flex h-full items-center flex-row gap-4 justify-between limit-width">
        <img src="logo.png" alt="logo" className="object-contain h-14" />
        <Nav className="flex-row gap-8 font-semibold hidden md:flex" />
        <MobileDrawer className="md:hidden block" />
      </div>
    </header>
  );
}

function MobileDrawer({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className={className}>
        <MobileBurger isOpen={isOpen} />
      </SheetTrigger>
      <SheetContent className="h-svh">
        <SheetHeader>
          <SheetTitle>Little Lemon</SheetTitle>
          <img src="logo.png" alt="logo" className="object-contain h-14" />
        </SheetHeader>

        <Nav className="flex-col gap-8 text-lg font-semibold text-right" />
      </SheetContent>
    </Sheet>
  );
}

function MobileBurger({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "h-6 w-6",
        "transition-all duration-300 origin-left",
        isOpen && "scale-y-150 translate-y-2"
      )}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4"
        className={cn(
          "transition-all duration-300 origin-left",
          isOpen && "scale-y-150"
        )}
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 12h16m-7"
        className={cn("transition-opacity duration-300", isOpen && "opacity-0")}
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 18h7"
        className={cn("transition-opacity duration-300", isOpen && "opacity-0")}
      />
    </svg>
  );
}
