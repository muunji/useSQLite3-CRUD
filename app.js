//express 가져오기
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'; // CORS 미들웨어 가져오기

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
//express 파싱을 위한 미들웨어
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// CORS 설정 추가
app.use(cors()); // 모든 도메인에서의 요청 허용

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, 'public'))); // 'public' 폴더를 정적 파일 경로로 설정



//데이터베이스 연결
import { makeDB } from './database.js'
makeDB()

//fetch 사용을 위한 모듈
import fetch from 'node-fetch'

//get /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'))
})

//post : form태그로 데이터 받음
//데이터베이스에 저장
//html 목록에 출력

//await을 사용을 위한 async작성
app.post('/add', async(req, res) => {
  //body = {time: '2025-03-27T15:26',item:'이름'}
  //{date:'2025-03-27',time:'15:26',item:'이름'} 이렇게 만들고 싶음
  let body = {
    date: req.body.time.split('T')[0],
    time: req.body.time.split('T')[1],
    item : req.body.item
  }

  console.log(body)
  
  //폼을 제출하면 POST 요청 처리
  //req.body : 폼 데이터 ---fetch---> /create로 전달
  //fetch로 받은 응답 성공시 '/' redirect
  try { 
    //await : fetch가 완료될 때까지 대기
    //데이터를 JSON으로 변환해서 url로 보냄
    const response = await fetch('http://localhost:8010/create', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({date : body.date, time:body.time, item : body.item})
    })

    //fetch 요청이 성공적이지 못할 때 실행
    if (!response.ok) {
      throw new Error('HTTP 에러',response.status)
    }

    //성공했을 시
    console.log('fetch - DB 저장 성공')
    //리다이렉트
    res.redirect('/')
  }
  catch (error) { 
    console.log('fetch - DB 과정에서 error 발생', error)
    res.status(500).send('DB 저장 실패')
  }
  
})

//수정
//특정 데이터베이스 조회
//html목록에 수정됨
app.post('/edit', async(req, res) => {
  let body = {
    date: req.body.time.split('T')[0],
    time: req.body.time.split('T')[1],
    item : req.body.item
  }

  try {
    const response = await fetch()
  }
  catch (err) {
    
  }
})

//삭제
//특정 데이터베이스 삭제
//html목록에서 수정됨

//서버 실행
app.listen(3030, () => {
  console.log('서버실행 : http://localhost:3030')
})