import { useState } from "react"
import { Button } from "../ui/button"
import { Utensils, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useParams } from "react-router-dom"

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = window.location.pathname

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/menu", label: "Menu / Meal Plans" },
        { href: "/subscription", label: "Subscription" },
        { href: "/contact", label: "Contact Us" },
    ]

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="flex items-center space-x-2">
                        <div className="bg-green-600 p-2 rounded-lg">
                            <Utensils className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-green-800">SEA Catering</h1>
                            <p className="text-sm text-green-600">Healthy Meals, Anytime, Anywhere</p>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-gray-700 hover:text-green-600 transition-colors font-medium",
                                    pathname === item.href && "text-green-600 border-b-2 border-green-600 pb-1",
                                )}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <nav className="md:hidden mt-4 pb-4 border-t pt-4">
                        <div className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "text-gray-700 hover:text-green-600 transition-colors font-medium px-2 py-1 rounded",
                                        pathname === item.href && "text-green-600 bg-green-50",
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    )
}
