import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Heart, MapPin } from 'lucide-react';

interface SectionProps {
    title: string;
    icon: React.ReactNode;
    content: (string | React.ReactNode)[];
    color: string;
    isOpen: boolean;
    onToggle: () => void;
}

const SoccerBallIcon = ({ isOpen }: { isOpen: boolean }) => (
    <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-3xl filter drop-shadow-sm select-none"
    >
        ⚽
    </motion.div>
);

const SectionCard: React.FC<SectionProps> = ({ title, icon, content, color, isOpen, onToggle }) => {
    return (
        <motion.div
            layout
            className={`w-full max-w-lg mx-auto mb-6 rounded-3xl shadow-lg overflow-hidden border-4 border-white/50`}
            style={{ backgroundColor: color }}
        >
            <motion.button
                layout="position"
                onClick={onToggle}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-4 text-white">
                    <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                        {icon}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-party drop-shadow-md tracking-wide">{title}</h2>
                </div>
                <SoccerBallIcon isOpen={isOpen} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6"
                    >
                        <ul className="text-xl text-white font-medium space-y-3">
                            {content.map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <span className="text-xl leading-none opacity-80">✨</span>
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const InfoSection: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const toggleSection = (title: string) => {
        setActiveSection(activeSection === title ? null : title);
    };

    const sections = [
        {
            title: "About Me",
            icon: <User size={28} />,
            content: [
                "I am turning fabulous five!",
                "I am super excited for my big day.",
                "My favorite color is Blue (like Sonic!)."
            ],
            color: "#38BDF8"
        },
        {
            title: "My Hobbies",
            icon: <Heart size={28} />,
            content: [
                "I love running and jumping.",
                "Playing soccer with my friends.",
                "Drawing funny cartoons."
            ],
            color: "#C084FC"
        },
        {
            title: "Party Venue & Time",
            icon: <MapPin size={28} />,
            content: [
                "Date: Jan 24th",
                "Time: 4 PM onwards",
                <span key="loc">
                    At: <a
                        href="https://www.google.com/maps/search/?api=1&query=Best+Western+Plus+Portsmouth+Hotel+and+Suites+Portsmouth+Circle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-white/50 hover:decoration-white hover:text-white transition-all font-bold"
                    >
                        Best Western Plus Portsmouth Hotel and Suites, Portsmouth Circle
                    </a>
                </span>
            ],
            color: "#FB923C"
        }
    ];

    return (
        <section id="info-section" className="relative z-10 w-full px-4 -mt-10">
            {sections.map((section) => (
                <SectionCard
                    key={section.title}
                    {...section}
                    isOpen={activeSection === section.title}
                    onToggle={() => toggleSection(section.title)}
                />
            ))}
        </section>
    );
};

export default InfoSection;
