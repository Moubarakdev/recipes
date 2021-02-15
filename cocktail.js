// CONTROLE DE CONNECTION POUR MDN BOOTSTRAP

// if (navigator.onLine == true){

//     document.head.innerHTML += `<link rel='stylesheet' href='bootstrap.css'>`;
//     document.body.innerHTML += `<script src="bootstrap1.js"></script>`;
//     document.body.innerHTML += `<script src="bootstrap2.js"></script>`;
//     document.body.innerHTML += `<script src="bootstrap3.js"></script>`;

//   }


  //DEBUT
  const result = document.getElementById("result");
  const searchInput = document.getElementById("searchInput");
  const randomDrink = document.getElementById("randomDrink");
  
  
  
  let search = '';
  
          async function fetchSearch(url){
              const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${url}`);
              const res = await response.json();
               drinks = res.drinks;
              console.log(drinks);
           };
          fetchSearch().catch(erreur=>{
              result.innerHTML = "<p class='text-danger'>AUCUNE CONNECTION  :  VERIFIER VOTRE CONNECTION INTERNET<p>";
              console.log(erreur);
          });
  
  
          //SEARCH
  
          async function searchDisplay(){
              await fetchSearch(search);
              if (drinks == null){
                  result.innerHTML = "<span class='span'>Aucun resultat</span>";
              }
  
              result.innerHTML = (
                  
                  drinks.map (drink=>(
                   `
                 
                      <div class="col-12 col-lg-3 mb-3">
                        <div class="card ">
                           <div class="card-body">
                               <h5 class="card-title">${drink.strDrink}</h5>
                               <p class="card-text mt-4">Type : ${drink.strAlcoholic} <br> Categorie: ${drink.strCategory}</p>
                               <img class="card-img-top" src=${drink.strDrinkThumb}>
                               <p class="card-text">Ingredients : ${drink.strIngredient1} , ${drink.strIngredient2}, ${drink.strIngredient3} <br> ${drink.strIngredient4}, ${drink.strIngredient5} .</p>
                               
                           </div>
                       </div>
                      </div>
                   
                  `
                  )).join('')
                  
              )
          };
  
  
          searchInput.addEventListener('input', (e) =>{
              
              search = `search.php?s=${e.target.value}`;
              searchDisplay();
  
          });
  
          //RANDOM MEAL
  
         async function randomDrinkDisplay(){
              await fetchSearch("random.php")
  
              result.innerHTML = (
                  drinks.map(drink=>(
                      `
                      
                          <div class="col-8 container d-flex h-100 mb-1">
                          <div class="row align-self-center">
                          <div class="card " >
                          <div class="card-body">
                              <h5 class="card-title">${drink.strDrink}</h5>
                              <p class="card-text">Type : ${drink.strAlcoholic} <br> Categorie: ${drink.strCategory}</p>
                              <img class="card-img-top" src=${drink.strDrinkThumb} alt=""/>
                              <p class="card-text">Ingredients  : ${drink.strIngredient1} , ${drink.strIngredient2}, ${drink.strIngredient3} <br> ${drink.strIngredient4}, ${drink.strIngredient5} . </p>
                               
                              
                          </div>
                      </div>
                      </div>
                    </div>
                      `
                  ))
              );
          }
  
          randomDrink.addEventListener('click', randomDrinkDisplay);
          
          randomDrinkDisplay();
  
  // /