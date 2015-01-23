Tasks = new Mongo.Collection("tasks");
console.log( Tasks ); 

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

      // Select IDs
      var field_task = document.getElementById("task");

      // Values
      var tast_text = field_task.value;

      // Store to Database
      Tasks.insert({
        text: tast_text,
        createdAt: new Date() // current time
      });

      // Clear form
      field_text.value = "";

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





