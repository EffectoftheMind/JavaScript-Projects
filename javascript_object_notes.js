//strings method
/* var doh = "dough boy";
console.log(doh.toUpperCase());   //python equivalent .upper
console.log(doh.split(" "));
console.log(doh.charAt(0));       //returns character at chosen position


//objects
var person = {name:"Kim",age:88};
console.log(person.name);
console.log(person.age);

//add properties to the objects
person.title = "Mrs.";
person.gender = "Female";
console.log(person);

//modifying properties
person.name = "Kimberly";
console.log(person);

//deleting properties
delete person.title;
console.log(person);

//comparing properties
console.log(person.name.length > person.gender.length); */

//array of objects
var people = [
  {name:"Kim",age:88},
  {name:"Bob",age:28},
  {name:"Bill",age:38},
  {name:"George",age:48}
  ];
  
console.log(people[0].name);

//create a loop to print the names 
for(x=0;x<people.length;x++){
console.log(people[x].name);
}
