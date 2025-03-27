//데이터베이스 서버
import express from 'express'
import sqlite3 from 'sqlite3'
import cors from 'cors'; // CORS 미들웨어 가져오기

//express 가져옴
const app = express()

// CORS 설정 추가
app.use(cors()); // 모든 도메인에서의 요청 허용

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//데이터베이스 연결
const db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    console.log('DB서버 - DB 연결 실패',err)
  } else {
    console.log('DB서버 - DB 연결 성공')
  }
})

//post 데이터 추가, url : /create
app.post('/create', (req, res) => {
  //클라이언트에서 보낸 데이터를 DB에 저장하는 엔드포인트
  const {date, time, item} = req.body;
  
  //데이터 추가
  db.run(`INSERT INTO timeTable (date,time,item) VALUES (?,?,?)`, [date, time, item], function (err) {
    if (err) {
      console.error('DB서버 - DB 저장 실패 : ', err)
      res.status(500).send('DB서버 - DB 저장 실패')
      return
    }
    console.log('DB서버 - DB 저장 성공',this.lastID)
  })
})

//get 데이터 조회, url: /read
app.get('/read', (req, res) => {
  db.all(`SELECT * FROM timeTable`, (err, rows) => {
    if (err) {
      return res.status(500).send('데이터 조회 실패')
    }
    console.log('데이터 조회 성공', rows)
    // 클라이언트로 JSON 형태로 응답
    res.json(rows)
  })
})

//get 특정 데이터 조회, url : /read/:id
app.get('/read/:id', (req, res) => {
  
})

//put 데이터 수정, url : /update/:id
app.put('/update/:id', (req, res) => {
  const origin = {
    id : req.params.id
  }
  const newest = {
    date:req.body.date,
    text:req.body.date,
    item: req.body.item
  }

  db.run(`UPDATE FROM timeTable SET date = ? , text = ? , item = ? WHERE id = ?`,[newest.date,newest.text,newest.item,origin.id],)
})

//delete 데이터 삭제, url: /delete/:id
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id

  //데이터 삭제 실행
  db.run('DELETE FROM timeTable WHERE id = ? ', [id], (err) => {
    if (err) {
      return res.status(500).send('DB 삭제 실패')
    }
    res.send('DB 삭제 성공')
  })
})

//서버 실행
app.listen(8010, () => {
  console.log('DB 서버 실행 : http://localhost:8010')
})