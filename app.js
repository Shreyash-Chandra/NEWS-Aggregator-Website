const API_KEY = '93cd30f61e72f65867e383f6d5b66c53';
const container = document.getElementById('news-container');
const searchInput = document.getElementById('search');

fetchNews();

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  if (query.length > 2) {
    fetchNews(query);
  } else if (query.length === 0) {
    fetchNews();
  }
});

async function fetchNews(query = '') {
  const url = `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en&country=us&q=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.articles || data.articles.length === 0) {
      container.innerHTML = '<p>No news articles found.</p>';
      return;
    }

    displayNews(data.articles);
  } catch (err) {
    console.error("Error fetching news:", err);
    container.innerHTML = '<p>Failed to load news. Try again later.</p>';
  }
}

function displayNews(articles) {
  container.innerHTML = '';
  articles.forEach(article => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
      <img src="${article.image || 'https://via.placeholder.com/300'}">
      <h3>${article.title}</h3>
      <p>${article.description || ''}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    container.appendChild(card);
  });
}
