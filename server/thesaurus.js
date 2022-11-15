const axios = require('axios');


function getPunnableWords(word) {
  getPartsOfSpeech(word)
    .then((partsOfSpeech) => {
      const punnableWords = {};

      for (const partOfSpeech of partsOfSpeech) {
        punnableWords[partOfSpeech] = [];
      }

      axios(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.THESAURUS_API_KEY}`)
        .then((response) => {

          for (const result of response) {
            const punnableWordResponses = [];
            const information = result['meta'];
            const word = trimWordIfNeeded(information['id']);
            const partOfSpeech = information['fl'];
            const possiblePuns = information['syns'];

            for (const pun of possiblePuns) {
              for (const part of partsOfSpeech) {
                if (part !== partOfSpeech) {
                  punnableWords[part].push(pun);
                }
              }
            }
          }
        });
    })
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
}
