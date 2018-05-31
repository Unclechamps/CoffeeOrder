let orderList = document.getElementById('orderList')
let listBtn = document.getElementById('listBtn')
let clearBtn = document.getElementById('clearBtn')
let submitOrder = document.getElementById('submitOrder')
let userEmail = document.getElementById('userEmail')
let userOrder = document.getElementById('userOrder')
let lookupByEmail = document.getElementById('lookupByEmail')
let emailLookup = document.getElementById('emailLookup')
let emailDelete = document.getElementById('emailDelete')
let deleteByEmail = document.getElementById('deleteByEmail')

// SUBMIT ORDER //

submitOrder.addEventListener('click', function(){
  let email = userEmail.value
  let drink = userOrder.value
  let coffeeSite = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders/'

  let order = {
    emailAddress : email,
    coffee : drink
  }

fetch(coffeeSite, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(order)
}).then(function(response){
  return response.json()
}).then(function(json){
  console.log(json)
  userEmail.value = ''
  userOrder.value = ''
})
})

// DELETE ORDER BY EMAIL //

deleteByEmail.addEventListener('click', function(){
  emailDelete.innerHTML = ''
  let userEmailLookup = emailDelete.value
  let coffeeSite = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders/'+userEmailLookup

fetch(coffeeSite, {
  method: 'DELETE'
}).then(function(response){
  return response.json()
}).then(function(json){
  console.log(json.message)
  emailDelete.value = ''
  orderList.innerHTML = json.message
})

})


// GET ORDER BY EMAIL //

lookupByEmail.addEventListener('click', function() {
  let coffeeSite = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders/'
  let userEmailLookup = emailLookup.value

  fetch(coffeeSite+userEmailLookup)
  .then(function(response) {
    return response.json()
  }).then(function(user) {
    let orderStatus = `<div>
                        <p>Order ID :   ${user['_id']}</p>
                        <p>Email: ${user['emailAddress']}</p>
                        <p>Order Detail: ${user['coffee']}</p>
                        </div>`

                orderList.innerHTML = orderStatus
                emailLookup.value = ''
  })
})



/// SHOWS THE ORDER LIST //
listBtn.addEventListener('click', function(){

let coffeeSite = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders/'

fetch(coffeeSite)
.then(function(response){
  return response.json()
}).then(function(orders) {

    for(order in orders) {

        let coffeeOrder = `<div>
                            <p>Order ID :   ${orders[order]['_id']}</p>
                            <p>Email: ${orders[order]['emailAddress']}</p>
                            <p>Order Detail: ${orders[order]['coffee']}</p>
                            <hr class="divide">
                            </div>`

          orderList.innerHTML += coffeeOrder
  }
})
})

// CLEARS THE ORDER LIST //
clearBtn.addEventListener('click', function(){
  orderList.innerHTML = ''

})
