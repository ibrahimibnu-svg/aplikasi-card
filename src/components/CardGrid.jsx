import StudentCard from "./StudentCard";

/* Komponen CardGrid menerima array siswa yang sudah difilter dan melakukan .map() untuk merender satu StudentCard per object */
function CardGrid({ siswaList, emptyMessage }) {
  if (siswaList.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className="card-grid">
      {siswaList.map((siswa) => (
        <StudentCard key={siswa.id} siswa={siswa} />
      ))}
    </div>
  );
}

export default CardGrid;
