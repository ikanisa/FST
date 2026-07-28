export default function Loading() {
  return (
    <main id="main-content" className="loading-shell" aria-busy="true" aria-live="polite">
      <p className="eyebrow">FST</p>
      <p className="loading-title">Opening the working file.</p>
      <div className="loading-progress" aria-hidden="true"><span /></div>
      <p>Bringing the requested page into view…</p>
    </main>
  );
}
