<template>
  <div id="my">
    <h1>我的预约</h1>
    <div class="card">
      <p>姓名：{{ this.$store.state.name }}</p>
      <p>
        场次：{{
          new Date(this.$store.state.session * 1)
            .getHours()
            .toString()
            .padStart(2, "0") +
          ":" +
          new Date(this.$store.state.session * 1)
            .getMinutes()
            .toString()
            .padEnd(2, "0")
        }}-{{
          new Date(this.$store.state.session * 1 + 9000000)
            .getHours()
            .toString()
            .padStart(2, "0") +
          ":" +
          new Date(this.$store.state.session * 1 + 9000000)
            .getMinutes()
            .toString()
            .padEnd(2, "0")
        }}
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#my {
  padding-top: _vw(250);
  h1 {
    color: #0075c1;
    font-size: _vw(36);
    padding-left: _vw(110);
    margin-bottom: _vw(150);
  }
  .card {
    position: relative;
    top: 50%;
    width: _vw(588);
    height: _vw(400);
    border-radius: _vw(10);
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 _vw(20) rgba(0, 0, 0, 0.3);
    margin: 0 auto;
    text-align: center;
    font-size: _vw(36);
    line-height: _vw(200);
  }
}
</style>