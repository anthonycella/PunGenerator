import react from 'react';

const SearchBar = ({ setTopic, topic, partOfSpeech, setPartOfSpeech }) => {

  return (
    <form>
      <label>
        Search a Topic & Discover Puns
      </label>
      <input type="text" value={topic} />
      <select value={partOfSpeech} onChange={setPartOfSpeech}>
        <option value="noun">noun</option>
        <option value="adjective">adjective</option>
        <option value="verb">verb</option>
        <option value="adverb">adverb</option>
      </select>
      <input type="submit" value="Search" />
    </form>
  )
}

export default SearchBar;
