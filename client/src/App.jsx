import { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import loading from "./assets/loading.svg";
import moment from "moment";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import TV from "./pages/TV";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/tv" element={<TV />} />
      </Routes>
    </div>
  );
}

export default App;
