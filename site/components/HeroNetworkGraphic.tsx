export function HeroNetworkGraphic() {
  return (
    <svg viewBox="0 0 400 180" width="100%" height="180" role="img" aria-label="Knowledge network">
      <defs>
        <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      {[ [40,130,130,60], [130,60,210,100], [210,100,300,45], [130,60,300,145], [40,130,210,100] ].map((line, i) => (
        <line key={i} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} stroke="url(#lineGradient)" strokeWidth="2" opacity="0.8" />
      ))}
      {[ [40,130], [130,60], [210,100], [300,45], [300,145] ].map((node, i) => (
        <circle key={i} cx={node[0]} cy={node[1]} r="6" fill="#c4b5fd" />
      ))}
    </svg>
  );
}
