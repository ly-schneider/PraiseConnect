export default function Now() {
  const localDate = new Date();
  const nowUtc = localDate.toISOString();
  return new Date(nowUtc);
}
