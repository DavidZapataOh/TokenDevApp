'use client';
import { useRouter, usePathname } from "next/navigation";
import { HomeIcon, ChartBarIcon, CogIcon, ClockIcon, ChatBubbleLeftRightIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { FaGithub } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

export default function Sidebar() {
    const pathname = usePathname();
  
    const menuItems = [
        { name: "Dashboard", icon: <HomeIcon className="w-6 h-6" />, path: "/dashboard" },
        { name: "Token Creator", icon: <UserGroupIcon className="w-6 h-6" />, path: "/token-creator" },
        { name: "NFT Generator", icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />, path: "/nft-generator" },
        { name: "Airdrop", icon: <ChartBarIcon className="w-6 h-6" />, path: "/airdrop" },
    ];  
    
    const socialLinks = [
        { name: "Twitter", icon: <RiTwitterXFill className="w-5 h-5" />, link: "https://x.com/DavidZapataOh" },
        { name: "GitHub", icon: <FaGithub className="w-5 h-5" />, link: "https://github.com/DavidZapataOh/Skillor" },
    ];

    return (
        <aside className="w-64 h-screen fixed bg-thirty text-light shadow-lg flex flex-col">
            <div className="px-6 pt-6">
                <img src="/Logo.png" alt="TOKENDEV Logo" className="h-18 mx-auto" />
            </div>
            <p className="text-textSecondary text-center font-semibold">
                <span className="text-primary">TOKENDEV</span>
            </p>
    
            <nav className="flex flex-col mt-4 space-y-2">
                {menuItems.map((item, idx) => (
                <button
                    key={idx}
                    onClick={() => (window.location.href = item.path)}
                    className={`relative flex items-center space-x-4 px-6 py-3 text-sm font-medium w-full transition-all rounded-md
                ${
                    pathname === item.path
                    ? "bg-primary/20 text-primary"
                    : "text-textSecondary hover:text-primary hover:bg-background"
                }`}
                >
                    <span
                        className={`absolute left-0 top-0 h-full w-1 bg-primary rounded-r-md transition-all ${
                        pathname === item.path ? "opacity-100" : "opacity-0"
                        }`}
                    ></span>
                    <span>{item.icon}</span>
                    <span className="truncate">{item.name}</span>
                </button>
                ))}
            </nav>
            <div className="mt-auto flex flex-col items-center space-y-4 p-6">
                <div className="flex space-x-4">
                    {socialLinks.map((social, idx) => (
                    <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-light transition-all"
                    >
                        {social.icon}
                    </a>
                    ))}
                </div>
                <p className="text-xs text-textSecondary">
                    &copy; {new Date().getFullYear()} TOKENDEV
                </p>
            </div>
        </aside>
    );
}