// Get the form element
const createBlog = document.getElementById('createBlog')

// Add an event listener to the form submit event
createBlog.addEventListener('submit', (event) => {
  event.preventDefault()

  // Get the title and content input
  const {
    title: titleInput,
    content: contentInput
  } = event.target.elements

  const blogData = {
    title: titleInput.value,
    content: contentInput.value
  }
  
  // Send a POST request to the server
  fetch('/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(blogData)
  })
  .then(response => {
    if (response.status === 200) {
      window.location.href = '/dashboard'
    }
  })
  .catch(err => console.log(err))
})