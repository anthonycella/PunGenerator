import react from 'react'
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import PunList from './PunList.jsx';
import SearchBar from './SearchBar.jsx';
import axios from "axios";

const dummieList = {
  "noun": ["branch", "wood", "stump", "flower"],
  "adjective": [""],
  "verb": ["stab", "examples", "are", "hard" ],
  "adverb": [""]
}

const App = () => {
  const [topic, setTopic] = useState('');
  const [partOfSpeech, SetPartOfSpeech] = useState('')
  const [punList, setPunList] = useState([{}])

  return (
    <>
      <SearchBar
        partOfSpeech={partOfSpeech} setPartOfSpeech={SetPartOfSpeech}
        setTopic={setTopic} topic={topic}
        setPunList={setPunList}
      />
      <PunList punList={punList} />
    </>
  )
}

export default App;