Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('comments', function(postId) {
  check(postId, String);
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});

Meteor.publish("userData", function () {
  if (this.userId) {
  	console.log(Meteor.users());
  	return Meteor.users.find({_id: this.userId});
    //return Meteor.users.find({_id: this.userId},
    //                         {fields: { 'email': services.google.email, 'things': 1}});
  } else {
    this.ready();
  }
});



Meteor.publish('singleUser', function(userId) {
   return Meteor.users.find(userId);
});