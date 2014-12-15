Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }

    var errors = validatePost(postProperties);
    if (errors.title || errors.url)
      return Session.set('postFormErrors', errors);

    Meteor.call('postEdit', currentPostId, postProperties, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result) {
        Session.set('updated', result);
        Session.set('postFormErrors', {});
      }

      Router.go('postPage', {_id: result._id});  
    });

  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});

Template.postEdit.helpers({
  updated: function() {
    var postStatus =  Session.get('updated');
    if(postStatus) {
      Session.set('postFormErrors', {});
      return postStatus.updated;
    } else {
      return false;
    }
  }
});