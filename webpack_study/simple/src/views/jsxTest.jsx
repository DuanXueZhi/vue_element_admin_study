// import './css' // 引入样式文件

export default {
  data() {
    return {
      author: 'dxz'
    }
  },
  render() {
    return {
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    }
  }
}