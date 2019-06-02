<template>
    <div class="card-operation" @click="handleCardOperation">
        <div v-if="type === 'place'">
            <div class="card-operation-icon">
                <image src="/static/images/icon/joinedcard.png" class="menu__icon" v-if="hasSaved"/>
                <image src="/static/images/icon/joincard.png" class="menu__icon" v-else/>
            </div>
            <div class="card-operation-status">
                <text v-if="hasSaved">已订阅</text>
                <text v-else>订阅</text>
            </div>
        </div>
        <div v-else>
            <div class="card-operation-icon">
                <image src="/static/images/icon/joinedcard.png" class="menu__icon" v-if="hasSaved"/>
                <image src="/static/images/icon/joincard.png" class="menu__icon" v-else/>
            </div>
            <div class="card-operation-status">
                <text v-if="hasSaved">已加入</text>
                <text v-else>加入卡包</text>
            </div>
        </div>
    </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'card-operation',
    data () {
        return {
        };
    },
    props: {
        type: {
            type: String,
            default: 'tip'
        },
        cardId: {
            type: Number,
            required: true
        },
        markPointId: {
            type: Number,
            required: true
        }
    },
    computed: {
        ...mapGetters({
            getCard: 'getCardByCardAndMarkId'
        }),
        hasSaved () {
            return this.getCard(this.cardId, this.markPointId).collected;
        }
    },
    methods: {
        ...mapActions([
            'collectcCard',
            'cancleCollectCard'
        ]),
        handleCardOperation (e) {
            e.stopPropagation();
            if (this.hasSaved) {
                this.cancleCollectCard({
                    cardId: this.cardId,
                    markId: this.markPointId
                });
            } else {
                this.collectcCard({
                    cardId: this.cardId,
                    markId: this.markPointId
                });
            }

            return false;
        }
    }
};
</script>

<style scoped>
.i-card {
    margin: 4px 8px;
    font-size: 14px;
    overflow: hidden;
    background: #fff;
    border: 1rpx solid #dddee1;
}
.menu__icon {
    height: 24px;
    width: 22px;
}
.card-operation-status {
    font-size: 12px;
    color: #999;
}
</style>
