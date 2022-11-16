import React from 'react';
import PunListEntry from './PunListEntry.jsx';

const PunList = ({ punList, partOfSpeech }) => {
  <ul>
    {console.log(punList, partOfSpeech)}
    {punList.forEach(word => <PunListEntry word={word} />)}
  </ul>
}

export default PunList;