//Create variables here
var database,foodStock;
var dog,dogImage,dogImage1,dog1;
var food;//value 20
var feedPet,addFoods;
var fedTime,lastFed;
var foodObject;

function preload()
{
  //load images here
  dogImage = loadImage("dogImg.png");
  dogImage2 = loadImage("dogImg1.png");  
}

function setup()
{
  database=firebase.database();
  console.log(database);

  createCanvas(800, 700);

  dog = createSprite(650,350,20,20);
  dog.addImage("hello",dogImage);
  dog.scale = 0.3;

  foodObject = new Food();
  

  feedPet = createButton("Feed The Dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedFood);

  addFoods= createButton("Add Food");
  addFoods.position(800,95);
  addFoods.mousePressed(addFood);
  
  foodStock=database.ref('Food'); // == food in database which is 20.
  foodStock.on("value",readStock); // updating value wheneever it is changed in foodStock  by observing and tellng readStock to update.
  feedPet=database.ref('addFood'); // == food in database which is 20.
  feedPet.on("value",readStock); // updating value wheneever it is changed in foodStock  by observing and tellng readStock to update.
  
}

function draw() 
{  
  background(46, 139, 87);

  foodObject.display();
  push();


  textSize(20);
  fill(0);
  text (" score : " + food,50,65);
  
  pop();

 

  drawSprites();
  //add styles here




}
function readStock(data)
{
  //the value from the database.
    food=data.val();
    console.log(food);

   // addFoods=data.val();
    foodObject.updateFoodStock(food);
    //console.log(addFood);
}
//function writeStock(x) 
//{
    //Writing things into the database.
    /*if (food <= 0) {
      food = 20;
    } else {
      food  = food-1;
    }
   /* database.ref('/').update({
    Food : food,});

    database.ref('/').update({
      addFood : addFood,});
      */
//}
function addFood() 
{
  food++;
  database.ref('/').update({
  Food : food,});
}

function feedFood() 
{
  dog.addImage("happy dog",dogImage2);
  dog.scale = 0.3;

  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref('/').update({
  Food : foodObject,});
}




