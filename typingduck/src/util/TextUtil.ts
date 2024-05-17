import wordsLists from "../words.json";

export const getTwoThirdsPosition = (renderedText: string): number => {
  const stringLength = renderedText.length;
  const twoThirdsLength = Math.floor(stringLength * (2 / 3));
  return twoThirdsLength;
};

export const getOneThirdPosition = (renderedText: string): number => {
  const stringLength = renderedText.length;
  const oneThirdLength = Math.floor(stringLength * (1 / 3));
  return oneThirdLength;
};

export const getNextRow = (
  text: string,
  renderedText: string,
  oneThirdPosition: number
): string => {
  return (
    renderedText.slice(oneThirdPosition, renderedText.length) +
    text.slice(renderedText.length, renderedText.length + oneThirdPosition)
  );
};

export const getRenderedText = (
  text: string,
  numWordsToRender: number
): string => {
  const words = text.split(/\s+/);
  const first20Words = words.slice(0, numWordsToRender);
  return first20Words.join(" ");
};

const sampleQuote =
  "Out of the night that covers me, Black as the Pit from pole to pole, I thank whatever gods may be, For my unconquerable soul. In the fell clutch of circumstance I have not winced nor cried aloud. Under the bludgeonings of chance My head is bloody, but unbowed. Beyond this place of wrath and tears Looms but the Horror of the shade, And yet the menace of the years Finds, and shall find, me unafraid. It matters not how strait the gate, How charged with punishments the scroll, I am the master of my fate: I am the captain of my soul.";

const words: string[] = wordsLists.map(
  (item: { id: string; word: string }) => item.word
);

export const generateRandomText = (textLength: number): string => {
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
};
