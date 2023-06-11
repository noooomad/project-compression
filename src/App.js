import React, { useState } from 'react';

import HuffmanCompression from './Algorithms/HuffmanComression';
import LZWCompression from './Algorithms/LZWCompression';
import RLECompression from './Algorithms/RLECompression';


const AlgorithmsApp = () => {
  const [currentPage, setCurrentPage] = useState("page1")
  return (
    <body>
      <div className="selection">
        <button className="page-button" onClick={() => setCurrentPage("page1")}>Huffman</button>
        <button className="page-button" onClick={() => setCurrentPage("page2")}>LZW</button>
        <button className="page-button" onClick={() => setCurrentPage("page3")}>RLE</button>
      </div>
      <hr></hr>
      {currentPage === "page1" && <HuffmanCompression />}
      {currentPage === "page2" && <LZWCompression />}
      {currentPage === "page3" && <RLECompression />}
    </body>
  );
}

export default AlgorithmsApp;