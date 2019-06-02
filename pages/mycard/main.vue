<template>
    <div class="my-card-container">
        <div class="my-card__title">我的卡包</div>
        <div v-if="isEmpty" class="my-card--empty">
            <image src="/static/images/icon/emptyCard.png" style="width:110px;height:100px;margin-bottom:4px"/>
            <div>暂无收藏的卡片<br>或下拉试试</div>
        </div>
        <scroll-view v-else scroll-y :enable-back-to-top="true" class="scroll-container">
            <div class="card-list">
                <div class="card-list__item" v-for="(mycard, mIndex) of list" :key="mycard.id">
                    <!-- <my-card :title="mycard.title" :cardId="mycard.id"
                        :detail="JSON.parse(mycard.detail)" :cardData="mycard"/> -->
					<div class="my-card-wrapper" @touchstart="handleTouchStart(mycard)">
					    <i-swipeout :operateWidth="180" :unclosable="true" :toggle="toggleSwipeout">
					        <div slot="content" class="my-card">
					            <uni-tag class="my-card-tag" type="success" size="small" :text="mycard.markName"></uni-tag>
					            <div class="my-card-content">
					                <div class="my-card-header">
					                    <div class="my-card-header-content">
					                        {{ mycard.title }}
					                    </div>
					                </div>
									<card-detail :detail="JSON.parse(mycard.detail)"/>
					            </div>
					        </div>
					        <div slot="button" class="i-swipeout-demo-button-group" style="background:#2db7f5;">
					            <div class="i-swipeout-demo-button" style="width:60px" @click="openActionSheet"><i-icon size="32" type="label_fill"></i-icon></div>
					            <button open-type="share" class="i-swipeout-demo-button" style="width:60px"><i-icon size="32" type="share_fill"></i-icon></button>
					            <div class="i-swipeout-demo-button" style="width:60px" @click="handleUndoClick"><i-icon size="32" type="undo"></i-icon></div>
					        </div>
					    </i-swipeout>
					</div>
					<!-- my-card组件 end -->
                </div>
				<i-action-sheet :visible="asVisible" :actions="actions" show-cancel @cancel.stop="handleCancelAs" @asclick="handleClickAction(currentCard)" :mask-closable="true">
				    <view slot="header" style="padding: 16px">
				        <view style="color: #333;font-size: 16px">确定要取消收藏吗？</view>
				    </view>
				</i-action-sheet>
            </div>
        </scroll-view>

        <i-message id="message" />
		<i-toast id="toast" />
    </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import { uniTag } from '@dcloudio/uni-ui';
import CardDetail from '../../components/carddetails/CardDetail.vue'

const { $Message, $Toast } = require('../../wxcomponents/base/index.js');

export default {
    components: {
		uniTag,
		CardDetail
    },
    data () {
		// as 代表 actionsheet
        return {
            list: [],
			// my-card data
			asVisible: false,
			toggleSwipeout: false,
			actions: [
			    {
			        name: '取消收藏',
			        color: '#ed3f14'
			    }
			],
			currentCard: null
        };
    },
    computed: {
        ...mapGetters({
            getMarkPointById: 'getMarkPointById'
        }),
        isEmpty () {
            return this.list.length === 0;
        }
    },
    methods: {
        ...mapActions([
            'getUserCards',
			'cancleCollectCard'
        ]),
        handleClick () {
        },
        _getUserCards () {
            this.getUserCards({
                callback: (res) => {
                    const cards = res.map((item) => {
                        return item.collectionable;
                    });
                    cards.forEach((item) => {
                        const markName = this.getMarkPointById(item.markpoint_id).name;
                        item.markName = markName;
                    });
                    this.list = cards;
                    this.$forceUpdate();
                    wx.stopPullDownRefresh();
                }
            });
        },
		
		// my-card methods
		toggleSwipeShow () {
		    this.toggleSwipeout = !this.toggleSwipeout;
		},
		handleCancelAs () {
		    this.closeActionSheet();
		    this.toggleSwipeShow();
		},
		handleClickAction (mycard) {
		    const action = [...this.actions];
		    action[0].loading = true;
		    this.actions = action;
		
		    // 发送请求
		    this.cancleCollectCard({
		        markId: mycard.markpoint_id,
		        cardId: mycard.id,
		        callback: () => {
		            action[0].loading = false;
		            this.actions = action;
		            this.handleCancelAs();
		
		            $Message({
		                content: '取消收藏成功！',
		                type: 'success'
		            });
		            wx.startPullDownRefresh();
		        }
		    });
		},
		openActionSheet () {
		    this.asVisible = true;
		},
		closeActionSheet () {
		    this.asVisible = false;
		},
		handleUndoClick () {
		    this.toggleSwipeShow();
		},
		handleTouchStart (mycard) {
			this.currentCard = mycard;
		}
    },
    onLoad () {
        this._getUserCards();
    },
    onPullDownRefresh () {
        this._getUserCards();
    },
    onShareAppMessage () {
        return {
            title: '校园里有你不知道的信息吗？快来看看吧~',
            path: '/pages/index/main',
            imageUrl: 'https://beiyouxianyu.cn/image/Logoshare.jpg'
        };
    },
	onReady () {
		const hasCome = wx.getStorageSync('hasCome');
		if (!hasCome) {
			$Toast({
				content: '左滑卡片试试吧~',
				image: 'https://beiyouxianyu.cn/image/Logoshare.jpg',
				mask: true
			});
			wx.setStorageSync('hasCome', 'false');
		}
	}
};
</script>
<style scoped>
.my-card--empty {
    text-align: center;
    color: #999;
    padding: 32px;
	height: 100vh;
}
.my-card__title {
    font-size:24px;
    font-weight:500;
    color:#666;
    padding: 16px 16px 0 42px;
;
}
.card-list {
    padding:10px 10px;
}
.card-list__item {
    padding-bottom: 4px;
}
.scroll-container {
    height: 92vh;
}
.timecontainer{
    padding: 1vh;
    text-align:right;
    color:gray;
    font-style: italic;
    font-size: medium;
    font-weight: bold;
}

/* my-card样式 */
.my-card-container {
	background: #f2f2f2;
}
.my-card {
    font-size: 14px;
    padding: 8px 16px;
    position: relative;
    background-image: url('https://beiyouxianyu.cn/image/bupt/cardbg/card_tsg.png');
    background-repeat:no-repeat; 
    background-size:88%;
    background-position-y:-85rpx;
    background-position-x:88rpx;
}
.my-card-tag {
    position:absolute;
    top: 0px;
    left: 28px;
}
.my-card-header {
    display: flex;
    padding: 12px 16px 6px;
    align-items: center
}
.my-card-header-content {
    flex: 1;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    color: #333;
}
.my-card-footer {
    position: relative;
    padding: 6px 16px;
    color: #80848f;
    font-size: 12px
}
.i-swipeout-demo-button-group{
    height:100%;
    width:100%;
}
.i-swipeout-demo-button{
    width:70px;
    float:left;
    display: flex;
    height:100%;
    justify-content: center;
    background:#2d8cf0;
    color:#fff;
    align-items:center;
}
</style>
