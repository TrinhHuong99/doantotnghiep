<template>
    <div class="page1 content-page">
        <b-modal id="confirm-info" hide-footer centered>
            <template #modal-title>
            <h6>Xác nhận</h6>
            </template>
            <div class="d-block text-center">
                <p class="confirm-info">Xác nhận tham gia làm bài test năng lực đầu vào môn <code>{{ subjectSelectText.text }}</code> lớp <code>{{ form.classSelected }}</code> </p>
                
                <b-form-group v-if="reInputPhone" id="input-group-3" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="confirmPhone"
                    name="phone"
                    ref="phone"
                    :state ="confirmPhoneState"
                    placeholder="* Hãy nhập số điện thoại của bạn"
                    required
                    ></b-form-input>
                </b-form-group>
                <b-form-invalid-feedback v-if="reInputPhone" :state="confirmPhoneState">Bạn vui lòng nhập đúng số điện thoại</b-form-invalid-feedback>
                <b-button class="mb-3 btn-cf" variant="secondary" block @click="formCloseStep()">Em muốn chọn lại</b-button>
                <b-button class="mb-3 btn-cf" variant="primary" style="text-transform: uppercase;font-weight: 600;" block @click="pushContact()">Em Xác nhận</b-button>
                <!-- <span v-if="!reInputPhone" style="cursor: pointer; color: rgb(162, 10, 10); font-weight: 700; display: block; border: 1px solid; width: -webkit-fit-content; width: -moz-fit-content; width: fit-content; margin: auto; padding: 10px; border-radius: 5px;" @click="reInputPhone = true">
                    Số của tôi là số khác</span> -->
                    
            </div>
        </b-modal>
        <b-modal id="contact-tested" hide-footer centered>
            <template #modal-title>
            <h6>Xác nhận</h6>
            </template>
            <div class="d-block text-center">
                <p class="confirm-info">Hiện chưa hoàn thành đề thi. Em Hãy chọn môn khác hoặc lớp khác nhé </p>
            
                <b-button class="mb-3 btn-cf" variant="secondary" block @click="formCloseTested()">Em muốn chọn lại</b-button>
                    
            </div>
        </b-modal>
        <!-- <Header/> -->
        <div v-if="form.step == 1">
            <div class="row1 position-relative">
                <b-container>
                    <b-row class="info-teach text-center">
                        <!-- <b-col cols="12" sm="12">
                            <span>
                                Cùng trải nghiệm bài kiểm tra năng lực môn học chuẩn xác nhất được thiết kế bởi đội ngũ thầy cô của hệ thống giáo dục HOCMAI
                            </span>
                        </b-col> -->
                        <!-- <b-col cols="12" sm="6">
                            <div class="teacher-pg1">
                                <img src="@/assets/giao-vien.png">
                            </div>
                        </b-col> -->
                    </b-row>
                </b-container>
            </div>
            <div>
                <b-container>
                    <div class="title-form ">
                        <h5>Để bắt đầu bài kiểm tra, em hãy điền các thông tin bên dưới nhé:</h5>
                    </div>
                    <div class="form-info ">
                        <b-form @submit="onSubmit">
                            <b-form-group id="input-group-1" label-for="input-1" >
                                <b-form-input id="input-1" v-model="form.name" :state="nameSate" name="name" ref="hoten" placeholder="Họ tên (*)" required ></b-form-input>
                            </b-form-group>
                            <b-form-invalid-feedback :state="nameSate">Bạn vui lòng không để trống họ và tên</b-form-invalid-feedback>
                            <!-- <b-form-group id="input-group-2" label-for="input-2">
                                <b-form-input id="input-2" v-model="form.age" name="age" ref="age" :state="ageState" placeholder="Tuổi (*)" required ></b-form-input>
                            </b-form-group>
                            <b-form-invalid-feedback :state="ageState">Bạn vui lòng nhập môn lớp</b-form-invalid-feedback> -->
                            <b-form-group class="mb-4" id="input-group-3" ref="class"  label-for="input-3">
                                <b-form-select id="input-3" :options="classOptions" @change="getTopicType" v-model="form.classSelected" required ></b-form-select>
                            </b-form-group>
                            <b-form-invalid-feedback :state="classState">Bạn vui lòng chọn lớp</b-form-invalid-feedback>
                            <b-form-group class="mb-4" id="input-group-5"  ref="subject" label-for="input-3">
                                <b-form-select id="input-5" :options="subjectsOptions"  @change="getTopicType" v-model="form.subjectSelected" required ></b-form-select>
                            </b-form-group>
                            <b-form-invalid-feedback :state="subjectsState">Bạn vui lòng nhập môn học</b-form-invalid-feedback>
                            <b-form-group class="mb-4" id="input-group-2" ref="topic" label-for="input-3">
                                <b-form-select id="input-3" :options="topicOptions" v-model="form.topicSelected" required></b-form-select>
                            </b-form-group>
                            <b-form-invalid-feedback :state="topicState">Bạn vui lòng chọn chủ đề của môn học</b-form-invalid-feedback>
                            <b-form-group class="mb-4" id="input-group-6" ref="type" label-for="input-3">
                                <b-form-select id="input-5" :options="typeOptions" v-model="form.typeSelected" required></b-form-select>
                            </b-form-group>
                            <b-form-invalid-feedback :state="typeState">Bạn vui lòng nhập chọn mức độ muốn tham gia thi</b-form-invalid-feedback>
                            <b-form-group id="input-group-3" label-for="input-2">
                                <b-form-input id="input-2" v-model="form.phone" name="phone" ref="phone" :state ="phoneState" placeholder="Số điện thoại (*)" required ></b-form-input>
                            </b-form-group>
                            <b-form-invalid-feedback :state="phoneState">Bạn vui lòng nhập đúng số điện thoại</b-form-invalid-feedback>
                            <b-form-group id="input-group-4" label-for="input-2">
                                <b-form-input id="input-2" v-model="form.email" name="email" ref="email" :state="emailState" placeholder="Email (*)" required ></b-form-input>
                            </b-form-group>
                            <b-form-invalid-feedback :state="emailState">Bạn vui lòng nhập đúng Email</b-form-invalid-feedback>
                            <!-- <b-form-radio-group ref="BasicCheckbox"
                                v-model="learned" :state="checkState" class="input-group-5 checkbox-form" label-for="input-2">
                                <div class="learn-check custom-control custom-control-inline custom-checkbox" style="padding-left: 0px" >
                                    <label >*Bạn đã học IELTS chưa:</label>
                                </div>
                                <div class="checkbox" >
                                    <b-form-radio value="1" :state="checkState">Đã học</b-form-radio>
                                </div>
                                <div class="checkbox">
                                    <b-form-radio value="2" :state="checkState">Chưa học</b-form-radio>
                                </div>

                            </b-form-radio-group>
                            <b-form-invalid-feedback :state="checkState">Bạn vui lòng chọn đã học hoặc chưa học</b-form-invalid-feedback> -->
                            <div class=" text-center">
                                <b-button @click="checkStep1()" variant="success">Tiếp theo</b-button>
                            </div>
                        </b-form>
                    </div>
                </b-container>
            </div>
        </div>
        <div v-if="form.step == 2">
            <b-container fluid class="background-primary mt-5">
                <b-row class="">
                    <b-col>
                        <b-container>
                            <b-row class="">
                                <b-col cols='12' class="p-3">
                                    <h4 style="color: #0158a8;" class="text-center fs-2 fw-bold">Để ICAN có thể lựa chọn bài test phù hợp nhất với trình độ, <br> bạn vui lòng trả lời các câu hỏi dưới đây nhé!</h4>
                                </b-col>
                            </b-row>
                        </b-container>
                    </b-col>
                </b-row>
            </b-container>
            <b-container class="mt-5">
                <div class="">
                    <b-form class="qanda">
                        <b-form-group class="mb-4" id="input-group-3" label="Bạn hiện nay đang sống ở khu vực nào?" label-for="input-3">
                            <b-form-select id="input-3" :options="locationOptions" v-model="form.locationSelected" required ></b-form-select>
                        </b-form-group>
                        <b-form-group class="mb-4" id="input-group-4" label="Bạn hiện đang học ở trường nào?" label-for="input-4">
                            <b-form-radio-group v-model="form.school" id="checkboxes-4">
                                <b-form-radio value="0">Trường công lập</b-form-radio>
                                <b-form-radio value="1">Trường chuyên (Tiếng Anh) hoặc trường dân lập</b-form-radio>
                                <b-form-invalid-feedback style="margin-top: 15px;" :state="checkSchool">Bạn vui lòng trả lời câu hỏi trên</b-form-invalid-feedback>
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group class="mb-4" id="input-group-5" label="Điểm trung bình Tiếng Anh của bạn?" label-for="input-5">
                            <b-form-radio-group v-model="form.scoreMedium" id="checkboxes-5" >
                                <b-form-radio value="0">Dưới 7.0</b-form-radio>
                                <b-form-radio value="1">Trên 7.0</b-form-radio>
                                <b-form-invalid-feedback style="margin-top: 15px;" :state="checkScore">Bạn vui lòng trả lời câu hỏi trên</b-form-invalid-feedback>
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group class="mb-4" id="input-group-6" label="Bạn đã từng học, thi IELTS chưa?" label-for="input-6">
                            <b-form-radio-group v-model="form.learned" id="checkboxes-6">
                                <b-form-radio value="1">Đã học trên 03 tháng</b-form-radio>
                                <b-form-radio value="0">Chưa học hoặc mới học (dưới 03 tháng)</b-form-radio>
                                <b-form-invalid-feedback style="margin-top: 15px;" :state="checkLearned">Bạn vui lòng trả lời câu hỏi trên</b-form-invalid-feedback>
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group class="mb-4" id="input-group-7" label="Bạn đã từng học và thi các chứng chỉ Cambridge (KET, PET, FCE, CAE,...) chưa?" label-for="input-7">
                            <b-form-radio-group v-model="form.certificate" id="checkboxes-7">
                                <b-form-radio value="0">Chưa học hoặc mới học <br>(dưới 03 tháng)</b-form-radio>
                                <b-form-radio value="1">Đã học trên 03 tháng hoặc đã thi<br><p></p></b-form-radio>
                                <b-form-invalid-feedback style="margin-top: 15px;" :state="checkCertificate">Bạn vui lòng trả lời câu hỏi trên</b-form-invalid-feedback>
                            </b-form-radio-group>
                        </b-form-group>
                        <div class="w-100 text-center">
                            <b-button @click="pushContact()" variant="success">START</b-button>
                        </div>
                    </b-form>
                </div>
            </b-container>
        </div>
    </div>
</template>
<script>
// import Header from '@/components/Header'

import {
    BFormSelect,
    BFormGroup
} from 'bootstrap-vue'

export default {
    components: {
        // Header
        BFormSelect,
        BFormGroup
    },
    data() {
        return {
            form: {
                email: '',
                name: '',
                age: '',
                phone: '',
                confirmPhone: '',
                step: 1,
                locationSelected: 'hn',
                classSelected: 0,
                subjectSelected: 0,
                topicSelected: 0,
                typeSelected: 0,
                school: [],
                scoreMedium: [],
                learned: [],
                certificate: [],
            },
            locationOptions: [
                { value: 'hn', text: 'Hà nội' },
                { value: 'hcm', text: 'Tp. Hồ Chí Minh' },
                { value: 'hp', text: 'Hải Phòng' },
                { value: 'dn', text: 'Đà Nẵng' },
                { value: 'ct', text: 'Cần Thơ' },
                { value: 'other', text: 'Các tỉnh, thành khác' },
            ],
            classOptions: [
                { value: 0, text: 'Lớp (*)' },
            ],
            topicOptions: [
                { value: 0, text: 'Chủ đề (*)' }
            ],
            typeOptions: [
                { value: 0, text: 'Mức độ đề thi (*)' },
                { value: 1, text: 'Trung bình - Khá' },
                { value: 2, text: 'Nâng cao - Giỏi' },
            ],
            subjectsOptions: [
                { value: 0, text: 'Môn học (*)' },
            ],
            show: true,
            nextButtonPress: false,
            startButtonPress: false,
            reInputPhone: false
        }
    },
    watch: {
    },
    created() {
        const self = this
        this.$http.get("/get-class")
        .then((response) => {
            if (response.data.data.length > 0) {
            response.data.data.forEach(function (value) {
                if(value.status == 1){
                    self.classOptions.push({ value: value.id, text: value.name })
                }
            })
            }
            this.form.classSelected = 0
        })
        this.$http.get("/get-subject")
        .then((response) => {
            if (response.data.data.length > 0 ) {
            response.data.data.forEach(function (value) {
                if(value.status == 1){
                    self.subjectsOptions.push({ value: value.id, text: value.name })
                }
            })
            }
            this.form.subjectSelected = 0
        })
        this.getTopicType()
    },
    computed: {
        subjectSelectText() {
            return this.subjectsOptions.find(el => el.value == this.form.subjectSelected) || { text: ''}
        },
        nameSate() {

            if (!this.nextButtonPress) {
                return null
            }

            if(this.form.name.trim().length == '' || !/[A-Z, a-z]/.test(this.form.name)){
                return false;
            } else {
                return true
            }
        },
        ageState() {
            if (!this.nextButtonPress) {
                return null
            }

            if(this.form.age.trim().length > 0 && this.form.age.trim().length < 3 && /^[0-9 ]*$/.test(this.form.age) && parseInt(this.form.age) > 0){
                return true
            } else {
                return false;
            }
        },
        emailState(){

            if (!this.nextButtonPress) {
                return null
            }

            if(!this.validEmail(this.form.email.trim())){
                return false;
            } else {
                return true
            }
        },
        phoneState(){
            if (!this.nextButtonPress) {
                return null
            }

            if(!this.checkPhone(this.form.phone)){
                return false;
            } else {
                return true
            }
        },
        confirmPhoneState(){
            if (!this.nextButtonPress) {
                return null
            }

            if(!this.checkPhone(this.confirmPhone)){
                return false;
            } else {
                return true
            }
        },
        classState() {

            if (!this.nextButtonPress) {
                return null
            }
            if(this.form.classSelected == 0){
                return false;
            } else {
                return true
            }
        },
        subjectsState() {

            if (!this.nextButtonPress) {
                return null
            }
            console.log(this.form.subjectSelected)
            if(this.form.subjectSelected == 0){
                return false;
            } else {
                return true
            }
        },
        typeState() {
            if (!this.nextButtonPress) {
                return null
            }
            if (this.form.typeSelected == 0) {
                return false;
            } else {
                return true
            }
        },
        topicState() {
            if (!this.nextButtonPress) {
                return null
            }
            if (this.form.topicSelected == 0) {
                return false;
            } else {
                return true
            }
        },
        checkLearned() {

            if (!this.startButtonPress) {
                return null
            }

            return this.form.learned.length === 1
        },
        checkSchool() {

            if (!this.startButtonPress) {
                return null
            }
            return this.form.school.length === 1
        },
        checkScore() {

            if (!this.startButtonPress) {
                return null
            }
            return this.form.scoreMedium.length === 1
        },
        checkCertificate() {

            if (!this.startButtonPress) {
                return null
            }
            return this.form.certificate.length === 1
        },
    },
    methods: {
        getTopicType() {
            const self = this
            self.topicOptions = [
                { value: 0, text: 'Chủ đề (*)' }
            ];
            this.$http.get("/get-topic-type", {
                    params: {
                        classid: this.form.classSelected,
                        subjectid: this.form.subjectSelected
                    }
                })
                .then((response) => {
                    if (response.data.data.length > 0) {
                        response.data.data.forEach(function (value) {
                            if (value.status == 1) {
                                self.topicOptions.push({ value: value.id, text: value.name })
                            }
                        })
                    }
                this.form.topicSelected = 0
            })
        },
        validEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
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
        onSubmit(event) {
            event.preventDefault()
            alert(JSON.stringify(this.form))
        },
        checkStep1 () {
            this.nextButtonPress = true;
            if(!this.nameSate){
                this.$refs.hoten.focus()
                return
            }
            // if(!this.ageState){
            //     this.$refs.age.focus()
            //     return
            // }
            if(!this.classState){
                return
            }
            if(!this.subjectsState){
                return
            }
            if(!this.emailState){
                this.$refs.email.focus()
                return
            }
            if(!this.checkPhone(this.form.phone)){
                this.$refs.phone.focus()
                return
            }

            this.reInputPhone = false
            this.$bvModal.show('confirm-info')
        },
        formNextStep() {
            this.form.step = 2;
            this.$bvModal.hide('confirm-info')
        },
        formCloseStep() {
            this.form.step = 1;
            this.$bvModal.hide('confirm-info')
            this.$refs.hoten.focus()
        },
        formCloseTested() {
            this.form.step = 1;
            this.$bvModal.hide('contact-tested')
            this.$refs.hoten.focus()
        },
        pushContact(){
            this.startButtonPress = true;
            // if (this.reInputPhone) {
            //     this.form.phone = this.confirmPhone
            // }

            // if(!this.checkLearned){
            //     return
            // }
            
            // if(!this.checkSchool){
            //     return
            // }
            
            // if(!this.checkScore){
            //     return
            // }
            // if(!this.checkCertificate){
            //     return
            // }
        
            const trackid = localStorage.getItem('_hm_quiz_track')

            this.$http.post('/track/push-contact',{
                trackid: trackid,
                data:{
                    source: document.location.href,
                    name: this.form.name,
                    email: this.form.email,
                    // age: this.form.age,
                    phone: this.form.phone,
                    // learned: this.form.learned,
                    // location: this.form.locationSelected,
                    classid: this.form.classSelected,
                    subjectid: this.form.subjectSelected,
                    // school: this.form.school,
                    // score: this.form.scoreMedium,
                    // certificate: this.form.certificate
                }
            })
            .then(res => {
                if (res.data.code === 1) {
                    localStorage.setItem('_contact_track_id', res.data.data)
                    this.$http.get('/get-questions', {
                        params: {
                            tracking_id: trackid,
                            topicid: this.form.topicSelected,
                            typeid: this.form.typeSelected
                        }
                    }).then(res => {
                        if (res.data.code == 1) {
                            this.$store.dispatch('Questions', res.data.data)
                            this.$store.commit('SET_PAGE', 2)
                        }
                        if(res.data.code == 0){
                            this.$bvModal.hide('confirm-info')
                            this.$bvModal.show('contact-tested')
                            console.log(res.data)
                         
                        }
                    })

                    localStorage.setItem('speakupTestName', this.form.name)
                    localStorage.setItem('quiz_userInfo', JSON.stringify({
                        name: this.form.name,
                        phone: this.form.phone,
                        email: this.form.email
                    }))
                    
                    // localStorage.setItem('speakupTestLearned', this.form.learned)

                    this.$analytics.fbq.event('CompleteRegistration', {
                        value: 20.000,
                        currency: 'VND',
                        content_name: 'Signup',
                        status: 'complete'
                    });
                }
                else {
                    this.$bvToast.toast(res.data.message, {
                        title: `Có lỗi xảy ra !`,
                        variant: 'danger',
                        solid: true
                    })
                }
            })
            .catch(error => {
                console.log(error)
                this.$bvToast.toast(error.message, {
                    title: `Có lỗi xảy ra !`,
                    variant: 'danger',
                    solid: true
                })
            })
        }
    },
    beforeUpdate() {
    },
    destroyed() {
    },
    updated() {
    }

}
</script>
<style>
      code {
        font-size: 1em;
        color: #d63384;
        word-wrap: break-word;
        font-weight: 900;
    }
    .content-page{
        position: relative;
        z-index: 2;
    }
    .modal .form-control {
        box-shadow: none !important;
    }

    form.qanda select:focus {
        outline: none;
        border: none;
        box-shadow: none;
    }

    form.qanda .custom-control-input {
        position: inherit !important;
        border: none !important;
    }

    form.qanda .custom-control-label {
        padding-left: 10px !important;
    }

    form.qanda {
        width: 640px;
        margin: auto;
    }

    form.qanda select {
        width: 300px;
        font-weight: 600;
        color: #000;
        border: none;
        border-radius: 7px;
    }

    form.qanda .form-group>label {
        font-size: 20px;
        color: #fff;
        line-height: 24px;
        margin-bottom: 5px;
    }

    form.qanda .custom-radio {
        background-color: #fff;
        padding: 7px 10px;
        height: 100% !important;
        width: auto !important;
        border-radius: 7px;
        font-weight: 600;
    }

    .invalid-feedback {
        display: none;
        width: 100%;
        margin-top: -10px;
        margin-bottom: 11px;
        font-weight: 700;
        font-size: 16px;
        color: #ffe16c;
    }
    input[type=radio].is-invalid{
        background-color: #dc3545;
    }
    .checkbox-form .checkbox>div {
        padding: 0;
        margin: 0;
        margin-top: 6px;
    }

    .checkbox-form .checkbox>div input {
        display: inline;
        width: 100%;
        height: 15px;
        top: -13px;
    }

    .checkbox-form .checkbox>div label {
        display: block;
        width: 100%;
    }

    .custom-select {
        display: inline-block;
        width: 100%;
        height: 50px;
        padding: .375rem 1.75rem .375rem .75rem;
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.5;
        color: #0158a8;
        vertical-align: middle;
        background: #fff url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right .75rem center/8px 10px;
        border: 1px solid #ced4da;
        border-radius: 15px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    .custom-control-label:before, .custom-file-label, .custom-select {
        transition: background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
</style>
<style scoped>
  
    .btn-cf{
        border-radius: 20px;
        margin: 0 16px;
        padding: 8px 30px;
    }
    .confirm-info{
        font-size: 20px;
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
    .background-primary {
        background-color: #87d2fd;
        padding: 20px;
    }

    .page1{
        /* height: 100vh; */
        padding-bottom: 200px;
        position: relative;
    }
    .button-pg1 {
            top: -5px;
    }
    .info-teach{
        display: flex;
        align-items: center;
        width: 80%;
        margin: auto;
        margin-top: 15px;
        position:relative;
    }
    .info-teach span{
        color: #ffff;
        font-size: 22px;
        font-weight: 700;
        top: -15px;
        position: relative;
    }
    .teacher-pg1{
        position: relative;
        top: -35px;
    }
    .form-info{
        width: 45%;
        margin: auto;
    }
    .title-form h5{
        text-align: center;
        color: white;
        font-weight: 700;
        margin: 10px 0;
    }
    .form-control {
        border-radius: 15px;
        color: #0158a8;
        line-height: 1.5;
        margin-bottom: 20px;
        font-weight: 600;
        box-shadow: 0px 4px 3px #1b96f2;
        height: 50px;
        padding: 15px;
    }
    .form-control::-webkit-input-placeholder {
        color: #0158a8;
    }
    .cloudy-pg1{
        position: absolute;
        z-index: 0;
        height: 143px;
        width: 100%;
        bottom: 100px;
    }
    .cloudy-pg1 img{
        width: 100%;
    }
    /* .cloudy-pg1::before{
        content: '';
        position: absolute;
        background-image: url('../assets/cloudy.png');
        height: 170px;
        width: 1920px;
        background-size: 100% 100%;
    } */
    .input-group-5{
        display: flex;
        align-items: center;
        border-radius: 15px;
        color: #0158a8;
        margin-bottom: 18px;
        font-weight: 600;
        box-shadow: 0px 4px 3px #1b96f2;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        -webkit-appearance: none;
        -moz-appearance: none;height: 50px;
        padding: 15px;
        appearance: none;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .learn-check{
        margin: 0 35px 0 10px;
    }
    .custom-control {
        height: 20px;
        margin-top: -6px;
        top: 6px;
    }
    .custom-control-input {
        top: 10px;
    }
    .checkbox {
        display:flex;
        flex-direction:column;
        align-items: center;
        margin-left: 40px;
    }

    @media only screen and (max-width: 1200px){
        .form-info {
            width: 50%;
        }
    }

    @media only screen and (max-width: 992px){
        .form-info {
            width: 65%;
        }
    }

    @media only screen and (max-width: 768px){

        .page1{
            height: auto;
        }
        .btn-cf[data-v-20de4a82] {
            margin: 0;
            width: 100%;
        }
        .info-teach{
            width: 100%;
            top: 20px;
            margin-top: unset;
        }
        .row1::before {
            top: 15px;
        }
        .info-teach span {
            font-size: 15px;
            top: 0;
        }
        .teacher-pg1 {
            top: 0;
        }
        .form-info {
            width: 100%;
        }
        .learn-check {
            margin: 0 0px 0 10px;
        }
        .checkbox{
            margin-left: 10px;
        }
        .row1 {
            margin-bottom: 45px;
        }
        .title-form h5 {
            font-size: 16px;
        }
        .input-group-5{
            height: auto;
            display: block;
            text-align: center;
            box-shadow: 0px 5px 10px #bac1c5;
            z-index: 9;
            position: relative;
        }
        .learn-check {
            padding-left: 0px;
            display: block;
            margin-bottom: 20px;
        }
        .input-group-5 .checkbox{
            display: inline-block !important;
        }
        .input-group-5 .checkbox:last-child{
            margin-left: 30px;
        }
        .cloudy-pg1{
            bottom: -160px;
        }
        .btn.btn-success{
            font-size: 25px;
        }
    }
    @media only screen and (min-width: 1024px)  and (max-width: 1400px){
        .cloudy-pg1{
            bottom: -220px;
        }
    }
    @media only screen and (min-width: 1024px)  and (max-width: 1200px){
        .info-teach {
            width: 75%;
        }
    }

    @media only screen and (min-width: 1024px)  and (max-width: 1200px){
        .info-teach {
            width: 85%;
        }
    }
    @media only screen and (min-width: 768px)  and (max-width: 1023px){
        .info-teach span{
            font-size: 17px;
        }
        .info-teach {
            width: 100%;
            top: 16px;
        }
        .row1{
            margin-bottom: 10px;
        }
    }
    @media only screen and (min-width: 414px)  and (max-width: 735px){
        .info-teach span {
            font-size: 14px;
        }
    }

    @media only screen and (max-width: 1400px){
        .page1>.row1::before {
                top: 12px;
        }
    }
   
   @media only screen and (max-width: 1200px){
        .page1>.row1::before {
                top: 28px;
        }
    }
  
  @media only screen and (max-width: 1024px){
        .page1>.row1::before {
                top: 60px;
        }
    }

    @media only screen and (max-width: 955px){
        .page1>.row1::before {
                top: 45px;
        }
    }

    @media (max-width: 680px){
        form.qanda {
            width: unset;
        }

        form.qanda .custom-radio {
            margin-top: 10px;
        }
    }

    @media only screen and (max-width: 680px){
        .modal-body {
            padding: 0.8rem 1rem;
        }
        .page1>.row1::before {
                top: 40px;
        }
    }

    @media only screen and (max-width: 576px){
        .page1>.row1::before {
                top: 28px;
        }
    }

    @media only screen and (max-width: 576px){
        .page1>.row1::before {
                top: 5px;
        }
    }

</style>