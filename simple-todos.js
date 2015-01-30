Tasks = new Mongo.Collection("tasks");
// console.log( Tasks ); 

if (Meteor.isClient) {
	// counter starts at 0
	// Session.setDefault('counter', 0);


	Template.body.events({
		"change .hide-completed input": function (event) {
			console.log('hello');
			Session.set("hideCompleted", event.target.checked);
		}
	});

	Template.body.helpers({
		// tasks: function () {
		//   // return Tasks.find({});
		//   return Tasks.find({}, {sort: {createdAt: -1}});
		// },
		totalCount: function(){

			return Tasks.find({}).count();

		},
		tasks: function(){

			if (Session.get("hideCompleted")) {

				// If hide completed is checked, filter tasks
				return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});

			}else{

				// Otherwise, return all of the tasks
				return Tasks.find({}, {sort: {createdAt: -1}});

			}
		},
		hideCompleted: function(){

			return Session.get("hideCompleted");
		},
		incompleteCount: function(){ // Add to Template.body.helpers

			return Tasks.find({checked: {$ne: true}}).count();

		},
		completedCount: function(){

			return ( Tasks.find({}).count() - Tasks.find({checked: {$ne: true}}).count() );

		}

	});


	Template.body.helpers({
		tasks: function () {
			if (Session.get("hideCompleted")) {
				// If hide completed is checked, filter tasks
				return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
			} else {
				// Otherwise, return all of the tasks
				return Tasks.find({}, {sort: {createdAt: -1}});
			}
		},
		hideCompleted: function() {
			return Session.get("hideCompleted");
		}
	});


	// Events
	Template.listItem.events({
		"click .toggle-checked": function() {
			// Set the checked property to the opposite of its current value
			Tasks.update(this._id, {$set: {checked: ! this.checked}});
		},
		"click .delete": function() {
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


if(Meteor.isServer) {
	Meteor.startup(function () {
		// code to run on server at startup
	});
}





