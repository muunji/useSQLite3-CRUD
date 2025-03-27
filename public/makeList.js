function readDB() {
  fetch('http://localhost:8010/read')
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementsByTagName('ul')[0]
      ul.innerHTML=''
      data.forEach(i => {
        
        makeList(i,ul)
      })
    })
    .catch(err => console.error('readDB에서 데이터 불러오기 실패',err))
}

function makeList(data,ul) {

  //목록으로 들어갈 li 태그
  const li = document.createElement('li')
  li.textContent = `날짜 : ${data.date} 시간 : ${data.time} 물품: ${data.item}`
  li.dataset.id = data.id
  ul.appendChild(li)

  //수정 버튼
  makeBtn('수정',updateDB,li)
  //삭제 버튼
  makeBtn('삭제', deleteDB, li)
}

function makeBtn(text,callback,liTag) {
  const btn = document.createElement('button')
  btn.textContent = text
  btn.addEventListener('click',(e)=> callback(e))
  liTag.appendChild(btn)

  return btn
}

//수정 버튼 실행 함수
function updateDB(data) { 
  //id값을 가져와서 데이터베이스 삭제
  //btn.addEventListener(e=>updateDB(e))
  
}

//삭제 버튼 실행 함수
function deleteDB(event) { 
  //id값을 가져와야함 -> fetch에 적용시켜야함
  //btn.addEventListener(e=>deleteDB(e))
  const button = event.target;
  const id = button.parentElement.dataset.id
  console.log('id:',id)

  fetch(`http://localhost:8010/delete/${id}`, {
    method:'DELETE'
  })
    .then(res => res.text())
    .then(()=> readDB())
    .catch(err=> console.error('DB 데이터 삭제 실패',err))

}

readDB()
