// Local (client-only) collection
// null collection name = client side only
Errors = new Mongo.Collection(null);

throwError = function(message) {
  Errors.insert({message: message});
};