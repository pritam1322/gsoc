"use client";
import Link from "next/link";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, Blend } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Headers() {
    const [mobileSection, setMobileSection] = useState(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (typeof window !== "undefined") {
            document.body.style.overflow = mobileSection ? "hidden" : "auto";
        }
    }, [mobileSection]);

    const menuItems = [
        { title: "Home", url: "#home" },
        { title: "Features", url: "#features" },
        { title: "About", url: "#about" },
    ];

    return (
        <header className="flex items-center justify-between border-b border-dashed border-neutral-500 px-6 py-3">
            {/* Left: Brand */}
            <Link href="/" className="flex items-center gap-2 text-primary text-neutral-200 font-semibold text-xl">
                <Blend /> gsoc/colab
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-neutral-200 font-semibold text-md">
                {menuItems.map((item, index) => (
                    <Link key={index} href={item.url} className="hover:text-neutral-400">
                        {item.title}
                    </Link>
                ))}
            </nav>

            {/* Right: Avatar & Mobile Menu */}
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileSection(!mobileSection)}
                    aria-label="Toggle mobile menu"
                    aria-expanded={mobileSection}
                    className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                >
                    <AlignJustify className="h-6 w-6" />
                </button>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={session?.user?.image || "https://github.com/shadcn.png"} alt="@user" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {status === "loading" ? (
                            <DropdownMenuItem>Loading...</DropdownMenuItem>
                        ) : session ? (
                            <>
                                <DropdownMenuItem>{session.user.name}</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuItem>
                                    <Link href="/login">Login</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/signup">Signup</Link>
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Mobile Menu */}
            {mobileSection && (
                <div className="absolute top-16 left-0 w-full bg-neutral-950 md:hidden">
                    <nav className="flex flex-col px-6 py-4 space-y-3">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.url}
                                className="text-gray-300 hover:text-white px-3 py-2 hover:bg-neutral-700 active:bg-neutral-700 rounded-md text-sm font-medium"
                                onClick={() => setMobileSection(false)} // Close on click
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
