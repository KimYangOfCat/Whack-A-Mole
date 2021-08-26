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
  async mounted() {
    // this.timeout(5000);
    await delay(5000);
    this.$router.push("/game");
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
