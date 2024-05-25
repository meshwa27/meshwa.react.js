let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchFounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchFounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

// Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

// Sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

// Search by title/founder
let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load

let productdata=[]

function fetchdata() {
    fetch("https://add-to-cart-backend-it46.onrender.com/pitches")
        .then((res) => res.json())
        .then((data) =>{
            cardlist(data)
            productdata=data
        } )
        .catch((err) => console.log(err));
}

fetchdata();

function cardlist(data) {
    const store = data.map((el) => card(el.id, el.image, el.title, el.price, el.founder, el.category,el.description));
    mainSection.innerHTML = store.join("");
}

function card(id, image, title, price, founder, category,description) {
    let singlecard = `
    <a href="description.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&price=${encodeURIComponent(price)}&description=${encodeURIComponent(description)}&id=${encodeURIComponent(id)}">
    <div class="card" data-id="${id}">
        <div class="card-img">
            <img src="${image}" alt="">
        </div>
        <div class="card-body">
            <h4 class="card-title">${title}</h4>
            <p class="card-founder">Founder: ${founder}</p>
            <p class="card-category">${category}</p>
            <p class="price">${price}</p>
            <a href="#" class="card-link" data-id="${id}">Edit</a>
            <button class="card-button" data-id="${id}">Delete</button>
        </div>
    </div>    
    `;
    return singlecard;
}

// Add a new pitch
pitchCreateBtn.addEventListener("click", () => {
    let product = {
        title: pitchTitleInput.value,
        price: pitchPriceInput.value,
        category: pitchCategoryInput.value,
        image: pitchImageInput.value,
        founder: pitchFounderInput.value,
    };

    fetch("https://add-to-cart-backend-it46.onrender.com/pitches", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            alert("Product added successfully");
            fetchdata();  // Refresh the list
        })
        .catch((err) => {
            console.log(err);
        });
});


// #### DELETE PART #####

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-button")) {
        delteproduct(e.target.dataset.id)
    }

})

function delteproduct(id) {
    fetch(`https://add-to-cart-backend-it46.onrender.com/pitches/${id}`, {
        method: "DELETE"
    }).then((res) => res.json)
        .then((data) => {
            alert("deleted...")
            console.log(data)
        })
        .catch((err) => console.log(err))
}

// #### FILTER PART #####

filterFood.addEventListener("click",()=>{
    let filterdata=productdata.filter((el)=>el.category==="Food")
    console.log(filterdata)
    cardlist(filterdata)
})
filterElectronics.addEventListener("click",()=>{
    let filterdata=productdata.filter((el)=>el.category==="Electronics")
    console.log(filterdata)
    cardlist(filterdata)
})
filterPersonalCare.addEventListener("click",()=>{
    let filterdata=productdata.filter((el)=>el.category==="Personal Care")
    console.log(filterdata)
    cardlist(filterdata)
})


// SORTING PART 

sortAtoZBtn.addEventListener("click",()=>
{
    const sortAtoZdata=productdata.sort((a,b)=>a.price-b.price)
   cardlist(sortAtoZdata)
})
sortZtoABtn.addEventListener("click",()=>
    {
        const sortAtoZdata=productdata.sort((a,b)=>b.price-a.price)
       cardlist(sortAtoZdata)
    })


document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-link")){
        let id = e.target.dataset.id;
        populateform(id);
    }
  
}) 

function populateform(id)
{
    fetch(`https://add-to-cart-backend-it46.onrender.com/pitches/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        updatePitchTitleInput.value=data.title
        updatePitchImageInput.value=data.image
        updatePitchFounderInput.value=data.founder
        updatePitchCategoryInput.value=data.category
        updatePitchPriceInput.value=data.price
        updatePitchIdInput.value=data.id
    })
    .catch((err)=>console.log(err))
}

updatePitchBtn.addEventListener("click",()=>{
    let updateproductdata={
        title: updatePitchTitleInput.value,
        image: updatePitchImageInput.value,
        founder:updatePitchFounderInput.value,
        category:updatePitchCategoryInput.value,
        price: updatePitchPriceInput.value,
        id:updatePitchIdInput.value
    }
    


    fetch(`https://add-to-cart-backend-it46.onrender.com/pitches/${updateproductdata.id}`,{
    method:"PUT",
    headers:{
        "content-type":"application/json"
    },
    body:json.stringify(updateproductdata)
    }).then((res)=>res.json())
    .then((data)=>{
        alert("data updated ...")
    })
    .catch((err)=>console.log(err))
})


// serach :-

searchByButton.addEventListener('click', () => {
    let searchTerm = searchByInput.value.toLowerCase();
    let filteredData = productdata.filter((el) => {
        return el.title.toLowerCase().includes(searchTerm) || el.founder.toLowerCase().includes(searchTerm);
    });

    cardlist(filteredData);
});



// only update-price :-

updatePricePitchPriceButton.addEventListener("click", () => {
    let id = updatePricePitchId.value;
    let newPrice = updatePricePitchPrice.value;

    fetch(`https://add-to-cart-backend-it46.onrender.com/pitches/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ price: newPrice }) 
    })
    .then((res) => res.json())
    .then((data) => {
        alert("Price updated successfully!");
    })
    .catch((err) => {
        console.error("Error updating price:", err);
        alert("Failed to update price. Please try again later.");
    });
});

///



