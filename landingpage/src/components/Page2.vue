<template>
    <div class="page2">
        <div>
            <b-container>
                <div class="rule box_test mb-4 mt-4">
                    <div class="dotted">
                    </div>
                    <div class="title-rule">
                        <span class="mt-4">QUY ĐỊNH LÀM BÀI </span>
                    </div>
                    <div class=" mt-4 mb-5 content-rule">
                        <p v-if="subjectid != 2">1. Bài thi gồm {{ this.ruleQuestion.part[0].questions.length }} câu hỏi trắc nghiệm theo phân phối chương trình của
                            Bộ Giáo dục và Đào tạo.</p>
                        <p v-if="subjectid == 2">1. Bài thi gồm các câu hỏi theo phân phối chương trình của Bộ Giáo dục
                            và Đào tạo.</p>
                        <p >2. Bài thi diễn ra trong thời gian {{ this.ruleQuestion.part[0].time / 60 }} phút.</p>
                        <p>3. Em nhớ ấn nút "Nộp bài" ở cuối để gửi lại bài cho hệ thống MASTER nha.</p>
                        <p>4. Các em học sinh làm bài trong môi trường yên tĩnh, có kết nối mạng ổn định để đạt kết quả
                            tốt nhất.</p>
                    </div>
                    <div class="mt-4 mb-4 bottom-row">
                        <h3>Chúc các bạn hoàn thành bài thi thật tốt.</h3>
                    </div>
                    <div class="d-flex justify-content-center button-pg1 ">
                        <b-button @click="nextpage" variant="success">BẮT ĐẦU LÀM BÀI</b-button>
                    </div>
                </div>
            </b-container>
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {
            ruleQuestion: '',
            subjectid: 1,
        }
    },
    mounted() {
        let questionData = localStorage.getItem('speakupTestData')
        questionData = JSON.parse(questionData)
        this.ruleQuestion = questionData
        console.log(this.ruleQuestion)
        console.log(this.ruleQuestion.part[0].time/60)
        if (questionData.subjectid) {
            this.subjectid = questionData.subjectid
        }
    },
    methods: {
        nextpage(){
            this.$store.commit('SET_PAGE', 3);
        }
    }
}
</script>
<style scoped>
    .page2 {
        /* height: 70vh;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center; */
        margin-top: 50px;
    }
    .button-pg1 {
        top: -5px;
    }
    
    .box_test{
        /* height: 375px; */
        background: #fff;
        border-radius: 0 0 15px 15px;
        /* background: url(../assets/bg-box-test.png); */
        background-repeat: repeat;
        position: relative;
        box-shadow: 0px 8px 0px #1990ef;
        padding-bottom: 30px;
    }
    .dotted{
        position: absolute;
        width: 100%;
        background: url(../assets/modal-header.png);
        background-repeat: no-repeat;
        height: 17px;
        left: 50%;
        transform: translate(-50%,-14px);
        background-size: 100% 100%;
    }
    .title-rule {
        margin-top: 2.5rem !important;
        display: inline-block;
        position: relative;
    }
    .title-rule span{
        font-weight: 900;
        color: #0057a7;
        font-size:35px;
        position: relative;
    }
    /* .title-rule::before{
        content: '';
        position: absolute;
        background-image: url('../assets/title-rule.png');
        height: 63px;
        width: 405px;
        left: 50%;
        transform: translateX(-50%);
        top: -7px;
        background-size: 100% 100%;
    } */
    .btn.btn-success {
        width: 70%;
    }
    .bottom-row h3{
        text-transform: uppercase;
        font-weight: 800;
    }
    .cloudy-pg1{
        position: absolute;
        z-index: 0;
        height: 170px;
        border: 0;
        bottom: 30px;
    }
    .rule{
        width: 73%;
        margin: auto;
        color: #0057a7;
        text-align: center;
        position: relative;
        background-color: #fff;
        z-index: 2;
    }
    .content-rule{
        padding: 0 50px;
        text-align: left;
    }
    .content-rule p{
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 10px;
    }
    .cloudy-pg1{
            bottom: -240px;
        }
    @media only screen and (max-width: 992px){
        .rule {
            width: 100%;
        }
    }

    @media only screen and (max-width: 768px){
        .page2{
            height: 78vh;
        }

        .rule{
            width: 100%;
        }
        .title-rule::before {
            top: -15px;
        }
        .title-rule span {
            font-size: 20px;
        }
        .content-rule p {
            font-size: 15px;
            margin-bottom: 5px;
        }
        .bottom-row h3{
            font-size: 18px;
        }
        .bottom-row {
            margin-top: 12px  !important;
        }
        .button-pg1 {
            /* top: -16px; */
        }
        .content-rule{
            padding: 0 10px;
        }
        .dotted{
            width: 100%;
            padding: 0 30px;
            height: 10px;
            top: 6px;
        }
        .cloudy-pg1{
            bottom: -190px;
        }
        .btn.btn-success{
            font-size: 25px;
            width: 90%;
        }

    }
    @media only screen and (min-width: 1024px)  and (max-width: 1300px){
        /* .title-rule::before {
            left: 18%;
        } */
        .box_test {
            /* height: 350px; */
        }
        .bottom-row h3 {
            font-size: 23px;
        }
        .content-rule p {
            font-size: 15px;
        }
    }
    @media only screen and (min-width: 768px)  and (max-width: 1023px){
        .content-rule p {
            font-size: 17px;
            margin-bottom: 15px;
        }
        .bottom-row h3 {
            font-size: 25px;
        }
        /* .title-rule::before {
            left: 26%;
        } */
        .rule {
            height: 350px;
        }
        .button-pg1 {
            top: -5px;
        }
        .title-header span {
            font-size: 20px;
        }
    }
    @media only screen and (min-width: 414px)  and (max-width: 735px){
        /* .title-rule::before {
            left: 3%;
        } */
    }

    @media only screen and (max-width: 500px){
        .title-rule::before {
            top: -6px;
            height: 50px;
            width: 285px;
        }
    }
</style>