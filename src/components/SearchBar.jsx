function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Cari nama siswa..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default SearchBar;
