const pizzas = JSON.parse(localStorage.getItem("pizzas")) || [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

/*Traemos los elementos del dom necesarios para realizar el ejercicio*/

const resultContainer = document.getElementById("result-container");
const form = document.getElementById("form");
const input = document.querySelector(".form__input");

/* Si el array de pizzas aun no se guardo en el localStorage, lo guarda. Caso contrario, no hace nada. */
const saveToLocalStorage = () => {
  return !localStorage.getItem("pizzas")
    ? localStorage.setItem("pizzas", JSON.stringify(pizzas))
    : null;
};

/* Buscamos en el array de pizzas una pizza cuyo id coincida con el numero del input. Retornará undefined si no existe dicho número */
const searchPizza = (value) => pizzas.find((pizza) => pizza.id === value);

/* Función para renderizar la card de la pizza encontrada */
const renderCard = (pizza) => {
  const { nombre, precio, ingredientes, imagen } = pizza;

  return `
  <div class="card">
  <img src="${imagen}" alt="${nombre}" class="card__img">
  <div class="card__info">
      <h2 class="card__title">${nombre.toUpperCase()}</h2>
      <div class="card__body">
          <span class="card__description">${ingredientes
            .map((i) => i)
            .join(", ")}.</span>

          <span class="card__price">Precio: $${precio}</span>
      </div>
  </div>
</div>
  `;
};

/* Función para mostrar un error en caso de que no hayamos colocado nada en el input y activemos el evento submit */
const showEmptyError = () => {
  resultContainer.innerHTML = `
    <div class="pizza-container">
    <i class="fa-solid fa-triangle-exclamation error"></i>
    <h2 class="error-title"> Por favor, ingrese un número para que podamos buscar su pizza en el menú. </h2>
    </div>`;
};

/* Función para renderizar el resultado de la busqueda. Lo que se renderice dependerá de si se encontró una pizza con el id dado o no. */
const renderResult = (pizza) => {
  if (!pizza) {
    resultContainer.innerHTML = `
    <div class="pizza-container">
    <i class="fa-solid fa-triangle-exclamation error"></i>
    <h2 class="error-title"> No existe una pizza con el id ingresado.</h2>
    <p>Realice una nueva busqueda.</p>
    </div>`;
  } else {
    resultContainer.innerHTML = renderCard(pizza);
  }
};

/* Función que se ejecutará al darse el evento "submit". 
1- Guardamos el valor del input en una variable.
2- Si el valor es undefined (debido a lo que devuelve el método find), mostramos un error.
3- Si el valor no es undefined, guardamos la pizza encontrada.
*/

const submitSearch = (e) => {
  e.preventDefault();
  const searchedValue = input.value;
  if (!searchedValue) {
    showEmptyError(searchedValue);
    return;
  }
  const searchedPizza = searchPizza(Number(searchedValue));
  renderResult(searchedPizza);
};

/* Función inicializadora */
const init = () => {
  saveToLocalStorage();
  form.addEventListener("submit", submitSearch);
};

init();
