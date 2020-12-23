//index.js
const app = getApp()
Page({
  data: {
    chooseImages:[]
  },
  onLoad: function() {
    wx.cloud.callFunction({
      name:'add',
      data:{
        a:10,
        b:20
      },
      success:function(res){
        console.log(res)
      }
    })
  },
  _getUserInfo(evt){
    // 用户在授权窗口操作之后的回调函数，如果用户已经授权，则不会弹出用户授权的弹窗
    console.log(evt);
  },
  checkUserinfo(){
    wx.getSetting({
      success:(res)=>{
        const result=res.authSetting["scope.userInfo"];
        if(result){
          wx.getUserInfo({
            success:(res)=>{
              console.log(res);
            }
          })
        }else{
          console.log('没有授权')
          // 授权界面必须要绑定在界面上，点击之后触发,可以自己定义一个组件弹窗，让用户点击授权；
          // <button open-type="getUserInfo" bindgetuserinfo="_getUserInfo">获取用户信息</button>
        }
      }
    })
  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        
      },
    })
  },
  // 文本检测和图片视频检测
  checkMsgContent(qContent,successCB){
    // 文本检测
    console.log(46);
    wx.showLoading({
      title: '文本检测中...',
    });
    wx.cloud.callFunction({
      name:'contentCheck',
      data:{
        textContent:qContent
      },
      success:res=>{
        wx.hideLoading();
        const success=res.result.success;
        console.log(success);
        // 0是检测不通过，1是通过
        if(success){
          // 开始图片检测
          successCB&&successCB();
        }else{
          // 提示用户
          wx.showToast({
            title:'文本内容违规'
          })
        }
      },
      fail:err=>{
        console.log(err);
      }
    })
  },
  checkImagesafe(completeCB){
    // 1.先把图片上传到云存储=>fileID;
    let promiseArr=[];//上传图片之后的promise实例
    for(const item of this.data.chooseImages){
      // 重名文件会导致覆盖，所以要保证文件url的唯一性
      const extName=/\.\w+$/.exec(item)[0];//图片后缀
      const urlName='questionsImages/'+Date.now()+Math.random()*1000+extName;
      let promose=wx.cloud.uploadFile({
        cloudPath:urlName,
        filePath:item
      });
      promiseArr.push(promose);
      console.log(1322);
    };
    Promise.all(promiseArr).then(res=>{
      const fileIDs=res.map(v=>{
        return v.fileID
      })
      wx.cloud.callFunction({
        name:'imagesCheck',
        data:{
          fileIDs:fileIDs
        },
        success:res=>{
          console.log(res);
          completeCB&&completeCB(res.result.success);
        },
        fail:err=>{
          console.log(err);
        }
      })
    }).catch(err=>{
      console.log('有些图片上传失败',err)
    })
  },
  handleMsg(){
    const qContent='XIJIN';
    this.checkMsgContent(qContent,()=>{
      console.log('文本检测成功')
      this.checkImagesafe(isSafe=>{
        console.log(isSafe);
      })
    })
  },
   handleChooseImage(evt){
    wx.chooseImage({
      // count:还能选择图片的数量,
      count:5-this.data.chooseImages.length,
      success:(res)=>{
        console.log("选中图片结果",res);
        this.setData({
          chooseImages:this.data.chooseImages.concat(res.tempFilePaths)
        });
        console.log(this.data.chooseImages.length);
      }
    });
    wx.chooseImage({
      success:(res)=>{
        console.log(res)
      }
    })
  }
  
})
