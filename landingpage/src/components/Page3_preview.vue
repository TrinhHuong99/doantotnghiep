<template>
    <div class="page3">
        <b-modal id="confirm-info" hide-footer centered>
            <template #modal-title>
            <h6>Lưu ý</h6>
            </template>
            <div class="d-block text-center">
                <p class="confirm-info"  :class="{ van_question: this.subjectid != 1}">Em còn <code>{{ this.count }} </code>câu hỏi chưa hoàn thành. Em muốn kết thúc bài thi?</p>
                 <p class="confirm-info line2"  :class="{ van_question_confirm: this.subjectid != 1}">Em có  muốn kết thúc bài thi?</p>
                <b-button class="mb-3 btn-cf" variant="secondary" block @click="nextpage">
                    Em muốn kết thúc
                </b-button>
                <b-button class="mb-3 btn-cf" variant="primary" style="text-transform: uppercase;font-weight: 600;" block @click="formCloseStep()">
                    Em muốn tiếp tục làm bài
                </b-button>
                <p><i>Lưu ý: Mỗi email chỉ có 1 lượt làm bài. Nếu chọn EM MUỐN KẾT THÚC, em sẽ không thể quay trở lại</i></p>
            </div>
        </b-modal>
        <b-container>
             
            <div class="d-flex content-mb">
                <div class="box_test" :class="{ van_box: this.subjectid != 1}">
                    <div class="dotted">
                    </div>
                    <div class="d-flex justify-content-between mx-4">
                       
                        <b-col sm="3" class="d-flex justify-content-start right_header">
                            <div class="box_time d-flex ">
                                <div class="icon_clock">
                                    <img src="../assets/clock.png" alt="">
                                </div>
                                <div class="time-end">{{ secondToMinute(couter) }}</div>
                            </div>
                        </b-col> 
                        <b-col sm="3" class="d-flex justify-content-end right_header">
                            <b-button @click="checkStep1()" variant="success">NỘP BÀI</b-button>
                        </b-col> 
                    </div>
                    <div class="part-descreption" v-if="Questions.description" v-html="Questions.description"></div>
                    <div class="question-lock-list" v-if="Questions.part_type == 0">
                        <!-- {{ questionList }} -->
                        <div class="question-block" v-for="(question, index) in questionList" :key="question.id">
                            <type1 v-model="questionList[index]" v-if="question.content_type == 1 || question.content_type == 2">
                                <!-- <template v-slot:question-number>
                                    <h2>Question {{ getQuestionNumber(Questions.questions, index) }}</h2>
                                </template> -->
                            </type1>
                            <type3 :content="question" v-if="question.content_type == 3">
                                <!-- <template v-slot:question-number>
                                    <h2>Question {{ getQuestionNumber(Questions.questions, index) }}</h2>
                                </template> -->
                            </type3>
                            <type5 :content="question" v-if="question.content_type == 4">

                            </type5>
                            <!-- <div v-if="question.content_type == 4">
                                <editor/>
                            </div> -->
                            <div v-if="question.content_type == 5" >
                                <b-container>
                                    <b-row>
                                        <b-col lg="12">
                                            <div class="item_quesion">
                                                <div class="header_question">
                                                    <div class="title_question ql-editor" style="" v-html="question.content"></div>
                                                </div>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </b-container>
                            </div>
                        </div>
                    </div>

                    <div v-if="Questions.part_type == 1" class="part-writing">
                        <!-- <editor/> -->
                        <quill-editor v-model="writingContent" ref="quillEdit" :toolbar="'toolbar-'+ question.id"></quill-editor>
                    </div>
                    <!-- <type2/> -->
                    <!-- <type4/> -->
                </div>
                <div class="box-questions" :class="{ van_question: this.subjectid != 1}"  v-if="Questions.part_type == 0">
                    <h5 class="text-center pt-4">Tổng số câu hỏi: {{ questionList.length }}</h5>
                    <div class="box-list-answer d-flex flex-wrap justify-content-center">
                        <div class="answer-block" v-for="(question,key) in questionList" :key="key" >
                            <div  @click="scroll(question.id)" :id="question.id" class="box_answer" :class="{ selected: question.answers.length > 0}" >
                                {{ key + 1}}
                            </div>
                        </div>  
                    </div>
                    <div class="ab-bottom">
                        <ul class="answer-annotate">
                            <li>
                                <span class="aa-answered"></span> Câu hỏi đã làm
                            </li>
                            <li>
                                <span class="aa-unanswered"></span> Câu hỏi chưa làm
                            </li>
                        </ul>
                    </div>  
                </div>
            </div>
        </b-container>
    </div>
</template>
<script>
import QuillEdit from '../QillEdit.vue'

// import editor from '@/components/editor'
import type1 from '@/components/type_questions/type1'
import type3 from '@/components/type_questions/type3'
import type5 from '@/components/type_questions/type5'
export default {
    components : {
        // editor,
        QuillEdit,
        type3,
        type1,
        type5
    },
    data() {
        return {
            couter: 0,
            start_timing: true,
            Questions: {},
            questionList: [],
            count: 0,
            subjectid: 0,
        }
    },
    mounted() {
        let questionData = localStorage.getItem('speakupTestData')
        questionData = JSON.parse(questionData)
        console.log(questionData)
        if (questionData.subjectid) {
            this.subjectid = questionData.subjectid
        }
    },
    methods: {
        getQuestionPreview() {
            let query = this.$route.query;
            
            this.$http.get('/get-question-no-tracking', {
                params: {
                    id_class : query.class|| '',
                    id_subject : query.subject|| ''
                }
            }).then(res => {
                if (res.data.code == 1) {
                    this.Questions = res.data.data.part[0]
                    this.questionList = res.data.data.part[0].questions
                    this.$store.dispatch('Questions', res.data.data)
                }
                if(res.data.code == 0){
                    this.$bvModal.hide('confirm-info')
                    this.$bvModal.show('contact-tested')
                    console.log(res.data)
                    
                }
            })
        },
        scroll(id) {  
            let element = document.getElementById(id);
            element.scrollIntoView({behavior: "smooth", block: "start"});
        },
        checkStep1 () {
            this.count = 0
            for (let index = 0; index < this.questionList.length; index++) {
                if(this.questionList[index].answers <= 0){ 
                    this.count++
                }
            }
            console.log( JSON.parse(localStorage.getItem('speakupTestData')))
            this.$bvModal.show('confirm-info')
        },
        formCloseStep() {
            this.$bvModal.hide('confirm-info')
        },
        secondToMinute(time) {
            const minute = parseInt(time / 60, 0) < 10 ? `0${parseInt(time / 60, 0)}` : parseInt(time / 60, 0)
            const secord = time % 60 < 10 ? `0${time % 60}` : time % 60
            return `${minute}:${secord}`
        },
        countDownTimer() {
            setTimeout(() => {
                if (this.start_timing) {
                    this.couter -= 1
                    this.$store.commit('SET_TIME_REMAINING', this.couter)
                    if (this.couter == 0) { this.nextpage() }
                }
                this.countDownTimer()
            }, 1000)
        },
        nextpage(){
            
        },
        getQuestionNumber(question, questionIndex) {
            let amount = 1
            for (let index = 0; index < questionIndex; index++) {
                if (question[index].content_type !== 5) {
                    amount++
                }
            }
            return amount
        }
    },
    computed: {
        // Questions(){
        //     return this.$store.getters['getQuestionPart'] || []
        // },
        partTitle() {
            return this.$store.getters['getPartTitle'] || ''
        },
        questionAmount() {
            if (this.Questions.length == 0) {
                return 0
            }
            let amount = 0;
            for (let index = 0; index < this.Questions.questions.length; index++) {
                const element = this.Questions.questions[index];
                if (element.content_type !== 5) {
                    amount++
                }
            }
            return amount
        },
        partNumber() {
            return this.$store.getters['getPartNumber'] + 1
        },
        examPart() {
            return this.$store.getters['getExamPart'] || []
        }
    },
    created() {
        this.getQuestionPreview();
        this.Questions = this.$store.getters['getQuestionPart']
        if (this.Questions) {

            this.questionList = this.Questions.questions
            if(this.Questions.time_remaining) {
                this.couter = this.Questions.time_remaining
            } else {
                this.couter = this.Questions.time
            }
            this.countDownTimer()
        }
        this.$nextTick(() => {
            window.MathJax.typesetPromise();
        });
    },
    watch: {
        Questions(value){
            if (value) {
                if(this.Questions.time_remaining) {
                    this.couter = this.Questions.time_remaining
                } else {
                    this.couter = this.Questions.time
                }
            }
        },
    },
}
</script>
<style scoped>
    .van_box{
        width: 85%;
        margin: auto;
        margin-top: 50px;
    }
    .van_question{
        display: none;
    }
    .confirm-info.line2{
        display: none;
    }
    .confirm-info.van_question_confirm{
        display: block;
    }
    .confirm-info{
        font-size: 20px;
    }
    #confirm-info .btn{
        border-radius: 20px;
        margin: 0 10px;
    }
    .modal-title h6{
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        text-transform: uppercase;
    }
    .question-lock-list{
        position: relative;
        height: 600px;
        overflow: auto;
        margin-top: 15px;
    }
    .box_answer{
        background-color: #fff;
        width: 35px;
        height: 35px;
        line-height: 30px;
        display: inline-block;
        border-radius: 15px;
        border: 1px solid #898989;
        font-weight: bold;
        text-align: center;
        color: #464646;
        font-size: 15px;
        border-radius: 50%;
        border: 1px solid #0057a7;
        margin: 0 5px;
        font-weight: 800;
        cursor: pointer;
    }
    .box_answer.selected{
        background: #22acfb;
        color: #fff;
    }
    .box-questions h5{
        font-size: 19px;
        color: #2a70b8;
        padding-bottom: 2px;
        position: relative;
        margin-bottom: 10px;
        font-weight: 700;
    }
    .box-questions h5::before{
        position: absolute;
        top: 100%;
        left: 50%;
        content: '';
        background: transparent url(../assets/under-line.png) no-repeat scroll 0 0;
        height: 2px;
        width: 140px;
        background-size: 100%;
        transform: translateX(-50%);
    }
    .container {
        width: 100%;
        max-width: 98%;
        margin: 0 auto;
    }
    .box-list-answer{
        padding: 0 10px;
    }
    .ab-bottom {
        background-color: #e1e1e1;
        border-top: 1px solid #e5ebef;
        margin-top: 20px;
        padding: 5px 25px;
    }
    .answer-annotate {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .answer-annotate li {
        margin: 8px 0;
        line-height: 24px;
        font-weight: 600;
        font-size: 13px;
    }
    .answer-annotate li span.aa-answered {
        border-color: #2a6fb8;
        background-color: #22acfb;
    }
    .answer-annotate li span {
        width: 25px;
        height: 25px;
        border: 1px solid #898989;
        border-radius: 12px;
        background-color: #fff;
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
    }
    .answer-block{
        margin: 5px 0;
    }
    .question-lock-list {
        margin-bottom: 30px;
    }
    .box_test{
        margin-top: 30px;
        height: auto  !important;
        padding-bottom: 30px;
    }
    .box_test{
        /* height: 70vh; */
        background: #fff;
        border-radius: 0 0 20px 20px;
        /* background: url(../assets/bg-box-test.png); */
        background-repeat: repeat;
        /* overflow-y: scroll; */
        position: relative;
        padding-bottom: 50px !important;
        padding: 30px 10px;
        /* box-shadow: 0px 8px 0px #1990ef; */
        z-index: 1;
        width: 75%;
    }
    .box_test.van_box{
        width: 85%;
    }
    .box_test.van_box .question-lock-list{
         height: auto;
    }
     .box_test.van_box .title_question p:nth-last-child(){
         margin-bottom: 0;
     }
    .box-questions{
        width: 20%;
        position: relative;
        right: 0;
        margin: 10px 0 auto auto;
        background-color: #fff;
        border-radius: 15px;
        height: auto;
        border: 1px solid #e5ebef;
        overflow: hidden;
    }
    .box_time img{
        position:relative;
        top: -2px;
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
        width: 32px;
        height: 30px;
        margin-right: 10px;
    }
    .btn.btn-success {
        width: 85%;
        box-shadow: unset;
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
    .part-descreption {
        /* border: 1px solid #e0e0e099;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 40px;
        background-color: #fff; */
    }
    .header_question .title_question{
        margin-bottom: 20px;
        color: #0057a7;
        font-weight: 600;
        padding: 0px;
        overflow: hidden;
    }
    @media only screen and (min-width: 1400px) {
        .container{
            max-width: 90%;     
        }
    }
    @media only screen and (min-width: 1024px)  and (max-width: 1400px){
       /* .page3{
            height: auto;
        } */
    }

    @media only screen and (max-width: 768px){
        /* .page3{
            height: 100vh;
        } */
         .van_box{
            width: 100%;
            margin-top: 35px;
        }
        .item_quesion{
            font-size: 13px;
        }
        .btn.btn-success {
            padding: 0;
        }
        .content-mb{
            flex-direction: column;
        }
        .box-questions{
            width: 100%;
        }
        .box-list-answer {
            padding: 0px 5px;
        }
        .box_test{
            /* height: 70vh !important; */
        }
        .box_title, .box_time {
            font-size: 16px;
            height: 40px;
        }
        .box_test{
            /* height: 350px; */
            width: 100%;
        }
        .dotted{
            top: -5px;
            height: 15px;
        }
        .left_header{
            width: 70%;
        }
        .right_header{
            width: 30%;
            justify-content: center;
        }
        .box_test{
            padding: 20px 0px;
            padding-bottom: 0 !important;
        }
        .part-descreption{
            margin-bottom: 10px;
        }

        .item_answer{
            width: 100% !important;
        }
        .btn.btn-success{
            font-style: 25px;
        }
    }

    @media only screen and (max-width: 400px){
        
       
        .box_title {
            width: 100%;
        }

        .left_header{
            width: 100%;
            margin-bottom: 10px;
        }
        .right_header{
            width: 100%;
            justify-content: center !important;
        }
    }
</style>
