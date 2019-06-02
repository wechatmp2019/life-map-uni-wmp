<template>
    <div class="my-card-container">
        <action-sheet :visible="asVisible" :actions="actions" show-cancel @cancel.stop="handleCancelAs" @asclick="handleClickAction" :mask-closable="true">
            <view slot="header" style="padding: 16px">
                <view style="color: #333;font-size: 16px">确定要取消收藏吗？</view>
            </view>
        </action-sheet>
        <swipeout :operateWidth="180" :unclosable="true" :toggle="toggleSwipeout">
            <div slot="content" class="my-card">
                <uni-tag class="my-card-tag" type="success" size="small" :text="cardData.markName"></uni-tag>
                <div class="my-card-content">
                    <div class="my-card-header">
                        <div class="my-card-header-content">
                            {{ title }}
                        </div>
                    </div>
                    <div class="my-card-body">
                        <div class="my-card-body__item" v-for="(mtip, mtIndex) in detail" :key="mtIndex">
                            {{mtip}}
                        </div>
                    </div>
                </div>
            </div>
            <div slot="button" class="i-swipeout-demo-button-group" style="background:#2db7f5;">
                <div class="i-swipeout-demo-button" style="width:60px" @click="openActionSheet"><i-icon size="32" type="label_fill"></i-icon></div>
                <button open-type="share" class="i-swipeout-demo-button" style="width:60px"><i-icon size="32" type="share_fill"></i-icon></button>
                <div class="i-swipeout-demo-button" style="width:60px" @click="handleUndoClick"><i-icon size="32" type="undo"></i-icon></div>
            </div>
        </swipeout>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { uniTag } from '@dcloudio/uni-ui';
const { $Message } = require('../../wxcomponents/base/index');

export default {
    name: 'my-card',
    data () {
        // as 代表 actionsheet
        return {
            asVisible: false,
            toggleSwipeout: false,
            actions: [
                {
                    name: '取消收藏',
                    color: '#ed3f14'
                }
            ]
        };
    },
    components: {
		uniTag
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        detail: {
            type: Array,
            default: () => []
        },
        cardId: {
            type: Number,
            required: true
        },
        cardData: {
            type: Object,
            required: true
        }
    },
    computed: {
    },
    methods: {
        ...mapActions([
            'cancleCollectCard'
        ]),
        toggleSwipeShow () {
            this.toggleSwipeout = !this.toggleSwipeout;
        },
        handleCancelAs () {
            this.closeActionSheet();
            this.toggleSwipeShow();
        },
        handleClickAction (e, index) {
            const action = [...this.actions];
            action[0].loading = true;
            this.actions = action;

            // 发送请求
            this.cancleCollectCard({
                markId: this.cardData.markpoint_id,
                cardId: this.cardId,
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
        }
    }
};
</script>

<style scoped>
.my-card-container {
    border-radius: 18px;
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
.my-card-body {
    position: relative;
    padding: 6px 16px;
}
.my-card-body__item {
    font-size: 12px;
    color:#666;
    padding-bottom: 6px;
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
