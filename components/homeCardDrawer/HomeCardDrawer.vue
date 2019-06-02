<template>
    <movable-area class="cards-movable-area" :style="movableAreaStyle">
        <movable-view class="home-card-drawer" :style="cardDrawerStyle"
            @touchmove.stop="handleTouchMove" @touchstart="handleTouchStart"
            direction="vertical"
            :out-of-bounds="true"
            @change="handleViewChange">
            <div id="cardList">
                <div class="notice-bar" :style="{display: list.length > 0 ? 'block' : 'none'}">
                    <notice-bar show-icon="true" :loop="true" :closable="true"
                        background-color="#f2cdf" color="#999">
						{{notice}}
                    </notice-bar>
                </div>
                <div class="home-card-list" >
                    <div class="list__item" v-for="(homecard, hIndex) of list" :key="homecard.id">
                        <home-card :title="homecard.title" :cardId="homecard.id"
                            :detail="JSON.parse(homecard.detail)" :cardData="homecard"/>
                    </div>
                </div>
            </div>
        </movable-view>
    </movable-area>
</template>

<script>
import NoticeBar from '../baseComp/notice-bar.vue';
import HomeCard from '../homeCard/HomeCard';

export default {
    name: 'home-card-drawer',
    components: {
        HomeCard,
		NoticeBar
    },
    data () {
        return {
            curListHeight: 0,
            listVisibility: 'hidden',
            listOpacity: 0,
            showMovableArea: false
        };
    },
    props: {
        notice: {
            type: String,
            default: ''
        },
        list: {
            type: Array,
            default: () => []
        },
        clickId: {
            type: Number,
            required: true
        },
		closeId: {
			type: Number,
			required: true
		}
    },
    computed: {
        cardDrawerStyle () {
            return this.$styles({
                height: this.curListHeight + 'px',
                visibility: this.listVisibility,
                opacity: this.listOpacity
            });
        },
        movableAreaStyle () {
            return this.$styles({
                visibility: this.showMovableArea ? 'visible' : 'hidden'
            });
        }
    },
    watch: {
        clickId () {
			this.resetCardListHeight();
			if (this.list.length > 0) {
				this.showCardsList();
			} else {
				this.hideCardsList();
				// 提示用户没有数据
				this.$toast('暂无数据哦～请督促我们增添数据');
			}
        },
		closeId () {
			this.hideCardsList();
		}
    },
    methods: {
        handleViewChange (e) {
            const offsetY = e.detail.y;
            if (offsetY > 10) {
                this.hideCardsList();
            }
        },
        handleTouchMove (e) {
            // clientY 是距离可显示区域的垂直距离，pageY 是距离文件顶部的垂直距离（大）
        },
        handleTouchStart () {
            // 关键代码，加上这段交互才能正常
            this.$forceUpdate();
            this.resetCardListHeight();
        },
        resetCardListHeight () {
			uni.createIntersectionObserver(this).relativeTo('#cardList').observe('#cardList', (res) => {
				const curHeight = res.boundingClientRect.height;
				this.curListHeight = curHeight;
			});
        },
        hideCardsList () {
            this.showMovableArea = false;
            this.listOpacity = 0;
            this.listVisibility = 'hidden';
        },
        showCardsList () {
            this.showMovableArea = true;
            this.listVisibility = 'visible';
            this.listOpacity = 1;
        }
    },
    mounted () {
    },
    onLoad () {
    }
};
</script>

<style scoped>
.cards-movable-area {
    position: fixed;
    width:100vw;
    height: 40vh;
    top: 60vh;
}
.home-card-drawer {
    padding: 0 8px;
    background:rgb(255,255,255,0);
    width: 96%;
    transition: opacity 0.2s linear;
}
.notice-bar, .list__item {
    padding-bottom: 4px;
}
</style>
