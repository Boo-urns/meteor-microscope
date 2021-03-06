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

validatePost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a headline";
  if (!post.url)
    errors.url =  "Please fill in a URL";
  return errors;
}


Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    var errors = validatePost(postAttributes);
    if (errors.title || errors.url)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    var user = Meteor.user();
    var author = user.username !== undefined ? user.username : user.profile.name;

    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: author, 
      submitted: new Date(),
      commentsCount: 0
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
    
    var errors = validatePost(postAttributes);
    if (errors.title || errors.url)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

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
    	_id: postId,
    	updated: true
    }
  }
});