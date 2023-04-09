import React from 'react';

// The Layout component serves as a wrapper for the main content and header.
// It accepts children as a prop, which will be rendered as the main content.
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Disease Simulator</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:px-8">
                <div className="grid grid-cols-1 gap-4">{children}</div>
            </main>
        </div>
    );
};

export default Layout;
