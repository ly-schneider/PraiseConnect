export default function CalcCreationDate(date: Date | undefined): string {
  // Return date from UTC to locale in format "vor x Minuten/Stunden/Tagen"
  if (!date) return "";

  const diff = Date.now() - new Date(date).getTime(); // Convert date to timestamp
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `vor ${days} Tag${days > 1 ? "en" : ""}`;
  }
  if (hours > 0) {
    return `vor ${hours} Stunde${hours > 1 ? "n" : ""}`;
  }
  if (minutes > 0) {
    return `vor ${minutes} Minute${minutes > 1 ? "n" : ""}`;
  }
  return `vor ${seconds} Sekunde${seconds > 1 ? "n" : ""}`;
}