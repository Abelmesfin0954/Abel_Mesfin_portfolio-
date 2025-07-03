"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Home, User, Code, Folder, Mail, Moon, Sun } from "lucide-react";
import { useSound } from "use-sound";
import debounce from "lodash/debounce";

// Type definition for tab items
interface Tab {
  id: string;
  icon: React.ReactNode;
  label: string;
  ariaLabel: string;
  notification?: number;
}

const tabs: Tab[] = [
  { id: "home", icon: <Home size={20} />, label: "Home", ariaLabel: "Home section" },
  { id: "about", icon: <User size={20} />, label: "About", ariaLabel: "About section" },
  { id: "skills", icon: <Code size={20} />, label: "Skills", ariaLabel: "Skills section" },
  { id: "projects", icon: <Folder size={20} />, label: "Projects", ariaLabel: "Projects section", notification: 3 },
  { id: "contact", icon: <Mail size={20} />, label: "Contact", ariaLabel: "Contact section", notification: 1 },
];

const Navigation = () => {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();
  const controls = useAnimation();
  const [playClick] = useSound('/sounds/click.mp3', {
    volume: 0.5,
    onError: () => console.warn("Sound failed to load")
  });

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const osDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialMode = savedMode ? savedMode === "true" : osDarkMode;
    setDarkMode(initialMode);
    document.documentElement.classList.toggle("dark", initialMode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("darkMode")) {
        setDarkMode(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
      setScrolled(window.scrollY > 10);
      tabs.forEach((tab) => {
        const element = document.getElementById(tab.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveTab(tab.id);
          }
        }
      });
    }, 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    controls.start({
      y: [20, -5, 0],
      opacity: [0, 1, 1],
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }, [controls]);

  const vibrate = () => {
    if ("vibrate" in navigator) navigator.vibrate(10);
  };

  const scrollToSection = (id: string) => {
    vibrate();
    playClick();
    const element = document.getElementById(id);
    if (!element) {
      router.push(`/#${id}`);
      return;
    }
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
    setActiveTab(id);
  };

  const toggleDarkMode = () => {
    vibrate();
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
      if (currentIndex < tabs.length - 1) scrollToSection(tabs[currentIndex + 1].id);
    } else if (touchEnd - touchStart > 50) {
      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
      if (currentIndex > 0) scrollToSection(tabs[currentIndex - 1].id);
    }
  };

  const TabItem = ({ tab, isActive, onClick, isMobile = false }: {
    tab: Tab;
    isActive: boolean;
    onClick: () => void;
    isMobile?: boolean;
  }) => (
    <motion.div
      className="relative flex justify-center w-full"
      whileHover={!isMobile ? { y: -2 } : {}}
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
    >
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center ${isMobile ? "p-3 rounded-xl w-full" : "px-1 py-2"} ${isActive ? (isMobile ? "text-white bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg" : "text-blue-600 dark:text-blue-400") : (isMobile ? "text-gray-500 dark:text-gray-400" : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100")}`}
        aria-current={isActive ? "page" : undefined}
        aria-label={tab.ariaLabel}
      >
        <motion.div
          animate={isActive && isMobile ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.6 }}>
          {tab.icon}
        </motion.div>

        {tab.notification && !(isActive && isMobile) && (
          <motion.span className={`absolute ${isMobile ? "top-2 right-4 h-4 w-4" : "-top-2 -right-3 h-5 w-5"} bg-red-500 text-white text-xs rounded-full flex items-center justify-center`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500 }}>
            {tab.notification}
          </motion.span>
        )}

        <motion.span className={`${isMobile ? "text-xs mt-1" : "text-sm font-medium"}`} animate={{ opacity: isActive ? 1 : 0.8, fontSize: isActive && isMobile ? "0.75rem" : "0.7rem" }}>
          {tab.label}
        </motion.span>
      </button>

      {isActive && !isMobile && (
        <motion.div layoutId="desktopActiveTab" className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" transition={{ type: "spring", bounce: 0.3, duration: 0.6 }} />
      )}

      {isActive && isMobile && (
        <motion.div layoutId="mobileActiveTab" className="absolute -top-2 w-3/4 h-1 bg-blue-400 rounded-full" transition={{ type: "spring", bounce: 0.3 }} />
      )}
    </motion.div>
  );

  return (
    <>
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={controls} className={`hidden md:flex fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg" : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"}`} aria-label="Main navigation">
        <div className="max-w-7xl mx-auto w-full px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection("home")} role="button" aria-label="Go to homepage">
              <motion.div whileHover={{ rotateY: 15, rotateX: -10 }} transition={{ type: "spring", stiffness: 300 }} className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Home className="text-white" size={20} aria-hidden="true" />
              </motion.div>
              <motion.span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" whileHover={{ x: 2 }}>
                Abel Mesfin
              </motion.span>
            </motion.div>
            <div className="flex items-center space-x-8">
              {tabs.map(tab => (
                <TabItem key={tab.id} tab={tab} isActive={activeTab === tab.id} onClick={() => scrollToSection(tab.id)} />
              ))}
              <motion.button onClick={toggleDarkMode} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl" aria-label="Mobile navigation">
        <div className="flex justify-around items-center px-1 py-1">
          {tabs.map(tab => (
            <TabItem key={tab.id} tab={tab} isActive={activeTab === tab.id} onClick={() => scrollToSection(tab.id)} isMobile />
          ))}
        </div>
      </motion.div>

      <motion.div className="md:hidden fixed bottom-24 right-6 z-50" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <button onClick={toggleDarkMode} className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </motion.div>
    </>
  );
};

export default Navigation;
