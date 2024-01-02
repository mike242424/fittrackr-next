export const capitalizeWords = (input: string): string => {
  const words = input.split(' ');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.length > 0) {
      if (word.startsWith('(') && word.endsWith(')')) {
        words[i] =
          '(' +
          word
            .slice(1, -1)
            .toLowerCase()
            .replace(/^\w/, (c) => c.toUpperCase()) +
          ')';
      } else {
        words[i] = word[0].toUpperCase() + word.slice(1);
      }
    }
  }

  return words.join(' ');
};
