<!--
  Created by dxz on 2020/3/4-14:54.
  explain:
-->
<template>
  <div id="create">
    <p>{{ fileExplain }}</p>
  </div>
</template>

<script>
export default {
  name: 'Create',
  components: {},
  data() {
    return {
      fileExplain: '创建图书' // 文件说明
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.mainIndex()
  },
  beforeDestroy() {},
  destroy() {},
  methods: {
    /*
  * -------------------------------------- 入口函数 --------------------------------------
  * */
    mainIndex() {
    },

    /*
  * --------------------------------------   公用   --------------------------------------
  * */
    /* 获取or请求函数 */
    /* 功能or共用函数 */
    requestCallBackArrange(local, res) { // local：位置，res：数据
      // 出错 alert(local + res.错误信息)
    }

    /*
  * -------------------------------------- 子组件相关函数 --------------------------------------
  * */
    // 接收检索参数

    /*
  * -------------------------------------- 页面操作 --------------------------------------
  * */

    /*
  * -------------------------------------- 图表数据处理+渲染 arrangeData*、makeCharts* --------------------------------------
  * */
    /* 数据处理 arrangeData* */
    /* 渲染 makeCharts* */
  }
}
</script>

<style scoped>
  /* lang="less" */
  #create {
  }
</style>
