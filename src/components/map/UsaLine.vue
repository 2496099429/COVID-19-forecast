<template>
    <div>
        <div style="height: 550px;width:100%;margin-top: 28px;">

            <div  style="position: relative;left: 50%;transform: translateX(-50%);width: 19rem;max-width: 1035px;height: 500px">
                <!--    美国折线图 累积-->
                <div style="position: absolute;top: 0%;left: 0%;width: 19rem;max-width: 1035px;height: 500px">
                    <div style="z-index: 20" id="usa-line"></div>
                </div>
                <!--   美国预测折线图-->
                <div style="position: absolute;top: 0%;left: 0%;width: 19rem;max-width: 1035px;height: 500px">
                    <div style="z-index: 10" id="predict-line"></div>
                </div>
<!--                新增-->
                <div style="position: absolute;top: 0%;left: 0%;width: 19rem;max-width: 1035px;height: 500px">
                    <div style="z-index: 30" id="new-line"></div>
                </div>
            </div>

<!--            美国折线图下面的按钮-->
            <div style="position: relative;left: 50%;transform: translateX(-50%);width: 19rem;max-width: 1035px;height: 50px;text-align: center">
                <div style="display: flex">
                    <div style="flex: 1;border:1px white solid;height: 50px"
                         :class="{divLine: index === lineCurrent,UdivLine: index !== lineCurrent}" @click="divClick(index)"
                         v-for="(item,index) in arrLine">
                        <div class="vertical">{{item}}</div>
                    </div>
                </div>
            </div>


        </div>


        <!--        折线图下面的按钮-->



    </div>

</template>

<script>
    import {PaintLine} from "assets/js/map/USALine";
    import {PaintPredict} from "assets/js/map/PredictLine";
    import {PaintNew} from "assets/js/map/NewLine";


    export default {
        name: "UsaLine",
        mounted() {
            PaintLine('累积确诊、死亡');
            PaintNew('新增确诊、死亡');
            PaintPredict('预测');
        },
        methods: {
            divClick(index) {
                let usa = document.getElementById('usa-line');
                let predict = document.getElementById('predict-line');
                let new_ = document.getElementById('new-line');
                if (this.lineCurrent !== index) {
                    this.lineCurrent = index;
                    if (index === 0) {
                        //新增
                        usa.style.zIndex = 20;
                        new_.style.zIndex = 30;
                        predict.style.zIndex = 10;

                    } else if (index === 1){
                        //累积
                        usa.style.zIndex = 30;
                        new_.style.zIndex = 20;
                        predict.style.zIndex = 10;

                    } else if (index === 2){
                        // 预测
                        usa.style.zIndex = 10;
                        new_.style.zIndex = 20;
                        predict.style.zIndex = 30;
                    }

                }

            }
        },
        data() {
            return {
                arrLine: ['新增确诊、死亡', '累积确诊、死亡' , '预测'],
                lineCurrent: 0,
            }
        }
    }
</script>

<style scoped>
    /* 累积*/
    #usa-line {
        max-height: 500px;
        height: 500px;
        background-color: rgba(255, 255, 255, 1);
    }
    /*预测*/
    #predict-line {

        max-height: 500px;
        height: 500px;
        background-color: rgba(255, 255, 255, 1);
    }
    /*新增*/
    #new-line {

        max-height: 500px;
        height: 500px;
        background-color: rgba(255, 255, 255, 1);
    }

    .divLine {
        border-radius: 3px; /* 边框半径 */
        background: #1E90FF; /* 背景颜色 */
        cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
        outline: none; /* 不显示轮廓线 */
        font-family: Microsoft YaHei; /* 设置字体 */
        color: white; /* 字体颜色 */
        font-size: 17px; /* 字体大小 */


        /*border-radius: 5px;*/
    }

    .UdivLine {
        background-color: #99CCFF;
        /*border-radius: 5px;*/
        border-radius: 3px;
        cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
        outline: none; /* 不显示轮廓线 */
        font-family: Microsoft YaHei; /* 设置字体 */
        color: grey; /* 字体颜色 */
        font-size: 17px; /* 字体大小 */
    }

</style>