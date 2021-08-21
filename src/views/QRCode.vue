<template>
  <div id="qrcode">
    <button class="cancel" v-if="this.$store.state.token" @click="cancel">
      取消预约
    </button>
    <div class="card">
      <h1>尊敬的{{ this.$store.state.name }}:</h1>
      <p>
        欢迎您在{{ new Date(this.$store.state.session * 1).getMonth() + 1 }}月{{
          new Date(this.$store.state.session * 1).getDate()
        }}日{{
          new Date(this.$store.state.session * 1)
            .getHours()
            .toString()
            .padStart(2, "0") +
          ":" +
          new Date(this.$store.state.session * 1)
            .getMinutes()
            .toString()
            .padEnd(2, "0")
        }}参观2021广州国际花卉艺术展暨中国插画花展。
      </p>
      <div class="qrcode">
        <img :src="this.$store.state.qrCodeURL" alt="" />
      </div>
      <button @click="lalala">长按保存</button>
      <p>请保存此页面，进入参观区域前向工作人员出示，谢谢！</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    lalala() {
      console.log(this.$store.state.qrCodeURL);
    },
    cancel() {
      this._axios
        .put(`/api/appointment/update`, {
          token: localStorage.getItem("token"),
          sessionId: 7,
          isAppointment: 0,
        })
        .then(() => {
          alert("取消成功");
          this.$store.state.is_appointment = 0;
          this.$router.push("appointment");
        })
        .catch((err) => {
          alert("取消失败");
          console.log(err);
        });
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this._axios
        .get(`/api/appointment/show?token=${localStorage.getItem("token")}`)
        .then((res) => {
          if (res.data.code == 200) {
            this.$store.state.name = localStorage.getItem("token");
            this.$store.state.name = res.data.data[0].name;
            this.$store.state.session = res.data.data[0].sessions_time;
            this.$store.state.qrCodeURL = res.data.data[0].qrcode;
          }
        })
        .catch((err) => {
          alert("账号或密码错误");
          console.log(err);
        });
    }
  },
};
</script>

<style lang="scss" scoped>
#qrcode {
  //   padding: _vw(40) _vw(20);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .card {
    position: relative;
    padding: _vw(80) _vw(40);
    width: _vw(550);
    height: _vw(800);
    border-radius: _vw(10);
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 _vw(20) rgba(0, 0, 0, 0.3);
    h1 {
      width: _vw(300);
      font-size: _vw(36);
      margin-bottom: _vw(50);
      border-bottom: 1px solid #000;
      text-align: right;
    }
    p {
      text-indent: 2em;
      font-size: _vw(32);
    }
    .qrcode {
      width: _vw(300);
      height: _vw(300);
      border: _vw(6) solid #000;
      margin: 0 auto;
      margin-top: _vw(50);
      img {
        width: 100%;
        height: 100%;
      }
    }
    button {
      width: _vw(200);
      height: _vw(60);
      border-radius: _vw(80);
      border-style: none;
      background-color: rgba(255, 255, 255, 0.7);
      font-size: _vw(32);
      color: #0075c1;
      font-weight: 600;
      box-shadow: 0px _vw(10) _vw(10) rgba(0, 0, 0, 0.3);
      display: block;
      margin: _vw(20) auto _vw(40) auto;
    }
  }
  .cancel {
    position: absolute;
    top: 0;
    left: _vw(10);
    width: _vw(200);
    height: _vw(50);
    border-radius: _vw(80);
    border-style: none;
    background-color: rgba(255, 255, 255, 0.7);
    font-size: _vw(36);
    color: #0075c1;
    font-weight: 600;
    box-shadow: 0 _vw(10) _vw(10) rgba(0, 0, 0, 0.3);
  }
}
</style>