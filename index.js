async function getPage() {
  const pageParams = new URLSearchParams(window.location.search);
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${pageParams.get('page')}`);
  const data = await response.json();
  return data;
}

function addListItem(list, item) {
  const newElem = document.createElement('li');
  newElem.classList.add('list-item')
  const link = document.createElement('a');
  link.textContent = item.title;
  link.setAttribute('href', `article.html?id=${item.id}`);
  newElem.appendChild(link);
  list.appendChild(newElem);
}

function createArticlesList(list, titles) {
  for (const title of titles) {
    addListItem(list, title);
  }
}


(() => {
  window.addEventListener('DOMContentLoaded', async () => {
    const list = document.querySelector('.list');
    const data = await getPage();
    const titles = data.data;
    const leftBtn = document.querySelector('.pag-left');
    const rightBtn = document.querySelector('.pag-right');
    leftBtn.addEventListener('click', () => {
      const pageParams = new URLSearchParams(window.location.search);
      const page = Number(pageParams.get('page')) - 1;
      console.log(page);
      location.href = `index.html?page=${page}`;
    });
    rightBtn.addEventListener('click', () => {
      const pageParams = new URLSearchParams(window.location.search);
      const page = Number(pageParams.get('page')) + 1;
      location.href = `index.html?page=${page}`;
    });
    createArticlesList(list, titles);
  });
})();