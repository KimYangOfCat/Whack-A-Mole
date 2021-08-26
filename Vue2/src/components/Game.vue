<template>
<div>
  <!-- <div>你好</div> -->
  <div class="float">
    <div class="bottom">
      <div
        class="keyboard"
        ref="backimg"
        v-for="(n, index) in 10"
        :key="n"
        :class="index == 9 ? 'button10' : ' '"
      >
        <div ref="mouse"></div>
      </div>
    </div>
    <div class="messagesBottom">
      <div class="message" v-if="showMessage">
        <img src="hurryUp.png" v-if="showHurry" />
        <img src="chese.png" v-if="showChese" />
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { delay } from "../utils";

export default {
  name: "Training",
  data() {
    return {
      TRAINING: 10,
      trainingOder: [],
      clickStyle: false,
      mouseButton: {},
      backcolor: {},
      showMessage: false,
      showHurry: false,
      showChese: false,
      clickMessage: false,
      nowIndex: 0,
      clickSuccess: [],
      clickedSuccessly: [],
      trainingTime: {
        out: undefined,
        time: 0,
      },
    };
  },
  methods: {
    mouseTrans: function (index, trans) {
      if (trans == "appear") {
        this.clickStyle = false;

        this.mouseButton = this.$refs.mouse[index];

        this.backcolor = this.$refs.backimg[index];

        // console.log(this.mouseButton)
        this.mouseButton.addEventListener("click", this.clickFun);
      } else if (trans == "disappear") {
        // console.log(this.mouseButton);
        this.mouseButton.removeEventListener("click", this.clickFun);
      }

      //  console.log("show")
      this.mouseButton.setAttribute("class", "mouse " + trans);
    },
    clickFun: async function () {
      //震动反馈
      this.vibrate();

      // change backcolor
      this.backcolor.setAttribute(
        "style",
        "background-color:#f9a772;border-color:#f8e68f"
      );

      this.mouseButton.setAttribute("class", "mouseHited");
      console.log("点击函数触发");
      this.clickSuccess[this.nowIndex] = 1;
      this.nowIndex++;
      console.log(this.clickSuccess);

      await delay(100);
      // console.log('等待100');
      this.clickStyle = true;
    },
    isEmpty: function (arr) {
      if (arr.length == 0 || arr.length < 10) {
        return false;
      } else {
        for (let i = 0; i < arr.length; i++) {
          // console.log('循环中');
          if (arr[i] == "" || arr[i] == undefined) {
            // console.log('有空元素');
            return false;
          }
        }
      }
      // console.log('没有空元素');
      return true;
    },
    waitClick: async function (point) {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          if (!this.clickStyle) {
            console.log("没有点击");
            // console.log(point);
            this.mouseTrans(point, "disappear");
            return resolve();
          }
        }, 1000);
        // console.log(this);
        this.$watch("clickStyle", function () {
          if (this.clickStyle) {
            // console.log('点击了');

            // console.log('当前点的序号' + point);
            clearTimeout(timeout);
            // console.log('');
            this.mouseTrans(point, "disappear");
            this.backcolor.setAttribute(
              "style",
              "background-color:#f8e68f;border-color:#f9a772"
            );
            return resolve();
          }
        });
      });
    },
    habitWait: function (end) {
      return new Promise(async (resolve, reject) => {
        let cheseAward = this.isEmpty(this.clickSuccess);

        this.clickedSuccessly[
          this.clickedSuccessly.length
        ] = this.clickSuccess.length;

        if (cheseAward) {
          console.log("奖励");
          this.showMessage = true;
          this.showChese = true;
        } else {
          console.log("鼓励");
          this.showMessage = true;
          this.showHurry = true;
        }

        await delay(1500);
        if (end) {
          this.finish();
        } else {
          // console.log("接下去");
          this.showMessage = false;
          this.showHurry = false;
          this.showChese = false;
          return resolve();
        }
      });
    },
    randomOder: function () {
      //生成一个随机顺序
      let randomOder = [];
      let randomPoint;
      do {
        randomPoint = Math.round(Math.random() * 10);
        if (randomPoint == 0) {
          randomPoint = 10;
        }
        if (randomOder.indexOf(randomPoint) == -1) {
          randomOder.push(randomPoint);
        }
      } while (randomOder.length != 10);
      console.log(randomOder);
      return randomOder;
    },
    active: async function (oder) {
      for (let i = 0; i < this.TRAINING; i++) {
        let forOder = oder();

        for (let j = 0; j < 10; j++) {
          // 第一次出现延时0.8秒
          if (j == 0) {
            console.log("第一轮等待0.8s");
            await delay(800);
          }
          // console.log(j);
          this.mouseTrans(forOder[j] - 1, "appear");
          await this.waitClick(forOder[j] - 1);
          await delay(200 + Math.random() * 1300);
        }
        //end
        if (i == this.TRAINING - 1) {
          //最后一轮结束
          await this.habitWait(true);
        } else {
          await this.habitWait(false);
        }
        //一轮结束置空
        this.nowIndex = 0;
        this.clickSuccess = [];
      }
    },
    //  震动反馈
    vibrate: function () {
      if ("vibrate" in window.navigator) {
        window.navigator.vibrate(100);
      } else {
        console.log("游览器不支持震动反馈");
      }
    },
    finish: function () {
      this.$swal({
        type: "success",
        title: "游戏结束啦！",
        text: "你太棒啦！",
        confirmButtonColor: "#f9a772",
        confirmButtonText: "OK",
        showCancelButton: false,
        allowOutsideClick: false,
        width: "40%",
        padding: "20px",
      }).then(() => {});
    },
  },
  mounted() {
    //开始弹窗
    this.$swal({
      imageUrl: "ready.png",
      confirmButtonColor: "#f9a772",
      confirmButtonText: "GO",
      showCancelButton: false,
      width: "40%",
      padding: "20px",
      //timer:2000
    }).then(() => {
      this.trainingTime.out = setInterval(() => {
        this.trainingTime.time++;
        // console.log('1s过去了：' + this.trainingTime.time);
      }, 1000);
      this.active(this.randomOder);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.float {
  width: 80vw;
  height: 90vh;
  position: absolute;
  left: 50%; /* 定位父级的50% */
  top: 50%;
  transform: translate(-50%, -50%); /*自己的50% */

  background-color: #e9e9e9;
  border-radius: 20px;
  border: 2px solid slategray;

  display: flex;
  justify-content: flex-start;
}
.messagesBottom {
  width: 50%;
  height: 100%;
  background-color: #f8e68f;
  border-radius: 0 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.message {
  /*margin-top: 40vh;*/
  /*background-color: white;*/
  height: 25vh;
  width: 80%;

  /*border: 1px solid #7f8081 ;*/
  /*border-radius: 15px;*/

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.messageButton {
  margin-top: 5vh;
  height: 20%;
  width: 15%;
  background-color: #f9a772;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: large;
  font-weight: bolder;
}
.bottom {
  /*background-color:#e9e9e9;*/
  /*border-radius: 20px;*/
  /*border: 2px solid slategray;*/

  width: 80vw;
  max-width: 460px;
  height: 100%;
  min-height: 500px;

  margin: 0 auto;
  /*margin-top: 5vh;*/

  /* 栅格系统  */
  display: grid;
  grid-template: repeat(4, [r-start] 25% [r-end]) / repeat(
      3,
      [c-start] 33.3% [c-end]
    );
  /* 定义栅格间距 */
  /* gap: 5px; */

  /* 元素对齐 */
  justify-items: center;
  align-items: center;
}
.keyboard {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: solid 4px #f9a772;

  background-color: #f8e68f;

  /*对齐  */
  display: grid;
  justify-items: center;
  align-items: center;
}
.button10 {
  grid-area: r-start 4 / c-start 2 / r-end 4 / c-end 2;
}

.mouse {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: none;
  /* 背景图居中 不重复*/
  background: url("../assets/mouse.png") center center no-repeat;
  background-size: 60px;
  outline: none;
}
.mouseHited {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: none;

  background: url("../assets/mouseHited.png") center center no-repeat;
  background-size: 60px;

  border-radius: 50%;
  border: none;
  outline: none;
}

.appear {
  animation-name: appear;
  opacity: 1;
}
.disappear {
  animation-name: disappear;
  opacity: 0;
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes disappear {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
