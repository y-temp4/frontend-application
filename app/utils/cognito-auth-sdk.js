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

    this.auth.setState('alis')
  }

  setTokens({ lastAuthUser, idToken, accessToken, refreshToken }) {
    const key = `CognitoIdentityServiceProvider.${process.env.CLIENT_ID}`
    const keyWithLastAuthUser = `${key}.${lastAuthUser}`
    localStorage.setItem(`${key}.LastAuthUser`, lastAuthUser)
    localStorage.setItem(`${keyWithLastAuthUser}.idToken`, idToken)
    localStorage.setItem(`${keyWithLastAuthUser}.accessToken`, accessToken)
    localStorage.setItem(`${keyWithLastAuthUser}.refreshToken`, refreshToken)
  }

  getOnSuccessResult() {
    return new Promise((resolve) => {
      this.auth.userhandler = {
        onSuccess: function(result) {
          console.log('onSuccess', result)
          resolve(result)
        },
        onFailure: function(err) {
          console.log(err)
          alert('Error!' + err)
        }
      }
    })
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
    const result = this.auth.parseCognitoWebResponse(curUrl)
    console.log('checkAuth', result)
  }

  logout() {
    this.auth.signOut()
  }
}
