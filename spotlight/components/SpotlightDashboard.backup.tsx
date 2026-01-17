'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Heart, Dog, Dumbbell, Code, Cpu, Gamepad2, UtensilsCrossed, Sparkles, Plane, ChevronLeft, ChevronRight, LucideIcon, FolderGit2 } from 'lucide-react';
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
    preview: '🐕 Leonberger',
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
        '🏋️ Cipher - Fitness tracking app with AI coach "Kyron" (Next.js + TypeScript)',
        '📅 MeetingPicker - [Add description]',
        '💼 Briefcase - [Add description]',
        '🖥️ Debian Server - Self-hosted infrastructure backbone',
        '📹 Frigate - NVR with AI object detection for home security',
        '🏠 Home Assistant - Smart home automation hub (50+ devices)'
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

export default function SpotlightDashboard() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [lightbox, setLightbox] = useState<{ photos: Photo[]; index: number } | null>(null);

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
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-500 text-sm font-medium tracking-wide uppercase">System Online</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Life Dashboard
        </h1>
        <p className="text-gray-400 text-xl">
          Click any tile to learn more
        </p>
      </div>

      {/* Card Grid */}
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
                hover:scale-105 hover:shadow-lg
                active:scale-95
                group
              `}
            >
              <IconComponent
                size={32}
                className="text-white/90 mb-3 group-hover:scale-110 transition-transform"
              />
              <h3 className="text-white font-bold text-lg mb-1">{card.title}</h3>
              <p className="text-white/70 text-sm">{card.preview}</p>
            </button>
          );
        })}
      </div>

      {/* Fun stats footer */}
      <div className="max-w-6xl mx-auto mt-10 pt-8 border-t border-gray-800">
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-white">50+</p>
            <p className="text-gray-500 text-sm">Smart Switches</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">1</p>
            <p className="text-gray-500 text-sm">Giant Dog</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">1</p>
            <p className="text-gray-500 text-sm">Fitness App in Progress</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">∞</p>
            <p className="text-gray-500 text-sm">Side Projects</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient Header */}
            <div className={`bg-gradient-to-r ${selectedCard.gradient} p-6 rounded-t-2xl relative`}>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
              <selectedCard.icon size={48} className="text-white mb-3" />
              <h2 className="text-3xl font-bold text-white">{selectedCard.content.headline}</h2>
            </div>

            <div className="p-6">
              {/* Photo Gallery */}
              {selectedCard.content.photos.length > 0 ? (
                <div className="columns-2 md:columns-3 gap-3 mb-6">
                  {selectedCard.content.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => openLightbox(selectedCard.content.photos, index)}
                      className="w-full mb-3 rounded-lg overflow-hidden hover:opacity-90 transition-opacity break-inside-avoid block"
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
                <div className="w-full h-48 rounded-xl bg-gray-800 border-2 border-dashed border-gray-600 mb-6 flex items-center justify-center">
                  <p className="text-gray-400 text-lg font-medium">No photos added yet</p>
                </div>
              )}

              {/* Facts */}
              <ul className="space-y-3">
                {selectedCard.content.facts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedCard.gradient} mt-2 flex-shrink-0`} />
                    <span className="text-gray-200 text-lg">{fact}</span>
                  </li>
                ))}
              </ul>
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
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <X size={24} className="text-white" />
          </button>

          {lightbox.photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                disabled={lightbox.index === 0}
                className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10"
              >
                <ChevronLeft size={32} className="text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                disabled={lightbox.index === lightbox.photos.length - 1}
                className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10"
              >
                <ChevronRight size={32} className="text-white" />
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
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
            />
            {lightbox.photos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full">
                <span className="text-white text-sm font-medium">
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
