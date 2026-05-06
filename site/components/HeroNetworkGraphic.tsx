export function HeroNetworkGraphic() {
  const nodes = [[42,150],[128,74],[224,108],[328,56],[438,118],[338,188],[208,182],[98,122],[276,148],[370,146]];
  const edges = [[0,1],[1,2],[2,3],[3,4],[2,4],[2,5],[5,6],[6,0],[7,1],[7,6],[7,2],[1,6],[8,2],[8,4],[8,5],[9,4],[9,5],[9,8]];

  return (
    <svg viewBox="0 0 480 240" width="100%" height="220" className="hero-graph" aria-label="Research graph">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8ab4ff" />
          <stop offset="100%" stopColor="#9e8dff" />
        </linearGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="url(#lg)" opacity=".75" />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n[0]} cy={n[1]} r="5" fill="#d5deff" />
      ))}
    </svg>
  );
}
