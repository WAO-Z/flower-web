<template>
  <div id="index">
    <div class="bg">
      <div class="logo">
        <img src="../assets/img/logo2.png" alt="" />
      </div>
      <div class="inps" v-show="!this.$store.state.token">
        <div class="inp">
          <span>姓名：</span>
          <input
            type="text"
            name=""
            id=""
            v-model="userName"
            placeholder="请输入姓名"
          />
        </div>
        <div class="inp">
          <span>+86&emsp;</span>
          <input
            type="number"
            name=""
            id=""
            v-model="phoneNum"
            oninput="if(value.length > 11)value = value.slice(0, 11)"
            placeholder="请输入手机号"
          />
        </div>
        <div class="inp">
          <span>身份证号：</span>
          <input
            type="number"
            name=""
            id=""
            v-model="idNum"
            oninput="if(value.length > 18)value = value.slice(0, 18)"
            placeholder="请输入身份证号码"
          />
        </div>
        <transition name="vCode">
          <div class="inp" v-if="isRegister">
            <span>验证码:</span>
            <input type="number" name="" id="" v-model="vCode" />
            <span @click="send">发送</span>
          </div>
        </transition>
      </div>
      <div class="btn">
        <button @click="myApm" v-if="this.$store.state.token" class="blue">
          我的预约
        </button>
        <button @click="start" v-if="this.$store.state.token" class="blue">
          开始预约
        </button>
        <button @click="register" v-if="!this.$store.state.token">注册</button>
        <button @click="login" v-if="!this.$store.state.token">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      userName: "",
      phoneNum: "",
      idNum: "",
      vCode: "",
      isRegister: false,
    };
  },
  methods: {
    start() {
      if (localStorage.getItem("token")) {
        this._axios
          .get(`/api/appointment/show?token=${localStorage.getItem("token")}`)
          .then((res) => {
            if (res.data.code == 200) {
              this.$store.state.name = res.data.data[0].name;
              this.$store.state.session = res.data.data[0].sessions_time;
              this.$store.state.qrCodeURL = res.data.data[0].qrcode;
              this.$router.push("appointment");
            }
          })
          .catch((err) => {
            alert("账号或密码错误");
            console.log(err);
          });
      } else {
        this._axios
          .get(
            `/api/user/show?name=${this.$store.state.name}&phone=${this.$store.state.phone}&idCard=${this.$store.state.id}`
          )
          .then((res) => {
            if (res.data.code == 200) {
              localStorage.setItem("token", res.data.data[0].token);
              this.$store.state.token = res.data.data[0].token;
              this.$store.state.session = res.data.data[0].sessions_time;
              this.$store.state.is_appointment =
                res.data.data[0].is_appointment;
              this.$store.state.qrCodeURL = res.data.data[0].qrcode;
              if (res.data.data[0].is_appointment) {
                this.$router.push("qrcode");
              } else {
                this.$router.push("appointment");
              }
            }
          })
          .catch((err) => {
            alert("账号或密码错误");
            console.log(err);
          });
      }
    },
    myApm() {
      if (localStorage.getItem("token")) {
        if (this.$store.state.session) {
          this.$router.push("myappointment");
        } else {
          alert("暂无预约信息");
        }
      } else {
        alert("请登录");
      }
    },
    register() {
      if (this.isRegister && this.vCode) {
        this._axios
          .post(`/api/user/create`, {
            name: this.userName,
            phone: this.phoneNum,
            idCard: this.idNum,
            code: this.vCode,
          })
          .then((res) => {
            if (res.data.code == 200) {
              alert("注册成功");
            }
          })
          .catch((err) => {
            alert("注册失败");
            console.log(err);
          });
      }
      this.isRegister = !this.isRegister;
    },
    login() {
      this._axios
        .get(
          `/api/user/show?name=${this.userName}&phone=${this.phoneNum}&idCard=${this.idNum}`
        )
        .then((res) => {
          if (res.data.code == 200) {
            localStorage.setItem("token", res.data.data[0].token);
            this.$store.state.token = res.data.data[0].token;
            this.$store.state.name = this.userName;
            this.$store.state.phone = this.phoneNum;
            this.$store.state.id = this.idNum;
            this.$store.state.session = res.data.data[0].sessions_time;
            this.$store.state.is_appointment = res.data.data[0].is_appointment;
            this.$store.state.qrCodeURL = res.data.data[0].qrcode;
            alert("登录成功");
          }
        })
        .catch((err) => {
          alert("账号或密码错误");
          console.log(err);
        });
    },
    send() {
      this._axios
        .get(`/api/sms/new?phone=${this.phoneNum}`)
        .then((res) => {
          if (res.data.code == 200) {
            alert("发送成功");
            this.vCode = res.data.data.code;
            console.log(res.data.data.code);
          }
        })
        .catch((err) => {
          alert("请输入正确的号码格式");
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  position: relative;
  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: _vw(250);
    // height: _vw(194);

    margin-top: _vw(125);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .inps {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: _vw(600);
    margin-top: _vw(505);
    .inp {
      height: _vw(78);
      line-height: _vw(78);
      border-radius: _vw(78);
      padding: 0 _vw(40);
      margin-bottom: _vw(60);
      background-color: rgba(255, 255, 255, 0.3);
      font-size: _vw(30);
      input {
        font-size: _vw(30);
        outline: none;
        border-style: none;
        background-color: rgba(255, 255, 255, 0);
      }
    }
  }
  .btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: _vw(630);
    margin-top: _vw(1050);
    display: flex;
    justify-content: space-around;
    button {
      width: _vw(250);
      height: _vw(80);
      border-radius: _vw(80);
      border-style: none;
      background-color: rgba(255, 255, 255, 0.7);
      font-size: _vw(36);
      color: #0075c1;
      font-weight: 600;
      box-shadow: 0px _vw(10) _vw(10) rgba(0, 0, 0, 0.3);
    }
    .blue {
      background-color: rgba(105, 165, 221, 0.7);

      color: #fff;
    }
  }
  .vCode-enter {
    opacity: 0;
  }
  .vCode-leave {
    opacity: 1;
  }
  .vCode-enter-active {
    transition: opacity 0.5s;
  }
  .vCode-leave-active {
    opacity: 0;
    transition: opacity 0.5s;
  }
}
</style>

