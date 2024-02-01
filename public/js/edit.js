// Get the form element
const updateBlog = document.getElementById('updateBlog')

// Add an event listener to the form submit event
updateBlog.addEventListener('submit', (event) => {
  event.preventDefault()

  // Get the title and content input
  const {
    title: titleInput,
    content: contentInput
  } = event.target.elements

  const updatedBlog = {
    title: titleInput.value,
    content: contentInput.value
  }
 
  // Get the blog id from the form dataset
  const blogid = event.target.dataset.blogid

  // Send a PUT request to the server
  if (event.submitter.innerHTML === 'Update Post') {
    fetch(`/api/blogs/${blogid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBlog)
    })
    .then(response => {
      if (response.status === 200) {
        window.location.href = '/dashboard'
      }
    })
    .catch(err => console.log(err))
  } else if (event.submitter.innerHTML === 'Delete') {
    fetch(`/api/blogs/${blogid}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        window.location.href = '/dashboard'
      }
    })
    .catch(err => console.log(err))
  }
})