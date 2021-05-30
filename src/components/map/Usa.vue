<template>
<!--    主页-->
    <div v-cloak>
        <div style="display: flex;" >
            <div style="flex: 1;"></div>
            <div style="flex: 3;font-size: 40px;color: #5bc0de;text-align: center"><strong >美国实时疫情数据</strong></div>
            <div style="flex: 1;"></div>
        </div>

        <!--导航-->
        <div style="position: sticky;top: 0px;display: flex;z-index: 1000;background-color:#F1FAFA;text-align: center"> <!--导航栏-->
            <div style="flex: 1"><div class="vertical"><now-time></now-time></div></div>
            <a href="javascript: void(0)" class="a_tab" :class="{tab: currentTab === 1}" @click="tabClick(1)" ><div class="vertical ">美国疫情地图</div></a>

            <a href="javascript: void(0)" class="a_tab" :class="{tab: currentTab === 2}" @click="tabClick(2)"><div class="vertical ">美国疫情曲线</div></a>

            <a href="javascript: void(0)" class="a_tab" :class="{tab: currentTab === 3}" @click="tabClick(3)"><div class="vertical ">美国疫情汇总</div></a>
            <div style="flex: 1"><div class="vertical"><update-time></update-time></div></div>
        </div>

        <!--        统计总的数据-->
        <div id="my_com">
            <my-component style="text-align: center"></my-component>
        </div>
<!--        有这个才能出发生命周期函数updated-->
        <span style="font-size: 0">{{currentTab}}</span>

<!--        美国地图以及搜素框-->
        <div id="u-usa" style="width: 100%;height: 470px;">
            <!--0.6   -->

            <div style="position: relative;left: 50%;transform: translateX(-50%);height: 470px;width: 19rem;max-width: 1035px">
                <!-- 搜素框-->
                <div style="position: absolute;width: 5.2rem;max-width: 270px;height: 470px;text-align: center">
                    <search-box :cmyChart="myChart"></search-box>
                </div>

    <!--            美国地图 1.5-->
                <div style="position: absolute;width: 13rem;max-width: 720px;height: 470px;right: 0%">
                    <div id="usa"></div>
                </div>
                <!--        显示州的折线图-->
                <router-view></router-view>

            </div>

        </div>


<!--        美国折线图-->
        <div id="u-line">
            <usa-line></usa-line>
        </div>


<!--        美国表格-->
        <div id="u-list" style="text-align: center">

            <list></list>

        </div>


        <div style="font-size: 0px;margin-top: 1rem">.</div>

    </div>
</template>

<script>
import SearchBox from "components/common/select/SearchBox";
import SearchTab from "components/common/select/SearchTab";
import SearchName from "components/common/select/StateName";
import MyComponent from "components/common/mycomponent/MyComponent";
import NowTime from "components/common/mycomponent/childcom/NowTime";
import UpdateTime from "components/common/mycomponent/childcom/UpdateTime";

import List from "components/common/list/List"
import UsaLine from "./UsaLine";

import {PaintUSA} from "assets/js/map/USA";


export default {
    name: "Usa",
    components: {
        SearchBox,
        SearchTab,
        SearchName,
        List,
        UsaLine,
        MyComponent,
        NowTime,
        UpdateTime
    },
    data(){
        return {
            myChart: {},
            currentTab: 1,
            uLine: 0,
            uUsa: 0,
            uList: 0
        }
    },
    mounted() {
        this.myChart = PaintUSA()//调用函数画出美国
        //初始化
        this.start()

        //绑定滚动事件
        window.addEventListener('scroll',this.handleScroll,true)


    },

    props: {

    },
    methods: {
        tabClick(index){
            this.currentTab = index;
            if (index === 1){
                document.documentElement.scrollTop = this.uUsa - 20;
            }else if (index === 2){
                document.documentElement.scrollTop = this.uLine  - 20;
            }else if (index === 3){
                document.documentElement.scrollTop = this.uList  - 20;
            }
        },
        getOffsetTop(e){
            let offset = e.offsetTop;
            if (e.offsetParent != null) offset += this.getOffsetTop(e.offsetParent);
            return offset;
        },
        start(){
            this.uUsa = this.getOffsetTop(document.getElementById('my_com')) -50 ;
            this.uLine = this.getOffsetTop(document.getElementById('u-line')) -50 ;
            this.uList = this.getOffsetTop(document.getElementById('u-list')) -50 ;
        },
        handleScroll(){
            let top = document.documentElement.scrollTop;
            // console.log(top);
            // console.log(parseInt(top));
            if (top > this.uUsa - 10 && top < this.uLine - 22){

                if (this.currentTab != 1)
                    this.currentTab = 1;

            }else if (top >= this.uLine - 10 && top < this.uList - 22){
                if (this.currentTab != 2)
                    this.currentTab = 2;

            }else if (top >= this.uList - 22){
                if (this.currentTab != 3)
                    this.currentTab = 3;

            }

        }


    },


}


</script>

<style scoped>
    #usa {
        height: 470px;
        max-height: 470px;
        background-color: #fff;
        /*flex: 1.5;*/
    }

    #u-usa {    /*包裹usa地图和搜索框的*/
        /*display: flex;*/
    }

    #u-list {
        width: 100%
    }

    .a_tab {
        flex: 1;
        height: 53px;
        background-color:#EBA7AA;
        border: bisque 1px solid;

        align-items:center;
        text-decoration: none;
        /*border-radius: 6px;*/
        /*box-shadow: 5px 5px 5px;*/
        color: black;

    }

    .tab {
        background-color: #CA141D;
        border: rgba(4, 144, 220, 0.84) 1px solid;
        color: whitesmoke;
    }






</style>