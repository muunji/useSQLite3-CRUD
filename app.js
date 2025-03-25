//express 가져오기
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(__filename)

const app = express()
//express 파싱을 위한 미들웨어
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//데이터베이스 연결

//post : form태그로 데이터 받음
//데이터베이스에 저장
//html 목록에 출력

//수정
//특정 데이터베이스 조회
//html목록에 수정됨

//삭제
//특정 데이터베이스 삭제
//html목록에서 수정됨

//서버 실행