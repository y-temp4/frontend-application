/* eslint-disable */

export default ({ app }) => {
  /*
  ** クライアントサイドかつプロダクションモードでのみ実行
  */
  // if (process.env.NODE_ENV !== 'production') return

  (function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({
      'gtm.start':
        new Date().getTime(), event: 'gtm.js'
    }); var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'GTM-5DZNDNB');
  /*
  ** ルートが変更されるたびに毎回実行（初期化も実行される）
  */
  app.router.afterEach((to, from) => {
    const currentUser = localStorage.getItem(
      `CognitoIdentityServiceProvider.${process.env.CLIENT_ID}.LastAuthUser`
    )
    console.log(currentUser)
    window.dataLayer = window.dataLayer || []
    dataLayer = [{ userID: currentUser }]
    dataLayer.push(to.gtm || { pageType: 'PageView', pageUrl: to.fullPath })
  })
}
