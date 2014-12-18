Accounts.ui.config({
  requestPermissions: {
    facebook: ['email', 'user_likes'],
    google: ['https://www.googleapis.com/auth/userinfo.email']
  },
  requestOfflineToken: {
    google: true
  },
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

// ServiceConfiguration.configurations.remove({
//   service: "google"
// });
// ServiceConfiguration.configurations.insert({
//   service: "google",
//   clientId: "101227131817-0rma420an46vmk7v63qt0srulu6ldtpg.apps.googleusercontent.com",
//   secret: "e70rrVQme8UDpOMdCGjNsHzf"
// });