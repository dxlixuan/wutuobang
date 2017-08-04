const TEST_HOST_LIST = [
  '192.168.1.2',
  '192.168.',
  '127.0.0.',
  '0.0.0.',
  'localhost',
  'LOCALHOST'
]
let testMode = false
let config = {}
TEST_HOST_LIST.forEach(i=>{
  window.location.hostname.indexOf( i ) > -1 && (testMode = true) && console.log('静态文件运行在', i, ',启用测试数据!')
})
config = {
  testMode: testMode,
  productInfo:{
    name: '点点云科室',
    prefix: '',
    suffix: '管理系统',
    version: '',
    developer: [
      {
        name: 'yezq',
        email: 'admin@yeernet.com',
        position: 'frontEnd'
      }
    ],
    createdAt: '2017-02-20',
    lastModifyTime: ''
  }
}
export default config
