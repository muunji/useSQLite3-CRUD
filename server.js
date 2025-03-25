//데이터베이스 서버
import express from 'express'
import sqlite3 from 'sqlite3'

//express 가져옴
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//데이터베이스 연결
const db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    console.log('DB서버에서 DB 연결 실패',err)
  } else {
    console.log('DB서버에서 DB 연결 성공')
  }
})

//post 데이터 추가

//서버 실행
app.listen(8010, () => {
  console.log('DB 서버 실행 : http://localhost:8010')
})