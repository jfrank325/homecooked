if (document.getElementById('filtered')) {
  document.getElementById('filtered').onsubmit = event => {
    event.preventDefault();

    const mealtype = document.getElementById('mealtype').value;
    console.log('mealtype value', mealtype);

    axios
      .get(`http://localhost:3000/filtered/${mealtype}`)
      .then(filteredMeals => {
        console.log('TEST', filteredMeals.data);
        const filteredBox = document.getElementById('filtered-box');
        // filteredBox.classList.add('meal-card');
        filteredBox.innerHTML = '';
        filteredMeals.data.forEach(food => {
          console.log(food);
          const d = document.createElement('div');
          d.classList.add('meal-card');
          const a = document.createElement('a');
          a.href = `/meals/${food._id}`;
          a.innerHTML = `<img src=${food.image}></img><p>${food.name}<br>${food.price}</p>`;
          filteredBox.classList.add('meal-container');
          filteredBox.appendChild(d);
          d.appendChild(a);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

console.log(document.querySelectorAll('form'));

{
  /* <a href="/meals/{{_id}}"><img src="{{imgPath}}" alt=""></a>
<li><a href="/meals/{{_id}}">{{name}} {{price}} euro</a></li> */
}
