import { useState } from "react";
import siswa from "./data/siswa.js";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import StudentCount from "./components/StudentCount";
import CardGrid from "./components/CardGrid";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKelas, setSelectedKelas] = useState("");

  const filteredSiswa = siswa.filter((siswa) => {
    const matchNama = siswa.nama
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchKelas = selectedKelas === "" || siswa.kelas === selectedKelas;
    return matchNama && matchKelas;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Buku Tahunan Siswa</h1>
        <h2 className="app-subtitle">XII Angkatan 2025/2026</h2>
      </header>

      <div className="controls">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <FilterDropdown
          selectedKelas={selectedKelas}
          onKelasChange={setSelectedKelas}
        />
      </div>

      <StudentCount count={filteredSiswa.length} />
      <CardGrid
        siswaList={filteredSiswa}
        emptyMessage="Tidak ada siswa yang cocok."
      />
    </div>
  );
}

export default App;
