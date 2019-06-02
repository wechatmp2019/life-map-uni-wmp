<template>
	<div class="my-card-body">
	    <div class="my-card-body__item" v-for="(mtip, mtIndex) of detail" :key="mtIndex">
	        {{mtip}}
	    </div>
	</div>
</template>

<script>
export default {
	props: {
		detail: {
			type: Array,
			required: true
		}
	}
}
</script>

<style scoped>
.my-card-body {
    position: relative;
    padding: 6px 16px;
}
.my-card-body__item {
    font-size: 12px;
    color:#666;
    padding-bottom: 6px;
}
</style>
