import wordsLists from "../words.json";

export function splitWords(inputString: string): string {
  if (inputString.length > 1) {
    let result = "";
    inputString.split("").forEach((char, index) => {
      if (
        index > 0 &&
        char === char.toUpperCase() &&
        inputString.charAt(index - 1) !== " " &&
        inputString.charAt(index - 1) !== "_"
      ) {
        result += " ";
      }
      result += char;
    });
    return result;
  }
  return inputString;
}

export function getNumWords(renderedText: string): number {
  return renderedText.split(" ").length;
}

const words: string[] = wordsLists.map(
  (item: { id: string; word: string }) => item.word
);

export function generateRandomText(textLength: number): string {
  const getRandomWord = (): string => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  const uniqueWords = new Set<string>();

  let randomText = "";
  while (uniqueWords.size < textLength) {
    const randomWord = getRandomWord();
    if (!uniqueWords.has(randomWord)) {
      uniqueWords.add(randomWord);
      randomText += randomWord + " ";
    }
  }

  return randomText.trim();
}
