<template>
  <el-card style="margin: 50px 20px;">
    <div class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
          {{ userlist.user_name }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ userlist.user_name }}</div>
        <!-- <div class="user-role text-center text-muted">{{ user.router-link}}</div> -->
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><span>Education</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            Studied in Sichuan University of light technology
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
  userlist: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      avatar: 'https://img1.baidu.com/it/u=3093014357,2120494388&fm=26&fmt=auto'
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
