export function BackgroundNetworkPattern() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        background:
          'radial-gradient(circle at 20% 20%, rgba(96,165,250,0.15), transparent 40%), radial-gradient(circle at 80% 10%, rgba(167,139,250,0.12), transparent 35%), #030712'
      }}
    />
  );
}
