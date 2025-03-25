import sqlite3 from 'sqlite3'

//데이터베이스 생성 함수
export function makeDB() {
  //데이터베이스 연결
  const db = new sqlite3.Database('data.db', (err) => {
    if (err) {
      console.log('DB 연결 실패',err)
    } else {
      //테이블 생성
      db.run(`
        CREATE TABLE IF NOT EXISTS timeTable (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT NOT NULL,
          time TEXT NOT NULL,
          item TEXT NOT NULL
        )
        `, (err) => {
        if (err) {
          console.log('DB timeTable 생성 실패',err)
        } else {
          console.log('DB timeTable 생성 성공')
        }
        })
    }
  })
  //닫아줌
  db.close()
  
}
