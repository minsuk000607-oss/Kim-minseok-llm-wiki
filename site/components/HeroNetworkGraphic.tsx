export function HeroNetworkGraphic() {
  return (
    <div className="hero">
      <h1>Second Brain Wiki</h1>
      <p>Obsidian knowledge network rendered as a clinical-research dashboard.</p>
      <svg viewBox="0 0 600 180" aria-hidden>
        <circle cx="100" cy="90" r="8" /><circle cx="210" cy="40" r="6" /><circle cx="280" cy="120" r="7" />
        <circle cx="390" cy="70" r="8" /><circle cx="500" cy="110" r="6" />
        <line x1="100" y1="90" x2="210" y2="40"/><line x1="210" y1="40" x2="280" y2="120"/>
        <line x1="280" y1="120" x2="390" y2="70"/><line x1="390" y1="70" x2="500" y2="110"/>
      </svg>
    </div>
  );
}
