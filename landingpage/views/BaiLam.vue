<template>
    <div>
        <div id="app-main" :style="{ backgroundImage: 'url(' + require('@/assets/background.png') + ')' }">
            <div v-if="showModal" class="thi-thu-modal">
                <transition name="modal">
                    <div>
                        <div class="modal-wrapper">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-body">
                                        <h5>KIỂM TRA TRÌNH ĐỘ TOEIC</h5>
                                        <span>Giúp các bạn tìm hiểu và trải nghiệm về TOEIC format mới để xác định trình độ và lập kế hoạch chinh phục điểm cao TOEIC!</span>
                                        <div class="form-dang-ky">
                                            <div class="shadow-custom">
                                                <input ref="hotenFocus" name="fullname" v-model="name" type="text" placeholder="Nhập họ và tên *">
                                            </div>
                                            <div class="shadow-custom">
                                                <span class="text-alert danger" v-if="phoneVali">Số điện thoại không hợp lệ</span>
                                                <input type="text" placeholder="Nhập số điện thoại *" v-model="phone" name="phone">
                                            </div>
                                            <div class="shadow-custom">
                                                <input type="text" placeholder="Nhập email" v-model="email" name="email">
                                            </div>
                                            <div class="shadow-custom submit-button">
                                                <button @click="pushContact()">THI THỬ NGAY</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-mask" @click="showModal = false"></div>
                    </div>
                </transition>
            </div>
            <header>
                <b-container>
                    <b-row>
                        <b-col cols="3">
                            <logo/>
                        </b-col>
                        <b-col cols="9" class="d-flex justify-content-end align-items-center">
                        </b-col>
                    </b-row>
                </b-container>
            </header>
            <b-container class="mt-5" style="min-height: 800px;">
                <b-row class="mb-4">
                    <b-col>
                        <h2 class="title">KIỂM TRA TRÌNH ĐỘ TOEIC</h2>
                        <div class="employees-info">
                            <p>Bài làm của: <span>{{ name }}</span> ( <span class="change-employee" @click="showModal = true">thay đổi</span> )</p>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="mb-4">
                    <b-col>
                        <div class="test-info" v-if="initTest">
                            <b-row>
                                <b-col cols="6" lg="4" class="d-flex justify-content-center align-items-center">
                                    <p class="process">Progress: <strong>{{ process }}/{{ questionCount }}</strong></p>
                                </b-col>
                                <b-col cols="6" lg="4" class="d-flex justify-content-center align-items-center">
                                    <p class="time">Time: <strong>{{ `${parseInt(couter/60) >= 10 ? parseInt(couter/60) : '0'+parseInt(couter/60) }:${(couter - (parseInt(couter/60) * 60)) >= 10 ? (couter - (parseInt(couter/60) * 60)) : '0'+(couter - (parseInt(couter/60) * 60)) }` }}</strong></p>
                                </b-col>
                                <b-col cols="12" lg="4" class="d-flex justify-content-center align-items-center">
                                    <div class="action-group">
                                        <b-button variant="warning" v-if="playStage == true && !timeUp" @click="playStage = false, pauseAudio()" class="mx-3 white">Stop</b-button>
                                        <b-button variant="success" @click="confirmSubmit()">Submit</b-button>
                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="mb-4">
                    <b-col>
                        <div v-if="initTest && exam.media_url != ''" class="exam-audio">
                            <audio ref="audio">
                                <source :src="exam.media_url" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                        <div v-if="initTest && playStage == false && submited" class="pause-player">
                            <div>
                                <p>Bài làm của bạn đang được xử lý, Xin hãy chờ trong giây lát !</p>
                            </div>
                        </div>
                        <div v-if="!initTest" class="pause-player">
                            <div>
                                <p>Đang tải nội dung</p>
                            </div>
                        </div>
                        <div v-if="initTest && playStage == false && !timeUp" class="pause-player">
                            <div>
                                <div class="ql-editor" v-html="exam.description"></div>
                                <b-button variant="warning" @click="play()">Làm bài</b-button>
                            </div>
                        </div>
                        <div v-if="initTest && timeUp" class="timeup-player">
                            <div>
                                <p>Hết thời gian làm bài</p>
                                <div>
                                    <b-button variant="warning" class="mx-2" @click="confirmRePlay()">Làm lại</b-button>
                                    <b-button variant="success" class="mx-2" @click="confirmSubmit()">Submit</b-button>
                                </div>
                            </div>
                        </div>
                        <div v-if="initTest && playStage == true && !timeUp" class="test-main">
                            <div class="test-part" v-for="(part, indexPart) in exam.part" :key="part.id">
                                <div class="test-part-info">
                                    <h5 class="part-title">{{ part.name }}</h5>
                                    <div class="part-description ql-editor" v-html="part.description"></div>
                                </div>
                                <div class="test-question-block">
                                    <div class="test-question" v-for="(question, index) in part.questions" :key="question.id">
                                        <div class="question-description ql-editor" v-if="question.content_type != 1" v-html="question.content"></div>
                                        <div class="question ql-editor" v-if="question.content_type == 1" v-html="'<strong>Question ' + getAmountOfPart(indexPart, index) + ' </strong>' + ( question.content ? question.content : '') "></div>
                                        <div class="option" style="padding: 0px 30px;" v-if="question.content_type == 1">
                                            <b-form-group v-slot="{ ariaDescribedby }">
                                                <b-form-checkbox-group 
                                                :options="question.options" 
                                                value-field="answer_id"
                                                text-field="answer_content"
                                                v-model="exam.part[indexPart].questions[index].answers" 
                                                stacked 
                                                @input="optionSelect"
                                                :aria-describedby="ariaDescribedby">
                                                </b-form-checkbox-group>
                                            </b-form-group>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="mb-4" v-if="initTest && playStage">
                    <b-col>
                        <div class="test-info" v-if="initTest">
                            <b-row>
                                <b-col cols="6" lg="4" class="d-flex justify-content-center align-items-center">
                                    <p class="process">Progress: <strong>{{ process }}/{{ questionCount }}</strong></p>
                                </b-col>
                                <b-col cols="6" lg="4" class="d-flex justify-content-center align-items-center">
                                    <p class="time">Time: <strong>{{ `${parseInt(couter/60) >= 10 ? parseInt(couter/60) : '0'+parseInt(couter/60) }:${(couter - (parseInt(couter/60) * 60)) >= 10 ? (couter - (parseInt(couter/60) * 60)) : '0'+(couter - (parseInt(couter/60) * 60)) }` }}</strong></p>
                                </b-col>
                                <b-col cols="12" lg="4" class="d-flex justify-content-center align-items-center">
                                    <div class="action-group">
                                        <b-button variant="warning" v-if="playStage == true && !timeUp" @click="playStage = false, pauseAudio()" class="mx-3 white">Stop</b-button>
                                        <b-button variant="success" @click="confirmSubmit()">Submit</b-button>
                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
            <Footer/>
        </div>
    </div>
</template>

<script>

import { BContainer, BCol, BRow, BButton, BFormCheckboxGroup, BFormGroup } from 'bootstrap-vue';
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default {
    components: {
        BRow,
        BContainer,
        BCol,
        BButton,
        BFormCheckboxGroup,
        BFormGroup,
        Logo,
        Footer
    },
    data: function() {
        return {
            questionLength: 0,
            showModal: false,
            playStage: false,
            process: 0,
            couter: 0,
            time: 0,
            timeUp: false,
            questions: [],
            exam: {},
            phone: '',
            email: '',
            name: '',
            initTest: false,
            phoneVali: false,
            submited: false,
        }
    },
    created() {
        this.couter = this.time;
        this.name = localStorage.getItem('_unso_track_name');

        let trackid = localStorage.getItem('_unso_track')
        if (!trackid) {
            this.$http.get('/track/init', )
            .then(res => {
                if (res.data.code === 1) {
                   localStorage.setItem('_unso_track', res.data.data)
                }
            })
        }

        if (!this.name) {
            this.showModal = true;
        } else {
            this.getQuestionData()
        }
    },
    methods: {
        countQuestionAnser () {
            let amount = 0;
            for (let index = 0; index < this.exam.part.length; index++) {
                for (let index2 = 0; index2 < this.exam.part[index].questions.length; index2++) {
                    if (this.exam.part[index].questions[index2].answers.length > 0) {
                        amount += 1
                    }
                }
            }
            this.process = amount
        },
        optionSelect() {
            // Đếm số lượng câu đã làm 
            this.countQuestionAnser()
            // Lưu lại lịch sử
            this.saveHistory()
        },
        async playAudio() {
            await this.$nextTick(()=>{
                this.$refs.audio.play()
            })
        },
        async pauseAudio() {
            await this.$nextTick(()=>{
                this.$refs.audio.pause()
            })
        },
        getAmountOfPart (partIndex, questionIndex) {
            let amount = 0;
            for (let index = 0; index < partIndex; index++) {
                amount += this.exam.part[index].questions.filter(qs => qs.content_type === 1).length;
            }

            for (let index = 0; index <= questionIndex; index++) {
                if (this.exam.part[partIndex].questions[index].content_type === 1) {
                    amount += 1
                }
            }

            return amount
        },
        async getQuestionData () {
            const self = this
            await this.$http.get('/test/get-history', {
                params: {
                    trackid: localStorage.getItem('_unso_track')
                }
            })
            .then(res => {
                if (res.data.code === 1) {
                    const resData = res.data.data
                    self.exam = resData;
                    self.time = resData.time;
                    self.couter = resData.time_remaining;
                    self.initTest = true

                    self.countQuestionAnser()
                } else {
                    this.$http.get('/test/get-questions', {
                        params: {
                            exam_id: 2
                        }
                    })
                    .then(res => {
                        if (res.data.code === 1) {
                            self.exam = res.data.data;
                            self.time = res.data.data.time;
                            self.couter = self.time;
                            self.initTest = true
                            // res.data.data.forEach(element => {
                            //     self.exam = 
                            //     self.questions.push({
                            //         id: element.id,
                            //         question: element.question,
                            //         option: element.option,
                            //         content_type: element.content_type,
                            //         answer: []
                            //     })
                            // });
                        }
                    })
                }
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
        pushContact() {
            const self = this
            const trackid = localStorage.getItem('_unso_track')
            
            if (!this.checkPhone(this.phone)) {
                this.phoneVali = true
                return
            }

            this.$http.post('/track/push-contact', {
                trackid: trackid,
                data: {
                    source: document.location.href,
                    phone: this.phone,
                    email: this.email,
                    name: this.name
                }
            })
            .then(res => {
                if (res.data.code === 1) {
                    
                    localStorage.setItem('_unso_track_name', self.name);
                    
                    if (!self.initTest) {
                        self.getQuestionData()
                    }

                    self.phone = '',
                    self.email = '',
                    self.showModal = false
                }
            })
            
        },
        async submit() {
            // Save history 
            this.pauseAudio()
            await this.saveHistory()
            this.$http.post('/test/submit', {
                trackid: localStorage.getItem('_unso_track')
            })
            .then(res => {
                // console.log(res.data)
                if (res.data.code === 1) {
                    this.$router.push({name: 'ketquaathithu'})
                }
            })
        },
        confirmSubmit() {
            this.playStage = false

            let msgText = 'Bạn xác nhận nộp bài thi?';
            if (this.couter > 60 && (this.process < this.questions.length)) {
                msgText = `Vẫn còn ${this.questions.length - this.process} / ${ this.questionCount } câu chưa hoàn thành. Bạn vẫn muốn nộp bài?`
            }
            this.$bvModal.msgBoxConfirm(msgText, {
                title: 'Xác nhận',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'VÂNG',
                cancelTitle: 'KHÔNG',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
            .then(value => {
                this.playStage = false
                if (value) {
                    this.submited = true
                    this.submit()
                }
            })
            .catch(()=>{
                this.playStage = true
            })
            
        },
        confirmRePlay() {
            this.$bvModal.msgBoxConfirm('Bạn xác nhận sẽ làm lại bài thi này ?', {
                title: 'Xác nhận',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'VÂNG',
                cancelTitle: 'KHÔNG',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
            .then(value => {
                if (value) {
                    this.rePlay()
                }
            })
        },
        rePlay() {
            for (let index = 0; index < this.questions.length; index++) {
                this.questions[index].answer = []
            }

            this.couter = this.time

            this.timeUp = false
            
            this.countDownTimer()
        },
        play() {
            if (this.initTest) {
                this.playAudio()
                this.playStage = true
                this.countDownTimer()
            } else {
                this.showModal = true
            }
        },
        selectAnswer(questionId, answerId) {
            if (questionId && answerId) {
                return true
            }
        },
        countDownTimer() {
            if(this.couter > 0) {
                setTimeout(() => {
                    if (this.playStage == true) {
                        this.couter -= 1
                        if (this.couter == 0) { this.timeUp = true}
                        this.countDownTimer()
                    }
                }, 1000)
            }
        },
        async saveHistory() {
            if (this.initTest && localStorage.getItem('_unso_track')) {
                let answerData = JSON.parse(JSON.stringify(this.exam))

                for (let index = 0; index < answerData.part.length; index++) {
                    for (let index2 = 0; index2 < answerData.part[index].questions.length; index2++) {
                        answerData.part[index].questions[index2].content = '';
                    }
                }
                
                answerData.time_remaining = this.couter
                
                await this.$http.post('/test/save', {
                    trackid: localStorage.getItem('_unso_track'),
                    data: answerData,
                })
                .then(res => {
                    if (res.data.code) {
                        console.log('Save success !')
                    } else {
                        console.log('Save failure !')
                    }
                })
            }
        }
    },
    computed: {
        questionCount() {
            let amount = 0;
            for (let index = 0; index < this.exam.part.length; index++) {
                amount += this.exam.part[index].questions.filter(qs => qs.content_type === 1).length;
            }
            return amount
        }
    },
    watch: {
        'questions': {
            handler: function (valueOld) {
                console.log(valueOld)

                // this.process = valueOld.filter(value => value.answer.length > 0)
                // this.process = this.process.length

                // // Save history
                // this.saveHistory()
            },
            deep: true
        },
        'showModal': function(valueOld) {
            if (valueOld) {
                this.$nextTick(() => {
                    this.$refs.hotenFocus.focus()
                })
            }
        }
    }
}
</script>


<style>

</style>