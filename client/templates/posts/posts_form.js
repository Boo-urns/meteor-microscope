Template.postForm.created = function() {
  Session.set('postFormErrors', {});
}
Template.postForm.helpers({
  errorMessage: function(field) {
    return Session.get('postFormErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postFormErrors')[field] ? 'has-error' : '';
  }
});