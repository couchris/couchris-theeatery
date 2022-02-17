

class Food{
  constructor(id, name, img, description, ratings, price, instock, qty){
      this.fId = id;
      this.fName = name;
      this.fImg = img;
      this.fDesc = description;
      this.fRatings = ratings;
      this.fPrice = price;
      this.fStock = instock;
      this.fQty = qty;
  }
}

var foodList = new Array();
var cartList = new Array()


const URL = "menu.json";

$.ajax({
  type: "GET",
  url: URL,
  dataType: "json",
  success: fetchAllFood,
  error: function(request, error){
    alert("Unable to fetch data " + error);
  }
});



function fetchAllFood(allFood){
    console.log("Foods fetched " + allFood);

    $("#data").html("");

    for (i=0; i < allFood.length; i++){
      $("#data").append(
        '<div id="food' + allFood[i].Id +'" class = "column allfoods">' +
        '<h4>' + allFood[i].Title + '</h4>' +
        '<img src=" ' + allFood[i].Image + '" class="imglarge" >' + '</a>' +
        '<p>Description: ' + allFood[i].Description + '</p>' +
        '<p>Rating: ' + allFood[i].Ratings + '/5</p>' +
        '<p>Price: $' + allFood[i].Price + '</p>' +
        '<button class="button-24" role="button" id= "addCart" onclick="addToCart('+allFood[i].Id+')" >Add To Cart</button>' +
        '<button class="button-24" role="button" id= "rmv" onclick="RemoveFromCart('+allFood[i].Id+')" >Remove</button>' +
        '<select name="qty" id="qty' + allFood[i].Id + '">' + 
        '<option value="1">1</option>' +
        '<option value="2">2</option>' +
        '<option value="3">3</option>' +
        '<option value="4">4</option>' +
        '<option value="5">5</option>' +
        '<option value="6">6</option>' +
        '<option value="7">7</option>' +
        '<option value="8">8</option>' +

        '</select>' +
        '</div><br>',

        );

        $("#rmv",`#food${allFood[i].Id}`).hide();

        if("cartOfFood" in localStorage){
          const cart = JSON.parse(localStorage.getItem("cartOfFood"));

          cart.forEach(food => {

            $("#addCart",`#food${food.fId}`).hide();
            $(`#qty${food.fId}`).hide();
            $("#rmv",`#food${food.fId}`).show();


          });

        }
        
        foodList.push(new Food(allFood[i].Id,allFood[i].Title, allFood[i].Image, allFood[i].Description, allFood[i].Ratings, allFood[i].Price, allFood[i]["In-Stock"], 
        0));
      
        if(allFood[i]["In-Stock"] == false){
          
          $("#addCart",`#food${allFood[i].Id}`).hide();
          $(`#qty${allFood[i].Id}`).hide();
          $("#rmv",`#food${allFood[i].Id}`).hide();
      
        };
    
          };

          console.log(foodList);
      
  };
        

  function addToCart(id) {
    console.log("food item clicked" + id);

      var food = foodList.find(elem => elem.fId === parseInt(id));

      var qty_select = document.getElementById("qty" + id).value;
      console.log(qty_select)
      
      food.fQty = qty_select;

      console.log(food);
    
      console.log($("#addCart",`#food${id}`).html());

      saveFood(food);

      $("#addCart",`#food${id}`).hide();
      $(`#qty${id}`).hide();
      $("#rmv",`#food${id}`).show();
      
    }


function saveFood(newFood) {
  console.log("saveFood ", newFood);

  
  if ("cartOfFood" in localStorage) {
      console.log("The cart already exists in local storage");

      const cart = JSON.parse(localStorage.getItem("cartOfFood"));
      console.log("Existing List : ", cart);

      cart.push(newFood);

      localStorage.setItem("cartOfFood", JSON.stringify(cart));
      
      } else {
      console.log("No cart was found. Created a new list of cart items");
      cartList.push(newFood);

      localStorage.setItem("cartOfFood", JSON.stringify(cartList));
  }
}


function RemoveFromCart(id) {
    
  console.log("Foodto be removed ", $(`#cart${id}`));

  $(`#cart${id}`).remove();

  const cart = JSON.parse(localStorage.getItem("cartOfFood"));

  var foodToDelete = cart.findIndex(elem => elem.fId === parseInt(id));

    cart.splice(foodToDelete, 1);

    localStorage.setItem("cartOfFood", JSON.stringify(cart));
  

    $("#addCart",`#food${id}`).show();
    $(`#qty${id}`).show();
    $("#rmv",`#food${id}`).hide();

}




