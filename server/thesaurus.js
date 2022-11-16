const axios = require('axios');


function getPunnableWords(word, partOfSpeechOfOriginal) {
  axios(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.THESAURUS_API_KEY}`)
    .then((response) => {
      const punnableWords = [];
      const promises = [];

      for (const result of response) {
        const information = result['meta'];
        const partOfSpeechOfResult = information['fl'];

        if (partOfSpeechOfResult !== partOfSpeechOfOriginal) continue;

        const word = trimWordIfNeeded(information['id']);
        const possiblePuns = information['syns'];

        for (const pun of possiblePuns) {
          const partsOfSpeechOfPun = getPartsOfSpeech(pun);
          promises.push(partsOfSpeechOfPun);
        }

        Promise.all(promises).then((results) => {
          for (let currentIndex = 0; currentIndex < results.length; currentIndex++) {
            const currentResult = results[currentIndex];

            if (currentResult.length > 1) {
              punnableWords.push(possiblePuns[currentIndex]);
            } else if (currentResult[0] !== partOfSpeechOfOriginal) {
              punnableWords.push(possiblePuns[currentIndex]);
            }
          }

          return punnableWords;
        });
      }

    });
}

function getPartsOfSpeech(word) {
  const partsOfSpeech = [];
  axios(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.DICTIONARY_API_KEY}`)
    .then((response) => {
      for (const result of response) {
        const information = result['meta'];
        const partOfSpeech = information['fl'];

        partsOfSpeech.push(partOfSpeech);
      }

      return partsOfSpeech;
    });
}

function isPunnableWord(word, partOfSpeechOfOriginal) {
  axios(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.DICTIONARY_API_KEY}`)
    .then((response) => {
      for (const result of response) {
        const information = result['meta'];
        const partOfSpeechOfWord = information['fl'];

        if (partOfSpeechOfWord !== partOfSpeechOfOriginal) {
          return true;
        }
      }

      return false;
    });
}

function trimWordIfNeeded(word) {
  for (let currentIndex = 0; currentIndex < word.length; currentIndex++) {
    if (word[currentIndex] === ':') {
      return word.slice(0, currentIndex);
    }
  }

  return word;
}



module.exports {
  getPunnableWords,
  getPartsOfSpeech,
}
