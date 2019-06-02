<script>
import { mapState, mapActions } from 'vuex';
import { Token } from './utils/token';
const token = new Token();

export default {
    data () {
        return {
            global: {}
        };
    },
    computed: {
        ...mapState([
        ])
    },
    methods: {
        ...mapActions([
            'getMap'
        ])
    },
    created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

        let logs;
        if (mpvuePlatform === 'my') {
            logs = mpvue.getStorageSync({key: 'logs'}).data || [];
            logs.unshift(Date.now());
            mpvue.setStorageSync({
                key: 'logs',
                data: logs
            });
        } else {
            logs = mpvue.getStorageSync('logs') || [];
            logs.unshift(Date.now());
            mpvue.setStorageSync('logs', logs);
        }
    },
    mounted () {
    // 自定义导航栏
    // wx.getSystemInfo({
    //   success: e => {
    //     this.global.StatusBar = e.statusBarHeight;
    //     let custom = wx.getMenuButtonBoundingClientRect();
    //     this.global.Custom = custom;
    //     this.global.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
    //   }
    // });
    },
    destroyed () {
        console.log('app destroy');
        try {
            wx.clearStorageSync();
        } catch (e) {
        // Do something when catch error
        }
    },

    async onLaunch () {
        await token.login(() => {
            this.getMap();
			const systemInfo = wx.getSystemInfoSync();
			const model = systemInfo.model;
			console.log(model);
			wx.setStorageSync('model', model);
        });
    }

};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
::-webkit-scrollbar{
    width: 0;
    height: 0;
    color: transparent;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>

