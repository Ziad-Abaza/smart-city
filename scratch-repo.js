class CacheManager {
  constructor() {
    this.userCache = new Map();
    this.repoCache = new Map();
    this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration
  }

  // Generate a cache key for user data
  _getUserCacheKey(username) {
    return `user_${username}`;
  }

  // Generate a cache key for repository data
  _getRepoCacheKey(username, page, keyword = '') {
    return `repos_${username}_${page}_${keyword}`;
  }

  // Check if cache entry is still valid
  _isCacheValid(timestamp) {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  // Get cached data if valid
  getFromCache(key) {
    const cache = key.startsWith('user_') ? this.userCache : this.repoCache;
    const cached = cache.get(key);
    
    if (cached && this._isCacheValid(cached.timestamp)) {
      return cached.data;
    }
    
    // Remove expired cache entry
    if (cached) {
      cache.delete(key);
    }
    
    return null;
  }

  // Store data in cache
  setInCache(key, data) {
    const cache = key.startsWith('user_') ? this.userCache : this.repoCache;
    cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Clear all caches
  clear() {
    this.userCache.clear();
    this.repoCache.clear();
  }

  // Clear cache for a specific user
  clearUserCache(username) {
    const userKey = this._getUserCacheKey(username);
    this.userCache.delete(userKey);
    
    // Clear all cached repos for this user
    for (const key of this.repoCache.keys()) {
      if (key.startsWith(`repos_${username}_`)) {
        this.repoCache.delete(key);
      }
    }
  }
}

// Initialize cache manager
const cacheManager = new CacheManager();

window.onload = () => {
  const eleInput = document.getElementById("username-input");
  const keywordInput = document.getElementById("keyword-input");
  const btnSearch = document.getElementById("search-button");
  const containerData = document.getElementById("repos-container");
  const resultInfo = document.getElementById("result-info");
  const userInfo = document.getElementById("user-info");

  resultInfo.style.display = "none";

  let previousSearches =
    JSON.parse(localStorage.getItem("previousSearches")) || [];
  let bookmarkedRepos = JSON.parse(localStorage.getItem("bookmarkedRepos")) || [];
  let currentPage = 1;
  let currentUser = "";
  let loading = false;
  let hasMore = true;
  let allRepos = [];

  // Search by keyword filter
keywordInput.addEventListener("input", () => {
  currentPage = 1;
  allRepos = [];
  hasMore = true;
  getRepos(currentUser, currentPage, keywordInput.value.trim().toLowerCase());
});


  // Bookmark icon
  const bookmarkIcon = document.createElement("span");
  bookmarkIcon.innerHTML = '<i class="fas fa-bookmark ms-2" style="cursor: pointer; font-size: 1.2em;"></i>';
  bookmarkIcon.title = "Add to favorites";
  bookmarkIcon.style.color = "#6c757d";

  function updateBookmarkIcon() {
    const username = eleInput.value.trim();
    const icon = bookmarkIcon.querySelector('i');
    if (previousSearches.includes(username)) {
      icon.style.color = "#ffc107";
      bookmarkIcon.title = "Remove from favorites";
    } else {
      icon.style.color = "#6c757d";
      bookmarkIcon.title = "Add to favorites";
    }
  }

  // Toggle favorites
  function toggleBookmark(repoFullName) {
    const index = bookmarkedRepos.indexOf(repoFullName);
    if (index === -1) {
      bookmarkedRepos.push(repoFullName);
    } else {
      bookmarkedRepos.splice(index, 1);
    }
    localStorage.setItem("bookmarkedRepos", JSON.stringify(bookmarkedRepos));
    return index === -1; // Returns true if bookmarked, false if unbookmarked
  }

  // Check if a repo is bookmarked
  function isBookmarked(repoFullName) {
    return bookmarkedRepos.includes(repoFullName);
  }

  // Toggle user favorites
  bookmarkIcon.addEventListener("click", function () {
    const username = eleInput.value.trim();
    if (!username) return;
    const index = previousSearches.indexOf(username);
    if (index === -1) {
      previousSearches.push(username);
    } else {
      previousSearches.splice(index, 1);
    }
    localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
    updateDatalist();
    updateBookmarkIcon();
  });

  // Datalist for search history
  const datalist = document.createElement("datalist");
  datalist.id = "search-suggestions";
  document.body.appendChild(datalist);

  function updateDatalist() {
    datalist.innerHTML = "";
    previousSearches.forEach((query) => {
      const option = document.createElement("option");
      option.value = query;
      datalist.appendChild(option);
    });
  }
  updateDatalist();
  eleInput.setAttribute("list", "search-suggestions");
  eleInput.addEventListener("input", updateBookmarkIcon);

  // Search triggers
  btnSearch.onclick = () => {
    // Clear cache for the user when starting a new search
    const username = eleInput.value.trim();
    if (username) {
      cacheManager.clearUserCache(username);
    }
    startSearch();
  };
  eleInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") startSearch();
  });

  function startSearch() {
    currentUser = eleInput.value.trim();
    currentPage = 1;
    allRepos = [];
    hasMore = true;
    containerData.innerHTML = "";
    userInfo.style.display = "none";
    getUserInfo(currentUser);
    getRepos(currentUser, currentPage);
  }

  // Fetch user info with caching
  function getUserInfo(username) {
    const cacheKey = cacheManager._getUserCacheKey(username);
    const cachedUser = cacheManager.getFromCache(cacheKey);
    
    if (cachedUser) {
      displayUserInfo(cachedUser, username);
      return;
    }
    
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((user) => {
        // Cache the user data
        cacheManager.setInCache(cacheKey, user);
        const userBookmarkIcon = bookmarkIcon.cloneNode(true);
        updateBookmarkIcon();
        
        userInfo.innerHTML = `
          <img src="${user.avatar_url}" alt="Avatar" class="rounded-circle mb-2" width="80" height="80">
          <h5 class="text-white d-flex align-items-center justify-content-center">
            ${user.login}
          </h5>
          <div class="d-flex align-items-center justify-content-center">
            <p class="text-light mb-0">
              <strong>${user.public_repos}</strong> Repositories | 
              <strong>${user.followers}</strong> Followers | 
              <strong>${user.following}</strong> Following
            </p>
          </div>
        `;
        
        // Insert the bookmark icon next to the user's name
        const userNameElement = userInfo.querySelector('h5');
        userNameElement.appendChild(userBookmarkIcon);
        
        // Update the bookmark icon's click handler for the user
        userBookmarkIcon.onclick = function(e) {
          e.stopPropagation();
          const index = previousSearches.indexOf(username);
          if (index === -1) {
            previousSearches.push(username);
          } else {
            previousSearches.splice(index, 1);
          }
          localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
          updateDatalist();
          updateBookmarkIcon();
          
          // Update the specific bookmark icon that was clicked
          const icon = userBookmarkIcon.querySelector('i');
          if (previousSearches.includes(username)) {
            icon.style.color = "#ffc107";
            userBookmarkIcon.title = "Remove from favorites";
          } else {
            icon.style.color = "#6c757d";
            userBookmarkIcon.title = "Add to favorites";
          }
        };
        userInfo.style.display = "block";
      })
      .catch(() => {
        userInfo.innerHTML = `<p class="text-danger">User not found</p>`;
        userInfo.style.display = "block";
      });
  }

  // Display user info (extracted for reuse)
  function displayUserInfo(user, username) {
    const userBookmarkIcon = bookmarkIcon.cloneNode(true);
    updateBookmarkIcon();
    
    userInfo.innerHTML = `
      <img src="${user.avatar_url}" alt="Avatar" class="rounded-circle mb-2" width="80" height="80">
      <h5 class="text-white d-flex align-items-center justify-content-center">
        ${user.login}
      </h5>
      <div class="d-flex align-items-center justify-content-center">
        <p class="text-light mb-0">
          <strong>${user.public_repos}</strong> Repositories | 
          <strong>${user.followers}</strong> Followers | 
          <strong>${user.following}</strong> Following
        </p>
      </div>
    `;
    
    // Insert the bookmark icon next to the user's name
    const userNameElement = userInfo.querySelector('h5');
    userNameElement.appendChild(userBookmarkIcon);
    
    // Update the bookmark icon's click handler for the user
    userBookmarkIcon.onclick = function(e) {
      e.stopPropagation();
      const index = previousSearches.indexOf(username);
      if (index === -1) {
        previousSearches.push(username);
      } else {
        previousSearches.splice(index, 1);
      }
      localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
      updateDatalist();
      updateBookmarkIcon();
      
      // Update the specific bookmark icon that was clicked
      const icon = userBookmarkIcon.querySelector('i');
      if (previousSearches.includes(username)) {
        icon.style.color = "#ffc107";
        userBookmarkIcon.title = "Remove from favorites";
      } else {
        icon.style.color = "#6c757d";
        userBookmarkIcon.title = "Add to favorites";
      }
    };
    userInfo.style.display = "block";
  }

  // Fetch repos with search keyword directly from GitHub API with caching
  function getRepos(username, page = 1, keyword = "") {
    if (!username) {
      resultInfo.textContent = "Please enter a GitHub username.";
      return;
    }
    if (loading || !hasMore) return;

    const cacheKey = cacheManager._getRepoCacheKey(username, page, keyword);
    const cachedRepos = cacheManager.getFromCache(cacheKey);
    
    if (cachedRepos) {
      processRepos(cachedRepos, page, keyword);
      return;
    }

    loading = true;
    resultInfo.style.display = "flex";
    resultInfo.textContent = "Loading repositories...";
    updateBookmarkIcon();

    let url = `https://api.github.com/search/repositories?q=user:${username}`;
    if (keyword) {
      url += `+${encodeURIComponent(keyword)}`;
    }
    url += `&per_page=20&page=${page}&sort=updated`;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Error fetching repositories");
        return response.json();
      })
      .then((data) => {
        const repos = data.items || [];
        // Cache the repository data
        cacheManager.setInCache(cacheKey, repos);
        if (repos.length === 0) {
          if (page === 1) {
            resultInfo.textContent = "No repositories found.";
          } else {
            resultInfo.textContent = "No more repositories.";
          }
          hasMore = false;
          return;
        }

        allRepos = [...allRepos, ...repos];
        resultInfo.style.display = "none";

       displayRepos(repos, keywordInput.value.trim().toLowerCase(), true);// directly display fetched repos

        currentPage++;
      })
      .catch((err) => {
        resultInfo.textContent =
          "Error fetching repositories. Please try again.";
        console.error(err);
      })
      .finally(() => {
        loading = false;
      });
  }

  // Search triggers
  btnSearch.onclick = () => {
    currentUser = eleInput.value.trim();
    currentPage = 1;
    allRepos = [];
    hasMore = true;
    containerData.innerHTML = "";
    userInfo.style.display = "none";
    getUserInfo(currentUser);
    getRepos(currentUser, currentPage, keywordInput.value.trim().toLowerCase());
  };

  keywordInput.addEventListener("input", () => {
    const keyword = keywordInput.value.trim().toLowerCase();

    if (keyword === "") {
      displayRepos(allRepos, "", false);
    } else {
      currentPage = 1;
      allRepos = [];
      hasMore = true;
      containerData.innerHTML = "";
      getRepos(currentUser, currentPage, keyword);
    }
  });


  // Display repos with optional filter
  function displayRepos(repos, keyword = "", append = false) {
    if (!append) {
      containerData.innerHTML = ""; 
    }

    const filtered = repos.filter((repo) =>
      repo.name.toLowerCase().includes(keyword)
    );

    if (!append && filtered.length === 0) {
      resultInfo.style.display = "block";
      resultInfo.textContent = "No repositories match your search.";
      return;
    } else {
      resultInfo.style.display = "none";
    }

    filtered.forEach((repo) => {
      const repoContainer = document.createElement("div");
      const btnContainer = document.createElement("div");
      const repoTitle = document.createElement("h3");
      const repoFullName = `${currentUser}/${repo.name}`;
      const isRepoBookmarked = isBookmarked(repoFullName);
      repoTitle.textContent = repo.name;
      repoContainer.classList.add("container-data");
      btnContainer.classList.add("link-Container");

        // Bookmark button for individual repo
        const btnBookmark = document.createElement("button");
        btnBookmark.className = "btn-icon-with-label";
        btnBookmark.innerHTML = isRepoBookmarked ? 
          '<i class="fas fa-star text-warning" style="color: #ffd700;"></i><span class="btn-label">Saved</span>' : 
          '<i class="far fa-star"></i><span class="btn-label">Save</span>';
        btnBookmark.title = isRepoBookmarked ? "Remove from favorites" : "Add to favorites";
        btnBookmark.onclick = (e) => {
          e.stopPropagation();
          const wasBookmarked = toggleBookmark(repo.full_name);
          btnBookmark.innerHTML = wasBookmarked ? 
            '<i class="fas fa-star text-warning" style="color: #ffd700;"></i><span class="btn-label">Saved</span>' : 
            '<i class="far fa-star"></i><span class="btn-label">Save</span>';
          btnBookmark.title = wasBookmarked ? "Remove from favorites" : "Add to favorites";
        };
      btnContainer.appendChild(btnBookmark);

        // View on GitHub
        const btnVisit = document.createElement("a");
        btnVisit.href = repo.html_url;
        btnVisit.target = "_blank";
        btnVisit.className = "btn-icon-with-label";
        btnVisit.innerHTML = `<i class="fab fa-github"></i><span class="btn-label">GitHub</span>`;
        btnVisit.title = "View on GitHub";
      btnContainer.appendChild(btnVisit);

        // Copy repository URL
        const btnCopy = document.createElement("button");
        btnCopy.className = "btn-icon-with-label";
        btnCopy.innerHTML = `<i class="fas fa-clipboard"></i><span class="btn-label">Copy</span>`;
        btnCopy.title = "Copy repository URL";
        btnCopy.onclick = (e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(repo.html_url);
          btnCopy.innerHTML = '<i class="fas fa-check"></i><span class="btn-label">Copied</span>';
          btnCopy.title = "Copied!";
          setTimeout(() => {
            btnCopy.innerHTML = '<i class="fas fa-clipboard"></i><span class="btn-label">Copy</span>';
            btnCopy.title = "Copy repository URL";
          }, 2000);
        };btnContainer.appendChild(btnCopy);

        // Download repository
        const btnDownload = document.createElement("a");
        btnDownload.href = `https://github.com/${currentUser}/${repo.name}/archive/refs/heads/main.zip`;
        btnDownload.download = repo.name;
        btnDownload.className = "btn-icon-with-label";
        btnDownload.innerHTML = `<i class="fas fa-file-archive"></i><span class="btn-label">Download</span>`;
        btnDownload.title = "Download as ZIP";
      btnContainer.appendChild(btnDownload);

        // Live Demo button (GitHub Pages or Homepage)
        if (repo.has_pages) {
          const btnPage = document.createElement("a");
          btnPage.href = `https://${currentUser}.github.io/${repo.name}/`;
          btnPage.target = "_blank";
          btnPage.className = "btn-icon-with-label";
          btnPage.innerHTML = `<i class="fas fa-external-link-alt"></i><span class="btn-label">Live Demo</span>`;
          btnPage.title = "View Live Demo";
          btnContainer.appendChild(btnPage);
        } else if (repo.homepage) {
          const btnPage = document.createElement("a");
          btnPage.href = repo.homepage;
          btnPage.target = "_blank";
          btnPage.className = "btn-icon-with-label";
          btnPage.innerHTML = `<i class="fas fa-external-link-alt"></i><span class="btn-label">Live Demo</span>`;
          btnPage.title = "View Live Demo";
          btnContainer.appendChild(btnPage);
        }

      repoContainer.appendChild(repoTitle);
      repoContainer.appendChild(btnContainer);
      containerData.appendChild(repoContainer);
    });
  }

  // Infinite scroll
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading &&
      hasMore
    ) {
      getRepos(currentUser, currentPage);
    }
  });

  updateBookmarkIcon();
};