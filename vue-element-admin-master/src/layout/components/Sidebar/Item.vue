<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) { // 使用render函数完成渲染
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      // 默认element-admin icon
      vnodes.push(<svg-icon icon-class={icon}/>)
      // 改为element-ui icon
      vnodes.push(<i class={icon}></i>)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
