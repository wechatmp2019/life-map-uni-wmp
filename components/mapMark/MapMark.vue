<template>
    <div class="map-mark" :style="style" @click.stop="handleMarkClick">
        <image :src="icon" :class="imageSize" mode="aspectFit"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'map-mark',
    components: {
    },
	data () {
		return {
		};
	},
    props: {
        icon: {
            type: String,
            default: ''
        },
        place: {
            type: String,
            default: ''
        },
        position: {
            type: Array,
            default: () => [10, 10]
        },
		markId: {
			type: Number,
			required: true
		},
		markName: {
			type: String,
			required: true
		}
    },
    computed: {
		...mapState(['fullScreenModels']),
        style () {
			const model = wx.getStorageSync('model');
			let vhOffset = 0;
			if (this.fullScreenModels.indexOf(model) !== -1) {
				vhOffset = -10;
			}
            return this.$styles({
                left: this.position[0] + 'vw',
                top: this.position[1] + vhOffset + 'vh'
            });
        },
        imageSize () {
            switch (this.place) {
            case '明光楼':
            case '校医院':
            case '漫咖啡':
            case '宿舍区':
                return 'mark-image--big';
            case '校车点':
            case '保卫处':
            case '浴室':
            case '食堂':
            case '就业指导中心':
                return 'mark-image--small';
            case '学十':
            case '图书馆':
            case '科学会堂':
                return 'mark-image--medium';
            case '主楼':
                return 'zhulou';
            case '运动场地':
                return 'caochang';
            default:
                return 'mark-image';
            }
        }
    },
    methods: {
		handleMarkClick () {
			this.$emit('markClick', this.markId, this.markName);
		}
    }
};
</script>

<style scoped>
.map-mark {
    position: absolute;
}
.mark-image {
    width: 50px;
    height: 50px;
}
.mark-image--big {
    width: 110px;
    height: 110px;
}
.mark-image--medium {
    width: 90px;
    height: 90px;
}
.mark-image--small {
    width: 40px;
    height: 40px;
}
.zhulou {
    width: 75px;
    height: 75px;
}
.caochang {
    width: 80px;
    height: 80px;
}
</style>
