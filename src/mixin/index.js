export default {
  data() {
    return {

    }
  },
  mounted() {
    // #ifdef MP-WEIXIN
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    console.warn(page.$page.fullPath)
    // #defif
  }
}
