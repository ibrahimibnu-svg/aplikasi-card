function FilterDropdown({ selectedKelas, onKelasChange }) {
  return (
    <select
      className="filter-select"
      value={selectedKelas}
      onChange={(e) => onKelasChange(e.target.value)}
    >
      <option value="">Semua Kelas</option>
      <option value="XII-A">XII-A</option>
      <option value="XII-B">XII-B</option>
      <option value="XII-C">XII-C</option>
    </select>
  );
}

export default FilterDropdown;
