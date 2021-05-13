<template>
  <div class="float">
    <router-link to="/game">
      <img src="../assets/hello.png" alt="图形大变身" class="hello" />
    </router-link>
  </div>
</template>

<script>
import { delay } from "../utils";

export default {
  name: "Hello",
  methods: {
    timeout: async function (time) {
      await delay(time);
      this.$router.push("/game");
    },
    GetRequest: function () {
      let url = location.search; //获取url中"?"符后的字串
      let theRequest = new Object();
      if (url.indexOf("?") != -1) {
        let str = url.substr(1);
        let strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      return theRequest;
    },
  },
  mounted() {
    this.timeout(5000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.float {
  position: relative;
  height: 100vh;
  width: 100vw;
}
.hello {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-decoration: none;
  color: #3c3c3c;
  font-size: 64px;
  letter-spacing: 16px;
}
</style>
