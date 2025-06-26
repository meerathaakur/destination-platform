import { Github, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm">© {new Date().getFullYear()} TravelMatch. All rights reserved.</p>

                <div className="flex gap-4">
                    <a href="mailto:support@travelmatch.com" className="hover:text-blue-500">
                        <Mail size={18} />
                    </a>
                    <a href="https://github.com/meerathaakur/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                        <Github size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
