'use client';

import { useState, useEffect } from 'react';
import { Users, Heart, MapPin, Globe } from 'lucide-react';
import Image from 'next/image';

// Sample family data - you'd replace with real data
const familyMembers = [
  { id: 1, name: 'Dad', codename: 'ARCHITECT', role: 'sysadmin', status: 'active', location: 'Home Base', photo: '/images/family-pic.jpg' },
  { id: 2, name: 'Mom', codename: 'ORACLE', role: 'root', status: 'active', location: 'Home Base', photo: '/images/family-pic.jpg' },
  { id: 3, name: 'Brother', codename: 'CIPHER', role: 'contributor', status: 'away', location: 'Remote', photo: '/images/family-pic.jpg' },
  { id: 4, name: 'Tiffany', codename: 'TRINITY', role: 'partner', status: 'active', location: 'Home Base', photo: '/images/matt-and-tiffany.jpg' },
];

// ============================================
// 1. THE CREW - Operator Profiles
// ============================================
function TheCrewMockup() {
  return (
    <div className="border border-green-500/50 rounded-lg p-4 bg-black">
      <div className="text-green-600 text-sm mb-4">{'>'} ACCESSING CREW_ROSTER...</div>

      <div className="grid grid-cols-2 gap-3">
        {familyMembers.map((member) => (
          <div key={member.id} className="border border-green-500/30 rounded p-3 bg-green-500/5 hover:bg-green-500/10 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded border border-green-500/50 bg-green-900/30 flex items-center justify-center">
                <Users size={20} className="text-green-400" />
              </div>
              <div>
                <div className="text-green-400 font-bold text-sm">{member.codename}</div>
                <div className="text-green-600 text-xs">aka "{member.name}"</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-yellow-500'}`} />
              <span className="text-green-600">{member.status.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// 2. TERMINAL DOSSIERS - Typing Animation
// ============================================
function TerminalDossiersMockup() {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const lines = [
    '> ACCESSING PERSONNEL FILE...',
    '> CODENAME: "TRINITY"',
    '> ROLE: Life Partner',
    '> STATUS: ACTIVE',
    '> CLEARANCE: LEVEL 10',
    '> SKILLS: Patience.exe, Support.dll',
    '> NOTE: Best teammate in the game',
  ];

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < lines.length) {
        setTypedLines(prev => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border border-green-500/50 rounded-lg p-4 bg-black font-mono">
      <div className="text-green-600 text-sm mb-4">{'>'} CLASSIFIED DOSSIER</div>

      <div className="bg-black/50 border border-green-500/30 rounded p-4 min-h-48">
        {typedLines.map((line, i) => (
          <div
            key={i}
            className={`text-sm mb-1 ${
              line.includes('CODENAME') ? 'text-green-400 font-bold' :
              line.includes('STATUS') ? 'text-cyan-400' :
              'text-green-600'
            }`}
          >
            {line}
          </div>
        ))}
        <span className="text-green-400 animate-pulse">_</span>
      </div>
    </div>
  );
}

// ============================================
// 3. NETWORK TOPOLOGY - Connection Diagram
// ============================================
function NetworkTopologyMockup() {
  return (
    <div className="border border-green-500/50 rounded-lg p-4 bg-black">
      <div className="text-green-600 text-sm mb-4">{'>'} RENDERING NETWORK_MAP...</div>

      <div className="relative h-64 flex items-center justify-center">
        {/* Central Node (You) */}
        <div className="absolute z-10 w-16 h-16 rounded-full border-2 border-green-400 bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="text-green-400 text-xs font-bold">ME</div>
            <div className="w-2 h-2 bg-green-400 rounded-full mx-auto animate-pulse" />
          </div>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#22c55e" strokeWidth="1" strokeDasharray="4" className="animate-pulse" />
          <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#22c55e" strokeWidth="1" strokeDasharray="4" className="animate-pulse" />
          <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#22c55e" strokeWidth="1" strokeDasharray="4" className="animate-pulse" />
          <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#22c55e" strokeWidth="1" strokeDasharray="4" className="animate-pulse" />
        </svg>

        {/* Family Nodes */}
        {[
          { name: 'DAD', pos: 'top-4 left-8' },
          { name: 'MOM', pos: 'top-4 right-8' },
          { name: 'BRO', pos: 'bottom-4 left-8' },
          { name: 'WIFE', pos: 'bottom-4 right-8' },
        ].map((node) => (
          <div key={node.name} className={`absolute ${node.pos} w-12 h-12 rounded-full border border-green-500/50 bg-black/80 flex items-center justify-center hover:border-green-400 hover:scale-110 transition-all cursor-pointer`}>
            <span className="text-green-400 text-xs font-mono">{node.name}</span>
          </div>
        ))}

        {/* Data packets animation indicator */}
        <div className="absolute bottom-2 right-2 text-green-700 text-xs">
          [DATA_FLOW: ACTIVE]
        </div>
      </div>
    </div>
  );
}

// ============================================
// 4. CHARACTER SELECT - Fighting Game Style
// ============================================
function CharacterSelectMockup() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="border border-green-500/50 rounded-lg p-4 bg-black">
      <div className="text-green-400 text-center text-lg font-bold mb-4 animate-pulse">
        {'>'} SELECT YOUR ALLY {'<'}
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {familyMembers.map((member, i) => (
          <button
            key={member.id}
            onClick={() => setSelected(i)}
            className={`
              aspect-square rounded border-2 transition-all
              ${selected === i
                ? 'border-green-400 bg-green-500/20 scale-105 shadow-[0_0_15px_rgba(0,255,0,0.5)]'
                : 'border-green-500/30 bg-green-500/5 hover:border-green-500/50'
              }
            `}
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-2">
              <Users size={24} className={selected === i ? 'text-green-400' : 'text-green-600'} />
              <span className={`text-xs mt-1 ${selected === i ? 'text-green-400' : 'text-green-700'}`}>
                {member.codename.slice(0, 6)}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected character stats */}
      <div className="border border-green-500/30 rounded p-3 bg-green-500/5">
        <div className="text-green-400 font-bold mb-2">{familyMembers[selected].codename}</div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-green-600">SUPPORT</span>
            <div className="w-24 h-2 bg-green-900 rounded overflow-hidden">
              <div className="h-full bg-green-400" style={{ width: '90%' }} />
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-green-600">HUMOR</span>
            <div className="w-24 h-2 bg-green-900 rounded overflow-hidden">
              <div className="h-full bg-green-400" style={{ width: '85%' }} />
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-green-600">WISDOM</span>
            <div className="w-24 h-2 bg-green-900 rounded overflow-hidden">
              <div className="h-full bg-green-400" style={{ width: '95%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 5. SURVEILLANCE FEED - Security Camera Style
// ============================================
function SurveillanceFeedMockup() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border border-green-500/50 rounded-lg p-4 bg-black">
      <div className="text-green-600 text-sm mb-4">{'>'} ACCESSING SURVEILLANCE_NETWORK...</div>

      <div className="grid grid-cols-2 gap-2">
        {['CAM-01', 'CAM-02', 'CAM-03', 'CAM-04'].map((cam, i) => (
          <div key={cam} className="relative border border-green-500/30 rounded overflow-hidden bg-green-900/10 aspect-video">
            {/* Scanlines overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
              }}
            />

            {/* Camera placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <Users size={32} className="text-green-700" />
            </div>

            {/* Camera UI overlay */}
            <div className="absolute top-1 left-1 text-green-500 text-xs font-mono">{cam}</div>
            <div className="absolute top-1 right-1 flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-500 text-xs">REC</span>
            </div>
            <div className="absolute bottom-1 left-1 text-green-600 text-xs font-mono">
              {time.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// 6. MATRIX RAIN REVEAL - Code Curtain
// ============================================
function MatrixRainRevealMockup() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="border border-green-500/50 rounded-lg p-4 bg-black">
      <div className="text-green-600 text-sm mb-4">{'>'} HOVER TO DECRYPT...</div>

      <div className="grid grid-cols-2 gap-3">
        {familyMembers.map((member, i) => (
          <div
            key={member.id}
            className="relative aspect-square border border-green-500/30 rounded overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Photo underneath */}
            <div className="absolute inset-0 bg-green-900/30 flex items-center justify-center">
              <div className="text-center">
                <Users size={40} className="text-green-400 mx-auto mb-2" />
                <span className="text-green-400 text-sm">{member.name}</span>
              </div>
            </div>

            {/* Matrix rain overlay */}
            <div
              className={`absolute inset-0 bg-black flex items-center justify-center transition-opacity duration-500 ${
                hoveredIndex === i ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="text-green-500 font-mono text-xs leading-tight overflow-hidden">
                {Array(8).fill(0).map((_, row) => (
                  <div key={row} className="flex justify-center">
                    {Array(10).fill(0).map((_, col) => (
                      <span key={col} style={{ opacity: Math.random() * 0.8 + 0.2 }}>
                        {String.fromCharCode(0x30A0 + Math.random() * 96)}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-2 py-1 text-center">
              <span className="text-green-500 text-xs font-mono">
                {hoveredIndex === i ? `DECRYPTED: ${member.name}` : '[ENCRYPTED]'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// 7. AGENTS IN THE FIELD - Map View
// ============================================
function AgentsMapMockup() {
  return (
    <div className="border border-green-500/50 rounded-lg p-4 bg-black">
      <div className="text-green-600 text-sm mb-4">{'>'} TRACKING FIELD_AGENTS...</div>

      {/* Simplified map representation */}
      <div className="relative h-48 border border-green-500/30 rounded bg-green-900/10 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 197, 94, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />

        {/* Location pins */}
        {[
          { name: 'HQ', x: '50%', y: '40%', active: true },
          { name: 'AGENT-1', x: '30%', y: '25%', active: true },
          { name: 'AGENT-2', x: '70%', y: '60%', active: false },
        ].map((pin) => (
          <div
            key={pin.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: pin.x, top: pin.y }}
          >
            <div className={`relative ${pin.active ? 'animate-pulse' : ''}`}>
              <MapPin size={20} className={pin.active ? 'text-green-400' : 'text-green-700'} />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className={`text-xs font-mono ${pin.active ? 'text-green-400' : 'text-green-700'}`}>
                  {pin.name}
                </span>
              </div>
              {pin.active && (
                <div className="absolute inset-0 animate-ping">
                  <MapPin size={20} className="text-green-400 opacity-50" />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Coordinates */}
        <div className="absolute bottom-2 right-2 text-green-600 text-xs font-mono">
          LAT: 40.7128° | LON: -74.0060°
        </div>
      </div>

      {/* Agent List */}
      <div className="mt-4 space-y-2">
        {familyMembers.slice(0, 2).map((member) => (
          <div key={member.id} className="flex items-center justify-between text-sm border border-green-500/20 rounded px-3 py-2">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-green-500" />
              <span className="text-green-400">{member.codename}</span>
            </div>
            <span className="text-green-600">{member.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// 8. SYSTEM USERS - Linux Style
// ============================================
function SystemUsersMockup() {
  return (
    <div className="border border-green-500/50 rounded-lg p-4 bg-black font-mono">
      <div className="text-green-600 text-sm mb-4">{'>'} cat /etc/family | grep ACTIVE</div>

      <div className="bg-black/50 border border-green-500/30 rounded p-4 overflow-x-auto">
        {/* Header */}
        <div className="flex gap-4 text-green-600 text-xs border-b border-green-500/30 pb-2 mb-2">
          <span className="w-20">USER</span>
          <span className="w-12">PID</span>
          <span className="w-24">ROLE</span>
          <span className="w-16">STATUS</span>
          <span className="flex-1">PROCESS</span>
        </div>

        {/* Users */}
        {familyMembers.map((member, i) => (
          <div key={member.id} className="flex gap-4 text-xs py-1 hover:bg-green-500/10 transition-colors">
            <span className="w-20 text-green-400">{member.name.toLowerCase()}</span>
            <span className="w-12 text-green-600">{String(i + 1).padStart(3, '0')}</span>
            <span className="w-24 text-cyan-400">{member.role}</span>
            <span className={`w-16 ${member.status === 'active' ? 'text-green-400' : 'text-yellow-500'}`}>
              {member.status}
            </span>
            <span className="flex-1 text-green-600">family.service</span>
          </div>
        ))}

        {/* System info */}
        <div className="mt-4 pt-2 border-t border-green-500/30 text-green-700 text-xs">
          <span>TOTAL: {familyMembers.length} users | ACTIVE: {familyMembers.filter(m => m.status === 'active').length} | UPTIME: 12y 3m 15d</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN MOCKUP VIEWER
// ============================================
export default function FamilyCardMockups() {
  const [activeTab, setActiveTab] = useState(0);

  const mockups = [
    { name: '1. The Crew', component: TheCrewMockup, description: 'Family as Matrix-style operator profiles with codenames and status' },
    { name: '2. Terminal Dossiers', component: TerminalDossiersMockup, description: 'Classified files with typing animation' },
    { name: '3. Network Topology', component: NetworkTopologyMockup, description: 'Family as nodes in a network diagram' },
    { name: '4. Character Select', component: CharacterSelectMockup, description: 'Retro fighting game character selection' },
    { name: '5. Surveillance Feed', component: SurveillanceFeedMockup, description: 'Security camera style with timestamps' },
    { name: '6. Matrix Reveal', component: MatrixRainRevealMockup, description: 'Matrix rain parts on hover to reveal photos' },
    { name: '7. Agents Map', component: AgentsMapMockup, description: 'World map with location pins' },
    { name: '8. System Users', component: SystemUsersMockup, description: 'Linux user management style' },
  ];

  const ActiveComponent = mockups[activeTab].component;

  return (
    <div className="min-h-screen bg-black p-6 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-green-400 text-2xl font-bold mb-2">FAMILY_CARD_MOCKUPS.exe</h1>
        <p className="text-green-600 mb-6">{'>'} Select a style to preview...</p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {mockups.map((mockup, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`
                px-3 py-2 rounded border text-sm transition-all
                ${activeTab === i
                  ? 'border-green-400 bg-green-500/20 text-green-400'
                  : 'border-green-500/30 text-green-600 hover:border-green-500/50'
                }
              `}
            >
              {mockup.name}
            </button>
          ))}
        </div>

        {/* Description */}
        <div className="mb-4 p-3 border border-green-500/30 rounded bg-green-500/5">
          <span className="text-green-600">{'>'} </span>
          <span className="text-green-400">{mockups[activeTab].description}</span>
        </div>

        {/* Active Mockup */}
        <div className="mb-8">
          <ActiveComponent />
        </div>

        {/* Navigation hint */}
        <div className="text-green-700 text-sm text-center">
          [Click tabs above to switch between mockups]
        </div>
      </div>
    </div>
  );
}
