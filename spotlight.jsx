import React, { useState } from 'react';
import { Home, Heart, Dumbbell, Code, Cpu, Dog, MapPin, X, Lightbulb, Camera, Users } from 'lucide-react';

const SpotlightDashboard = () => {
  const [activeCard, setActiveCard] = useState(null);
  
  const cards = [
    {
      id: 'family',
      icon: Heart,
      title: 'Family',
      color: 'from-rose-500 to-pink-600',
      preview: 'The crew',
      content: {
        headline: 'The Family',
        facts: [
          'My son Daniel - [add your description]',
          'Based in Spokane, WA',
          'Living the Pacific Northwest life'
        ],
        photoPlaceholder: 'FAMILY PHOTO HERE'
      }
    },
    {
      id: 'dog',
      icon: Dog,
      title: 'The Beast',
      color: 'from-amber-500 to-orange-600',
      preview: '🐕 Leonberger',
      content: {
        headline: 'Our Leonberger',
        facts: [
          'Yes, that\'s a real breed',
          'Basically a small horse that sheds',
          'Gentle giant energy',
          'Currently dealing with ear issues (dog parent life)'
        ],
        photoPlaceholder: 'DOG PHOTO HERE'
      }
    },

    {
      id: 'smarthome',
      icon: Lightbulb,
      title: 'Smart Home',
      color: 'from-violet-500 to-purple-600',
      preview: '50+ devices',
      content: {
        headline: 'The Automation Obsession',
        facts: [
          '43-52 smart switches (still counting)',
          'Home Assistant on Debian server',
          'Zigbee devices everywhere',
          'If it can be automated, it will be',
          'Yes, my family thinks I\'m insane'
        ],
        photoPlaceholder: 'SMART HOME SETUP PHOTO'
      }
    },
    {
      id: 'security',
      icon: Camera,
      title: 'Security',
      color: 'from-slate-500 to-gray-600',
      preview: 'Cameras + NVR',
      content: {
        headline: 'Fort Knox (Almost)',
        facts: [
          'Reolink cameras',
          'Frigate NVR for AI detection',
          'UniFi Dream Machine Pro SE',
          'PoE networking throughout',
          'Local-first, no cloud dependency'
        ],
        photoPlaceholder: 'NETWORK/SECURITY PHOTO'
      }
    },
    {
      id: 'fitness',
      icon: Dumbbell,
      title: 'Fitness',
      color: 'from-red-500 to-rose-600',
      preview: 'Gains szn',
      content: {
        headline: 'The Fitness Journey',
        facts: [
          'Strength training focus',
          'Currently in bulk/cut cycle optimization',
          'Incline dumbbell press progression',
          'Building an app for this (of course)'
        ],
        photoPlaceholder: 'FITNESS PHOTO HERE'
      }
    },
    {
      id: 'cipher',
      icon: Code,
      title: 'Cipher',
      color: 'from-cyan-500 to-blue-600',
      preview: 'Side project',
      content: {
        headline: 'Cipher - Fitness App',
        facts: [
          'Next.js + TypeScript',
          'Workout tracking & nutrition logging',
          'AI coach named "Kyron"',
          'Social features',
          'Because I needed another project'
        ],
        photoPlaceholder: 'APP SCREENSHOT HERE'
      }
    },
    {
      id: 'philosophy',
      icon: Cpu,
      title: 'Tech Philosophy',
      color: 'from-indigo-500 to-blue-600',
      preview: 'Self-hosted life',
      content: {
        headline: 'Local-First Everything',
        facts: [
          'If there\'s a self-hosted option, I\'m using it',
          'Immich instead of Google Photos',
          'Home Assistant instead of Alexa/Google',
          'Own your data, own your infrastructure',
          'Cloud is just someone else\'s computer'
        ],
        photoPlaceholder: 'SERVER/TECH PHOTO'
      }
    }
  ];

  const Modal = ({ card, onClose }) => (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <div className={`bg-gradient-to-r ${card.color} p-6 rounded-t-2xl relative`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
          <card.icon size={48} className="text-white mb-3" />
          <h2 className="text-3xl font-bold text-white">{card.content.headline}</h2>
        </div>
        
        <div className="p-6">
          {/* Photo placeholder */}
          <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl h-64 flex items-center justify-center mb-6">
            <p className="text-gray-400 text-lg font-medium">{card.content.photoPlaceholder}</p>
          </div>
          
          {/* Facts */}
          <ul className="space-y-3">
            {card.content.facts.map((fact, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color} mt-2 flex-shrink-0`} />
                <span className="text-gray-200 text-lg">{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

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
          Click any tile to learn more • Interactive spotlight
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => setActiveCard(card)}
            className={`
              bg-gradient-to-br ${card.color} 
              p-5 rounded-xl text-left
              transform transition-all duration-200
              hover:scale-105 hover:shadow-lg hover:shadow-${card.color.split('-')[1]}-500/20
              active:scale-95
              group
            `}
          >
            <card.icon 
              size={32} 
              className="text-white/90 mb-3 group-hover:scale-110 transition-transform" 
            />
            <h3 className="text-white font-bold text-lg mb-1">{card.title}</h3>
            <p className="text-white/70 text-sm">{card.preview}</p>
          </button>
        ))}
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
      {activeCard && <Modal card={activeCard} onClose={() => setActiveCard(null)} />}
    </div>
  );
};

export default SpotlightDashboard;
