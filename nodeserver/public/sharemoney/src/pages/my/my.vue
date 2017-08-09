<template>
    <div>
        <div>
            <div class="my_tx_warp">
                <img src="../../assets/tx.jpg" alt="">
                <div>
                    <span v-text="user" @click="chang_user_name"></span>
                </div>
            </div>
        </div>
        <tabs currentTab="3"></tabs>
    </div>
</template>
<script>
import axios from 'axios'
import Tabs from '../../component/tabs.vue'
import { MessageBox } from 'mint-ui';
export default {
    components: {
        Tabs,
    },
    data () {
        return {
            user:{
                name:'',
                phone:''
            },
        }
    },
    mounted (){// TODO: mounted中部分方法需改用Promise
            this.user.phone = localStorage.getItem('wutuobang_user');
    },
    computed: {
    },

    methods: {
        chang_user_name(){
            MessageBox.prompt('请输入姓名',"更改用户名").then(({ value, action }) => {
                axios.post('/changeusername', {
                    userphone: self.phone,
                    password: self.password
                })
                    .then(function (response) {
                        if(response.status == 200){
                            localStorage.setItem("wutuobang_user",{phone:response.phone})
                            mint.Toast({
                                message: '登录成功',
                                position: 'bottom',
                                duration: 3000,
                                className : "chengtoast"
                            });
                            setTimeout(function () {
                                window.location.reload();
                            },2000)
                        }else {
                            mint.Toast({
                                message: response.data,
                                position: 'bottom',
                                duration: 3000,
                                className : "redtoast"
                            });
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        }
    }
}
</script>
<style>
    .my_tx_warp{
        padding:1rem;
        background: #555555;
        position: relative;
    }
    .my_tx_warp > div{
        width:3rem;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .my_tx_warp > div span{
        color: #ffffff;
        font-size: .5rem;
        line-height:1.5rem;
    }
    .my_tx_warp img{
        display: block;
        width:1.5rem;
        border-radius: 1.5rem;
    }
</style>