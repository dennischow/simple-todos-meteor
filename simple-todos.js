Tasks = new Mongo.Collection("tasks");
// console.log( Tasks ); 

if (Meteor.isClient) {
  // counter starts at 0
  // Session.setDefault('counter', 0);


  Template.body.helpers({
    tasks: function () {
      // return Tasks.find({});
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });


  // Events
  Template.listItem.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });

  // Submit Query to Database
  Template.newTaskForm.events({
    "submit #new-task": function(event){

      // This function is called when the new task form is submitted
      event.preventDefault(); // Applied this made better UX

      // Select IDs
      var taskField = document.getElementById("task");

      // Values
      var taskField_text = taskField.value;

      // Store to Database
      Tasks.insert({
        text: taskField_text,
        createdAt: new Date() // current time
      });

      // Clear form
      taskField.value = "";

      // Prevent default form submit
      return false;
    }
 
  }); 

  $(document).on('ready',function(){
    console.log( 'jQuery Initialized' );
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}





