export function Footer() {
    return (
        <footer className="py-12 border-t border-border mt-20 text-center text-muted-foreground">
            <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">
                <p>© {new Date().getFullYear()} JensenZhong. All rights reserved.</p>
                <p className="mt-2 text-sm">Built with Next.js & Tailwind CSS</p>
                <div className="flex gap-4 mt-6 text-sm">
                    <a href="https://twitter.com/jensonzhong" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
                    <a href="https://github.com/jensonzhong" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
                    <a href="mailto:contact@jensonzhong.com" className="hover:text-foreground transition-colors">Email</a>
                </div>
            </div>
        </footer>
    );
}
