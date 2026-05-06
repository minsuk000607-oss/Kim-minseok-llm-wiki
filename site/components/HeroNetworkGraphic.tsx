export function HeroNetworkGraphic() {
  const nodes = [[40,120],[130,50],[220,90],[300,40],[360,100],[280,150],[170,140],[90,95]];
  const edges = [[0,1],[1,2],[2,3],[3,4],[2,4],[2,5],[5,6],[6,0],[7,1],[7,6],[7,2],[1,6]];
  return <svg viewBox="0 0 400 190" width="100%" height="190"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7aa2ff"/><stop offset="100%" stopColor="#a78bfa"/></linearGradient></defs>{edges.map(([a,b],i)=><line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="url(#lg)" opacity=".7" />)}{nodes.map((n,i)=><circle key={i} cx={n[0]} cy={n[1]} r="5" fill="#d5deff" />)}</svg>
}
