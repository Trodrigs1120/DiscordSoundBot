var fs = require("fs");
var mongojs = require("mongojs");
var dataArr1=[]
var dataArr2=[]
var CharacterHolder=[]
var UrlHolder=[]


var databaseUrl = "characters";
var collections = ["characterData"];
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

input1()

function input1(){
     fs.readFile("characters.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
         }

    //     // Then split it by commas (to make it more readable)
        var  dataArr1 = data.split(",");
      
         for (var i = 0; i<dataArr1.length; i++){
            console.log(dataArr1[i])
            CharacterHolder.push(dataArr1[i])
       }
        middlefunction()
      });
}
function middlefunction(){
    input2()
}

function input2(){
    fs.readFile("urls.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
         //console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr2 = data.split(",");
      
        // We will then re-display the content as an array for later use.
        //console.log(dataArr2);
        // console.log(dataArr2[1])
        for (var i = 0; i<dataArr2.length; i++){
             console.log(dataArr2[i])
             UrlHolder.push(dataArr2[i])
             db.character.insert({name: CharacterHolder[i], url:UrlHolder[i], wins: 0, loses: 0 })
             console.log ("name: " + CharacterHolder[i] + ",   url:" + UrlHolder[i] +", wins: 0, loses: 0" )
            //  if (i=dataArr2.length-1){
            //    console.log("if statement ran")
            //   //  insertIntoDB()
               
            //  }
        }
      });
console.log(CharacterHolder + " this should be urls " +  UrlHolder)

    
}
// need to find a better way to injest, but not at this time more functionality comes first