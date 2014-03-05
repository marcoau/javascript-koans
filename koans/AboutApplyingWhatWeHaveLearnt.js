var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var productList = Object.keys(products);
      
      productsICanEat = _(products).filter(function(item) {
        return !(item.containsNuts) && _(item.ingredients).all(function(j){
          return j !== "mushrooms";
        });
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    /* try chaining range() and reduce() */
    var sum = _.range(1000)
                  .filter(function(i){return i % 3 === 0 || i % 5 === 0;})
                  .reduce(function(num, i){return num + i;}, 0);
                  
    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    var count = function(ingredient){
      var ingredientList = _(products).chain()
                            .map(function(i){return i["ingredients"];})
                            .flatten()
                            .filter(function(i){return i === ingredient;});

      return ingredientList.length;
    };

    expect(ingredientCount['mushrooms']).toBe(count['mushrooms']);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  //This solution needs Underscore.js to run properly.
  it("should find the largest prime factor of a composite number", function () {
    
    var primeFactor = function(num){

      var answer = 0;
      var primeList = [2];
      
      for(var i = 3; i * i <= num; i += 2){

        if( _(primeList).all( function(j) {return i % j !== 0;} ) ){
          primeList.push(i);

          if(num % i === 0){
            answer = i;
          }
        }
      }
      
      return answer;
    };
  
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    var isPalindrome = function(num) {
      var numString = String(num);
      return numString === numString.split("").reverse().join("");
    };

    var largestPalindrome = function() {
      var palindromeList = [];
      for (var i = 999; i > 100; i--){
        for (var j = 999; j >= i; j--){
          if (isPalindrome(i * j)){
            palindromeList.push(i * j);
          }
        }
      }
      return Math.max.apply(Math, palindromeList);

    };

    largestPalindrome();
    
  });

   //This solution needs Underscore.js to run properly.
  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

    var multiple = function(arr){
      return arr.reduce(function(i, init){return i * init},1);
    }

    var primeBelowMultiple = function(num){
      primeList = [2];
      for (var i = 3; i < num; i++){
        if( _(primeList).all( function(j) {return i % j !== 0;} ) ){
          primeList.push(i);
        }
      }
      return multiple(primeList);
    };

    var smallestDivisible = function(num){
      var multiplier = primeBelowMultiple(num);
      var max = multiple(_.range(1,num+1));
      for (var i = 1; multiplier * i < max; i++){
        if (_(_.range(1,num+1)).all(function(j){return (multiplier * i) % j === 0;})){
          return multiplier * i;
        }
      }
      return "fail";
    };

    smallestDivisible(20);

  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var sumSquare = function(arr){
      return arr.map(function(i){return i * i;}).reduce(function(i, init){return i + init;});
    };

    var squareSum = function(arr){
      var sum = arr.reduce(function(i, init){return i + init;});
      return sum * sum;
    };

    var sumDifference = function(arr){
      return squareSum(arr) - sumSquare(arr);
    };
    
  });

  //Use counter as it is faster than primeList.length.
  it("should find the 10001st prime", function () {
    var primeNumber = function(num){
      primeList = [2];
      var counter = 1;
      for (var i = 3; counter < num; i++){
        if( _(primeList).all( function(j) {return i % j !== 0;} ) ){
          primeList.push(i);
          counter++;
        }
        if(counter === num){
          return i;
        }
      }
    };

    primeNumber(10001);

  });
  
});
