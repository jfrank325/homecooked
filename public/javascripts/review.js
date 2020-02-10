console.log('HELPPP');

document.querySelector('form').onsubmit = event => {
  // 0 when the user submits the form
  event.preventDefault();

  const mealId = document.location.pathname.split('/')[2];
  // 1 we make an API call to our `POST` `/rooms/:id/comments` -> BACKEND
  console.log('ourmeal id', mealId);
  axios
    .post(`http://localhost:3000/meals/${mealId}/reviews`, {
      content: document.querySelector('input').value,
    })
    .then(() => {
      console.log('first thn');
      // 4 we get the response from our API call (1)
      // 5 we make an API call to our `GET` `/rooms/:id/comments` -> BACKEND
      return axios.get(`http://localhost:3000/meals/${mealId}/reviews`);
    })
    .then(response => {
      console.log('response: ', response);
      // 8 we iterate through the list of comments from the server to manipulate the DOM
      const reviewBox = document.getElementById('review-box');
      reviewBox.innerHTML = '';
      response.data.forEach(review => {
        const p = document.createElement('p');
        p.innerHTML = `${review.content} <i>${review.author}</i>`;
        reviewBox.appendChild(p);
      });
      document.querySelector('form').reset();
    })
    .catch(err => {
      console.log(err);
    });
};
