<template>
    <div class="page7">
        <b-container>
            <b-row class="d-lex justify-content-center mt-5">
                <b-col lg="9" >
                    <div class="box-tks ">
                        <!-- <img src="../assets/tks.png" alt=""> -->
                        <div class="text-tks text-center">
                            <h5>
                                Cảm ơn và chúc mừng em đã hoàn thành bài kiểm tra đánh giá năng lực đầu vào của chương trình Master.
                                Kết quả của em sẽ có sớm thôi. 
                                <br />
                                Cùng đợi nhé!
                            </h5>   
                        </div>
                    </div>
                 
                </b-col>
                <b-col lg="12" >
                    <div class="d-flex justify-content-center button-pg1 mt-5">
             
                            <b-button  @click="nextpage" variant="success">LÀM TIẾP MÔN KHÁC</b-button>
            
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    export default{
        data : function() {
            return{

            }
        },
        props : {
            data_a: {
                type : String,
                default : ''
            }
        },
        methods: {
            nextpage() {
                this.$store.commit('SET_PAGE', 1);
            }
        }
    }
</script>
<style >
    .check-box span{
        background: #fee138;
        color: #1160a0;
        font-style: italic;
        padding: 5px 15px;
        border-radius: 10px;
        border: 2px solid #1160a0;
        margin-left: 30px;
    }
    .check-box{
        margin-bottom: 40px;
    }
    .check-box input[type="checkbox"]{
        width: 30px;
        height: 25px;
        /* -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        appearance: none; */
        border: 2px solid #1160a0;
        border-radius: 4px;
        outline: none;
        transition-duration: 0.3s;
        cursor: pointer;
        margin-right: 30px;
        margin-top: -3px;
    }
    .form-box input[type="text"]{
        border: 2px solid #1160a0;
        border-radius: 8px;
    }
</style>
<style scoped>
    .text-tks h5{
        font-size: 25px;
    }
    .box-tks{
        color: #fff;
        font-size: 22px;
        font-weight: 700;
        top: -15px;
        position: relative;
    }
    .btn.btn-success {
        width: 50%;
    }
    .box-tks{
        position: relative;
        z-index: 1;
    }
    .box_test{
        /* height: 70vh; */
        background: #fff;
        border-radius: 20px;
        background: url(../assets/bg-box-test.png);
        background-repeat: repeat;
        /* overflow-y: scroll; */
        position: relative;
        box-shadow: 0px 8px 0px #1990ef;
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
    .container-test{
        text-align: center;
        padding: 40px;

    }
    .container-test  h2{
        margin-top: 20px;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.5;
        color: #fee138;
        text-shadow: rgb(0, 87, 167) 2px 0px 0px, rgb(0, 87, 167) 1.75517px 0.958851px 0px, rgb(0, 87, 167) 1.0806px 1.68294px 0px, rgb(0, 87, 167) 0.141474px 1.99499px 0px, rgb(0, 87, 167) -0.832294px 1.81859px 0px, rgb(0, 87, 167) -1.60229px 1.19694px 0px, rgb(0, 87, 167) -1.97998px 0.28224px 0px, rgb(0, 87, 167) -1.87291px -0.701566px 0px, rgb(0, 87, 167) -1.30729px -1.5136px 0px, rgb(0, 87, 167) -0.421592px -1.95506px 0px, rgb(0, 87, 167) 0.567324px -1.91785px 0px, rgb(0, 87, 167) 1.41734px -1.41108px 0px, rgb(0, 87, 167) 1.92034px -0.558831px 0px;
    }
    .container-test h3{
        font-size: 20px;
        color: #0057a7;
        font-weight: 900;
    }
    .container-test h4, .end-form p{
        font-size: 20px;
        color: #0057a7;
        margin-bottom: 0;
        font-weight: 600;
        font-style: italic;
    }
    .container-test form{
        max-width: 1000px;
        margin: 0 auto;
        margin-top: 30px;
    }
    .form-box .col-lg-4{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .box_test{
        /* margin-top: 30px; */
    }
    .end-form input{
        width: 100%;
        height: 40px;
        line-height: 40px;
    }
    .end-form{
        display: flex;
        align-items: center;
    }
    .end-test{
        font-size: 30px;
        color: #0057a7;
        font-weight: 600;
        display: flex;
        align-items: baseline;
        justify-content: center;
        margin-top: 40px;
    }
     .end-test img{ margin-right: 20px;}
    @media only screen and (max-width: 768px){
         .dotted{
            width: 100%;
            background-size: 30%;
        }
        .btn.btn-success{
            font-style: 25px;
        }
        .page7{
            height: 85vh;
        }
     }
</style>
