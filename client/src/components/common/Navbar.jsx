import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ Fixed import
import { Sun, Moon } from 'lucide-react';
import { useTheme } from "../context/ThemeProvider";

const navigation = [
    { name: "Dashboard", href: "/", current: false },
    { name: "Traverels", href: "/travelers", current: false },
    { name: "Projects", href: "/projects", current: false },
    { name: "Calendar", href: "/calendar", current: false },
];

const userNavigation = [
    { name: "Your Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
    { name: "Sign out", href: "/logout" },
];

const LOGO =
    "https://res.cloudinary.com/dagmoqwr5/image/upload/v1742725706/logo-removebg-preview-removebg-preview_rbuupm.png";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
    const { darkMode, setDarkMode } = useTheme();
    

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Disclosure as="nav" className="bg-gray-800 sticky top-0">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            {/* Mobile menu button */}
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <DisclosureButton className="p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white">
                                    {open ? (
                                        <XMarkIcon className="block size-6" />
                                    ) : (
                                        <Bars3Icon className="block size-6" />
                                    )}
                                </DisclosureButton>
                            </div>

                            {/* Logo and nav */}
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex shrink-0 items-center">
                                    <img className="h-10 w-auto" src={LOGO} alt="Company Logo" />
                                </div>
                                <h1 className="text-white font-bold text-xl">Wonderlust</h1>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? "bg-gray-900 text-white"
                                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                    "rounded-md px-3 py-2 text-sm font-medium"
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right section */}
                            <div className="flex items-center space-x-3">
                                <button className="p-1 text-gray-400 rounded-full hover:text-white focus:ring-2 focus:ring-white">
                                    <BellIcon className="size-6" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <MenuButton className="flex items-center rounded-full focus:ring-2 focus:ring-white">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt="Profile"
                                        />
                                    </MenuButton>
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                {({ active }) => (
                                                    <Link
                                                        to={item.href}
                                                        className={classNames(
                                                            active ? "bg-gray-100" : "",
                                                            "block px-4 py-2 text-sm text-gray-700"
                                                        )}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>

                                {/* Dark mode toggle */}
                                <button
                                    onClick={toggleDarkMode}
                                    className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"
                                >
                                    {darkMode ? (
                                        <Moon size={20} className="text-gray-300" />
                                    ) : (
                                        <Sun size={20} className="text-yellow-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Items */}
                    <DisclosurePanel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as={Link}
                                    to={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-900 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                        "block rounded-md px-3 py-2 text-base font-medium"
                                    )}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
};

export default Navbar;
