<template>
    <!--  <div class="search-tab">-->
    <div id="search-tab">
        <!--      <div class="row" style="width: 100%">-->
        <div>
            <div >
                <a-input-search @search="btnClick" v-model="SearchName" @keyup.enter="btnClick" type="text"
                       placeholder="输入州名" />
            </div>
        </div>
        <!--      </div>-->

    </div>
    <!--  </div>-->
</template>

<script>
    //搜索导航栏
    export default {
        name: "SearchTab",
        data() {
            return {
                SearchName: ''
            }
        },
        updated() {
            this.$store.commit('SelectData', this.SearchName);

        },
        mounted() {
            this.$store.commit('SelectData', this.SearchName);
        },

        methods: {
            btnClick() {
                if (this.$store.state.SelectStateName) {
                    this.$router.push({
                        path: '/usa/state',
                        query: {
                            pro: this.$store.state.SelectStateName[0].EN
                        }
                    })
                }

            }
        },


    }
</script>

<style scoped>


    #search-tab {

        height: 40px;
        max-height: 40px;
        flex: 1;
        margin-top: 2.5px;

    }

    .search-tab {
        /*display: flex;*/
    }


</style>