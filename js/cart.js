$(function() {

  displayCart();

  CalculateBill();
  
  
  });


  function displayCart(){
    

  const cart = JSON.parse(localStorage.getItem("cartOfFood"));
  
  if ("cartOfFood" in localStorage) {
      
    const cart = JSON.parse(localStorage.getItem("cartOfFood"));

    if(cart.length == 0){
      $("#cartdata").append(
        '<h2>Cart is Empty</h2>'
      );
      $("#orderTable").hide();
    } else {

    console.log(cart);

      cart.forEach(food => {
      console.log(food.fId);
            $("#cartdata").append(
              '<div id="cart' + food.fId +'" class = "cart">' +
              '<h4>' + food.fName + '</h4>' +
              '<img src=" ' + food.fImg + '" class="imgcart" >' + '</a>' +
              '<p>Price: $' + food.fPrice + '</p>' +
              '<p>Qty: ' + food.fQty + '</p>' +
              '<select name="qty" onchange="ChangeQty('+food.fId+')" id="qty' + food.fId + '" selected="' + food.fQty + '">' +
              '<option value="1">1</option>' +
              '<option value="2">2</option>' +
              '<option value="3">3</option>' +
              '<option value="4">4</option>' +
              '<option value="5">5</option>' +
              '<option value="6">6</option>' +
              '<option value="7">7</option>' +
              '<option value="8">8</option>' +

              '</select>' +
              '<br><br>' +
              '<button class="button-24" role="button" id="rmv" onclick="RemoveFromCart('+food.fId+')" >Remove</button>'+
              '</div><br>'

            );
            
            $(`#qty${food.fId}`).val(food.fQty);

        });
      }
            
    } else {
      $("#cartdata").append(
        '<h2>Cart is Empty</h2>'
      );
      }
    }
  

  function RemoveFromCart(id) {
    
    console.log("Foodto be removed ", $(`#cart${id}`));

    $(`#cart${id}`).remove();

    const cart = JSON.parse(localStorage.getItem("cartOfFood"));

    var foodToDelete = cart.findIndex(elem => elem.fId === parseInt(id));

    cart.splice(foodToDelete, 1);

    localStorage.setItem("cartOfFood", JSON.stringify(cart));
    
    CalculateBill();
  }

  function ChangeQty(id){

    console.log(id);

    const cart = JSON.parse(localStorage.getItem("cartOfFood"));

    var foodUpdate = cart.findIndex(elem => elem.fId === parseInt(id));

    cart[foodUpdate].fQty = parseInt($(`#qty${id}`).val());

    localStorage.setItem("cartOfFood", JSON.stringify(cart));

    $(`#cartdata`).html("");

    displayCart();
    CalculateBill();

  }

  function CalculateBill(){
    
    if ("cartOfFood" in localStorage) {
    const cart = JSON.parse(localStorage.getItem("cartOfFood"));


    
    var subtotal = 0;
    var discount;
    const HST = 0.13;
    var tax;
    var discAmt = 0;
    var total;

    cart.forEach(food => {

      subtotal += food.fQty * food.fPrice;

    });

    if (subtotal >= 100){
      discount = 0.30;
    }else if(subtotal >= 70 ){
      discount = 0.20;
    }else if(subtotal >= 30 ){
      discount = 0.10;
    }else if(subtotal < 30 ){
      discount = 0;
    }

    discAmt = discount * subtotal;

    tax = HST * subtotal;

    total = (subtotal - discAmt) + tax;

    $("#orderTable").html("");

    $("#orderTable").append(

    '<tr>' +
    '<td>Subtotal: </td>' +
    '<td>$' + subtotal.toFixed(2) + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Discount: </td>' +
    '<td>$' + discAmt.toFixed(2) + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td>HST: </td>' +
    '<td>$' + tax.toFixed(2) + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Total: </td>' +
    '<td>$' + total.toFixed(2) + '</td>' +
    '</tr>' +
    '<br><br><br><br><br><br>'

    );

    } else{
      $("#orderTable").hide();
      
    }
  }
