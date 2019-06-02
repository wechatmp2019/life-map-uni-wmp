<template>
  <div class="menu-container">
    <div class="profile">
        <open-data type="userAvatarUrl" lang="zh_CN"  class="profile__avatar"/>
        <open-data type="userNickName" lang="zh_CN" class="profile__nickname"/>
        <div class="profile__area">
            <open-data type="userProvince" lang="zh_CN" style="margin-right: 8upx;"/>
            <open-data type="userCity" lang="zh_CN" />
        </div>
        <div class="profile__other-info">
            <div class="profile__campus"></div>
        </div>
    </div>

    <div class="menu-list">
        <uni-list>
            <uni-list-item title="我的卡包" class="menu-item"  show-arrow="true" thumb="/static/images/icon/mycards.png" 
				@click="handleMenuClick('mycard')"/>
            <uni-list-item title="我的订阅" class="menu-item" show-arrow="true" thumb="/static/images/icon/mysubscribe.png"
				@click="handleMenuClick('mysub')" />
			<button open-type="feedback" class="feedback-btn" plain>
				<uni-list-item title="问题反馈" class="menu-item" show-arrow="true" thumb="/static/images/icon/feedback.png"/>
			</button>
            <uni-list-item title="关于我们" class="last-item" show-arrow="true" thumb="/static/images/icon/aboutus.png"
				@click="handleMenuClick('aboutus')" />
        </uni-list>
    </div>
  </div>
</template>

<script>
import { uniList, uniListItem } from '@dcloudio/uni-ui';
export default {
    name: 'aside-menu',
	components: {
		uniList, 
		uniListItem
	},
    data () {
        return {
            naviUrl: {
                myCards: '/pages/mycard/main',
                mySubscription: '/pages/mysubscription/main',
                feedback: '/pages/feedback/main',
                aboutUs: '/pages/contactus/main'
            }
        };
    },
    props: {
        full: {
            type: Boolean,
            default: false
        }
    },
    computed: {
    },
    methods: {
		handleMenuClick (e) {
			const type = e;
			if (type === 'mycard') {
				uni.navigateTo({
					url: this.naviUrl.myCards
				});
			} else if (type === 'mysub') {
				wx.showToast({
				    title: '功能正在开发中~',
				    icon: 'loading'
				});
			} else if (type === 'aboutus') {
				uni.navigateTo({
					url: this.naviUrl.aboutUs
				});
			}
		}
    }
};
</script>

<style scoped>
.menu-container {
    padding: 24px 12px;
}
.menu-list {
	padding: 12px 8px;
}
.profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 0 36px;
}
.profile__area {
    font-size: 12px;
    color: #666;
}
.profile__avatar {
    width: 64px;
    height: 64px;
    margin: auto;
    overflow: hidden;
    border-radius: 50%;
    border: 2px solid #fff;  
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2); 
}
.profile__nickname {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    padding: 6px 0 4px;
},
.feedback-btn {
	width:100%;
	border:none;
	border-radius: 0;
	border-bottom: 1px solid #E5E5E5;
	color:#333;
	padding:0;
	text-align:left;
}
.menu-item {
	border-bottom: 1px solid #E5E5E5;
}
.last-item {
	border-bottom: none;
}


</style>
