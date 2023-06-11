import React, { useState } from 'react';
import '../App.css';

const LZWCompression = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [dictionary, setDictionary] = useState({});
    const compress = () => {
      // Create the initial dictionary
      let dictionary = {};
      for (let i = 0; i < 256; i++) {
        dictionary[String.fromCharCode(i)] = i;
      }
  
      let compressedText = '';
      let currentString = inputText[0];
      for (let i = 1; i < inputText.length; i++) {
        let nextChar = inputText[i];
        let nextString = currentString + nextChar;
        if (dictionary.hasOwnProperty(nextString)) {
          currentString = nextString;
        } else {
          compressedText += dictionary[currentString];
          dictionary[nextString] = Object.keys(dictionary).length;
          currentString = nextChar;
        }
      }
      // output the code of the last string
      compressedText += dictionary[currentString];
      setDictionary(dictionary);
      setOutputText(compressedText);
    };
    return (
        <div className="container">
        <h1>LZW Compression</h1>
          <textarea className="textArea" value={inputText} onChange={e => setInputText(e.target.value)} />
          <button className="button" onClick={compress}>Compress</button>
          <textarea className="textArea" value={outputText} readOnly />
          <textarea className="textArea" value={JSON.stringify(dictionary)} readOnly />
        </div>
    );
  };
  
export default LZWCompression;