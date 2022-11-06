async function createArticle(title, content, comments) {
    const pageParams = new URLSearchParams(window.location.search);
    const articleResponse = await fetch(`https://gorest.co.in/public-api/posts/${pageParams.get('id')}`);
    const articleData = await articleResponse.json();
    const commentsResponse = await fetch(`https://gorest.co.in/public-api/comments?post_id=${pageParams.get('id')}`);
    const commentsList = await commentsResponse.json();
    title.textContent = articleData.data.title;
    content.textContent = articleData.data.body;
    addComments(comments, commentsList);
}

function addComments(comments, commentsList) {
    console.log(commentsList);
    for (const comment of commentsList.data) {
        const newComment = document.createElement('li');
        newComment.textContent = comment.name + ' | ' + comment.body;
        comments.appendChild(newComment);
    }
}

(() => {
    window.addEventListener('DOMContentLoaded', async () => {
        const title = document.querySelector('.title');
        const content = document.querySelector('.content');
        const comments = document.querySelector('.comments');
        createArticle(title, content, comments);
    });
})();