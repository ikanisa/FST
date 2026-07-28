export default function Loading() {
  return (
    <main id="main-content" className="loading-shell" aria-busy="true" aria-live="polite">
      <p className="eyebrow">FST</p>
      <h1>Preparing a clearer view.</h1>
      <div className="loading-progress" aria-hidden="true"><span /></div>
      <p>Loading the next page…</p>
    </main>
  );
}
