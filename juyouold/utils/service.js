export function getNextAreaList(areaId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://api.yytianqi.com/forecast7d?city=39.9',//你的接口地址
     param: {},//参数
        success(res) {
        
        let list = []
        for (let item of res.data) {
          console.log(item.id);
          list.push({
            id: item.id,//id对应地区ID
            name: item.name//name对应地区名称
          })
        }
        //成功回调 要确保数组中的对象有id和name字段
        resolve(list);

      },
      fail(err) {
        //失败回调
        reject(err)

      }

    })
  })
}