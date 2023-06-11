import React, { useState } from 'react';
import '../App.css';
const Heap = require('heap');

const HuffmanCompression = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [codes, setCodes] = useState({});
  
  const compress = () => {
    // Create a frequency table of the characters in the input text
    let freqTable = {};
    for (let i = 0; i < inputText.length; i++) {
      let char = inputText[i];
      if (!freqTable[char]) {
        freqTable[char] = 0;
      }
      freqTable[char]++;
    }

    // Create a priority queue to store the tree nodes
    let pq = new Heap((a, b) => a.freq - b.freq);
    for (let char in freqTable) {
      pq.push({ char, freq: freqTable[char] });
    }

    // Build the Huffman tree
    while (pq.size() > 1) {
      let left = pq.pop();
      let right = pq.pop();
      pq.push({
        char: null,
        freq: left.freq + right.freq,
        left,
        right
      });
    }

    // Traverse the tree and build the Huffman code
    let codes = {};
    function traverse(node, code) {
      if (!node) {
        return;
      }
      if (node.char) {
        codes[node.char] = code;
      }
      traverse(node.left, code + '0');
      traverse(node.right, code + '1');
    }
    traverse(pq.pop(), '');
    setCodes(codes);
    // Compress the text using the Huffman code
    let compressedText = '';
    for (let i = 0; i < inputText.length; i++) {
      compressedText += codes[inputText[i]];
    }
    setOutputText(compressedText);

  };
  return (
      <div className="container">
        <h1>Huffman Compression</h1>
        <textarea className="textArea" value={inputText} onChange={e => setInputText(e.target.value)} />
        <button className="button" onClick={compress}>Compress</button>
        <textarea className="textArea" value={outputText} readOnly />
        <textarea className="textArea" value={JSON.stringify(codes)} readOnly />
      </div>
  );
};

export default HuffmanCompression;