// 1. 获取数据库引用
const DB = wx.cloud.database().collection("_Lian")
let id = ""
let constellation = ""

Page({
  data: {
    name: "",
    age: "",
    constellation: "",
    hobby: "",
    newData: [],
    oldId: id,
    oldConstellation: constellation
  },
  // 清空
  clear(callback) {
    this.setData({
      name: "",
      age: "",
      constellation: "",
      hobby: "",
      oldId: "",
      oldConstellation: ""
    }, () => {
      callback && callback()
    })
  },
  // name
  nameInp: function (event) {
    this.setData({
      name: event.detail.value
    })
  },
  // age
  ageInp: function (event) {
    this.setData({
      age: event.detail.value
    })
  },
  // ctnInp
  ctnInp: function (event) {
    this.setData({
      constellation: event.detail.value
    })
  },
  // loveInp
  loveInp: function (event) {
    this.setData({
      hobby: event.detail.value
    })
  },
  // updateInp
  upInp: function (event) {
    id = event.detail.value
  },
  // 需要修改的数据
  updatConstellation: function (event) {
    constellation = event.detail.value
  },
  // 要删除的DataID
  delInput: function (event) {
    id = event.detail.value
  },
  // 网络请求
  addDataList: function () {
    if (this.data.name && this.data.age && this.data.constellation && this.data.name && this.data.hobby) {
      let that = this
      DB.add({
        data: {
          name: this.data.name,
          age: this.data.age,
          constellation: this.data.constellation,
          hobby: this.data.hobby
        },
        success: function (res) {
          console.log("添加成功", res)
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000

          })
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
          that.clear(function () {
            console.log(that.data)
          })
        },
        fail(res) {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
            duration: 2000

          })
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
        }
      })
    } else {
      wx.showToast({
        title: '您还有信息没填写',
        icon: 'none',
        duration: 2000

      })
      setTimeout(function () {
        wx.hideToast()
      }, 3000)
    }

  },
  getDataList() {
    const _this = this
    DB.get({
      success: function (res) {
        let dataList = res.data
        console.log(dataList);
        if (dataList.length) {
          _this.setData({ newData: dataList })
        }
      },
      fail(res) {
        console.log("查询失败", res)
      }
    })
  },
  modifyDataList: function () {
    let _this = this
    DB.doc(id).update({
      data: {
        constellation: constellation
      },
      success(res) {
        console.log("修改成功", res);
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
        _this.clear()
        _this.getDataList()
      },
      fail(res) {
        console.log("修改失败", res);
      }
    })
  },
  deleteDataList: function () {
    DB.doc(id).remove({
      success: function (res) {
        console.log("删除成功", res)
      },
      fail(res) {
        console.log("删除失败", res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    _this.getDataList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this
    _this.getDataList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})