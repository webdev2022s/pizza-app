export async function getPositionAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );

  if (!res.ok) throw new Error("Fetching Location Failed!");

  const data = await res.json();

  return data;
}
