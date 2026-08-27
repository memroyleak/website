document.addEventListener("DOMContentLoaded", () => {
  fetch("blog/blog_entries.json")
    .then(response => {
      if (!response.ok) throw new Error('sorry could not grab posts')
      return response.json()
    })
    
    .then(posts => {
      const container = document.getElementById('post-list')
      container.innerHTML = ""
      
      for (let post of posts) {
        const link = document.createElement('a')
        link.href = `blog/${post.file}`
        link.textContent = `${post.title} (${post.date})`
        link.style.fontWeight = 'Bold'
        link.style.fontSize = '24px'
        
        const description = document.createElement('p')
        description.textContent = `${post.desc}`
        
        container.appendChild(link)
        container.appendChild(description)
        container.appendChild(document.createElement('br'))
      }
    })
    
    .catch(error => {
      document.getElementById('post-list').textContent = 'failed to load posts'
      console.error(error)
    })
}) 