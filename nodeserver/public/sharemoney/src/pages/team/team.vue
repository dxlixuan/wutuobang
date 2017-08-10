<template>
    <div>
        <div>
            <div class="qun_list">
                <div class="qunone" @click="goto_quninfo">
                    <div>
                        <img src="../../assets/tx.jpg" alt="">
                    </div>
                    <div>
                        <div class="qun_inof">
                            <div>勤拂来敲门</div>
                            <span>群主:小轩在不在</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <tabs currentTab="2"></tabs>
    </div>
</template>
<script>
import Tabs from '../../component/tabs.vue'
export default {
    components: {
        Tabs,
    },
    data () {
        return {

        }
    },
    mounted (){// TODO: mounted中部分方法需改用Promise

    },
    computed: {
    },

    methods: {
        goto_quninfo(){
            this.$router.push({path:'teaminfo'})
        }
    }
}
</script>
<style>
    .qunone{
        position: relative;
        padding:.5rem;
        border: 1px solid #555555;
        overflow: hidden;
        border-radius: 3px;
        margin-top: .05rem;
    }
    .qunone > div{
        float: left;
    }
    .qunone > div > img{
        display: block;
        height:1.5rem;
        width:1.5rem;
    }
    .qun_inof{
        height:1.5rem;
    }
    .qun_inof div{
        position: absolute;
        top: 50%;
        left: 2.5rem;
        transform: translateY(-50%);
        font-size: .5rem;
    }
    .qun_inof span{
        position: absolute;
        right: .7rem;
        bottom: .5rem;
        font-size: .3rem;
    }
</style>