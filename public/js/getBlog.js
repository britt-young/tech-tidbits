// Upon button click, user will be taken to the createblog page
const getPost = document.getElementById('getPost')

getPost.addEventListener('click', (event) => {
  window.location.href = '/createblog'
})