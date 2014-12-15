Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});
Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});
Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  },
  postEdit: function(postId, postAttributes) {
  	check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });
    
    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if( postWithSameLink ) {
	    if (postWithSameLink._id !== postId ) {
	      return {
	        postExists: true,
	        _id: postWithSameLink._id
	      }
	    }
    }

    Posts.update(postId, {$set: postAttributes}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } 
    });

    return { 
    	updated: true
    }
  }
});