export default {
  data() {
    return {

    }
  },
  mounted() {
    console.log('1232')
    const pages = getCurrentPages()
    // const page = pages[pages.length - 1]
    console.warn(pages)
  }
}
