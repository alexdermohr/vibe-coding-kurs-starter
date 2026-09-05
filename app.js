export const activities = [
  "⚽ Fußball",
  "🏓 Tischtennis",
  "🚶 Eine Runde gehen",
  "💬 Quatschen",
  "🎨 Etwas zeichnen"
];

export function pickRandom(items, random = Math.random) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return items[Math.floor(random() * items.length)];
}

const button = typeof document !== "undefined" ? document.querySelector("#pick") : null;
const result = typeof document !== "undefined" ? document.querySelector("#result") : null;
if (button && result) {
  button.addEventListener("click", () => {
    result.textContent = pickRandom(activities);
  });
}
