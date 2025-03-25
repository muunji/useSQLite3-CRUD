//express 가져오기
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
//express 파싱을 위한 미들웨어
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//데이터베이스 연결
import { makeDB } from './database.js'
makeDB()

//get /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'))
})

//post : form태그로 데이터 받음
//데이터베이스에 저장
//html 목록에 출력
app.post('/add', (req, res) => {
  //body = {time: '2025-03-27T15:26',item:'이름'}
  //{date:'2025-03-27',time:'15:26',item:'이름'} 이렇게 만들고 싶음
  let body = {
    date: req.body.time.split('T')[0],
    time: req.body.time.splite('T')[1],
    itme : req.body.item
  }
  
  //폼을 제출하면 POST 요청 처리
  //req.body : 폼 데이터 ---fetch---> /create로 전달
  //fetch로 받은 응답 성공시 '/' redirect
  
})

//수정
//특정 데이터베이스 조회
//html목록에 수정됨

//삭제
//특정 데이터베이스 삭제
//html목록에서 수정됨

//서버 실행
app.listen(3030, () => {
  console.log('서버실행 : http://localhost:3030')
})