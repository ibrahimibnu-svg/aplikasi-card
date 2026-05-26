import "./StudentCard.css";

/* Komponen StudentCard menerima satu object siswa via props dan menampilkannya dalam bentuk Card */
function StudentCard({ siswa }) {
  const inisial = siswa.nama
    .split(" ")
    .map((kata) => kata[0])
    .join("")
    .toUpperCase();

  return (
    <div className="student-card">
      <div className="card-avatar">{inisial}</div>
      <h3 className="card-nama">{siswa.nama}</h3>
      <p className="card-kelas">{siswa.kelas}</p>
      <span className={`card-jurusan badge-${siswa.jurusan.toLowerCase()}`}>
        {siswa.jurusan}
      </span>
      <p className="card-hobi">Hobi: {siswa.hobi}</p>
      <p className="card-motto">&ldquo;{siswa.motto}&rdquo;</p>
    </div>
  );
}

export default StudentCard;
