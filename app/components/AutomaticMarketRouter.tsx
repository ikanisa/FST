const automaticMarketScript = `(() => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const languages = Array.from(new Set([...(navigator.languages || []), navigator.language || ""]))
      .filter(Boolean)
      .map((value) => String(value).toLowerCase());
    const isRwanda = timezone === "Africa/Kigali" || languages.some((value) => value === "rw" || value.startsWith("rw-") || value === "en-rw");
    const isMalta = timezone === "Europe/Malta" || languages.some((value) => value === "mt" || value.startsWith("mt-") || value === "en-mt");
    window.location.replace(isRwanda ? "/rw" : isMalta ? "/mt" : "/mt");
  } catch {
    window.location.replace("/mt");
  }
})();`;

export function AutomaticMarketRouter() {
  return <script dangerouslySetInnerHTML={{ __html: automaticMarketScript }} />;
}
