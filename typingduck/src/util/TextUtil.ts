import wordsLists from "../words.json";

const sampleQuote =
  "Out of the night that covers me, Black as the Pit from pole to pole, I thank whatever gods may be, For my unconquerable soul. In the fell clutch of circumstance I have not winced nor cried aloud. Under the bludgeonings of chance My head is bloody, but unbowed. Beyond this place of wrath and tears Looms but the Horror of the shade, And yet the menace of the years Finds, and shall find, me unafraid. It matters not how strait the gate, How charged with punishments the scroll, I am the master of my fate: I am the captain of my soul.";

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
