import React from 'react';

interface MobileShortcutsProps {
    onCommand: (cmd: string) => void;
}

const MobileShortcuts: React.FC<MobileShortcutsProps> = ({ onCommand }) => {
    // Shortcuts now map to "ls <dir>" or "cat <file>" to trigger the full visual effect
    // while navigating correctly.
    const shortcuts = [
        { label: 'PROJECTS', cmd: 'ls projects' },
        { label: 'SKILLS', cmd: 'ls skills' },
        { label: 'ABOUT', cmd: 'cat about.txt' },
        { label: 'CONTACT', cmd: 'cat contact.md' },
        { label: 'REVIEWS', cmd: 'testimonials' },
    ];

    return (
        <div className="grid grid-cols-5 gap-2 mb-4 sm:hidden">
            {shortcuts.map(s => (
                <button
                    key={s.label}
                    onClick={() => onCommand(s.cmd)}
                    className="bg-gray-800/50 border border-gray-700 text-[10px] py-2 px-1 rounded text-term-green hover:bg-gray-700 active:scale-95 transition-all uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    {s.label}
                </button>
            ))}
        </div>
    );
};

export default MobileShortcuts;