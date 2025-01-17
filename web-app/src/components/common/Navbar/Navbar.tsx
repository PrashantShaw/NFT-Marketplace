"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import SideNavSheet from "./SideNavSheet";
import NavbarActions from "./NavbarActions";
import { SearchModal } from "../SearchModal";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import Image from "next/image";
import NavLink from "./NavLink";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isScrolled ? "shadow" : ""
      )}
    >
      <div className="container flex h-14 items-center px-6 mx-auto gap-2 md:gap-3">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={"/icon.png"} width={32} height={32} alt="brand logo" />
            <span className="hidden font-bold lg:inline-block text-nowrap">
              {BRAND.name}
            </span>
          </Link>
          <SearchModal />
          <nav className="flex items-center space-x-0 text-sm font-medium pl-3">
            {NAV_LINKS.map(({ label, href }, idx) => (
              <NavLink key={idx} label={label} href={href} />
            ))}
          </nav>
        </div>
        <SideNavSheet />
        <div className="md:hidden w-full">
          <SearchModal />
        </div>
        <NavbarActions />
      </div>
    </header>
  );
}
