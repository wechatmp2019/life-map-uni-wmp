<template>
	<view v-if="show" class="i-class i-noticebar" :style="{'color': color, 'background-color': backgroundcolor}">
	    <uni-icon v-if="showIcon" type="sound" size="24" :color="color" class="i-noticebar-icon"></uni-icon>
	    <view class="i-noticebar-content-wrap">
	        <view :class="['i-noticebar-content', loop?'i-noticebar-content-loop':'']">
	           <slot></slot>
	        </view>
	    </view>
	    <uni-icon v-if="closable" class="i-noticebar-operation" type="close" size="20" :color="color" @click="handleClose"></uni-icon>
	</view>
</template>

<script>
import { uniIcon } from '@dcloudio/uni-ui';
export default {
    name: 'notice-bar',
    components: {
		uniIcon
    },
	data () {
		return {
			show: true,
			wrapWidth: 0,
			width: 0,
			duration: 0,
			animation: null,
			timer: null,
		};
	},
    props: {
		closable: {
		    type: Boolean,
		    default: false
		},
		loop: {
		    type: Boolean,
		    default: false
		},
		// 背景颜色
		backgroundcolor: {
		    type: String,
		    default: '#fefcec'
		},
		// 字体及图标颜色
		color: {
		    type: String,
		    default: '#f76a24'
		},
		// 滚动速度
		speed: {
		    type: Number,
		    value: 1000
		},
		showIcon: {
			type: Boolean,
			default: true
		}
    },
    computed: {
    },
    methods: {
		 handleClose() {
			 this.show = false;
			 this.timer = null;
		 }
    }
};
</script>

<style>
.i-noticebar {
	display: flex;
	height: 72rpx;
	line-height: 72rpx;
	font-size: 14px;
	color: #f76a24;
	background-color: #fefcec;
	overflow: hidden
}

.i-noticebar-icon {
	display: flex;
	margin-left: 30rpx;
	align-items: center
}

.i-noticebar-icon+view {
	margin-left: 10rpx
}

.i-noticebar-operation {
	display: flex;
	margin-right: 16rpx;
	align-items: center
}

.i-noticebar-content-wrap {
	position: relative;
	flex: 1;
	margin: 0 30rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap
}

.i-noticebar-content-wrap .i-noticebar-content {
	position: absolute;
	transition-duration: 20s
}
</style>
