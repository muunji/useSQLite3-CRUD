function readDB() {
  fetch('http://localhost:8010/read')
    .then(res => res.json())
    .then(data => {
      data.forEach(i => console.log(i))
    })
    .catch(err => console.error('readDB에서 데이터 불러오기 실패',err))
}

function makeList(data) {
  const ul = document.getElementsByTagName('ul')[0]
  ul.innerHTML=''

  //목록으로 들어갈 li 태그
  const li = document.createElement('li')
  li.textContent = `날짜 : ${data.date} 시간 : ${data.time} 물품: ${data.item}`
  li.dataset.id = data.id
  ul.appendChild(li)

  //수정 버튼
  const updateBtn = makeBtn('수정',updateDB(data),li)
  //삭제 버튼
  const deleteBtn = makeBtn('삭제', deleteDB(data), li)
}

function makeBtn(text,callback,liTag) {
  const btn = document.createElement('button')
  btn.textContent = text
  btn.addEventListener('click', callback)
  liTag.appendChild(btn)

  return btn
}

function updateDB(data) { }
function deleteDB(data) { }

readDB()