<template>
    <div class="page6">
        <b-container>
            <div class="box_test">
                <div class="dotted">
                </div>
                <div class="container-test">
                    <h2>
                        Đây là thông tin em đã cung cấp, em kiểm tra kĩ lại thông tin trước khi ấn "Nộp bài" nhé:
                    </h2>
                    <form action="" class="form-box">
                         <b-form-group id="input-group-1" label-for="input-1" >
                                <b-form-input id="input-1" v-model="name" :state="nameSate" name="name" ref="hoten" placeholder="Họ tên (*)" required ></b-form-input>
                            </b-form-group>
                            <b-form-invalid-feedback :state="nameSate">Bạn vui lòng không để trống họ và tên</b-form-invalid-feedback>
                            <b-form-group id="input-group-3" label-for="input-2">
                                <b-form-input id="input-2" v-model="phone_comfirm" name="phone" ref="phone" :state ="phoneState" placeholder="Số điện thoại (*)" required ></b-form-input>
                            </b-form-group>
                            <b-form-invalid-feedback :state="phoneState">Bạn vui lòng nhập đúng số điện thoại</b-form-invalid-feedback>
                            <b-form-group id="input-group-4" label-for="input-2">
                                <b-form-input id="input-2" v-model="email" name="email" ref="email" :state="emailState" placeholder="Email (*)" required ></b-form-input>
                            </b-form-group>
                            <b-form-invalid-feedback :state="emailState">Bạn vui lòng nhập đúng Email</b-form-invalid-feedback>
                        <!-- <b-row class="">
                            <b-col md="4" sm="6">
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-1"
                                        v-model="status"
                                        name="checkbox-1"
                                        value="9 a.m - 10 a.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>9 a.m - 10 a.m</span>
                                    </b-form-checkbox>
                                </div>
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-2"
                                        v-model="status"
                                        name="checkbox-2"
                                        value="10 a.m - 11 a.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>10 a.m - 11 a.m</span>
                                    </b-form-checkbox>
                                </div>
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-3"
                                        v-model="status"
                                        name="checkbox-3"
                                        value="11 a.m - 12 a.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>11 a.m - 12 a.m</span>
                                    </b-form-checkbox>
                                </div>
                            </b-col>
                             <b-col md="4" sm="6">
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-4"
                                        v-model="status"
                                        name="checkbox-4"
                                        value="2 p.m - 3 p.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>2 p.m - 3 p.m</span>
                                    </b-form-checkbox>
                                </div>
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-5"
                                        v-model="status"
                                        name="checkbox-5"
                                        value="3 p.m - 4 p.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>3 p.m - 4 p.m</span>
                                    </b-form-checkbox>
                                </div>
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-6"
                                        v-model="status"
                                        name="checkbox-6"
                                        value="4 p.m - 5 p.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>4 p.m - 5 p.m</span>
                                    </b-form-checkbox>
                                </div>
                            </b-col>
                             <b-col md="4" sm="6">
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-7"
                                        v-model="status"
                                        name="checkbox-7"
                                        value="5 p.m - 6 p.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>5 p.m - 6 p.m</span>
                                    </b-form-checkbox>
                                </div>
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-8"
                                        v-model="status"
                                        name="checkbox-8"
                                        value="6 p.m - 7 p.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>6 p.m - 7 p.m</span>
                                    </b-form-checkbox>
                                </div>
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-9"
                                        v-model="status"
                                        name="checkbox-9"
                                        value="7 p.m - 8 p.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>7 p.m - 8 p.m</span>
                                    </b-form-checkbox>
                                </div>
                            </b-col>
                        </b-row> -->
                        <!-- <b-row>
                            <b-col>
                                <b-form-invalid-feedback class="mb-0 mb-2" :state="checkState">Bạn vui lòng chọn khung giờ</b-form-invalid-feedback>
                            </b-col>
                        </b-row> -->
                        <!-- <b-row class="end-form">
                            <b-col lg="7">
                                <p>Điền lại chính xác số điện thoại để giáo viên liên hệ cho bạn nhé:</p>
                            </b-col>
                            <b-col lg="5">
                                <input type="text" ref="phone" v-model="phone_comfirm" :state ="phoneState" placeholder="Số điện thoại của bạn">
                            </b-col>
                        </b-row> -->
                        <!-- <b-row>
                            <b-col lg="7">
                            </b-col>
                            <b-col lg="5">
                                <b-form-invalid-feedback class="mb-0 mt-2" :state="phoneState">Bạn vui lòng nhập đúng số điện thoại</b-form-invalid-feedback>
                            </b-col>
                        </b-row> -->
                    </form>
                    <div class="d-flex justify-content-center button-pg1 ">
                        <b-button @click="nextpage" variant="success">Nộp Bài</b-button>
                    </div>  
                </div>
                 
            </div>
           
        </b-container>
    </div>
</template>
<script>
    export default{
        data : function() {
            return{
                status: [],
                phone_comfirm: '',
                submited: false,
                name:'',
                phone: '', 
                email:''
            }
        },
        created(){
            let userInfo = localStorage.getItem('quiz_userInfo')
            if (userInfo) {
                userInfo = JSON.parse(userInfo)
                this.name = userInfo.name
                this.phone_comfirm = userInfo.phone_comfirm ? userInfo.phone_comfirm : userInfo.phone
                this.email = userInfo.email
            }
        },
        computed: {
            nameSate() {
                if (!this.submited) {
                    return null
                }

                if(this.name.trim().length == '' || !/[A-Z, a-z]/.test(this.name)){
                    return false;
                } else {
                    return true
                }
            },
            phoneState(){
                if (!this.submited) {
                    return null
                }

                if(!this.checkPhone(this.phone_comfirm)){
                    return false;
                } else {
                    return true
                }
            },
            // checkState(){
            //     if (!this.submited) {
            //         return null
            //     }

            //     if(this.status.length == 0){
            //         return false;
            //     } else {
            //         return true
            //     }
            // },
            emailState(){
                if (!this.submited) {
                    return null
                }

                if(!this.validEmail(this.email.trim())){
                    return false;
                } else {
                    return true
                }
            },
        },
        methods: {
            nextpage() {
                console.log(this.checkState)
                this.submited = true
                
                if(!this.nameSate){
                    this.$refs.hoten.focus()
                    return
                }
                if(!this.emailState){
                    this.$refs.email.focus()
                    return
                }
                if(!this.checkPhone(this.phone_comfirm)){
                    this.$refs.phone.focus()
                    return
                }
                // Push test
                const trackid = localStorage.getItem('_hm_quiz_track')
                this.$http.post('/test-submit',{
                    trackid: trackid,
                    test_data: JSON.parse(localStorage.getItem('speakupTestData')),
                    time: JSON.stringify(this.status),
                    confirm_phone: this.phone_comfirm,
                    name: this.name,
                    email: this.email,
                })
                .then(res => {
                    if (res.data.code === 1) {

                        this.$bvToast.toast(res.data.message, {
                            title: `Thành công`,
                            variant: 'success',
                            solid: true
                        })

                        localStorage.removeItem('speakupTestData')
                        localStorage.removeItem('speakupTestName')
                        localStorage.removeItem('speakupTestPage')
                        localStorage.removeItem('speakupTestPart')
                        // localStorage.removeItem('_hm_quiz_track')
                        
                        this.$store.commit('SET_PAGE', 7);
                        this.$nextTick(()=>{ 
                            window.scrollTo(0, 0);
                        })
                    } else {
                        this.$bvToast.toast(res.data.msg, {
                            title: `Có lỗi xảy ra !`,
                            variant: 'danger',
                            solid: true
                        })
                    } 
                })
                .catch(error => {
                    this.$bvToast.toast(error.message, {
                        title: `Có lỗi xảy ra !`,
                        variant: 'danger',
                        solid: true
                    })
                })
            },
            checkPhone(mobile) {
                let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                if(mobile !==''){
                    if (vnf_regex.test(mobile) == false) {
                        return false
                    } else {
                        return true
                    }
                }
            },
            validEmail(email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
        },
        watch: {
            status(value) {
                console.log(value)
            }
        }
    }
</script>
<style >
    .btn.btn-danger {
        background-color: #c7211d;
        text-transform: uppercase;
        color: #fff;
        font-weight: 900;
        font-size: 40px;
        border-radius: 25px;
        line-height: 45px;
        padding: 5px 35px;
        display: inline-block;
        border: 1px solid #94100d;
        box-shadow: 0px 4px 2px #94100d;
    }
    .button-pg1 {
        position: relative;
        z-index: 2;
    }
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
/* 
    .form-box input[type="text"]{
        border: 2px solid #1160a0;
        border-radius: 8px;
    } */

    .custom-control {
        user-select: none;
    }
</style>
<style scoped>
    .box_test{
        /* height: 70vh; */
        background: #fff;
        border-radius: 0 0 15px 15px;
        /* background: url(../assets/bg-box-test.png); */
        background-repeat: repeat;
        /* overflow-y: auto; */
        position: relative;
        z-index: 1;
    }
    .invalid-feedback {

        color: #dc3545;
        text-align: left;
    }
    .form-control{
        border-radius: 15px;
        color: #0158a8;
        line-height: 1.5;
        margin-bottom: 20px;
        font-weight: 600;
        height: 50px;
        padding: 15px;
    }
    .dotted{
        position: absolute;
        background: url(../assets/dotted-box-test.png);
        width: 100%;
        top: -10px;
        background-repeat: no-repeat;
        height: 26px;
        left: 50%;
        transform: translate(-50%,-50%);
        background-size: 100% 100%;
    }
    .container-test{
        text-align: center;
        padding: 0;
        width: 68%;
        margin: auto;
        padding-top: 10px;
    }
    .container-test h2{
        margin-top: 20px;
        font-size: 20px;
        font-weight: 900;
        line-height: 1.5;
        color: #0057a7;
        
    }
    .container-test  h3{
        font-size: 20px;
        color: #0057a7;
        font-weight: 900;
    }
    .container-test  h4, .end-form p{
        font-size: 20px;
        color: #0057a7;
        margin-bottom: 0;
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
        margin-top: 30px;
    }
    .end-form input{
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 10px;
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
            /* height: 415px; */
        }
        .dotted {
            height: 15px;
            top: -5px;
        }
        .container-test {
            padding: 10px;
            width: 100%;
        }
        .container-test h2 {
            font-size: 14px;
        }
        .end-test img {
            margin-right: 10px;
            margin-top: -15px;
        }
        .end-test {
            margin-top: 18px;
            margin-bottom: 32px;
            font-size: 17px;
            align-items: center;
        }
        .container-test h4, .end-form p{
            font-size: 16px;
        }
        .btn.btn-success{
            font-style: 25px;
        }
    }
    @media only screen and (max-width: 768px){
         /* .page6{
             height: 100vh;
         } */
         .form-box .col-lg-4{
            align-items: flex-start;
        }
        .box_test{
            /* height: 80vh; */
        }
     }
</style>
