# 点点云科室 - Vue

## 数据相关 ( 必读 )
当`location.hostname`包含 `129.168.` 或者 `127.0.0.1` 或者 `localhost` 时, 数据使用的是测试服的, 使用其他域名时数据更改会**即时反映在正式服上**

此配置可在 `src/utils/confing.js` 中更改

## keng
部分必须参数在接口文档中未列出, 比如拉取成员列表时服务端需要userId(现在已不需要)等

因此不要将看似多余的传递参数删除, 不然放到正式服上随时可能出问题

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## account

测试服 ddy ******

正式服 ddyks ******


## todo

登录相关用户体验不佳,需要修改

路由优化
