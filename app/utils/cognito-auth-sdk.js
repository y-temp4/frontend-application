import { CognitoAuth } from 'amazon-cognito-auth-js'

export default class CognitoAuthSDK {
  constructor(identityProvider) {
    this.authData = {
      ClientId: process.env.CLIENT_ID,
      UserPoolId: process.env.USER_POOL_ID,
      AppWebDomain: 'alis-test-narisada-require-email.auth.ap-northeast-1.amazoncognito.com',
      TokenScopesArray: ['openid', 'email', 'profile', 'aws.cognito.signin.user.admin', 'phone'],
      RedirectUriSignIn: 'http://localhost:3000/idpcb',
      RedirectUriSignOut: 'http://localhost:3000/',
      IdentityProvider: identityProvider,
      AdvancedSecurityDataCollectionFlag: false
    }
    this.auth = new CognitoAuth(this.authData)

    this.auth.userhandler = {
      onSuccess: function(result) {
        alert('成功した！！！')
        console.log('onSuccess', result)
      },
      onFailure: function(err) {
        console.log(err)
        alert('Error!' + err)
      }
    }

    this.auth.setState('alis')
  }

  signUp() {
    this.auth.useCodeGrantFlow()
    const session = this.auth.getSession()
    console.log('signUp getSession', session)
    const { username: userId } = session.accessToken.payload
    const {
      email_verified: emailVerified,
      phone_number_verified: phoneNumberVerified
    } = session.idToken.payload
    return { userId, emailVerified, phoneNumberVerified }
  }

  loginByLine() {
    this.auth.useCodeGrantFlow()
    const session = this.auth.getSession()
    console.log('getSession', session)
  }

  checkAuth(curUrl) {
    console.log('checkAuth', curUrl)
    this.auth.parseCognitoWebResponse(curUrl)
  }

  logout() {
    this.auth.signOut()
  }
}
