module.exports = {
  title: 'Vue Element Admin项目标题', // 项目标题

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true, // 右侧控制面板是否显示

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true, // 页面顶部打开标签导航

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false, // 整体页面顶部是否fixed

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false, // 左侧菜单栏顶部是否展示企业logo

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production' // 页面错误日志
}
