<template>
    <div>
        <b-container>
             <b-row class="header-test d-flex align-items-center mb-3 mt-4">
                <b-col lg="6" class="">
                    <div class="box_title">
                        1. Writing (20 question)
                    </div>
                </b-col>
                <b-col lg="6" class="d-flex justify-content-end">
                    <div class="box_time d-flex align-items-center">
                        <div class="icon_clock">
                            <img src="../assets/clock.png" alt="">
                        </div>
                        <div class="time-end">
                            40:00
                        </div>
                    </div>
                </b-col>
            </b-row>
            <div class="box_test">
                <div class="dotted">
                </div>
            </div>
            <div class="d-flex justify-content-center button-pg1 ">
                    <b-button @click="nextpage" variant="success">Start</b-button>
            </div>
        </b-container>
    </div>
</template>
<script>
export default {
    methods: {
        nextpage(){
            this.$store.commit('SET_PAGE','Page6');
        }
    }
}
</script>
<style scoped>
   .button-pg1 {
        top: -30px;
    }
    .box_test{
        /* height: 70vh; */
        background: #fff;
        border-radius: 20px;
        background: url(../assets/bg-box-test.png);
        background-repeat: repeat;
        overflow-y: scroll;
        position: relative;
    }
    .dotted{
        position: absolute;
        width: 93%;
        top: -2px;
        background: url(../assets/dotted-box-test.png);
        background-repeat: repeat-x;
        height: 55px;
        left: 50%;
        transform: translateX(-50%);
    }
    .box_title, .box_time{
        background: #fee138;
        border: 1px solid #025dad;
        border-radius: 15px;
        padding: 5px 15px;
        width: fit-content;
        font-size: 28px;
        color: #025dad;
        font-weight: 700;
    }
    .icon_clock{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    .header-test img, svg {
        vertical-align: unset;
    }
    /* custom scrollbar */
    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }
    @media only screen and (max-width: 768px){
        .box_title, .box_time {
            font-size: 16px;
        }
        .box_test{
            /* height: 350px; */
        }
        .dotted{
            width: 100%;
            background-size: 30%;
        }
        .btn.btn-success{
            font-style: 25px;
        }
    }
</style>
