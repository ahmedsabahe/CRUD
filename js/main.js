let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('submit');
let mood = 'create';
let tmp;
// get total
function gettotal() {
if (price.value !== '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value
    total.innerHTML = result
    total.style.background = '#285B18'
}else(
    total.innerHTML = '',
    total.style.background = '#0a0ae7'
)
}
// creat product
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}
 function creat() {
    let newpro = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
       count :count.value,
        category : category.value,
    }
    if (title.value != '' && price.value != '' && category.value != '' && newpro.count < 100) {
        if (mood === 'create') {
            if(newpro.count > 1){
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro)
                }
               }else{
                datapro.push(newpro)
               }
        }else{
            datapro[tmp] = newpro;
            mood = 'create';
            create.innerHTML = 'create';
            count.style.display = 'block';
        }
        title.value ='';
        price.value ='';
        taxes.value ='';
        ads.value ='';
        discount.value ='';
        total.innerHTML = '';
        count.value ='';
        category.value ='';
    }
    


   
    
    localStorage.setItem('product',    JSON.stringify(datapro)     )
    
    // clear data 

    showData()
 }
//  show data 
function showData() {
    gettotal();
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
         table += `
         <tr>
                <th>${i+1}</th>
                <th>${datapro[i].title}</th>
                <th>${datapro[i].price}</th>
                <th>${datapro[i].taxes}</th>
                <th>${datapro[i].ads}</th>
                <th>${datapro[i].discount}</th>
                <th>${datapro[i].total}</th>
                <th>${datapro[i].category}</th>
                <th><button onclick="update(${i})" id="update">update</button></th>
                <th><button onclick="cleardata( ${i} )" id="delete">delete</button></th>
         </tr>
         `
    }
    document.getElementById('tbody').innerHTML = table;
}
showData()
// cleardata
function cleardata(i) {
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showData()
};
// delete All 
function deleteall() {
    localStorage.clear()
    datapro.splice(0);
    showData() 
}
// update
function update(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    gettotal();
    count.style.display = 'none';
    category.value = datapro[i].category;
    create.innerHTML = 'UpDate';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
// search
let searchMood = 'title';
function getsearch(id) {
    let search = document.getElementById('search');
   if (id == 'searchtitle') {
        searchMood = 'title';
   }else{
    searchMood = 'category';
   }
   search.placeholder = 'Search By '+ searchMood;
   search.focus();
   search.value = '';
   showData();
}

function searchDate(value) {
    let table = '';
        for (let i = 0; i < datapro.length; i++) {
          if (searchMood == 'title') { 
     if (datapro[i].title.includes(value)) {
            table += `
                <tr>
                       <th>${i}</th>
                       <th>${datapro[i].title}</th>
                       <th>${datapro[i].price}</th>
                       <th>${datapro[i].taxes}</th>
                       <th>${datapro[i].ads}</th>
                       <th>${datapro[i].discount}</th>
                       <th>${datapro[i].total}</th>
                       <th>${datapro[i].category}</th>
                       <th><button onclick="update(${i})" id="update">update</button></th>
                       <th><button onclick="cleardata( ${i} )" id="delete">delete</button></th>
                </tr>
                `
    }  
        }
    else{
            if (datapro[i].category.includes(value)) {
            table += `
                <tr>
                       <th>${i}</th>
                       <th>${datapro[i].title}</th>
                       <th>${datapro[i].price}</th>
                       <th>${datapro[i].taxes}</th>
                       <th>${datapro[i].ads}</th>
                       <th>${datapro[i].discount}</th>
                       <th>${datapro[i].total}</th>
                       <th>${datapro[i].category}</th>
                       <th><button onclick="update(${i})" id="update">update</button></th>
                       <th><button onclick="cleardata( ${i} )" id="delete">delete</button></th>
                </tr>
                `
            }
    }
}
    document.getElementById('tbody').innerHTML = table;
}