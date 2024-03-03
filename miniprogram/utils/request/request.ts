//导入登录方法

//基础路径
const baseUrl = "https://api.xiaopaocampus.cn";


/**
 * 封装wx.request,请求拦截器，响应拦截器，并对各种status进行处理
 * 时间：2023-10-03
 * @param public
 * @param string url 请求地址
 * @param array data 请求数据
 * @param string method 请求方法
 * @return array
 */

//无需token的接口
var exceptionAddrArr = ['/account/user/login'];

//请求头处理函数
function CreateHeader(url: string, dataType: string) {
  //token
  const token = wx.getStorageSync('token');
  let header = {};
  let contentType = "";
  let authorization = "";
  if (dataType == 'form') contentType = 'application/x-www-form-urlencoded';
  if (dataType == 'json') contentType = 'application/json';
  if (exceptionAddrArr.indexOf(url) == -1) authorization = 'Bearer ' + token;//排除请求的地址不需要token的地址
  header = {
    'Authorization': authorization,
    'content-type': contentType
  }
  return header;
}

//POST，数据放在body中
/**
 * @param url 请求地址
 * @param data 请求参数
 * @param type 请求类型
 * res.code状态解释
 * 200 请求成功！
 * 500 服务器异常！
 * 401 token失效|未登录
 * 404 找不到网页
*/
function GouGuTeaRequest(url: string, data: any, type: "POST" | "GET" | "PUT" | "DELETE", dataType: string): any {
  let isEnable = wx.getStorageSync("userInformation").isEnable;
  if (isEnable != 1&&isEnable) {
    wx.showToast({
      icon: "none",
      title: "您的账号已注销"
    })
  } else {
    if (url != "/chat/send") {
      wx.showLoading({
        title: "加载中"
      });
    }

    let header = CreateHeader(url, dataType);
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data: data,
        header: header,
        method: type,
        success: ((res: any) => {
          var msg = res.data.msg;
          var code = res.data.code;
          //先判断请求状态
          if (res.statusCode != 200) {
            setTimeout(_ => {
              wx.hideLoading();
              wx.showToast({
                icon: "none",
                title: "请求失败",
              });
            }, 500)
          } else {
            switch (code) {
              case 200:
                wx.hideLoading();
                resolve(res.data);
                break;
              case 401:
                //getWeiChatLogin();//重新登录刷新token
                break;
              case 400:
                msg = "参数错误";
                break;
              default: reject(res);
            }
            if (code != 200 && code != 401) {
              if (msg === "access_token无效") msg = "请重新进入小程序";
              setTimeout(_ => {
                wx.hideLoading();
                wx.showToast({
                  icon: "none",
                  title: msg,
                });
              }, 500)
            }
          }

        }),
        fail: (err => {
          setTimeout(_ => {
            wx.hideLoading();
            wx.showToast({
              icon: "none",
              title: '网络出问题了喔',
            });
          }, 500)
          reject(err)
        })
      })
    })
  }

}


export {
  GouGuTeaRequest,
}

