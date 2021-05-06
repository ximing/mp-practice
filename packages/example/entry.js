/**
 * Created by ximing on 2018/12/7.
 */
module.exports = {
  router: [
    {
      root: '',
      pages: {
        // key路由跳转的页面：value源代码所在位置
        'pages/main/index': '/pages/main/index',
      },
    },
  ],
  networkTimeout: {
    request: 30000,
    connectSocket: 30000,
  },
  debug: false,
  navigateToMiniProgramAppIdList: [],
  permission: {
    'scope.userLocation': {
      desc: '为便于为您定位附近门店',
    },
  },
};
