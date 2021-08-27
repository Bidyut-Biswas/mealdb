
        document.getElementById('spinner').style.display='none'
        document.getElementById('err-msg').style.display='none'

        const searchButton=()=>{
            const searchField=document.getElementById('search-input');
            const searchText=searchField.value;
            searchField.value=''
            if(!searchText){
                alert('Please input food name')
            }else{
                
                loadSearch(searchText)
                
            }
            
        }
        const loadSearch=async (foodName)=>{
            document.getElementById('spinner').style.display='block'
            const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
            try{
                const res=await fetch(url);
                const data= await res.json();            
                displayFood(data.meals)
            }catch(e){
                document.getElementById('err-msg').style.display='block'
            }
            // fetch(url)
            // .then(res=>res.json())
            // .then(data=>displayFood(data.meals))
        }
        const displayFood=(foods)=>{
            document.getElementById('err-msg').style.display='none'
            const foodContainer=document.getElementById('food-container')
            foodContainer.innerHTML=''
            document.getElementById('spinner').style.display='none'
            foods.forEach(food=>{
                // console.log(food);
                const div=document.createElement('div');
                div.classList.add('col');
                div.innerHTML=`
                <div onclick="foodDetails(${food.idMeal})" class="card h-100">
                <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">'${food.strMeal}'</h5>
                  <p class="card-text">'${food.strInstructions.slice(0,200)}'</p>
                </div>
              </div>`
              foodContainer.appendChild(div)
            })
        }

        const foodDetails=id=>{
            const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
            fetch(url)
            .then(res=>res.json())
            .then(data=>showDetails(data.meals[0]))
        }
        const showDetails=meal=>{
            
            const details=document.getElementById('details');
            details.innerHTML=''
            const div=document.createElement('div');
            div.classList.add('card');
            div.classList.add('mx-auto')
            div.setAttribute('style','width:50%;');
            div.innerHTML=`
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
              <a href="${meal.strYoutube}" class="btn btn-primary">visit link</a>
            </div>
            `
            details.appendChild(div)
        }
   