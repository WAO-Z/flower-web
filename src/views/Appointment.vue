<template>
  <div id="appointment">
    <div class="card">
      <select id="dateSelect" ref="select" v-model="timeId">
        <template v-for="(item, index) in dateArr">
          <option :key="index" :value="item.id" ref="option">
            {{ new Date(item.time * 1).getMonth() + 1 }}月{{
              new Date(item.time * 1).getDate()
            }}日
          </option>
        </template>
      </select>
      <main>
        <div class="top">
          <span>场次</span>
          <span>状态</span>
        </div>
        <div class="mainBox">
          <ul>
            <template v-for="(item, index) in sessionArr">
              <li :key="index">
                <span>{{
                  new Date(item.start_time * 1)
                    .getHours()
                    .toString()
                    .padStart(2, "0") +
                  ":" +
                  new Date(item.start_time * 1)
                    .getMinutes()
                    .toString()
                    .padEnd(2, "0") +
                  "-" +
                  new Date(item.end_time * 1)
                    .getHours()
                    .toString()
                    .padStart(2, "0") +
                  ":" +
                  new Date(item.end_time * 1)
                    .getMinutes()
                    .toString()
                    .padEnd(2, "0")
                }}</span>
                <span @click="appointment(item.is_appointment, item.id)">{{
                  isAppointment(item.is_appointment)
                }}</span>
              </li>
            </template>
            <li v-if="!sessionArr.length">今天无预约场次</li>
          </ul>
        </div>
      </main>
      <p>★一个手机号，一天只能预约一场。</p>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      dateArr: [],
      sessionArr: [],
      timeId: "10",
    };
  },
  mounted() {
    this._axios.get(`/api/date/show`).then((res) => {
      this.dateArr = res.data.data;
    });
    this._axios.get(`/api/session/show?timeId=${this.timeId}`).then((res) => {
      this.sessionArr = res.data.data;
    });
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
  methods: {
    isAppointment(isapm) {
      if (isapm) {
        return "可预约";
      } else {
        return "已约满";
      }
    },
    appointment(isapm, id) {
      if (isapm) {
        if (this.$store.state.session) {
          alert("你已经预约了");
          this.$router.push("qrcode");
        } else {
          this._axios
            .put(`/api/appointment/update`, {
              token: localStorage.getItem("token"),
              sessionId: id,
              isAppointment: 1,
            })
            .then(() => {
              alert("预约成功");
              this.$store.state.is_appointment = 1;
              this.$router.push("qrcode");
            });
        }
      }
    },
  },

  watch: {
    timeId(val) {
      this._axios.get(`/api/session/show?timeId=${val}`).then((res) => {
        this.sessionArr = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#appointment {
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
    #dateSelect {
      border: none;
      color: #0075c1;
      font-size: _vw(36);
    }
    main {
      .top {
        width: 100%;
        display: flex;
        justify-content: space-around;
        color: #0075c1;
        font-size: _vw(32);
        margin-top: _vw(100);
      }
      .mainBox {
        ul {
          li {
            display: flex;
            justify-content: space-around;
            margin-top: _vw(100);
            font-size: _vw(32);
          }
        }
      }
    }
    p {
      text-align: center;
      margin-top: _vw(100);
      font-size: _vw(32);
    }
  }
}
</style>