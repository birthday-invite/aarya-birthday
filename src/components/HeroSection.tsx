import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sparkle Component
const Sparkle = ({ x, y }: { x: number; y: number }) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1, 0], opacity: [1, 1, 0], rotate: [0, 180] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute pointer-events-none text-yellow-300 z-50 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]"
            style={{
                left: x,
                top: y,
                fontSize: `${Math.random() * 20 + 20}px`
            }}
        >
            ✨
        </motion.div>
    );
};

const HeroSection: React.FC = () => {
    const [isAltText, setIsAltText] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [sparkles, setSparkles] = useState<{ id: number, x: number, y: number }[]>([]);

    useEffect(() => {
        // Flip text after 1 second
        const textTimer = setTimeout(() => {
            setIsAltText(true);
        }, 1000);

        // Scroll down after text flip (2.5 seconds total delay)
        const scrollTimer = setTimeout(() => {
            handleScrollDown(5000); // 5 seconds duration (very slow)
        }, 2500);

        return () => {
            clearTimeout(textTimer);
            clearTimeout(scrollTimer);
        };
    }, []);

    const handleScrollDown = (customDuration?: number) => {
        const target = document.getElementById('info-section');
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = typeof customDuration === 'number' ? customDuration : 1500;
            let start: number | null = null;

            function step(timestamp: number) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);

                // Easing function (easeInOutCubic)
                const ease = percentage < 0.5
                    ? 4 * percentage * percentage * percentage
                    : 1 - Math.pow(-2 * percentage + 2, 3) / 2;

                window.scrollTo(0, startPosition + distance * ease);

                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            window.requestAnimationFrame(step);
        }
    };

    const handleTextClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        // Add sparkles around the click position
        const newSparkles = Array.from({ length: 12 }).map((_, i) => ({
            id: Date.now() + i,
            x: e.clientX + (Math.random() - 0.5) * 300,
            y: e.clientY + (Math.random() - 0.5) * 300
        }));

        setSparkles(prev => [...prev, ...newSparkles]);

        // Clear sparkles after animation
        setTimeout(() => {
            setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
        }, 1000);

        // Increment click count
        const newCount = clickCount + 1;
        setClickCount(newCount);

        // Toggle text always
        setIsAltText(!isAltText);

        // On 2nd click
        if (newCount >= 2) {
            handleScrollDown();
            setClickCount(0);
        }
    };

    return (
        <section
            onClick={() => handleScrollDown()}
            className="relative w-full min-h-screen flex flex-col items-center justify-center text-center p-4 pt-10 pb-0 overflow-hidden cursor-pointer"
        >
            {/* Sparkles Container */}
            <div className="fixed inset-0 pointer-events-none z-50">
                <AnimatePresence>
                    {sparkles.map(sparkle => (
                        <Sparkle key={sparkle.id} x={sparkle.x} y={sparkle.y} />
                    ))}
                </AnimatePresence>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col items-center w-full h-full justify-center pb-20 gap-8">

                <AnimatePresence mode="wait">
                    <motion.h1
                        key={isAltText ? "alt" : "main"}
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        exit={{ rotateX: -90, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        onClick={handleTextClick}
                        className={`text-6xl md:text-9xl font-party cursor-pointer select-none drop-shadow-2xl ${isAltText ? 'text-pink-500' : 'text-yellow-400'}`}
                        style={{
                            textShadow: isAltText
                                ? '0px 1px 0px #9d174d, 0px 2px 0px #9d174d, 0px 3px 0px #9d174d, 0px 4px 0px #9d174d, 0px 5px 0px #9d174d, 0px 6px 0px #9d174d, 2px 2px 15px rgba(0,0,0,0.3)'
                                : '0px 1px 0px #b45309, 0px 2px 0px #b45309, 0px 3px 0px #b45309, 0px 4px 0px #b45309, 0px 5px 0px #b45309, 0px 6px 0px #b45309, 2px 2px 15px rgba(0,0,0,0.3)',
                            WebkitTextStroke: isAltText ? '2px #ffffff' : '2px #ffffff'
                        }}
                    >
                        {isAltText ? "Aarya is turning Five" : "It's my Birthday"}
                    </motion.h1>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default HeroSection;
