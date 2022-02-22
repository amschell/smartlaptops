 function openSlideMenu(){
    document.getElementById('side-menu').style.width='250px'
    document.getElementById('main').style.marginLeft='250px'
}


function closeSideMenu(){
    document.getElementById('side-menu').style.width='0'
    document.getElementById('main').style.marginLeft='0'
}




let lap= document.querySelector('.hp-content-section2')
let lap1= document.querySelector('.hp-content-section3')
let lap2= document.querySelector('.hp-content-section')





let hp= document.querySelectorAll('.hp-images')

var products=[ ]
for (let i=0;i<hp.length;i++){
    let price= parseInt( hp[i].querySelector('.hp-details').firstElementChild.textContent)
    
    let name=hp[i].id
    products.push(  {name:hp[i].id, tag:hp[i].id,price:price,incart:0})
   
}

for(let i=0;i<hp.length;i++){

   /* */
        hp[i].innerHTML+=`
    
        <button class="cart"  style=" opacity:1; transition: outline:none; border-radius:45px; border:1px solid red;  1s;color:white; padding:5px;background-color:red; " id="cart" > Add To Cart</button>
        
        
        `
        

        let myCart= document.querySelectorAll('.cart')
        
      /*  document.querySelectorAll('.cart')[i].addEventListener("mouseover", function(){

            myCart[i].style.opacity='1'
        })

        document.querySelectorAll('.cart')[i].addEventListener("mouseout", function(){
            myCart[i].style.opacity='0'
        })*/
}



let myCart= document.querySelectorAll('.cart')
for(let i=0;i<myCart.length;i++){
myCart[i].addEventListener("click", function (){

cartNumbers(products[i]) 
totalCost(products[i])
alert('succesfully added to cart')  

/*myCart[i].innerHTML=
`
<p style="color:green" > succesfully added! <br> 
</p>

`*/
}
)}



 /*document.getElementById('message').textContent="ORDER DESCRIPTION"

document.getElementById('order-table').innerHTML+=`
<!-- <form action="https://formspree.io/f/xnqwdanr " method="POST"> -->
<h1> ${hp[i].id}</h1>

<textarea style=" border:none;  margin:20px; color:black;background:lightblue; display:block;"  rows="10" cols="50" name="laptop description"    id="laptop-description" readonly> ${hp[i].querySelector('.hp-details').textContent}</textarea>
</form>


`

document.getElementById('form').style.display='block'*/







function showOrder(){
document.getElementById('order-table').style.display='flex'
document.getElementById('message').style.display='flex'


}
document.getElementById('order-table').innerHTML+=
`
<form id="form" style="display:none;" action="https://formspree.io/f/xnqwdanr " method="POST">
<h3> CONTACT DETAILS</h3>
<input style="margin:10px;" type="text" name="first name" id="fname" placeholder="first name" required > 
<br>

<input style="margin:10px;" type="text" name="last name" id="lname" placeholder="last name" required > 
<br>

<input  style="margin:10px;" type="email" name="email Adress" id="email" placeholder="email adress" required > 
<br>

<input   style="margin:10px;"type="number" name="Mobile number" id="number" placeholder="mobile number" required > 
<br>
<h3> PHYSICAL ADRESS DETAILS</h3>
<input  style="margin:10px;" type="text" name="county" id="county" placeholder="county eg. NAIROBI" required > 
<br>
<input  style="margin:10px;" type="text" name="constituency" id="constituency" placeholder="constituency" > 
<br>

<input  style="margin:10px;" type="text" name="estate" id="estate" placeholder="estate/street" required > 
<br>

<input  style="margin:10px;" type="text" name="apartment name/number" id="apartment" placeholder="apartment name"  > 
<br>

<input  style="margin:10px;" type="text" name="house number" id="house" placeholder="house number"  > 
<br>
<button type="submit" style="padding:5px; border:none; background:dodgerblue; color:white; outline:none;" > SEND ORDER</button>

`
function showOrderSide(){

    closeSideMenu()
    showOrder()
}
function onLoadCartNumbers(){
    let productNumbers= localStorage.getItem('cartNumbers')
    if(productNumbers){
        document.querySelector('#cart-count').textContent=productNumbers
    }

}
function cartNumbers(product){
    
    let productNumbers= localStorage.getItem('cartNumbers')
    productNumbers=parseInt(productNumbers)
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1)  
        document.querySelector('.cart-count').textContent=productNumbers+1
    } else{
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart-count').textContent=1
    }
    setitems(product)
}
function setitems(product){
let cartItem=localStorage.getItem('productsInCart')
cartItem=JSON.parse(cartItem)
console.log('my cart items are',cartItem)
if(cartItem !=null){
    if(cartItem[product.tag] ==undefined){

        cartItem={
            ...cartItem,
            [product.tag]:product
        }
    }
    cartItem[product.tag].incart+=1
}else{


product.incart=1


 cartItem={
[product.tag]:product

}
}

localStorage.setItem('productsInCart',JSON.stringify(cartItem))
}


function totalCost(product){
//console.log("the product price is",product.price)
let cartCost=localStorage.getItem('totalCost')


if(cartCost!=null ){
    cartCost= parseInt(cartCost)

localStorage.setItem("totalCost",cartCost+product.price)
}
else{
    localStorage.setItem('totalCost',product.price)
}


}
function displayCart(){
    let cartCost=localStorage.getItem('totalCost')

let cartItems=localStorage.getItem("productsInCart")
cartItems=JSON.parse(cartItems)
let productContainer= document.querySelector('.products')
if(cartItems && productContainer ){
//productContainer.innerHTML=""
Object.values(cartItems).map(item=> {
productContainer.innerHTML+=`

<div class="product"> 
<ion-icon name="close-circle"></ion-icon>

<img src="./pics/${item.tag}.jpg">
<br>
<span style="margin-left:10px; color:dodgerblue;">
${item.name}</span>
</div>
<div class="price">  ksh ${item.price}</div>
<div class="quant"> ${item.incart}</div>
<div class="tota" > ${item.incart * item.price} 


</div>


`


})
productContainer.innerHTML+=`

<div class="basket">

<h4 style="margin-left:20px;" class="bt"> Bascket total= ksh ${cartCost}
<button  onclick="remove()" style="color:white; background:red; padding:5px; border:none; position:relative; margin-left:30px; width:100px; font-size:10px;" > CLEAR BASCKET</button>


<form style="display:flex;flex-direction:column;" id="form" action="https://formsubmit.co/smartcomps7@gmail.com"  method="POST">
    <input type="text" name="_honey" style="display:none;">  
    <input type="hidden" name=_captcha" value="false"> 

<h1   style="margin:10px; border-top:2px solid black; color:black; display:flex; justify-content:center;align-items:center;" > BILLING DETAILS</h1>
    <input  style="margin:10px;" type="text" name="first&nbsp;name" id="fname" required placeholder="First Name"/>
    <input  style="margin:10px;" type="text" name=" last&nbsp;name" id="lname" required placeholder="last Name"/>
    <input  style="margin:10px;" type="email" name=" email&nbsp;adress" id="email" required placeholder="email adress"/>
    <input  style="margin:10px;" type="number" name="mobile&nbsp;number" id="mobile" required placeholder="mobile number"/>
    <input  style="margin:10px;" type="text" name=" county" id="county" required placeholder="county e.g Nairobi"/>
    <input  style="margin:10px;" type="text" name=" estate/street" id="estate" required placeholder="street/estate"/>
    <input  style="margin:10px;" type="text" name=" apartment&nbsp;name/number" id="apartment"  placeholder="apartment name/number"/>
    <textarea name="additional&nbsp;details" id="additional details" style="margin:10px;" placeholder="additional details" cols=10 rows=10></textarea>

    <textarea  name="items&nbsp;ordered" id="items" style=" opacity:0; margin:10px;" readonly  >${document.querySelector('.products').textContent}</textarea>

    <button type="submit"  style="color:white; background:dodgerblue; position:relative; right:10px;padding:5px; border:none;"> proceed to check out</button>
    
    </form>
    `





}

}



function remove(){

    localStorage.clear()
    document.getElementById('main').innerHTML=`<p style=" color:red;"> bascket cleared!! </p>`
    document.querySelector('#text').style.display='none'
    document.querySelector('#form').style.display='none'
    
}






onLoadCartNumbers()
displayCart()

