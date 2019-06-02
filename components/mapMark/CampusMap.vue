<template>
    <div class="campus-map" @click="handleMapClick">
        <scroll-view scroll-y :enable-back-to-top="true" class="map-scroll-container">
            <image :src="localMapImg" mode="widthFix" class="campus-map__img"/>
            <map-mark v-for="(item,index) of mapMarks" :key="item.id" 
                :icon="item.image_url" :place="item.name"
                :position="[item.latitude, item.longitude]"
				:markId="item.id" :markName="item.name"
				@markClick="handleMapMarkClick"/>
        </scroll-view>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import MapMark from './MapMark';

export default {
    name: 'campus-map',
    components: {
        MapMark
    },
    data () {
        return {
            localMapImg: '/static/images/map/xitucheng.jpg',
            loadingUrl: 'https://image.weilanwl.com/gif/loading-white.gif'
        };
    },
    props: {
        campus: {
            type: String,
            default: 'bupt'
        },
        mapMarks: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        ...mapState([
            'currentMap'
        ])
    },
    methods: {
        handleMapMarkClick (markId, markName) {
            this.$emit('markClick', markId, markName);
        },
		handleMapClick () {
			this.$emit('mapClick');
		}
    },
    onLoad () {
    }
};
</script>

<style scoped>
.campus-map {
    position: relative;
}
.map-scroll-container {
    height: 100vh;
}
.campus-map__img {
    width: 100vw;
}
</style>
