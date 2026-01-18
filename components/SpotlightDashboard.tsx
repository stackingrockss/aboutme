'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Heart, Dog, Gamepad2, UtensilsCrossed, Dices, ChevronLeft, ChevronRight, LucideIcon, FolderGit2, Terminal, Dumbbell, Bike, Mountain, Snowflake, Footprints, Flower2, Trophy, Baby, Sun, Apple, Sandwich, Moon, AlertTriangle, IceCream } from 'lucide-react';
import Image from 'next/image';

// Random memory photos for RAND() card - add your photos here
const randomMemoryPhotos: Photo[] = [
  { src: '/images/random1.jpg', alt: 'Random memory 1' },
  { src: '/images/random2.jpg', alt: 'Random memory 2' },
  { src: '/images/random3.jpg', alt: 'Random memory 3' },
  { src: '/images/random4.jpg', alt: 'Random memory 4' },
  { src: '/images/random5.jpg', alt: 'Random memory 5' },
];

type Photo = {
  src: string;
  alt?: string;
};

interface CardContent {
  headline: string;
  facts: string[];
  photos: Photo[];
}

interface Card {
  id: number;
  icon: LucideIcon;
  title: string;
  preview: string;
  gradient: string;
  content: CardContent;
}

const cards: Card[] = [
  {
    id: 1,
    icon: Heart,
    title: 'Family',
    preview: 'The crew',
    gradient: 'from-green-500 to-emerald-600',
    content: {
      headline: 'The Family',
      facts: [],
      photos: [
        { src: '/images/bamff-family.jpg', alt: 'Bamff family' },
        { src: '/images/matt-and-tiffany-waterfall.jpg', alt: 'Matt and Tiffany at waterfall' },
        { src: '/images/matt-and-tiffany.jpg', alt: 'Matt and Tiffany' },
        { src: '/images/matt-and-tiffany-2.jpg', alt: 'Matt and Tiffany' },
        { src: '/images/matt-and-daniel.jpg', alt: 'Matt and Daniel' },
        { src: '/images/family-pic.jpg', alt: 'Family picture' },
        { src: '/images/family-pic-mountains.jpg', alt: 'Family picture in mountains' },
        { src: '/images/grandparents-with-kids.jpg', alt: 'Grandparents with kids' }
      ]
    }
  },
  {
    id: 2,
    icon: Dog,
    title: 'The Beast',
    preview: 'Leonberger',
    gradient: 'from-green-500 to-emerald-600',
    content: {
      headline: 'Our Leonberger',
      facts: [
        "Yes, that's a real breed",
        'Basically a small horse that sheds',
        'Gentle giant energy',
        'Kill count: 6 mice, 3 voles, 1 bird'
      ],
      photos: [
        { src: '/images/molly1.jpg', alt: 'Molly the Leonberger' },
        { src: '/images/molly2.jpg', alt: 'Molly the Leonberger' },
        { src: '/images/molly3.jpg', alt: 'Molly the Leonberger' },
        { src: '/images/molly4.jpg', alt: 'Molly the Leonberger' },
        { src: '/images/molly5.jpg', alt: 'Molly the Leonberger' },
        { src: '/images/molly6.jpg', alt: 'Molly the Leonberger' },
        { src: '/images/molly7.jpg', alt: 'Molly the Leonberger' }
      ]
    }
  },
  {
    id: 4,
    icon: FolderGit2,
    title: 'Projects',
    preview: 'What I build',
    gradient: 'from-green-500 to-emerald-600',
    content: {
      headline: 'Personal Projects',
      facts: [
        'Cipher - AI-powered fitness tracking with custom coach Kyron',
        '  ├ Next.js, TypeScript, Tailwind, shadcn/ui, Supabase, Prisma, Zustand, Gemini',
        '  └ Zeus GroupMe Bot - Gemini-powered chat bot',
        'MeetingPicker - Chrome extension to share Google Calendar availability instantly',
        '  └ Plasmo, React, TypeScript, Tailwind, Luxon, Shadow DOM',
        'EdgeTracker - Trading journal with AI-powered pattern analysis',
        '  └ Django, DRF, React 19, Vite, TanStack Router, Zustand, Tailwind, shadcn/ui, Gemini',
        'Briefcase - AI-powered deal intelligence for strategic enterprise sales',
        '  └ Next.js 15, React 19, Tailwind v4, shadcn/ui, Prisma, Supabase, Zustand, Inngest, Gemini, ReactFlow',
        'Debian Server - Self-hosted infrastructure backbone',
        '  └ Frigate - NVR with AI object detection',
        '  └ Home Assistant - Smart home automation (50+ devices)',
        '  └ Immich - Private photo backup (Google Photos alternative)'
      ],
      photos: []
    }
  },
  {
    id: 5,
    icon: Dumbbell,
    title: 'Hobbies',
    preview: 'Beyond slanging software',
    gradient: 'from-green-500 to-emerald-600',
    content: {
      headline: 'When I\'m Not Selling',
      facts: [],
      photos: []
    }
  },
  {
    id: 7,
    icon: UtensilsCrossed,
    title: 'Food',
    preview: 'Fuel for the grind',
    gradient: 'from-green-500 to-emerald-600',
    content: {
      headline: 'Daily Fuel Protocol',
      facts: [
        'Breakfast: Oatmeal, 3 eggs + 1/3 cup egg whites, 1⅓ cup greek yogurt + 1/3 cup granola',
        'Snacks: 2 Kirkland protein bars, Cosmic Crisp or Honeycrisp apple',
        'Lunch: 6 slices turkey, 2 slices swiss cheese, collagen & protein shake',
        'Dinner: Variable',
        'LOVE rice - could eat it every day',
        'Weakness: Ice cream'
      ],
      photos: []
    }
  },
  {
    id: 8,
    icon: Dices,
    title: 'RAND()',
    preview: 'Access random memory',
    gradient: 'from-green-500 to-emerald-600',
    content: {
      headline: 'RANDOM_MEMORY_ACCESS',
      facts: [
        'I worked at a mortuary',
        'My favorite composer is Chopin',
        'I accidentally set my car on fire'
      ],
      photos: []
    }
  },
];

// Matrix Rain Component
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillStyle = `rgba(0, 255, 70, ${Math.random() * 0.5 + 0.5})`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.15 }}
    />
  );
}

// Typing Effect Hook
function useTypingEffect(text: string, speed: number = 50) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
}

// Glitch Text Component
function GlitchText({ children, className = '' }: { children: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={isGlitching ? 'animate-pulse' : ''}>{children}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 text-red-500 opacity-70" style={{ transform: 'translate(-2px, -1px)' }}>
            {children}
          </span>
          <span className="absolute top-0 left-0 text-cyan-500 opacity-70" style={{ transform: 'translate(2px, 1px)' }}>
            {children}
          </span>
        </>
      )}
    </span>
  );
}

// Random Flicker Hook - picks one card at a time to flicker
function useRandomFlicker(cardCount: number) {
  const [flickeringId, setFlickeringId] = useState<number | null>(null);

  useEffect(() => {
    const triggerFlicker = () => {
      // Pick a random card index
      const randomIndex = Math.floor(Math.random() * cardCount);
      setFlickeringId(randomIndex);

      // Turn off flicker after brief duration
      setTimeout(() => setFlickeringId(null), 200);

      // Schedule next flicker at random interval (800ms - 2500ms)
      const nextDelay = 800 + Math.random() * 1700;
      setTimeout(triggerFlicker, nextDelay);
    };

    // Start first flicker after initial delay
    const initialTimeout = setTimeout(triggerFlicker, 1000);

    return () => clearTimeout(initialTimeout);
  }, [cardCount]);

  return flickeringId;
}

// Flicker Text Component for card titles - matches GlitchText RGB chromatic aberration
function FlickerText({ children, isFlickering }: { children: string; isFlickering: boolean }) {
  if (!isFlickering) {
    return <span>{children}</span>;
  }

  return (
    <span className="relative inline-block">
      <span className="animate-pulse">{children}</span>
      <span className="absolute top-0 left-0 text-red-500 opacity-70" style={{ transform: 'translate(-2px, -1px)' }}>
        {children}
      </span>
      <span className="absolute top-0 left-0 text-cyan-500 opacity-70" style={{ transform: 'translate(2px, 1px)' }}>
        {children}
      </span>
    </span>
  );
}

// Beast Creature File Component
function BeastCreatureFile({ photos, openLightbox }: { photos: Photo[]; openLightbox: (photos: Photo[], index: number) => void }) {
  const [mode, setMode] = useState<'family' | 'stranger'>('family');
  const [animatedBars, setAnimatedBars] = useState(false);

  useEffect(() => {
    // Trigger bar animation after mount
    const timer = setTimeout(() => setAnimatedBars(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Reset and re-animate bars when mode changes
  useEffect(() => {
    setAnimatedBars(false);
    const timer = setTimeout(() => setAnimatedBars(true), 50);
    return () => clearTimeout(timer);
  }, [mode]);

  const stats = {
    family: {
      hostility: 0,
      suspicion: 5,
      cuddles: 100,
      threat: 0,
      label: 'FAMILY_MODE',
      color: 'green',
    },
    stranger: {
      hostility: 30,
      suspicion: 90,
      cuddles: 0,
      threat: 85,
      label: 'STRANGER_DETECTED',
      color: 'amber',
    },
  };

  const current = stats[mode];
  const barColor = mode === 'family' ? 'bg-green-500' : 'bg-amber-500';
  const textColor = mode === 'family' ? 'text-green-400' : 'text-amber-400';
  const borderColor = mode === 'family' ? 'border-green-500' : 'border-amber-500';

  const StatBar = ({ label, value }: { label: string; value: number }) => (
    <div className="flex items-center gap-3">
      <span className="text-green-600 text-sm w-24">{label}:</span>
      <div className="flex-1 h-3 bg-green-900/50 rounded overflow-hidden">
        <div
          className={`h-full ${barColor} rounded transition-all duration-700 ease-out`}
          style={{ width: animatedBars ? `${value}%` : '0%' }}
        />
      </div>
      <span className={`${textColor} text-sm w-12 text-right`}>{value}%</span>
    </div>
  );

  return (
    <div>
      <div className="text-green-600 text-sm mb-4">
        {'>'} ACCESSING CREATURE_DATABASE...
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('family')}
          className={`
            flex-1 py-2 px-4 rounded border-2 transition-all duration-300
            ${mode === 'family'
              ? 'border-green-500 bg-green-500/20 text-green-400'
              : 'border-green-500/30 bg-transparent text-green-700 hover:border-green-500/50'
            }
          `}
        >
          {'>'} FAMILY_MODE
        </button>
        <button
          onClick={() => setMode('stranger')}
          className={`
            flex-1 py-2 px-4 rounded border-2 transition-all duration-300
            ${mode === 'stranger'
              ? 'border-amber-500 bg-amber-500/20 text-amber-400'
              : 'border-green-500/30 bg-transparent text-green-700 hover:border-amber-500/50'
            }
          `}
        >
          {'>'} STRANGER_DETECTED
        </button>
      </div>

      {/* Creature File */}
      <div className={`border-2 ${borderColor} rounded-lg overflow-hidden transition-colors duration-300`}>
        {/* Header */}
        <div className={`${mode === 'family' ? 'bg-green-500/10' : 'bg-amber-500/10'} border-b ${borderColor} p-4 transition-colors duration-300`}>
          <div className="flex items-center justify-between">
            <span className={`${textColor} font-bold`}>SPECIMEN FILE #001</span>
            <span className={`${textColor} text-sm animate-pulse`}>[{current.label}]</span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Classification */}
          <div className="space-y-1 text-sm">
            <div className="flex gap-2">
              <span className="text-green-600">CLASSIFICATION:</span>
              <span className="text-green-400">Canis lupus familiaris</span>
            </div>
            <div className="flex gap-2">
              <span className="text-green-600">VARIANT:</span>
              <span className="text-green-400">Leonberger</span>
            </div>
            <div className="flex gap-2">
              <span className="text-green-600">CODENAME:</span>
              <span className={textColor}>&quot;Molly&quot;</span>
            </div>
            <div className="flex gap-2">
              <span className="text-green-600">SIZE_CLASS:</span>
              <span className="text-green-400">HORSE-ADJACENT</span>
            </div>
          </div>

          {/* Divider */}
          <div className={`border-t ${borderColor}/50`} />

          {/* Behavioral Analysis */}
          <div>
            <div className={`${textColor} text-sm mb-3 font-bold`}>{'>'} BEHAVIORAL_ANALYSIS:</div>
            <div className="space-y-2">
              <StatBar label="Hostility" value={current.hostility} />
              <StatBar label="Suspicion" value={current.suspicion} />
              <StatBar label="Cuddles" value={current.cuddles} />
              <StatBar label="Threat" value={current.threat} />
            </div>
          </div>

          {/* Divider */}
          <div className={`border-t ${borderColor}/50`} />

          {/* Kill Count */}
          <div>
            <div className="text-green-400 text-sm mb-3 font-bold">{'>'} CONFIRMED_ELIMINATIONS:</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between border border-green-500/30 rounded px-3 py-1">
                <span className="text-green-600">mice</span>
                <span className="text-green-400 font-mono">6</span>
              </div>
              <div className="flex justify-between border border-green-500/30 rounded px-3 py-1">
                <span className="text-green-600">voles</span>
                <span className="text-green-400 font-mono">3</span>
              </div>
              <div className="flex justify-between border border-green-500/30 rounded px-3 py-1">
                <span className="text-green-600">birds</span>
                <span className="text-green-400 font-mono">1</span>
              </div>
              <div className="flex justify-between border border-green-500/50 rounded px-3 py-1 bg-green-500/10">
                <span className="text-green-500 font-bold">TOTAL</span>
                <span className="text-green-400 font-mono font-bold">10</span>
              </div>
            </div>
          </div>

          {/* Security Protocol Alert */}
          {mode === 'stranger' && (
            <div className="border-2 border-amber-500/50 bg-amber-500/10 rounded p-3 animate-pulse">
              <div className="flex items-center gap-2">
                <span className="text-amber-400">⚠</span>
                <span className="text-amber-400 text-sm font-bold">GUARDIAN_PROTOCOL: ACTIVE</span>
              </div>
              <p className="text-amber-600 text-xs mt-1">Stranger proximity triggers protective subroutines</p>
            </div>
          )}

          {mode === 'family' && (
            <div className="border-2 border-green-500/50 bg-green-500/10 rounded p-3">
              <div className="flex items-center gap-2">
                <span className="text-green-400">♥</span>
                <span className="text-green-400 text-sm font-bold">GENTLE_GIANT.exe: RUNNING</span>
              </div>
              <p className="text-green-600 text-xs mt-1">Maximum cuddle protocols engaged for pack members</p>
            </div>
          )}
        </div>
      </div>

      {/* Photo Gallery */}
      {photos.length > 0 && (
        <div className="mt-6">
          <div className="text-green-600 text-sm mb-3">{'>'} SPECIMEN_IMAGERY:</div>
          <div className="grid grid-cols-4 gap-2">
            {photos.slice(0, 4).map((photo, index) => (
              <button
                key={index}
                onClick={() => openLightbox(photos, index)}
                className="aspect-square rounded overflow-hidden border border-green-500/50 hover:border-green-400 transition-colors"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt || 'The Beast'}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          {photos.length > 4 && (
            <div className="text-center mt-2">
              <span className="text-green-700 text-xs">[+{photos.length - 4} more in lightbox]</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-green-500/30 text-green-700 text-sm">
        {'>'} EOF reached. Press [ESC] or click outside to close.
      </div>
    </div>
  );
}

// Live Stats Hook
function useLiveStats() {
  const [ping, setPing] = useState(12);
  const [cpu, setCpu] = useState(23);
  const [mem, setMem] = useState(47);

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 15) + 8); // 8-22ms
      setCpu(Math.floor(Math.random() * 30) + 15); // 15-44%
      setMem(Math.floor(Math.random() * 20) + 40); // 40-59%
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return { ping, cpu, mem };
}

// Tech stack icon mapping
const techIcons: Record<string, { color: string; abbrev?: string }> = {
  'Next.js': { color: 'text-white', abbrev: 'Next' },
  'Next.js 15': { color: 'text-white', abbrev: 'Next15' },
  'TypeScript': { color: 'text-blue-400', abbrev: 'TS' },
  'Tailwind': { color: 'text-cyan-400', abbrev: 'TW' },
  'Tailwind v4': { color: 'text-cyan-400', abbrev: 'TW4' },
  'shadcn/ui': { color: 'text-white', abbrev: 'shad' },
  'Supabase': { color: 'text-emerald-400', abbrev: 'Supa' },
  'Prisma': { color: 'text-indigo-400' },
  'Zustand': { color: 'text-orange-400', abbrev: 'Zust' },
  'Gemini': { color: 'text-blue-300' },
  'Plasmo': { color: 'text-purple-400' },
  'React': { color: 'text-cyan-300' },
  'React 19': { color: 'text-cyan-300', abbrev: 'R19' },
  'Luxon': { color: 'text-yellow-400' },
  'Shadow DOM': { color: 'text-gray-400', abbrev: 'Shadow' },
  'Django': { color: 'text-green-600' },
  'DRF': { color: 'text-red-400' },
  'Vite': { color: 'text-yellow-300' },
  'TanStack Router': { color: 'text-orange-300', abbrev: 'TanS' },
  'Inngest': { color: 'text-pink-400' },
  'ReactFlow': { color: 'text-purple-300', abbrev: 'Flow' },
  'Frigate': { color: 'text-blue-500' },
  'Home Assistant': { color: 'text-cyan-500', abbrev: 'HA' },
  'Immich': { color: 'text-indigo-300' },
};

// Build log messages for the terminal animation
const buildLogMessages = [
  '$ npm run build',
  '',
  '> projects@1.0.0 build',
  '> next build',
  '',
  '   ▲ Next.js 14.0.0',
  '',
  '   Creating an optimized production build ...',
  '   ✓ Compiled successfully',
  '   ✓ Linting and checking validity of types',
  '   ✓ Collecting page data',
  '   ✓ Generating static pages',
  '   ✓ Finalizing page optimization',
  '',
  '   Route (app)              Size     First Load JS',
  '   ─ /                      5.2 kB        89.1 kB',
  '   ─ /projects              3.1 kB        87.0 kB',
  '',
  '   ✓ Build completed in 2.3s',
  '',
  '> Loading project manifests...',
];

export default function SpotlightDashboard() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [lightbox, setLightbox] = useState<{ photos: Photo[]; index: number } | null>(null);
  const [photoPage, setPhotoPage] = useState(0);
  const [showCarFireVideo, setShowCarFireVideo] = useState(false);
  const [revealedFacts, setRevealedFacts] = useState<Set<number>>(new Set());

  // RAND() spinner state
  const [randPhoto, setRandPhoto] = useState<Photo | null>(null);
  const [randNodesAccessed, setRandNodesAccessed] = useState(0);
  const [randIsSpinning, setRandIsSpinning] = useState(false);
  const [randStatusText, setRandStatusText] = useState('> AWAITING INPUT...');
  const lastRandPhotoRef = useRef<string | null>(null);

  // Projects card animation state
  const [projectsBuildPhase, setProjectsBuildPhase] = useState<'building' | 'typing' | 'done'>('building');
  const [buildLogIndex, setBuildLogIndex] = useState(0);
  const [visibleProjectLines, setVisibleProjectLines] = useState(0);
  const [typingLineText, setTypingLineText] = useState('');

  const { displayedText, isComplete } = useTypingEffect('> SYSTEM INITIALIZED', 80);
  const { ping, cpu, mem } = useLiveStats();
  const flickeringCardIndex = useRandomFlicker(cards.length);
  const chopinAudio = useRef<HTMLAudioElement | null>(null);
  const funeralAudio = useRef<HTMLAudioElement | null>(null);
  const carFireVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    chopinAudio.current = new Audio('/audio/chopin.mp3');
    chopinAudio.current.volume = 0.3;
    chopinAudio.current.loop = true;

    funeralAudio.current = new Audio('/audio/funeral.mp3');
    funeralAudio.current.volume = 0.3;
    funeralAudio.current.loop = true;
  }, []);

  const getAudioForFact = (fact: string): HTMLAudioElement | null => {
    if (fact.toLowerCase().includes('composer') || fact.toLowerCase().includes('chopin')) {
      return chopinAudio.current;
    }
    if (fact.toLowerCase().includes('mortuary')) {
      return funeralAudio.current;
    }
    return null;
  };

  const handleFactHover = (fact: string, index: number) => {
    setRevealedFacts(prev => new Set(prev).add(index));

    if (fact.toLowerCase().includes('car on fire') || fact.toLowerCase().includes('set my car')) {
      setShowCarFireVideo(true);
      setTimeout(() => {
        if (carFireVideoRef.current) {
          carFireVideoRef.current.playbackRate = 2;
          carFireVideoRef.current.play().catch(() => {});
        }
      }, 0);
      return;
    }
    const audio = getAudioForFact(fact);
    audio?.play().catch(() => {});
  };

  const handleFactLeave = (fact: string, index: number) => {
    setRevealedFacts(prev => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });

    if (fact.toLowerCase().includes('car on fire') || fact.toLowerCase().includes('set my car')) {
      setShowCarFireVideo(false);
      if (carFireVideoRef.current) {
        carFireVideoRef.current.pause();
        carFireVideoRef.current.currentTime = 0;
      }
      return;
    }
    const audio = getAudioForFact(fact);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const getRedactedText = (text: string): string => {
    return text.replace(/[a-zA-Z0-9]/g, '█');
  };

  const openLightbox = (photos: Photo[], index: number) => {
    setLightbox({ photos, index });
  };

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const nextPhoto = useCallback(() => {
    if (lightbox && lightbox.index < lightbox.photos.length - 1) {
      setLightbox({ ...lightbox, index: lightbox.index + 1 });
    }
  }, [lightbox]);

  const prevPhoto = useCallback(() => {
    if (lightbox && lightbox.index > 0) {
      setLightbox({ ...lightbox, index: lightbox.index - 1 });
    }
  }, [lightbox]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, closeLightbox, nextPhoto, prevPhoto]);

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setPhotoPage(0);
  };

  const closeModal = () => {
    setSelectedCard(null);
    // Reset RAND() state when closing
    setRandPhoto(null);
    setRandNodesAccessed(0);
    setRandStatusText('> AWAITING INPUT...');
    // Reset Projects state when closing
    setProjectsBuildPhase('building');
    setBuildLogIndex(0);
    setVisibleProjectLines(0);
    setTypingLineText('');
  };

  // Projects card build animation effect
  useEffect(() => {
    if (!selectedCard || selectedCard.title !== 'Projects') return;

    // Phase 1: Build log animation
    if (projectsBuildPhase === 'building') {
      if (buildLogIndex < buildLogMessages.length) {
        const timer = setTimeout(() => {
          setBuildLogIndex(prev => prev + 1);
        }, 80);
        return () => clearTimeout(timer);
      } else {
        // Build complete, move to typing phase
        const timer = setTimeout(() => {
          setProjectsBuildPhase('typing');
        }, 300);
        return () => clearTimeout(timer);
      }
    }

    // Phase 2: Typing animation for project lines
    if (projectsBuildPhase === 'typing') {
      const projectFacts = selectedCard.content.facts;
      if (visibleProjectLines < projectFacts.length) {
        const currentLine = projectFacts[visibleProjectLines];
        if (typingLineText.length < currentLine.length) {
          const timer = setTimeout(() => {
            setTypingLineText(currentLine.slice(0, typingLineText.length + 1));
          }, 15);
          return () => clearTimeout(timer);
        } else {
          // Line complete, move to next
          const timer = setTimeout(() => {
            setVisibleProjectLines(prev => prev + 1);
            setTypingLineText('');
          }, 100);
          return () => clearTimeout(timer);
        }
      } else {
        setProjectsBuildPhase('done');
      }
    }
  }, [selectedCard, projectsBuildPhase, buildLogIndex, visibleProjectLines, typingLineText]);

  const executeRand = () => {
    if (randIsSpinning || randomMemoryPhotos.length === 0) return;

    setRandIsSpinning(true);
    setRandStatusText('> ACCESSING MEMORY NODE...');

    // Glitch animation - rapidly cycle through photos
    let cycles = 0;
    const maxCycles = 15;
    const cycleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * randomMemoryPhotos.length);
      setRandPhoto(randomMemoryPhotos[randomIndex]);
      cycles++;

      if (cycles >= maxCycles) {
        clearInterval(cycleInterval);

        // Pick final photo (avoid repeat)
        let finalPhoto: Photo;
        if (randomMemoryPhotos.length === 1) {
          finalPhoto = randomMemoryPhotos[0];
        } else {
          const availablePhotos = randomMemoryPhotos.filter(
            p => p.src !== lastRandPhotoRef.current
          );
          finalPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)];
        }

        setRandPhoto(finalPhoto);
        lastRandPhotoRef.current = finalPhoto.src;
        setRandNodesAccessed(prev => prev + 1);
        setRandStatusText('> MEMORY DECRYPTED');
        setRandIsSpinning(false);
      }
    }, 80);
  };

  return (
    <div className="min-h-screen bg-black p-6 md:p-10 font-mono relative overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Scanline Effect */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
        }}
      />

      {/* CRT Flicker */}
      <div className="fixed inset-0 pointer-events-none z-10 animate-crt-flicker bg-green-500" />

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 relative z-20">
        <div className="flex items-center gap-4 mb-2">
          <Terminal className="w-5 h-5 text-green-500" />
          <span className="text-green-500 text-sm tracking-widest">
            {displayedText}
            {!isComplete && <span className="animate-pulse">_</span>}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-2 tracking-tight">
          <GlitchText>LIFE_DASHBOARD.exe</GlitchText>
        </h1>
        <p className="text-green-600 text-lg">
          {'>'} Select module to access data...
          <span className="animate-pulse">_</span>
        </p>
      </div>

      {/* Card Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-20">
        {cards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`
                relative bg-black/80 border border-green-500/50
                p-5 rounded-lg text-left
                transform transition-all duration-200
                hover:scale-105 hover:border-green-400 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)]
                active:scale-95
                group
                backdrop-blur-sm
              `}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-green-500" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-green-500" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-green-500" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-green-500" />

              <IconComponent
                size={32}
                className="text-green-500 mb-3 group-hover:text-green-400 transition-colors"
              />
              <h3 className="text-green-400 font-bold text-lg mb-1 tracking-wide">
                [<FlickerText isFlickering={flickeringCardIndex === index}>{card.title.toUpperCase()}</FlickerText>]
              </h3>
              <p className="text-green-600 text-sm font-mono">
                {'>'} {card.preview}
              </p>

              {/* Scan line on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/0 via-green-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden rounded-lg">
                <div className="absolute inset-0 animate-scan" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Terminal-style stats footer */}
      <div className="max-w-6xl mx-auto mt-10 pt-8 border-t border-green-900 relative z-20">
        <div className="text-green-500 text-sm mb-4 font-mono">
          {'>'} system.stats --verbose
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-green-500/30 p-4 rounded bg-black/50">
            <p className="text-green-400 text-2xl font-bold font-mono">005</p>
            <p className="text-green-700 text-xs uppercase tracking-wider">family_members</p>
          </div>
          <div className="border border-green-500/30 p-4 rounded bg-black/50">
            <p className="text-green-400 text-2xl font-bold font-mono">001</p>
            <p className="text-green-700 text-xs uppercase tracking-wider">giant_dog</p>
          </div>
          <div className="border border-green-500/30 p-4 rounded bg-black/50">
            <p className="text-green-400 text-2xl font-bold font-mono">022</p>
            <p className="text-green-700 text-xs uppercase tracking-wider">indoor_plants</p>
          </div>
          <div className="border border-green-500/30 p-4 rounded bg-black/50">
            <p className="text-green-400 text-2xl font-bold font-mono">INF</p>
            <p className="text-green-700 text-xs uppercase tracking-wider">side_projects</p>
          </div>
        </div>
        <div className="mt-6 text-green-700 text-xs">
          <span className="text-green-500">{'>'}</span> status: <span className="text-green-400">ACTIVE</span> | cpu: <span className="text-green-400">{cpu}%</span> | mem: <span className="text-green-400">{mem}%</span> | ping: <span className="text-green-400">{ping}ms</span>
        </div>
      </div>

      {/* Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-black border-2 border-green-500 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto shadow-[0_0_50px_rgba(0,255,0,0.2)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="bg-green-500/10 border-b border-green-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <selectedCard.icon size={24} className="text-green-400" />
                <span className="text-green-400 font-mono font-bold">
                  {selectedCard.content.headline.toUpperCase()}.dat
                </span>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded border border-green-500/50 hover:bg-green-500/20 transition-colors"
              >
                <X size={16} className="text-green-500" />
              </button>
            </div>

            <div className="p-6 font-mono">
              {/* Beast Card - Creature File */}
              {selectedCard.title === 'The Beast' ? (
                <BeastCreatureFile photos={selectedCard.content.photos} openLightbox={openLightbox} />
              ) : selectedCard.title === 'Hobbies' ? (
                <div>
                  <div className="text-green-600 text-sm mb-6">
                    {'>'} loading recreation_protocols...
                  </div>

                  {/* Icon Grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6">
                    {[
                      { icon: Dumbbell, label: 'Weight Lifting' },
                      { icon: Bike, label: 'Biking' },
                      { icon: Snowflake, label: 'Skiing' },
                      { icon: Snowflake, label: 'Snowboarding' },
                      { icon: Mountain, label: 'Hiking' },
                      { icon: Flower2, label: 'Gardening' },
                      { icon: Footprints, label: 'Walks' },
                      { icon: Gamepad2, label: 'Wild Rift' },
                      { icon: Heart, label: 'Tennis' },
                      { icon: Baby, label: 'Parenting' },
                    ].map((hobby, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-2 p-3 border border-green-500/30 rounded bg-green-500/5 hover:bg-green-500/10 hover:border-green-400 transition-colors"
                      >
                        <hobby.icon size={28} className="text-green-400" />
                        <span className="text-green-500 text-xs text-center">{hobby.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="space-y-3 mb-6">
                    <div className="border-2 border-cyan-500/50 bg-cyan-500/5 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Bike size={32} className="text-cyan-400" />
                        <div>
                          <p className="text-cyan-400 font-bold">6,075.3 MILES BIKED</p>
                          <p className="text-cyan-600 text-sm">2025 Projected Distance</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-2 border-yellow-500/50 bg-yellow-500/5 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Trophy size={32} className="text-yellow-400" />
                        <div>
                          <p className="text-yellow-400 font-bold">TOP 100 DR. MUNDO</p>
                          <p className="text-yellow-600 text-sm">Wild Rift NA Server</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-green-500/30 text-green-700 text-sm">
                    {'>'} EOF reached. Press [ESC] or click outside to close.
                  </div>
                </div>
              ) : selectedCard.title === 'Projects' ? (
                <div>
                  {/* Build Log Animation */}
                  {projectsBuildPhase === 'building' && (
                    <div className="bg-black/50 border border-green-500/30 rounded p-4 mb-4 h-64 overflow-hidden">
                      <div className="space-y-1">
                        {buildLogMessages.slice(0, buildLogIndex).map((line, i) => (
                          <div key={i} className={`text-sm ${line.includes('✓') ? 'text-green-400' : line.startsWith('$') ? 'text-green-300' : 'text-green-600'}`}>
                            {line || '\u00A0'}
                          </div>
                        ))}
                        {buildLogIndex < buildLogMessages.length && (
                          <span className="text-green-400 animate-pulse">_</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Projects List with Typing Effect */}
                  {(projectsBuildPhase === 'typing' || projectsBuildPhase === 'done') && (
                    <div className="space-y-3">
                      {(() => {
                        let mainLineCount = 0;
                        const projectFacts = selectedCard.content.facts;
                        return projectFacts.map((fact, i) => {
                          const isTreeLine = fact.trimStart().startsWith('├') || fact.trimStart().startsWith('└');
                          if (!isTreeLine) mainLineCount++;

                          // Determine if this line should be visible
                          const isVisible = i < visibleProjectLines || (i === visibleProjectLines && projectsBuildPhase === 'typing');
                          const isCurrentlyTyping = i === visibleProjectLines && projectsBuildPhase === 'typing';
                          const displayText = isCurrentlyTyping ? typingLineText : fact;

                          if (!isVisible && projectsBuildPhase !== 'done') return null;

                          // Parse tech stack line into interactive badges
                          const isTechStackLine = isTreeLine && !fact.includes(' - ');

                          return (
                            <div
                              key={i}
                              className={`flex items-start gap-2 ${isCurrentlyTyping ? '' : 'opacity-100'}`}
                            >
                              {isTreeLine ? (
                                <span className="text-green-600 flex-shrink-0 w-10"></span>
                              ) : (
                                <span className="text-green-600 flex-shrink-0 w-10">[{String(mainLineCount).padStart(2, '0')}]</span>
                              )}
                              {isTechStackLine && projectsBuildPhase === 'done' ? (
                                <div className="flex flex-wrap gap-1.5">
                                  <span className="text-green-600">{fact.match(/^\s*[├└]/)?.[0] || ''}</span>
                                  {fact.replace(/^\s*[├└]\s*/, '').split(', ').map((tech, j) => {
                                    const techInfo = techIcons[tech.trim()] || { color: 'text-green-400' };
                                    return (
                                      <span
                                        key={j}
                                        className={`
                                          px-2 py-0.5 rounded text-xs border border-green-500/30
                                          bg-green-500/10 hover:bg-green-500/20 hover:border-green-400
                                          hover:shadow-[0_0_10px_rgba(0,255,0,0.3)]
                                          transition-all duration-200 cursor-default
                                          ${techInfo.color}
                                        `}
                                        title={tech.trim()}
                                      >
                                        {techInfo.abbrev || tech.trim()}
                                      </span>
                                    );
                                  })}
                                </div>
                              ) : (
                                <span className="text-green-400">
                                  {displayText}
                                  {isCurrentlyTyping && <span className="animate-pulse">_</span>}
                                </span>
                              )}
                            </div>
                          );
                        });
                      })()}
                    </div>
                  )}

                  {projectsBuildPhase === 'done' && (
                    <div className="mt-6 pt-4 border-t border-green-500/30 text-green-700 text-sm">
                      {'>'} EOF reached. Press [ESC] or click outside to close.
                    </div>
                  )}
                </div>
              ) : selectedCard.title === 'Food' ? (
                <div>
                  <div className="text-green-600 text-sm mb-6">
                    {'>'} loading nutrition_protocol...
                  </div>

                  {/* Macro Protocol Panel */}
                  <div className="border border-green-500/50 rounded-lg p-4 mb-6 bg-green-500/5">
                    <div className="text-green-400 text-sm mb-4 font-bold">{'>'} MACRO_PROTOCOL</div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-green-600 text-sm w-28">PROTEIN:</span>
                        <span className="text-green-500 text-sm w-24">1.0-1.2g/lb</span>
                        <div className="flex-1 h-3 bg-green-900/50 rounded overflow-hidden">
                          <div className="h-full bg-green-500 rounded" style={{ width: '85%' }} />
                        </div>
                        <span className="text-green-400 text-xs">PRIORITY</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-green-600 text-sm w-28">FAT:</span>
                        <span className="text-green-500 text-sm w-24">25% kcal</span>
                        <div className="flex-1 h-3 bg-green-900/50 rounded overflow-hidden">
                          <div className="h-full bg-green-500/70 rounded" style={{ width: '25%' }} />
                        </div>
                        <span className="text-green-600 text-xs">REQUIRED</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-green-600 text-sm w-28">CARBS:</span>
                        <span className="text-green-500 text-sm w-24">remainder</span>
                        <div className="flex-1 h-3 bg-green-900/50 rounded overflow-hidden">
                          <div className="h-full bg-green-500/50 rounded" style={{ width: '50%' }} />
                        </div>
                        <span className="text-green-700 text-xs">FILL</span>
                      </div>
                    </div>
                  </div>

                  {/* Meal Timeline */}
                  <div className="mb-6">
                    <div className="text-green-400 text-sm mb-4 font-bold">{'>'} DAILY_FUEL_SEQUENCE</div>
                    <div className="flex items-start justify-center gap-3">
                      {[
                        { icon: Sun, label: 'Breakfast', details: 'Oatmeal, eggs, greek yogurt + granola' },
                        { icon: Apple, label: 'Snacks', details: '2 protein bars, Cosmic Crisp apple' },
                        { icon: Sandwich, label: 'Lunch', details: 'Turkey, swiss, collagen shake' },
                        { icon: Moon, label: 'Dinner', details: 'Variable' },
                      ].map((meal, i, arr) => (
                        <div key={i} className="flex items-center">
                          <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-lg border border-green-500/50 bg-green-500/10 flex items-center justify-center mb-2 hover:bg-green-500/20 hover:border-green-400 transition-colors">
                              <meal.icon size={24} className="text-green-400" />
                            </div>
                            <span className="text-green-400 text-xs font-bold mb-1">{meal.label}</span>
                            <span className="text-green-600 text-xs max-w-20 leading-tight">{meal.details}</span>
                          </div>
                          {i < arr.length - 1 && (
                            <div className="text-green-600 mx-1 mt-[-40px]">→</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Favorites */}
                  <div className="border border-cyan-500/50 bg-cyan-500/5 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <UtensilsCrossed size={24} className="text-cyan-400" />
                      <div>
                        <p className="text-cyan-400 font-bold">STAPLE: RICE</p>
                        <p className="text-cyan-600 text-sm">Could eat it every day</p>
                      </div>
                    </div>
                  </div>

                  {/* Weakness Alert */}
                  <div className="border-2 border-red-500/50 bg-red-500/5 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle size={24} className="text-red-400" />
                      <IceCream size={24} className="text-red-300" />
                      <div>
                        <p className="text-red-400 font-bold">WEAKNESS_DETECTED</p>
                        <p className="text-red-600 text-sm">Ice cream - resistance: 0%</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-green-500/30 text-green-700 text-sm">
                    {'>'} EOF reached. Press [ESC] or click outside to close.
                  </div>
                </div>
              ) : selectedCard.title === 'RAND()' ? (
                <div className="flex flex-col items-center">
                  {/* Redacted Facts - Hover to Reveal */}
                  <div className="w-full mb-6 space-y-2">
                    <div className="text-green-600 text-sm mb-3">
                      {'>'} CLASSIFIED_RECORDS [hover to decrypt]
                    </div>
                    {selectedCard.content.facts.map((fact, i) => (
                      <div
                        key={i}
                        onMouseEnter={() => handleFactHover(fact, i)}
                        onMouseLeave={() => handleFactLeave(fact, i)}
                        className="flex items-center gap-2 p-3 border border-green-500/30 rounded bg-green-500/5 hover:bg-green-500/10 hover:border-green-400 transition-all cursor-pointer group"
                      >
                        <span className="text-green-600 flex-shrink-0">[{String(i + 1).padStart(2, '0')}]</span>
                        <span className={`font-mono transition-all duration-300 ${revealedFacts.has(i) ? 'text-green-400' : 'text-green-700 select-none'}`}>
                          {revealedFacts.has(i) ? fact : getRedactedText(fact)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Status Text */}
                  <div className="text-green-600 text-sm mb-4 w-full">
                    {randStatusText}
                    {randIsSpinning && <span className="animate-pulse">_</span>}
                  </div>

                  {/* Photo Display Area */}
                  <div className="relative w-full max-w-md aspect-[4/3] mb-6">
                    {/* Scanline overlay during spin */}
                    {randIsSpinning && (
                      <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.1) 2px, rgba(0, 255, 0, 0.1) 4px)',
                        }}
                      />
                    )}

                    {/* Photo or Placeholder */}
                    {randPhoto ? (
                      <div className={`w-full h-full rounded border-2 border-green-500 overflow-hidden ${randIsSpinning ? 'opacity-70' : ''}`}>
                        <Image
                          src={randPhoto.src}
                          alt={randPhoto.alt || 'Random memory'}
                          width={600}
                          height={450}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full rounded border-2 border-dashed border-green-500/30 flex items-center justify-center bg-green-500/5">
                        <div className="text-center">
                          <Dices size={48} className="text-green-700 mx-auto mb-2" />
                          <p className="text-green-700">{'>'} READY TO ACCESS</p>
                        </div>
                      </div>
                    )}

                    {/* Glitch overlay during spin */}
                    {randIsSpinning && (
                      <div className="absolute inset-0 bg-green-500/10 animate-pulse pointer-events-none rounded" />
                    )}
                  </div>

                  {/* Execute Button */}
                  <button
                    onClick={executeRand}
                    disabled={randIsSpinning || randomMemoryPhotos.length === 0}
                    className={`
                      px-6 py-3 rounded border-2 border-green-500
                      text-green-400 font-mono font-bold
                      transition-all duration-200
                      ${randIsSpinning
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-green-500/20 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] active:scale-95'
                      }
                    `}
                  >
                    {randIsSpinning ? '> PROCESSING...' : '> EXECUTE rand()'}
                  </button>

                  {/* Nodes Accessed Counter */}
                  <div className="mt-6 pt-4 border-t border-green-500/30 w-full text-center">
                    <span className="text-green-700 text-sm">
                      [NODES_ACCESSED: <span className="text-green-400">{String(randNodesAccessed).padStart(3, '0')}</span>]
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Terminal output style */}
                  <div className="text-green-600 text-sm mb-4">
                    {'>'} cat /data/{selectedCard.title.toLowerCase()}.log
                  </div>

                  {/* Photo Gallery with Pagination */}
                  {selectedCard.content.photos.length > 0 ? (
                    (() => {
                      const PHOTOS_PER_PAGE = 4;
                      const photos = selectedCard.content.photos;
                      const totalPages = Math.ceil(photos.length / PHOTOS_PER_PAGE);
                      const currentPhotos = photos.slice(
                        photoPage * PHOTOS_PER_PAGE,
                        (photoPage + 1) * PHOTOS_PER_PAGE
                      );

                      return (
                        <div className="mb-4">
                          {/* Simple 2x2 Grid */}
                          <div className="grid grid-cols-2 gap-3">
                            {currentPhotos.map((photo, index) => (
                              <button
                                key={index}
                                onClick={() => openLightbox(photos, photoPage * PHOTOS_PER_PAGE + index)}
                                className="aspect-[4/3] rounded overflow-hidden border border-green-500/50 hover:border-green-400 transition-colors"
                              >
                                <Image
                                  src={photo.src}
                                  alt={photo.alt || selectedCard.content.headline}
                                  width={600}
                                  height={450}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>

                          {/* Pagination Controls */}
                          {photos.length > PHOTOS_PER_PAGE && (
                            <div className="flex justify-center items-center gap-4 mt-3">
                              <button
                                onClick={() => setPhotoPage(p => p - 1)}
                                disabled={photoPage === 0}
                                className="p-2 text-green-400 hover:text-green-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                              >
                                <ChevronLeft className="w-6 h-6" />
                              </button>
                              <span className="text-green-400 text-sm font-mono">
                                [{photoPage + 1}/{totalPages}]
                              </span>
                              <button
                                onClick={() => setPhotoPage(p => p + 1)}
                                disabled={photoPage >= totalPages - 1}
                                className="p-2 text-green-400 hover:text-green-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                              >
                                <ChevronRight className="w-6 h-6" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()
                  ) : (
                    <div className="w-full h-48 rounded border-2 border-dashed border-green-500/30 mb-6 flex items-center justify-center bg-green-500/5">
                      <p className="text-green-700 font-mono">{'>'} NO_IMAGE_DATA_FOUND</p>
                    </div>
                  )}

                  {/* Facts as terminal output */}
                  <div className="space-y-3">
                    {(() => {
                      let mainLineCount = 0;
                      return selectedCard.content.facts.map((fact, i) => {
                        const isTreeLine = fact.trimStart().startsWith('├') || fact.trimStart().startsWith('└');
                        if (!isTreeLine) mainLineCount++;
                        return (
                          <div
                            key={i}
                            className="flex items-start gap-2"
                          >
                            {isTreeLine ? (
                              <span className="text-green-600 flex-shrink-0 w-10"></span>
                            ) : (
                              <span className="text-green-600 flex-shrink-0 w-10">[{String(mainLineCount).padStart(2, '0')}]</span>
                            )}
                            <span className="text-green-400">{fact}</span>
                          </div>
                        );
                      });
                    })()}
                  </div>

                  <div className="mt-6 pt-4 border-t border-green-500/30 text-green-700 text-sm">
                    {'>'} EOF reached. Press [ESC] or click outside to close.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[60]"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded border border-green-500/50 hover:bg-green-500/20 transition-colors z-10"
          >
            <X size={24} className="text-green-500" />
          </button>

          {lightbox.photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                disabled={lightbox.index === 0}
                className="absolute left-4 p-3 rounded border border-green-500/50 hover:bg-green-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10"
              >
                <ChevronLeft size={32} className="text-green-500" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                disabled={lightbox.index === lightbox.photos.length - 1}
                className="absolute right-4 p-3 rounded border border-green-500/50 hover:bg-green-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10"
              >
                <ChevronRight size={32} className="text-green-500" />
              </button>
            </>
          )}

          <div
            className="relative max-w-[90vw] max-h-[90vh] border-2 border-green-500 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.photos[lightbox.index].src}
              alt={lightbox.photos[lightbox.index].alt || ''}
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
            />
            {lightbox.photos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 border border-green-500/50 px-4 py-2 rounded">
                <span className="text-green-400 text-sm font-mono">
                  [{lightbox.index + 1}/{lightbox.photos.length}]
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Car Fire Video Popup */}
      {showCarFireVideo && (
        <div className="fixed bottom-8 right-8 z-[70] border-2 border-green-500 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,0,0.4)]">
          <video
            ref={carFireVideoRef}
            src="/video/carfire.mp4"
            muted
            loop
            className="w-80 h-auto"
          />
        </div>
      )}
    </div>
  );
}
