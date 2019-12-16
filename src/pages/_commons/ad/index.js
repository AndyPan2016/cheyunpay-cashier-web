/**
 * 头部
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年8月21日14:03:27
 */
import { Swiper, Slide } from 'vue-swiper-component'

export default {
  data () {
    return {
      adListData: [
        // {url: require('../../../assets/images/ad/ad-1.png'), alt: '广告'},
        // {url: require('../../../assets/images/ad/ad-1.png'), alt: '广告'},
        // {url: require('../../../assets/images/ad/ad-1.png'), alt: '广告'}
      ]
    }
  },
  props: {
    // 广告列表
    adList: { type: Array }
  },
  components: {
    Swiper,
    Slide
  },
  methods: {},
  created () {
    if (this.adList) {
      // this.adListData = this.adList
      this.adListData = []
    }
  }
}
