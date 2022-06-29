<template>
  <div class="Notice">
    <h3>近期通告</h3>
    <hr />
    <ul>
      <li v-for="item of notice" :key="item">
        <!-- <router-link :to="'/home/info'+item.id"> -->
        <!-- <router-view> -->
        <el-link @click="itemClick(item.id)" type="primary">
          {{item.title}}
        </el-link>
        <!-- </router-view> -->
        <!-- </router-link> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { getNotice } from "../api/Notice";
// import { getNoticeInfo } from "../api/NoticeInfo";
export default {
  data() {
    return {
      notice: [],
      // link: '../views/Home_Info',
    };
  },
  created() {
    this.getInfo();
    // this.getUnitInfo(2);
  },
  methods: {
    getInfo() {
      getNotice()
        .then((res) => {
          this.notice = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // getUnitInfo(data) {
    //   getNoticeInfo(data)
    //     .then((res) => {
    //       console.log(res.data);
    //       // this.link = res.data;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },

    itemClick(id){
      this.$router.push({
        path: '/home/info',
        query: {
          id
        }
      })
    }
  },
};
</script>

<style>
.Notice {
  background-color: #fff;
  width: 91%;
  height: 300px;
  text-align: center;
  margin-top: 20px;
  padding: 20px;
}
.Notice ul {
  list-style: none;
}
.Notice ul li {
  text-align: left;
}
</style>