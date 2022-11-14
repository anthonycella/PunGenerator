const axios = require('axios');


function getPunnableWords(word) {
  axios(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.THESAURUS_API_KEY}`)
    .then((response) => {
      const punnableWords = {};

      for (const result of response) {
        const punnableWordResponses = [];
        const information = result['meta'];
        const partOfSpeech = information['fl'];


      }
    })
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


module.exports {
  getPunnableWords,
}
