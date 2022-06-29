<template>
    <div class="container">
        <!-- <menu-list /> -->
        <div class="complex">
          <search-input
          @getGood="getGoodsLists"
          @getGoodkey="search"/>
          <good-list
            :list="searchList"
          />
        </div>
    </div>
</template>

<script>
// import MenuList from './ChildCpm/MenuList'
import SearchInput from './ChildCpm/searchInput'
import GoodList from './ChildCpm/goodList'
// import { Search } from '@element-plus/icons'
import { getGoodsList } from '@/api/goods'
export default {
    components: {
        // MenuList,
        GoodList,
        // Search,
        SearchInput
    },
    data () {
        return {
          allGoodsList: [],
          searchList: []
        }
    },
    created() {
      this.getGoodsExampleLists() 
    },
    methods: {
      search(val) {
        this.searchList.length = 0;

        for (let i = 0; i < this.allGoodsList.length; i++) {
          console.log(this.allGoodsList.length);
          if (this.allGoodsList[i].goods_description.toString().includes(val) || val === '') {
            console.log(this.allGoodsList[i].goods_description);
            this.searchList.push(this.allGoodsList[i])
          }
        }
        console.log(this.allGoodsList );
        console.log(this.searchList);
        // 过滤完以后更新 下面的 条数
      },
      getGoodsLists(item) {
        getGoodsList(item).then(res => {
          this.allGoodsList = res
          console.log(res);
          this.search('')
        }).catch(err => {
          console.log(err)
        })
      },
      getGoodsExampleLists() {
        getGoodsList('键盘').then(res => {
          this.allGoodsList = res
          console.log(res);
          this.search('')
        }).catch(err => {
          console.log(err)
        })
        
      } 
      
    }
}
</script>

<style>
    .container{
        display: flex;
    }
    el-input{
      justify-content: space-between;
      align-items: center;
    }
</style>
