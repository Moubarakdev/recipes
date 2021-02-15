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
const randomMeal = document.getElementById("randomMeal");



let search = '';

        async function fetchSearch(url){
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${url}`);
            const res = await response.json();
             meals = res.meals;
            console.log(meals);
        };
        fetchSearch().catch(erreur=>{
            result.innerHTML = "<p class='text-danger'>AUCUNE CONNECTION  :  VERIFIER VOTRE CONNECTION INTERNET<p>";
            console.log(erreur);
        });


        //SEARCH

        async function searchDisplay(){
            await fetchSearch(search);
            if (meals == null){
                result.innerHTML = "<span class='span'>Aucun resultat</span>";
            }

            result.innerHTML = (
                
                meals.map (meal=>(
                 `
                    <div class="col-12 col-lg-3 mb-4 ">
                      <div class="card ">
                         <div class="card-body">
                             <h5 class="card-title">${meal.strMeal}</h5>
                             <p class="card-text">Origine : ${meal.strArea} <br> Categorie: ${meal.strCategory}</p>
                             <p><img class="card-img-top" src=${meal.strMealThumb}></p><br>
                             <p style="text-align: center;" ><a class="btn btn-danger"  href="${meal.strYoutube} " target ="_blank"><i class="fab fa-youtube"></i></a></p>
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

       async function randomMealDisplay(){
            await fetchSearch("random.php")

            result.innerHTML = (
                meals.map(meal=>(
                    `
                        <div class="col-8 container d-flex h-100 mb-1">
                        <div class="row align-self-center">
                        <div class="card " >
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">Origine : ${meal.strArea} <br> Categorie: ${meal.strCategory}</p>
                            <p><img class="card-img-top" src=${meal.strMealThumb} alt=""/></p><br>
                            <p style="text-align:center;"><a class="btn btn-danger " style="font-size:32px;  " href="${meal.strYoutube} " target ="_blank"><i class="fab fa-youtube"></i></a></p>
                        </div>
                    </div>
                    </div>
                  </div>
                    `
                ))
            );
        }

        randomMeal.addEventListener('click', randomMealDisplay);
        
        randomMealDisplay();

///