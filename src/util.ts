export async function wordExists(word: string): Promise<boolean> {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  if (response.status === 404) return false;
  return true;
}
