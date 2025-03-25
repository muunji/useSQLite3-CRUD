//데이터베이스 서버
import express from 'express'
import sqlite3 from 'sqlite3'

//express 가져옴
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//데이터베이스 연결

//post 데이터 추가

//서버 실행