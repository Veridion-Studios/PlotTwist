"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import {
  ChevronDown,
  BookOpenText,
  Search,
  Users,
  ScrollText
} from "lucide-react";
import dropdownProgramsRaw from "@/data/dropdown-programs.json";

export const Navbar = () => {
  const icons = {
    chevron: <ChevronDown />, 
    scroll: <ScrollText className="text-[#8722EA]" />, 
    users: <Users className="text-[#8722EA]" />,
    book: <BookOpenText className="text-[#8722EA]" />,
    search: <Search className="text-[#8722EA]" />,
  };

  // Parse dropdown items from JSON
  const dropdownPrograms = Array.isArray(dropdownProgramsRaw) ? dropdownProgramsRaw : [];

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Logo />
            <span aria-hidden="true" className="inline-block h-6 w-px bg-default-200 rounded mx-1" />
            <p className="font-bold text-inherit">PlotTwist</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4 flex-1" justify="center">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={icons.chevron}
                  radius="sm"
                  variant="light"
                >
                  Our Programs
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu aria-label="ACME features" itemClasses={{ base: "gap-4" }}>
              {dropdownPrograms.map(item => (
                <DropdownItem
                  key={item.key}
                  description={item.description}
                  startContent={icons[item.startContent as keyof typeof icons]}
                >
                  {item.title}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch  />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
export default Navbar;