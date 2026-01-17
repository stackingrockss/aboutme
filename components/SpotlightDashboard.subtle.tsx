'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Heart, Dog, Dumbbell, Cpu, Gamepad2, UtensilsCrossed, Sparkles, Plane, ChevronLeft, ChevronRight, LucideIcon, FolderGit2, Activity } from 'lucide-react';
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
    gradient: 'from-rose-500 to-pink-600',
    content: {
      headline: 'The Family',
      facts: [
        'My son Daniel - [add your description]',
        'Based in Spokane, WA',
        'Living the Pacific Northwest life'
      ],
      photos: [
        { src: '/images/family.jpg', alt: 'Family photo' }
      ]
    }
  },
  {
    id: 2,
    icon: Dog,
    title: 'The Beast',
    preview: 'Leonberger',
    gradient: 'from-amber-500 to-orange-600',
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
    gradient: 'from-red-500 to-rose-600',
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
    gradient: 'from-violet-500 to-purple-600',
    content: {
      headline: 'Personal Projects',
      facts: [
        'Cipher - Fitness tracking app with AI coach "Kyron" (Next.js + TypeScript)',
        'MeetingPicker - Chrome extension to share Google Calendar availability in seconds',
        'Briefcase - AI-powered sales CRM with call intelligence (Next.js + Gemini)',
        'Debian Server - Self-hosted infrastructure backbone',
        'Frigate - NVR with AI object detection for home security',
        'Home Assistant - Smart home automation hub (50+ devices)',
        'Immich - Self-hosted Google Photos alternative'
      ],
      photos: [
        { src: '/images/projects.jpg', alt: 'Projects screenshot' }
      ]
    }
  },
  {
    id: 5,
    icon: Cpu,
    title: 'Tech Philosophy',
    preview: 'Self-hosted life',
    gradient: 'from-indigo-500 to-blue-600',
    content: {
      headline: 'Local-First Everything',
      facts: [
        "If there's a self-hosted option, I'm using it",
        'Immich instead of Google Photos',
        'Home Assistant instead of Alexa/Google',
        'Own your data, own your infrastructure',
        "Cloud is just someone else's computer"
      ],
      photos: [
        { src: '/images/tech.jpg', alt: 'Tech setup' }
      ]
    }
  },
  {
    id: 6,
    icon: Gamepad2,
    title: 'Hobbies',
    preview: 'Beyond the code',
    gradient: 'from-emerald-500 to-teal-600',
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
    gradient: 'from-orange-500 to-red-600',
    content: {
      headline: 'Food & Fuel',
      facts: [
        '[Favorite cuisine]',
        '[Go-to meal]',
        '[Controversial food opinion]',
        '[Coffee or tea preference]'
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
    gradient: 'from-fuchsia-500 to-pink-600',
    content: {
      headline: 'Things You Wouldn\'t Guess',
      facts: [
        '[Surprising fact #1]',
        '[Hidden talent]',
        '[Unusual experience]',
        '[Random trivia about yourself]'
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
    gradient: 'from-sky-500 to-blue-600',
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

export default function SpotlightDashboard() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [lightbox, setLightbox] = useState<{ photos: Photo[]; index: number } | null>(null);
  const { displayedText, isComplete } = useTypingEffect('~/life-dashboard', 60);

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

  return (
    <div className="min-h-screen bg-gray-950 p-6 md:p-10">
      {/* Header with terminal styling */}
      <div className="max-w-6xl mx-auto mb-10">
        {/* Terminal bar */}
        <div className="bg-gray-900 rounded-t-lg border border-gray-800 px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-gray-500 text-sm font-mono">
              {displayedText}
              {!isComplete && <span className="animate-pulse">|</span>}
            </span>
          </div>
        </div>

        <div className="bg-gray-900/50 border-x border-b border-gray-800 rounded-b-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-5 h-5 text-green-500 animate-pulse" />
            <span className="text-green-500 text-sm font-mono tracking-wide">STATUS: ONLINE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Life Dashboard
          </h1>
          <p className="text-gray-400 text-lg font-mono">
            <span className="text-green-500">$</span> click any tile to learn more
          </p>
        </div>
      </div>

      {/* Card Grid - colorful tiles */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`
                relative bg-gradient-to-br ${card.gradient}
                p-5 rounded-xl text-left
                transform transition-all duration-200
                hover:scale-105 hover:shadow-xl
                active:scale-95
                group
                overflow-hidden
              `}
            >
              {/* Subtle code pattern overlay */}
              <div className="absolute inset-0 opacity-[0.07] font-mono text-[8px] leading-tight overflow-hidden pointer-events-none text-white">
                {`const ${card.title.toLowerCase()} = { status: "active", priority: 1 }; `.repeat(20)}
              </div>

              <IconComponent
                size={32}
                className="text-white/90 mb-3 group-hover:scale-110 transition-transform relative z-10"
              />
              <h3 className="text-white font-bold text-lg mb-1 relative z-10">{card.title}</h3>
              <p className="text-white/70 text-sm font-mono relative z-10">{card.preview}</p>
            </button>
          );
        })}
      </div>

      {/* Terminal-style stats footer */}
      <div className="max-w-6xl mx-auto mt-10">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="text-gray-500 text-sm font-mono mb-4">
            <span className="text-green-500">$</span> cat stats.json
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-3xl font-bold text-white font-mono">19+</p>
              <p className="text-gray-500 text-sm font-mono">"houseplants"</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-3xl font-bold text-white font-mono">6,658</p>
              <p className="text-gray-500 text-sm font-mono">"miles_biked"</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-3xl font-bold text-white font-mono">2</p>
              <p className="text-gray-500 text-sm font-mono">"cats"</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-3xl font-bold text-white font-mono">3</p>
              <p className="text-gray-500 text-sm font-mono">"kids"</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-3xl font-bold text-white font-mono">1</p>
              <p className="text-gray-500 text-sm font-mono">"wife"</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-3xl font-bold text-white font-mono">1</p>
              <p className="text-gray-500 text-sm font-mono">"giant_dog"</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-3xl font-bold text-white font-mono">1</p>
              <p className="text-gray-500 text-sm font-mono">"fitness_app"</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-3xl font-bold text-white font-mono">∞</p>
              <p className="text-gray-500 text-sm font-mono">"side_projects"</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800 text-gray-600 text-xs font-mono">
            <span className="text-green-500">$</span> uptime: <span className="text-gray-400">always grinding</span> | node: <span className="text-gray-400">spokane-wa</span> | stack: <span className="text-gray-400">next.js + typescript</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal-style header with gradient accent */}
            <div className="border-b border-gray-700">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-gray-500 text-sm font-mono ml-2">
                    {selectedCard.title.toLowerCase()}.md
                  </span>
                </div>
                <button
                  onClick={closeModal}
                  className="p-1.5 rounded hover:bg-gray-700 transition-colors"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              </div>
              <div className={`h-1 bg-gradient-to-r ${selectedCard.gradient}`} />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${selectedCard.gradient}`}>
                  <selectedCard.icon size={28} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{selectedCard.content.headline}</h2>
              </div>

              {/* Photo Gallery */}
              {selectedCard.content.photos.length > 0 ? (
                <div className="columns-2 md:columns-3 gap-3 mb-6">
                  {selectedCard.content.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => openLightbox(selectedCard.content.photos, index)}
                      className="w-full mb-3 rounded-lg overflow-hidden hover:opacity-90 transition-opacity break-inside-avoid block border border-gray-700"
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
                <div className="w-full h-48 rounded-lg bg-gray-800 border border-dashed border-gray-600 mb-6 flex items-center justify-center">
                  <p className="text-gray-500 font-mono text-sm">// no images found</p>
                </div>
              )}

              {/* Facts as code comments */}
              <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-sm border border-gray-700">
                <div className="text-gray-500 mb-2">// key facts</div>
                {selectedCard.content.facts.map((fact, i) => (
                  <div key={i} className="flex items-start gap-2 py-1">
                    <span className="text-purple-400">-</span>
                    <span className="text-gray-300">{fact}</span>
                  </div>
                ))}
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
            className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors z-10 border border-gray-700"
          >
            <X size={24} className="text-gray-400" />
          </button>

          {lightbox.photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                disabled={lightbox.index === 0}
                className="absolute left-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10 border border-gray-700"
              >
                <ChevronLeft size={32} className="text-gray-400" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                disabled={lightbox.index === lightbox.photos.length - 1}
                className="absolute right-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10 border border-gray-700"
              >
                <ChevronRight size={32} className="text-gray-400" />
              </button>
            </>
          )}

          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.photos[lightbox.index].src}
              alt={lightbox.photos[lightbox.index].alt || ''}
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
            />
            {lightbox.photos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                <span className="text-gray-400 text-sm font-mono">
                  {lightbox.index + 1} / {lightbox.photos.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
