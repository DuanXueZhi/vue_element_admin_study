<template>
  <div id="scrollDome">
    <div class="stepsBox">
      <el-steps direction="vertical" :active="activeStepItem">
        <el-step v-for="(item, index) in sentenceList" :key="item.id" :title="`${index + 1}`" :description="item.text" @click.native="dumpStep(item.id)" />
      </el-steps>
    </div>
    <div class="content">
      <div v-for="(item, index) in sentenceList" :id="`abc${item.id}`" :key="item.id" style="padding: 100px 0;">
        <p ref="sentenceItem" style="color: #c33;">{{ index + 1 }}. {{ item.text }}</p>
        <p v-for="(similarityItem, similarityIndex) in item.similarity" :key="similarityItem" style="font-weight: bold; padding: 20px;">{{ similarityIndex + 1 }}{{ similarityItem }}</p>
      </div>
    </div>
    <back-to-top />
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'

export default {
  name: 'ScrollDome',
  components: { BackToTop },
  data() {
    return {
      activeStepItem: 1,
      sentenceList: [ // 所查句子列表
        {
          id: 1,
          text: '例句1',
          similarity: ['例句1相似1', '例句1相似2', '例句1相似3']
        },
        {
          id: 2,
          text: '例句2',
          similarity: ['例句2相似1', '例句2相似2', '例句2相似3']
        },
        {
          id: 3,
          text: '例句3',
          similarity: ['例句3相似1', '例句3相似2', '例句3相似3']
        },
        {
          id: 4,
          text: '例句4',
          similarity: ['例句4相似1', '例句4相似2', '例句4相似3']
        }
      ]
    }
  },
  created() {
    this.listenerFunction()
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.listenerFunction)
  },
  methods: {
    listenerFunction(e) {
      document.addEventListener('scroll', this.handleScroll, true)
    },
    handleScroll() {
      // console.log(window.pageYOffset) // 210：50 + 34 + 126
      // console.log(this.$refs.sentenceItem[0].offsetTop, this.$refs.sentenceItem[1].offsetTop) // 126
      // console.log(window.pageYOffset)
      this.activeStepItem = this.countLocationIndex(window.pageYOffset)
    },
    countLocationIndex(value) {
      let locationIndex = 1
      this.$refs.sentenceItem.forEach((item, index) => {
        if (value >= item.offsetTop) {
          locationIndex = index + 1
        }
      })
      return locationIndex
    },
    // 跳转步骤
    dumpStep(id) {
      console.log(id, document.querySelector(`#abc${id}`))
      setTimeout(document.querySelector(`#abc${id}`).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }), 5000)
    }
  }
}
</script>

<style scoped lang="scss">
  #scrollDome {
    padding: 10px;
    .stepsBox {
      height: 300px;
      width: 200px;
      position: fixed;
      right: 0;
      top: 30vh;
    }
  }
</style>
