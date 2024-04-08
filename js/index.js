// JavaScript code

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const searchTerm = document.getElementById('search').value.trim();
      if (searchTerm !== '') {searchUsers(searchTerm);}
    });
  
    function searchUsers(searchTerm) {
      const endpoint = `https://api.github.com/search/users?q=${searchTerm}`;
      fetch(endpoint)
        .then(response => {
          if (!response.ok) {throw new Error('Network response was not ok');}
          return response.json();
        })
        .then(data => {displayUsers(data.items);})
        .catch(error => {console.error('Error fetching data:', error);});
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        const username = document.createElement('span');
        const avatar = document.createElement('img');
        const profileLink = document.createElement('a');
  
        username.textContent = user.login;
        avatar.src = user.avatar_url;
        avatar.alt = 'Avatar';
        profileLink.textContent = 'Profile Link';
        profileLink.href = user.html_url;
        profileLink.target = '_blank';
  
        li.appendChild(username);
        li.appendChild(avatar);
        li.appendChild(profileLink);
  
        li.addEventListener('click', function() {getUserRepos(user.login);});
  
        userList.appendChild(li);
      });
    }
  
    function getUserRepos(username) {
      const endpoint = `https://api.github.com/users/${username}/repos`;
      fetch(endpoint)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {displayRepos(data);})
        .catch(error => {console.error('Error fetching data:', error);});
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const li = document.createElement('li');
        const repoLink = document.createElement('a');
  
        repoLink.textContent = repo.full_name;
        repoLink.href = repo.html_url;
        repoLink.target = '_blank';
  
        li.appendChild(repoLink);
        reposList.appendChild(li);
      });
    }
  });