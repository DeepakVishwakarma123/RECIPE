// dom element reference
let search=document.querySelector(".search")
let btn=search.nextElementSibling
let rname=btn.nextElementSibling
let img=rname.nextElementSibling
let ingdt=img.nextElementSibling
let link=ingdt.nextElementSibling
let historyele=link.nextElementSibling
let savedbtn=historyele.nextElementSibling

// history array
let history=Array()
// searching image variabel
let url=`Searching.png`

// main function to get receipe data
let receipefinderfirst=(e) =>{
    // default text for button
    btn.textContent="search"
// condition for search tab not be empty
if(search.value!=="")
    {  
        // pushing search value to history array
        history.push(`${search.value}`)
        // displaying array data to element
        historyele.textContent=`HISTORY:${history}`
        // saving data to localstorage
        localStorage.setItem("history", `${history}`)
        // fetching data from api based on search input
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`).then(
                      (response) =>{
                        // converting response to json
                  return response.json()
                           }
                 ).then(

                     (data) =>{
    // fetching specific data from json
    let dataarr=data["meals"] 
    let firstreceipe=dataarr[0]
    let imgdata=firstreceipe["strMealThumb"]
    let imgwidth=200
    //  adding data to dom elements
    rname.textContent=`Receipe name:${firstreceipe["strMeal"]}`
    ingdt.textContent=`INSTRUCTIONS:${firstreceipe["strInstructions"]}`
    img.setAttribute("src",`${imgdata}`)
    img.setAttribute("width",`${imgwidth}`)
    link.setAttribute("href",`${firstreceipe["strYoutube"]}`)

       }
    ).catch(
        // error response 
    (err) =>{ 
       console.log(err);
       alert("the receipe was not found")
    }
)
    }
    // if field was blanked
    else{
        console.log("the field should not be blanked");
    }

        
   
        
  
}
let btnwidth=600
// adding loading functonallity to page(loading function) 
let receipefinder=() =>{
    btn.textContent="searching"
    btn.setAttribute("width",`${btnwidth}`)
    img.setAttribute("src",`${url}`)

 setTimeout(
     () =>{
        // main function calling delay after 4s
         receipefinderfirst()
     },4000
 )
}
// calling  loading function on click
btn.addEventListener('click',receipefinder)


// calling loading  function on enter keypress 
addEventListener(

    'keypress',(e) =>
     { // checking user key
       if(e.code==='Enter')
        {
            // search field blank should not be checking
            if(search.value!=="")
                {
                    // calling loading function
            receipefinder()
                }
                else{
                    alert("first enter the receipe")
                }
        }
      
    }
)
    // history-function for showing local storge data
    let datashow=() =>{
        // showing localstorage data in alert box
    alert(`SAVED:${localStorage.getItem("history")}`)
    }

    // calling  history function on button click
    savedbtn.addEventListener('click',datashow)

    
