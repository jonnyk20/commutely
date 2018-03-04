/* global firebase */
export default class NotificationResource {
  allTokens = [];
  tokensLoaded = false;
  constructor(messaging, database) {
    this.messaging = messaging;
    this.database = database;
    messaging.onMessage(message => {
      console.log('message received');
      console.log(message);
    });
    try {
      this.messaging
        .requestPermission()
        .then(res => {
          console.log('Permission granted');
          return this.saveTokenToServer();
        })
        .catch(err => {
          console.log('no access', err);
        });
    } catch (err) {
      console.log('No notification support. ', err);
    }
    this.setupTokenRefresh();
    this.database.ref('fcmTokens').on('value', snapshot => {
      this.allTokens = snapshot.val();
      this.tokensLoaded = true;
    });
  }

  notify = message => {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        reg.showNotification(message);
      });
    }
  };

  setupTokenRefresh() {
    this.messaging.onTokenRefresh(() => {
      this.saveTokenToServer();
    });
  }

  saveTokenToServer() {
    console.log('savign token to server');
    this.messaging.getToken().then(res => {
      if (true /* this.tokensLoaded */) {
        const existingToken = this.findExistingToken(res);
        if (existingToken) {
          console.log('exists');
          // If it exists, replace
          firebase.database().ref(`/fcmTokens/${existingToken}`).set({
            token: res //,
            // user_id: this.user.uid
          });
        } else {
          console.log('doesnt exist');
          this.registerToken(res);
        }
      }
    });
  }

  findExistingToken(tokenToSave) {
    for (let tokenKey in this.allTokens) {
      const token = this.allTokens[tokenKey].token;
      if (token === tokenToSave) {
        return tokenKey;
      }
    }
  }

  changeUser(user) {
    //this.user = user;
    //this.saveTokenToServer();
    console.log('change user');
  }

  registerToken(token) {
    firebase
      .database()
      .ref('fcmTokens/')
      .push({
        token: token //,
        // user_id: this.user.uid
      })
      .then(res => {
        //console.log(res)
      })
      .catch(err => console.log(err));
  }
}
