<template>
  <div id="app">
    <button class="logout" v-if="this.$store.state.token" @click="logout">
      注销
    </button>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    logout() {
      localStorage.setItem("token", "");
      this.$store.state.token = "";
      location.reload();
    },
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
    if (localStorage.getItem("token")) {
      this.$store.state.token = localStorage.getItem("token");
    }
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

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  font-family: cursive;
}
#app {
  position: relative;
  height: 100%;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url(./assets/img/背景.png) no-repeat;
    background-size: cover;
    z-index: -1;
  }
}
.fade-enter {
  opacity: 0;
}
.fade-leave {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.5s;
}
.logout {
  position: absolute;
  top: 0;
  right: _vw(10);
  width: _vw(100);
  height: _vw(50);
  border-radius: _vw(80);
  border-style: none;
  background-color: rgba(255, 255, 255, 0.7);
  font-size: _vw(36);
  color: #0075c1;
  font-weight: 600;
  box-shadow: 0px _vw(10) _vw(10) rgba(0, 0, 0, 0.3);
}
</style>
