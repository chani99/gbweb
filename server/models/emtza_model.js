var model = require('nodejs-model');

//create a new model definition _User_ and define _name_/_password_ attributes 
var Emtaz = model("Emtza")
.attr('number', {
 validations: {
   presence: {
     message: 'חובה למלא מספר גליון!'
   }
 }
})
.attr('date', {
    validations: {
      presence: {
        message: 'חובה למלא תאריך!'
      }
    }
   })
   .attr('hebrew_date', {
    validations: {
      presence: {
        message: 'חובה למלא תאריך עברי!'
      }
    }
   });


var u1 = User.create();
//getters are generated automatically 
u1.number('1020');
u1.date('8.1.2018');
u1.hebrew_date('כ"ב טבת תשע"ח');



console.log(u1.number());
//prints _foo_ 

//Invoke validations and wait for the validations to fulfill 
u1.validate(function() {
 if (u1.isValid) {
    //validated, perform business logic 
 } else {
    //validation failed, dump validation errors to the console 
    console.log(p1.errors)
 }
});

//get object as a plain object, ready for JSON 
console.log(u1.toJSON());
//produces: { name: 'foo' } 

//now also with attributes that were tagged with 'private' 
console.log(u1.toJSON('private'));
//produces: { name: 'foo' } { password: 'password' } 
