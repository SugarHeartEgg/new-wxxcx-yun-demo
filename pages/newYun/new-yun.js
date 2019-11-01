// pages/newYun/new-yun.js
Page({
  data() {
    imgUrl: ""
  },
  // 云函数
  addAorB() {
    wx.cloud.callFunction({
      name: "add",
      data: {
        a: 5,
        b: 10
      },
      success(res) {
        console.log("请求成功", res);
      },
      fail(res) {
        console.log("请求失败", res);
      }
    })
  },
  getopenId() {
    wx.cloud.callFunction({
      name: "get-openid",
      success(res) {
        console.log("获取成功", res.result.openid);

      },
      fail(res) {
        console.log("获取失败", res);

      }
    })
  },
  // 数据库API获取Data
  getData() {
    wx.cloud.database().collection("_my-sql").get({
      success(res) {
        console.log("获取成功", res);
      },
      fail(res) {
        console.log("获取失败", res);
      }
    })
  },
  //云函数获取数据库Data
  getYunData() {
    wx.cloud.callFunction({
      // 云函数调用时 ， 必须要把使用的云函数的 文件名给到name值 ， 不然没用
      name: "yun-get-data",
      success(res) {
        console.log("获取成功", res);
      },
      fail(res) {
        console.log("获取失败", res);
      }
    })
  },
  uploadYun() {
    let _this = this
    // 调用api ， 获取本地图片资源 ， 在进行临时地址转换
    wx.chooseImage({
      // 选择张数
      count: 9,
      // 原图 ， 压缩图
      sizeType: ['original', 'compressed'],
      // 从相册选图 ， 使用相机
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        // 再点用上传函数
        _this.uploadImg(tempFilePaths)
      }
    })
  },
  uploadImg(tempFilePaths) {
    let _this = this
    var timestamp = Date.parse(new Date());
    const cloudPath = 'set_up_img/' + timestamp + tempFilePaths.match(/\.[^.]+?$/)[0]
    wx.cloud.uploadFile({
      // 云端的路径
      cloudPath: cloudPath,
      // 临时文件路径（也就是tempFilePaths）
      filePath: tempFilePaths,
      success(res) {
        console.log(res.fileID);
        _this.setData({
          imgUrl: res.fileID
        })
        console.log("上传成功", res);
      },
      fail(res) {
        console.log("上传失败", res);
      }
    })
  }
})