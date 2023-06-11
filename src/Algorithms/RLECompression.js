import React, { useState } from 'react';
import '../App.css';

const RLECompression = () => {
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
      let count = 1;
      for (let i = 0; i < inputText.length; i++) {
        if (inputText[i] === inputText[i+1]) {
          count++;
        } else {
          compressedText += count + inputText[i];
          count = 1;
        }
      }
      compressedText += dictionary[currentString];
      setDictionary(dictionary);
      setOutputText(compressedText);
    }
  
    return (
      <div className="container">
        <h1>RLE Compression</h1>
        <textarea className="textArea" value={inputText} onChange={e => setInputText(e.target.value)} />
        <button className="button" onClick={compress}>Compress</button>
        <textarea className="textArea" value={outputText} readOnly />
        <textarea className="textArea" value={JSON.stringify(dictionary)} readOnly />
      </div>
    );
  };
  
  export default RLECompression;