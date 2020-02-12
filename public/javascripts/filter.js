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
          console.log(food);
          const a = document.createElement('a');
          a.href = `/meals/${food._id}`;
          a.innerHTML = `${food.name}   Euro ${food.price} <img src=${food.imgPath}> </img>`;
          // const img = document.createElement('img');
          // img.src = `${food.imgPath}`;
          // const info = document.createElement('p');
          // info.innerHTML = `${food.name}`;
          // const price = document.createElement('p');
          // price.innerHTML = `Euro ${food.price}`;
          filteredBox.appendChild(a);
          // filteredBox.appendChild(img);
          // filteredBox.appendChild(info);
          // filteredBox.appendChild(price);
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
