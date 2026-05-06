export function TagBadge({ tag }: { tag: string }) {
  return (
    <span style={{ display: 'inline-block', marginRight: 8, marginBottom: 8, fontSize: 12, padding: '4px 8px', borderRadius: 999, background: '#1e293b', color: '#bae6fd' }}>
      #{tag}
    </span>
  );
}
