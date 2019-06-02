<template>
  <div>
    <!-- 顶栏和抽屉菜单 -->
      <div class="top-bar">
        <span  @click="toggleMine" class="top-bar__icon">
            <image src="/static/images/icon/user.png" class="top-bar__mine"/>
        </span>
    
        <span class="top-bar__title">{{currentMark}}</span>

        <span @click="handleSubMenuClick" class="top-bar__icon">
            <image src="/static/images/icon/dingyueku.png" class="top-bar__sub-menu"/>
        </span>
      </div>

      <i-drawer mode="left" :visible="showMine" @close="toggleMine">
        <div class="mine-container">
            <aside-menu></aside-menu>
        </div>
      </i-drawer>

    <!-- 地图主体和卡片列表 -->
    <div class="main-map">
        <campus-map @markClick="handleMarkClick" :mapMarks="markPoints" @mapClick="handleMapClick"/>
        <home-card-drawer :list="currentCardsList"
            notice="实时消息通知功能正在开发中，敬请期待～" :clickId="clickId" :closeId="closeId"/>
    </div>
  </div>
</template>

<script lang="js">
import { mapState, mapGetters } from 'vuex';
import HomeCard from '../../components/homeCard/HomeCard';
import AsideMenu from '../../components/asideMenu/AsideMenu';
import HomeCardDrawer from '../../components/homeCardDrawer/HomeCardDrawer';
import CampusMap from '../../components/mapMark/CampusMap.vue';

export default {
    data () {
        return {
            currentMark: '北京邮电大学',
            currentCardsList: [],
            showMine: false,
            clickId: 0,
			closeId: 0
        };
    },
    components: {
        HomeCard,
        AsideMenu,
        HomeCardDrawer,
        CampusMap
    },
    computed: {
        ...mapState([
            'markPoints'
        ]),
        ...mapGetters({
            getCards: 'getCardsByMarkPointId',
            getMarkPointById: 'getMarkPointById',
            getCardsMap: 'getCardsMap'
        })
    },
    methods: {
        toggleMine (e) {
            this.showMine = !this.showMine;
        },
        handleMarkClick (markId, markName) {
            this.currentMark = markName;
            this.clickId++;
            const currentCards = this.getCards(markId);
            if (currentCards) {
                this.currentCardsList = currentCards;
            } else {
                this.currentCardsList = [];
            }
        },
        handleSubMenuClick () {
            wx.navigateTo({
                url: '/pages/mycard/main'
            });
        },
        onShareAppMessage () {
            return {
                title: '校园里有你不知道的信息吗？快来看看吧~',
                path: '/pages/index/main',
                imageUrl: 'https://beiyouxianyu.cn/image/Logoshare.jpg'
            };
        },
		handleMapClick () {
			this.closeId++;
		}
    },

    created () {
    // let app = getApp();
    },
    onLoad () {
        // this.getMap();
    }
};
</script>

<style scoped>
.top-bar {
  height: 40px;
  background: #B2D0EA;
  color: #fff;
  font-weight: 500;
  padding: 0 10px;
  font-size:20px;
  display: flex;
  justify-content: space-between;
}
.top-bar__icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.top-bar__mine {
    height: 24px;
    width: 22px;
}
.top-bar__title {
  height: 100%;
  text-align: center;
  line-height: 44px;
}
.top-bar__sub-menu {
  width: 27px;
  height: 21px;
}
.mine-container {
  width:65vw;
  height:100vh;
  background:#fff;
}
.main-map {
    position: relative;
}
</style>
