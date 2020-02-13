import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Element Admin' // 页面标题

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
