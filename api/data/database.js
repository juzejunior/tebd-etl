import { pool } from "../../mariadb";

const getArtigo = async id => {
  try {
    const conn = await pool.getConnection();
    const artigo = await conn.query(
      `SELECT a.numero_inscricao as id, a.nome as nome, p.nome as autor, ava.nota as nota, ava.comentario as comentario, p.telefone as contato from artigo as a INNER JOIN inscricao as i on a.FKInscricao = i.numero INNER JOIN participante as p on i.idParticipante = p.idParticipante INNER JOIN  avaliacao as ava on ava.Pkavaliacao = a.FKAvaliacao WHERE a.numero_inscricao = ${id}`
    );
    conn.end();
    return artigo[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  getArtigo
};
