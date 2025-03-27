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
function updateDB(event) { 
  //id값을 가져와서 데이터베이스 삭제
  //btn.addEventListener(e=>updateDB(e))

  //e.target이 포함된 요소의 id값 = 기존값 찾기
  const id = getID(event)

  //새로운 데이터를 입력할 창을 보여줘야함
}

//삭제 버튼 실행 함수
function deleteDB(event) { 
  //id값을 가져와야함 -> fetch에 적용시켜야함
  //btn.addEventListener(e=>deleteDB(e))
  const id = getID(event)
  console.log('id:',id)

  fetch(`http://localhost:8010/delete/${id}`, {
    method:'DELETE'
  })
    .then(res => res.text())
    .then(()=> readDB())
    .catch(err=> console.error('DB 데이터 삭제 실패',err))

}

//버튼이 포함된 <li></li>태그에서 data-id 값 가져오기
function getID(event) {
  return event.target.parentElement.dataset.id
}

//수정 창에 기존 데이터 넣어주는 함수
function putOriginToForm(event) {
  //input창 가져오기

  //수정해줄 내용이 있는 li 태그 가져오기

  //input value에 기본 내용 넣어주기
}

//div#edit창을 보여주는 함수
function displayEditForm() {
  //div edit display로 보여주기
}

readDB()
