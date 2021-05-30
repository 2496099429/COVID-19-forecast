<template>
    <div class="all-button">
        <a href="javascript: void(0)" @click="btnSort()">
            <div v-if="cIndex === ccurrentIndex">
                <div v-if="currentIndex">
                    <div style="margin-top: -5px"><img style="width: 10px;" src="~assets/img/sort/up.png"></div>
                    <div style="margin-top: -13px"><img style="width: 10px;" src="~assets/img/sort/down_selected.png"></div>
                </div>
                <div v-else>
                    <div style="margin-top: -5px"><img style="width: 10px;" src="~assets/img/sort/up_selected.png"></div>
                    <div style="margin-top: -13px"><img style="width: 10px;" src="~assets/img/sort/down.png"></div>
                </div>
            </div>
            <div v-else>
                <div style="margin-top: -5px"><img style="width: 10px;" src="~assets/img/sort/up.png"></div>
                <div style="margin-top: -13px"><img style="width: 10px;" src="~assets/img/sort/down.png"></div>
            </div>
        </a>
    </div>
</template>

<script>


    export default {
        name: "AConfirmButton",

        props: {
            ccurrentIndex: {
                type: Number,
                default: 1
            },
            cIndex: Number
        },
        data() {
            return {
                currentIndex: false
            }
        },
        methods: {
            btnSort(){
                this.currentIndex = !this.currentIndex;
                this.$emit('change-index',this.cIndex); //这里改变了父组件的currentIndex，应该也改变了子组件的ccurrentIndex，但可能由于异步，此时的ccurrentIndex并没有变
                let cIndex = this.cIndex;
                let currentIndex = this.currentIndex
                // console.log(this.ccurrentIndex)
                this.$store.commit('SortData',{cIndex,currentIndex})
            }
        },
        mounted() {
            if (this.cIndex === this.ccurrentIndex){
                this.currentIndex = true
                let cIndex = this.cIndex;
                let currentIndex = this.currentIndex
                // console.log(this.ccurrentIndex)
                this.$store.commit('SortData',{cIndex,currentIndex})
            }
        },
        updated() {
            if (this.cIndex !== this.ccurrentIndex){
                this.currentIndex = false   //每次点击都是降序排列
            }
        }
    }
</script>

<style scoped>
    .all-button {
        left: 0px;
    }

</style>