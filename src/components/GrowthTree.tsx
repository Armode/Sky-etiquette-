import { motion } from 'motion/react';
import { useMemo } from 'react';

interface GrowthTreeProps {
  reflectionCounter: number;
  memoryCount: number;
  currentLight: string | null;
}

const LIGHT_COLORS: Record<string, string> = {
  'Hope': '#FCD34D',      // Amber 300
  'Wisdom': '#86EFAC',    // Green 300
  'Discovery': '#93C5FD', // Blue 300
  'Kindness': '#FDE047',  // Yellow 300
  'Courage': '#FCA5A5',   // Red 300
  'Freedom': '#7DD3FC',   // Sky 300
  'Grief': '#94A3B8',     // Slate 400
  'Longing': '#C4B5FD',   // Violet 300
  'Anger': '#F87171',     // Red 400
  'Pain': '#475569',      // Slate 600
  'Defiance': '#FDBA74',  // Orange 300
};

export function GrowthTree({ reflectionCounter, memoryCount, currentLight }: GrowthTreeProps) {
  // Determine color based on current light
  const lightName = currentLight ? currentLight.split(' ')[0] : 'Hope';
  const leafColor = LIGHT_COLORS[lightName] || '#FCD34D';

  // Calculate tree growth parameters
  // Tree grows with reflectionCounter (age) and memoryCount (complexity)
  const maxDepth = Math.min(Math.floor(memoryCount / 2) + 2, 7); // Start at depth 2, max 7
  const scale = Math.min(0.5 + (reflectionCounter * 0.01), 1.2); // Grow larger over time

  // Recursive function to generate branches
  const generateBranches = (depth: number, angle: number, length: number, x: number, y: number): JSX.Element[] => {
    if (depth === 0) return [];

    const endX = x + length * Math.sin(angle * (Math.PI / 180));
    const endY = y - length * Math.cos(angle * (Math.PI / 180));

    const branches = [
      <motion.line
        key={`branch-${depth}-${x}-${y}`}
        x1={x}
        y1={y}
        x2={endX}
        y2={endY}
        stroke="#A8A29E" // Stone 400
        strokeWidth={depth * 1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: (maxDepth - depth) * 0.2 }}
      />
    ];

    // Add leaves at the end of terminal branches
    if (depth === 1) {
      branches.push(
        <motion.circle
          key={`leaf-${x}-${y}`}
          cx={endX}
          cy={endY}
          r={4}
          fill={leafColor}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 0.5, delay: maxDepth * 0.2 + 0.5 }}
        />
      );
      // Add a glow effect
      branches.push(
        <motion.circle
          key={`glow-${x}-${y}`}
          cx={endX}
          cy={endY}
          r={8}
          fill={leafColor}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      );
    }

    // Recursive calls for left and right branches
    // Randomize angle slightly based on depth to make it look organic
    const spread = 25 + (depth * 2); 
    const shrink = 0.75;

    branches.push(...generateBranches(depth - 1, angle - spread, length * shrink, endX, endY));
    branches.push(...generateBranches(depth - 1, angle + spread, length * shrink, endX, endY));

    return branches;
  };

  const treeStructure = useMemo(() => {
    return generateBranches(maxDepth, 0, 60, 200, 350);
  }, [maxDepth, leafColor]);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      <motion.svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ scale }}
      >
        {/* Ground */}
        <motion.path
          d="M 50 380 Q 200 360 350 380"
          stroke="#57534E"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Tree */}
        {treeStructure}
      </motion.svg>
      
      {/* Label */}
      <div className="absolute bottom-4 text-center">
        <div className="text-xs text-white/30 uppercase tracking-widest mb-1">Growth Stage</div>
        <div className="text-sm font-serif text-white/60 italic">
          Level {maxDepth - 1} • {memoryCount} Memories
        </div>
      </div>
    </div>
  );
}
