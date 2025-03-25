import sqlite3 from 'sqlite3'

//데이터베이스 생성 함수
export function makeDB() {
  //데이터베이스 연결
  const db = new sqlite3.Database('data.db', (err) => {
    if (err) {
      console.log('DB 연결 실패',err)
    } else {
      db.run(`
        CREATE TABLE IF NOT EXISTS timeTable (
          id INTERGER PRIMARY KEY AUTOINCREMENT,
          time TEXT NOT NULL,
          item TEXT NOT NULL
        )
        `)
    }
  })
  
  //테이블 생성
  
}
