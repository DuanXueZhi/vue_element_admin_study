
<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)"><!-- linkProps函数return要绑定的数据，如：v-bind:is="" -->
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate' // return /^(https?:|mailto:|tel:)/.test(path)

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(url) {
      if (isExternal(url)) { // 判断是否是http请求
        return { // a标签
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return { // router-link
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
