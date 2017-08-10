<template>
    <div>
        <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈" style="background: #555">
            <router-link to="/team" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="teaminfo_info">
            <div>
                <mt-cell title="历史总金额"><span style="color: green">1</span></mt-cell>
                <mt-cell title="近期总金额"><span style="color: green">1</span></mt-cell>
                <mt-cell title="人均金额"><span style="color: green">1</span></mt-cell>
                <mt-cell title="个人金额"><span style="color: green">1</span></mt-cell>
                <mt-cell title="需支付金额"><span style="color: green">1</span></mt-cell>
                <mt-cell title="上次结算时间"><span style="color: green">1</span></mt-cell>
            </div>
            <div class="teaminfo_btmwarp">
                <div>
                    <mt-button size="large">全部出资列表</mt-button>
                </div>
                <div>
                    <mt-button size="large">近期出资列表</mt-button>
                </div>
                <div>
                    <mt-button size="large">近期结算列表</mt-button>
                </div>
            </div>
            <div class="teaminfo_sub">
                <div v-bind:class="{ teaminfo_sub_is_show: teaminfo_sub_is_show }">
                   <img src="../../assets/pointing-right.png" alt="">
                </div>
                <button>+</button>
            </div>
        </div>
    </div>
</template>
<script>
import { Header } from 'mint-ui';
import { Cell } from 'mint-ui';
export default {
    components: {
    },
    data () {
        return {
            teaminfo_sub_is_show : true
        }
    },
    mounted (){// TODO: mounted中部分方法需改用Promise
        var self = this
        setInterval(function () {
           self.teaminfo_sub_is_show = !self.teaminfo_sub_is_show
        },500)

    },
    computed: {
    },

    methods: {

    }
}
</script>
<style>
    .teaminfo_info{
        padding-top: 1rem;
    }
    .teaminfo_btmwarp{
        padding: .5rem .25rem;
    }
    .teaminfo_btmwarp > div{
        padding: 0.25rem 0;
    }
    .teaminfo_sub{
        height:1.5rem;
        position: fixed;
        bottom: .5rem;
        left:0px;
        width:100%;
    }
    .teaminfo_sub > div{
        font-size: .3rem;
        line-height:.7rem;
        padding-left: 2rem;
        padding-top: .3rem;
        width:2rem;
        transition: .5s;
    }
    .teaminfo_sub > div img{
        float: right;
        display: block;
        width:.7rem;
    }
    .teaminfo_sub .teaminfo_sub_is_show{
        transition: .5s;
        opacity: 0;
    }
    .teaminfo_sub button{
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        width:1.5rem;
        height:1.5rem;
        background: #555555;
        color: #ffffff;
        border-radius: 1.5rem;
        border: none;
        font-size: 1rem;
    }
</style>