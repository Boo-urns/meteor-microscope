Template.userProfile.helpers({
	user: function(){
		console.log(Meteor.users.findOne({_id: Meteor.userId()}));
		return Meteor.users.findOne();
	},
	// google: function() {
	// 	console.log(this.user());
	// 	if(this.user.services.google !== undefined) {
	// 		return this.user.services.google.email;
	// 	}
	// }

});