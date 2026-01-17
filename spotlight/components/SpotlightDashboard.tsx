'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Heart, Dog, Dumbbell, Gamepad2, UtensilsCrossed, Sparkles, Plane, ChevronLeft, ChevronRight, LucideIcon, FolderGit2, Terminal } from 'lucide-react';
import Image from 'next/image';

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
      facts: [
        'Tiffany - my wife',
        'Daniel - son',
        'Emilia - daughter',
        'Natalie - daughter',
        'Based in Spokane, WA'
      ],
      photos: [
        { src: '/images/family1.jpg', alt: 'Family photo 1' },
        { src: '/images/family2.jpg', alt: 'Family photo 2' },
        { src: '/images/family3.jpg', alt: 'Family photo 3' }
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
        'Currently dealing with ear issues (dog parent life)'
      ],
      photos: [
        { src: '/images/dog.jpg', alt: 'Our Leonberger' }
      ]
    }
  },
  {
    id: 3,
    icon: Dumbbell,
    title: 'Fitness',
    preview: 'Gains szn',
    gradient: 'from-green-500 to-emerald-600',
    content: {
      headline: 'The Fitness Journey',
      facts: [
        'Strength training focus',
        'Currently in bulk/cut cycle optimization',
        'Incline dumbbell press progression',
        'Building an app for this (of course)'
      ],
      photos: [
        { src: '/images/fitness.jpg', alt: 'Fitness photo' }
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
        'Cipher - Fitness tracking app with AI coach "Kyron" (Next.js + TypeScript)',
        'MeetingPicker - Chrome extension to share Google Calendar availability in seconds (no links, just formatted text)',
        'Briefcase - AI-powered sales CRM with call intelligence, account research & deal acceleration (Next.js + Gemini)',
        'Debian Server - Self-hosted infrastructure backbone',
        'Frigate - NVR with AI object detection for home security',
        'Home Assistant - Smart home automation hub (50+ devices)',
        'Immich - Self-hosted Google Photos alternative for private photo backup'
      ],
      photos: [
        { src: '/images/projects.jpg', alt: 'Projects screenshot' }
      ]
    }
  },
  {
    id: 5,
    icon: Gamepad2,
    title: 'Hobbies',
    preview: 'Beyond slanging software',
    gradient: 'from-green-500 to-emerald-600',
    content: {
      headline: 'When I\'m Not Coding',
      facts: [
        '[Add your hobbies here]',
        '[Gaming, reading, etc.]',
        '[Weekend activities]'
      ],
      photos: [
        { src: '/images/hobbies.jpg', alt: 'Hobbies photo' }
      ]
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
        'Dinner: Variable (keeps it interesting)',
        'LOVE rice - could eat it every day',
        'LOVE ice cream - non-negotiable'
      ],
      photos: [
        { src: '/images/food.jpg', alt: 'Food photo' }
      ]
    }
  },
  {
    id: 8,
    icon: Sparkles,
    title: 'Fun Facts',
    preview: 'Plot twists',
    gradient: 'from-green-500 to-emerald-600',
    content: {
      headline: 'Two Truths and a Lie',
      facts: [
        'I worked at a mortuary',
        'My favorite composer is Beethoven',
        'I accidentally set my car on fire'
      ],
      photos: [
        { src: '/images/funfacts.jpg', alt: 'Fun facts photo' }
      ]
    }
  },
  {
    id: 9,
    icon: Plane,
    title: 'Travel',
    preview: 'Places & adventures',
    gradient: 'from-green-500 to-emerald-600',
    content: {
      headline: 'Adventures & Destinations',
      facts: [
        '[Favorite place visited]',
        '[Dream destination]',
        '[Travel style - adventurer, relaxer, etc.]',
        '[Memorable trip story]'
      ],
      photos: [
        { src: '/images/travel.jpg', alt: 'Travel photo' }
      ]
    }
  }
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

export default function SpotlightDashboard() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [lightbox, setLightbox] = useState<{ photos: Photo[]; index: number } | null>(null);
  const { displayedText, isComplete } = useTypingEffect('> SYSTEM INITIALIZED', 80);
  const { ping, cpu, mem } = useLiveStats();
  const beethovenAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    beethovenAudio.current = new Audio('/audio/beethoven.mp3');
    beethovenAudio.current.volume = 0.3;
    beethovenAudio.current.loop = true;
  }, []);

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
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const handleFunFactsHover = () => {
    beethovenAudio.current?.play().catch(() => {
      // Autoplay blocked until user interaction
    });
  };

  const handleFunFactsLeave = () => {
    if (beethovenAudio.current) {
      beethovenAudio.current.pause();
      beethovenAudio.current.currentTime = 0;
    }
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
      <div className="fixed inset-0 pointer-events-none z-10 animate-pulse opacity-[0.02] bg-green-500" />

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
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 relative z-20">
        {cards.map((card, index) => {
          const IconComponent = card.icon;
          const isFunFacts = card.title === 'Fun Facts';
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              onMouseEnter={isFunFacts ? handleFunFactsHover : undefined}
              onMouseLeave={isFunFacts ? handleFunFactsLeave : undefined}
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
                [{card.title.toUpperCase()}]
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
            <p className="text-green-400 text-2xl font-bold font-mono">50+</p>
            <p className="text-green-700 text-xs uppercase tracking-wider">smart_switches</p>
          </div>
          <div className="border border-green-500/30 p-4 rounded bg-black/50">
            <p className="text-green-400 text-2xl font-bold font-mono">001</p>
            <p className="text-green-700 text-xs uppercase tracking-wider">giant_dog</p>
          </div>
          <div className="border border-green-500/30 p-4 rounded bg-black/50">
            <p className="text-green-400 text-2xl font-bold font-mono">001</p>
            <p className="text-green-700 text-xs uppercase tracking-wider">fitness_app</p>
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
            className="bg-black border-2 border-green-500 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto shadow-[0_0_50px_rgba(0,255,0,0.2)] relative"
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
              {/* Terminal output style */}
              <div className="text-green-600 text-sm mb-4">
                {'>'} cat /data/{selectedCard.title.toLowerCase()}.log
              </div>

              {/* Photo Gallery */}
              {selectedCard.content.photos.length > 0 ? (
                <div className="columns-2 md:columns-3 gap-3 mb-6">
                  {selectedCard.content.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => openLightbox(selectedCard.content.photos, index)}
                      className="w-full mb-3 rounded overflow-hidden border border-green-500/50 hover:border-green-400 transition-colors break-inside-avoid block"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt || selectedCard.content.headline}
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="w-full h-48 rounded border-2 border-dashed border-green-500/30 mb-6 flex items-center justify-center bg-green-500/5">
                  <p className="text-green-700 font-mono">{'>'} NO_IMAGE_DATA_FOUND</p>
                </div>
              )}

              {/* Facts as terminal output */}
              <div className="space-y-2">
                {selectedCard.content.facts.map((fact, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0">[{String(i + 1).padStart(2, '0')}]</span>
                    <span className="text-green-400">{fact}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-green-500/30 text-green-700 text-sm">
                {'>'} EOF reached. Press [ESC] or click outside to close.
              </div>
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
    </div>
  );
}
