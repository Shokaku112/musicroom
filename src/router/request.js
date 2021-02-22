var $ = require('jquery')
// var index=require('../router/index')
// var router=index.default
// console.log(router)
module.exports = {
  // setcookie(name, data) {
  //    /* eslint-disable */
  //     let length;
  //     let cookie;
  //     var expiredate=new Date(data.exp*1000+60*1000)
  //     var expires = "expires="+expiredate.toUTCString();
  //     console.log("setcookie++++", expiredate);
  //     cookie = name + "=" + escape(data.token) + ";"+expires;
  //     document.cookie = cookie;
  //   },
  getcookie(name) {
    let start = 0;
    let end = 0;
    start = document.cookie.indexOf(name);
    if (start > 0) {
      end = document.cookie.indexOf(";", start);
      // end=start+length
      console.log("getcookie+++", document.cookie);
      console.log(document.cookie.indexOf(name));
      console.log(document.cookie.indexOf(";", 77));
      if (end == -1) {
        end = document.cookie.length;
        console.log(document.cookie.substring(start + name.length + 1, end));
        let token = document.cookie.substring(start + name.length + 1, end);
        // alert(document.cookie.substring(start + name.length + 1, end))
        return token;
      }
    } else {
      return 0;
    }
  },
  delcookie(name) {
    alert(document.cookie.indexOf(name))
  },
  async iflogin() {
    // var that=this
    var token = this.getcookie("user_id");
    var status
    // alert(token)
    if (!token) {
      // alert("token过期");
      localStorage.clear();
      status = 0
    } else {
      await $.ajax({
        type: "GET",
        url: "http://localhost:3000/user?token=" + token,
        data: "data",
        async: 'false',
        success: function (response) {
          console.log(response)
          if (response.exp == 0) {
            //   exp过期
            //   alert(0)
            status = 0
          } else {
            // exp 未过期
            // alert("未过期")
            localStorage.setItem('userinformation', JSON.stringify(response))
            status = 1
          }
        },
        fail: function (err) {
          console.log(err);
          status = 0
        },
      });
    }
    return status
  },
}