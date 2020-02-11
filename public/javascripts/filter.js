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
        filteredBox.innerHTML = '';
        filteredMeals.data.forEach(food => {
          const a = document.createElement('a');
          a.innerHTML = `${food.name}`;
          filteredBox.appendChild(a);
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
