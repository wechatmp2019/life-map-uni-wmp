<template>
    <div class="home-card">
        <div class="home-card-content">
            <div class="home-card-header">
                <div class="home-card-header-content">
                    {{ title }}
                </div>
            </div>
            <div class="home-card-body">
                <div class="home-card-body__item" v-for="(tip, tIndex) of detail" :key="tIndex">
                    {{tip}}
                </div>
            </div>
        </div>
        <div class="home-card-operation">
            <card-operation :type="type" :cardId="cardId" :markPointId="cardData.markpoint_id"/>
        </div>
    </div>
</template>

<script>
import CardOperation from './CardOperation';

export default {
    name: 'home-card',
    components: {
        CardOperation
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        type: {
            validator: (value) => {
                return ['place', 'tip'].indexOf(value) !== -1;
            },
            default: 'tip'
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
    }
};
</script>

<style scoped>
.home-card {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    overflow: hidden;
    background: #fff;
    border: 1rpx solid #dddee1;
    padding: 8px 16px;
}
.home-card-content {
    width: 80%;
}
.home-card-header {
    display: flex;
    padding: 6px 16px;
    align-items: center
}
.home-card-header-content {
    flex: 1;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    color: #333;
}
.home-card-body {
    position: relative;
    padding: 6px 16px;
    color: #495060;
    font-size: 14px
}
.home-card-body__item {
    font-size: 12px;
    color:#666;
    padding-bottom: 6px;
}
.home-card-footer {
    position: relative;
    padding: 6px 16px;
    color: #80848f;
    font-size: 12px
}
.home-card-operation {
    width: 20%;
    text-align:center;
    align-self: center;
}
</style>
