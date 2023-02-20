<template>
  <div>
    <b-card title="Thông tin người dùng">
      <b-row class="my-1">
        <b-col sm="12">
          <p><b>Họ và tên:</b> {{ userInfo.name }}</p>
        </b-col>
        <b-col sm="12">
          <p><b>Lớp:</b> {{ this.classSelectText.text }}</p>
        </b-col>
        <b-col sm="12">
          <p><b>Môn học:</b> {{ this.subjectSelectText.text }}</p>
        </b-col>
        <b-col sm="12">
          <p><b>Số điện thoại:</b> {{ userInfo.phone }}</p>
        </b-col>
        <b-col sm="12">
          <p><b>Số điện thoại xác nhận:</b> {{ testData.confirm_phone }}</p>
        </b-col>
        <b-col sm="12">
          <p><b>Email:</b> {{ userInfo.email }}</p>
        </b-col>
        <!-- <b-col sm="12">
          <p><b>Đã học IELTS:</b> {{ userInfo.learned == 1 ? 'Đã học' : 'Chưa học' }}</p>
        </b-col>
        <b-col sm="12">
          <p class="time-tag">
            <b>Các khung giờ:</b> <span
              v-for="(time, index) in testData.time"
              :key="index"
            >{{ time }}</span>
          </p>
        </b-col>
        <b-col sm="12">
          <p><b>Utm_source:</b> {{ userInfo.utm_source }}</p>
        </b-col>
        <b-col sm="12">
          <p><b>Utm_medium:</b> {{ userInfo.utm_source }}</p>
        </b-col>
        <b-col sm="12">
          <p><b>Utm_campaign:</b> {{ userInfo.utm_source }}</p>
        </b-col> -->
      </b-row>
    </b-card>
    <b-card title="Tổng quát">
      <b-row>
        <b-col v-if="link_file_result != ''" cols="12" class="mb-1">
          <p><b>File đánh giá</b>: <a :href="link_file_result">{{link_file_result}}</a></p>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="mb-1">
          <div class="form-group">
            <!-- <label for="file" class="col-sm-4 control-label">File</label>
            <div class="col-sm-12">
              <input type="file" @change="handleFileUpload($event)"/>
            </div> -->
            <b-button class="mt-2" variant="primary" block @click="uploadButtonClick()" >{{ 'Upload file đánh giá'}}</b-button>
            <input hidden type="file" name="file" ref="fileInput"  id="" @change="submitFile($event)" class="input-file">
          </div>
        </b-col>
        <!-- <b-col cols="3" class="mb-1">
        </b-col>
        <b-col cols="3" class="mb-1">
        </b-col> -->
        <b-col cols="3" class="mb-1">
          <b-button  class="mt-2" variant="primary" block @click="emailSendHandle()">Gửi Mail kết quả</b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-card title="Chi tiết bài thi">
      <div v-if="testDetail.subjectid == 1" class="test-result">
          Kết quả làm bài: <strong>{{ countResutlOfTest(testDetail.part) }}</strong>
      </div>
      <b-card-text
        v-for="part in testDetail.part"
        :key="part.id"
        class="part-block"
      >
        <div class="d-flex justify-content-between">
            <h5 style="color: #f75b00; font-weight: 700;">
            {{ part.name }}
            </h5>
            <div  v-if="testDetail.subjectid == 1" class="test-part-result">
                Kết quả: <strong>{{ countResutlOfPart(part) }}</strong>
            </div>
        </div>
        <div
          class="part-description"
          v-html="part.description"
        />
        <div
          v-if="part.part_type"
          class="writing"
        >
          <div
            v-if="part.writing"
            class="ql-editor"
            v-html="part.writing"
          />
          <div v-if="!part.writing">
            Không có bài viết
          </div>
        </div>
        <b-list-group-item
          v-for="(listItem, index) in part.questions"
          :key="listItem.id"
          tag="li"
        >
          <div class="">
            <div
              v-if="listItem.content_type == 1"
              class="question-item"
            >
              <span  class="badge mx-1 badge-info" v-if="listItem.topic_type != 0">{{ listItem.topic_type }}</span>
              <span  class="badge badge-info" v-if="listItem.level_type != 0">{{ listItem.level_type }}</span>
              <div class="question-title d-flex justify-content-between">
                <!-- <span class="question-count">Question {{ countQuestion(index, part.questions) }}</span> -->
                <!-- <div
                  class="answer-status"
                  :class="{'right-answer' : checkQuestionRight(listItem)}"
                >
                  {{ checkQuestionRight(listItem) ? 'Đúng' : 'Sai' }}
                </div> -->
              </div>
              <div
                class="question-content ql-editor"
                v-html="listItem.content"
              />
              <ul class="question-option m-0">
                <li
                  v-for="(op, index2) in listItem.option_data"
                  :key="index2"
                >
                  <span
                      class="option-badge"
                      :class="{'checked' : op.right_answer }"
                    >{{ indexToAlpha(index2) }}</span>
                    <!-- {{ op.content }} -->
                     <span v-html="op.content"></span>
                </li>
              </ul>
            </div>
            <div
              v-if="listItem.content_type == 2"
              class="question-item"
            >
              <div class="question-title d-flex justify-content-between">
                <!-- <span class="question-count">Question {{ countQuestion(index, part.questions) }}</span> -->
                <!-- <div
                  class="answer-status"
                  :class="{'right-answer' : checkQuestionRight(listItem)}"
                >
                  {{ checkQuestionRight(listItem) ? 'Đúng' : 'Sai' }}
                </div> -->
              </div>
              <div
                class="question-content ql-editor"
                v-html="listItem.content"
              />
              <ul class="question-option m-0">
                <li
                  v-for="(op, index2) in listItem.option_data"
                  :key="index2"
                >
                  <span
                      class="option-badge"
                      :class="{'checked' : op.right_answer }"
                    >{{ indexToAlpha(index2) }}</span>
                    <!-- {{ op.content }} -->
                    <span v-html="op.content"></span>
                </li>
              </ul>
            </div>
            <div
              v-if="listItem.content_type == 3"
              class="question-item"
            >
              <div class="question-title d-flex justify-content-between">
                <!-- <span class="question-count">Question {{ countQuestion(index, part.questions) }}</span> -->
              </div>
              <div
                class="question-content ql-editor"
                v-html="changeInputInQuestion(listItem.content, listItem.option_data)"
              />
            </div>
            <div
              v-if="listItem.content_type == 4"
              class="question-item"
            > 
              <span v-if="listItem.topic_type != 0"  class="badge mx-1 badge-info">{{ listItem.topic_type }}</span> 
              <div
                class="question-content type-note ql-editor"
                v-html="listItem.content"
              />
            
            </div>
            <div
              v-if="listItem.content_type == 5"
              class="question-item"
            >
              <div
                class="question-content type-note ql-editor"
                v-html="listItem.content"
              />
            </div>
          </div>
          <div
            v-if="listItem.content_type != 5"
            class="answer-block"
          >
            <span v-if="listItem.answers.length == 0">Câu hỏi bị bỏ qua</span>
            <div v-if="listItem.answers.length > 0 && listItem.content_type == 4" class="user-answer  type-note ql-editor"
              v-html="listItem.answers"/>
            <div v-if="listItem.answers.length > 0 && (listItem.content_type == 1 || listItem.content_type == 2)" class="d-flex justify-content-between">
              <span class="user-answer">Chọn: 
              <strong v-for="ans in listItem.answers" :key="ans">
                <span v-html="indexToAlpha(findIndexAnswer(ans, listItem.option_data))"></span>
                <!-- <span v-html="findAnswer(ans, listItem.option_data).content"></span> -->
                </strong></span>
              
              <div
                  class="answer-status" style="width: 100px"
                  :class="{'right-answer' : checkQuestionRight(listItem)}"
                >
                  {{ checkQuestionRight(listItem) ? 'Đúng' : 'Sai' }}
                </div>
            </div>
            <div v-if="listItem.answers.length > 0 && listItem.content_type == 3">
                <div class="d-flex justify-content-between mb-1" v-for="(ans, index) in listItem.answers" :key="index">
                    <span class="user-answer" >Câu trả lời : <strong>{{ index + 1 }}. {{ listItem.answers[index] }}</strong></span>
                    <div
                    class="answer-status" style="width: 100px"
                    :class="{'right-answer' : checkAnswerQuestionType3(index, listItem)}"
                    >
                    {{ checkAnswerQuestionType3(index, listItem) ? 'Đúng' : 'Sai' }}
                    </div>
                </div>
            </div>
          </div>
        </b-list-group-item>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>

import {
    // BAvatar,
    // BBadge,
    BPagination,
    BFormGroup,
    BFormDatepicker,
    BFormInput,
    BFormSelect,
    // BDropdown,
    // BDropdownItem,
    BCard,
    BCardText,
    BButton,
    // BModal,
    BRow,
    BCol,
    // BFormTextarea,
    // BFormCheckbox,
    BTable,
    BListGroupItem
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";  
import Config from '../../config'
export default {
    components: {
        BCard,
        BCardText,
        BRow,
        BCol,
        BButton,
        BTable,
        BListGroupItem
    },
    data() {
        return {
            link_file_result: '',
            testDetail: {},
            testData: {
                confirm_phone: '',
                time: []
            },
            userInfo: {
                name: '',
                age: '',
                phone: '',
                email: ''
            },
            classOptions:[],
            subjectsOptions :[],
            topicTypeOption: [
                { value: 0, text: 'Chọn chủ đề' },
            ],
            levelTypeOption: [
                { value: 0, text: 'Chọn Cấp độ' },
                { value: 1, text: 'Trung bình - Khá' },
                { value: 2, text: 'Nâng Cao - Giỏi' }
            ],
        }
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
        })
        this.$http.get("/get-topic-type")
        .then((response) => {
            if (response.data.data.length > 0) {
            response.data.data.forEach(function (value) {
                if(value.status == 1){
                    self.topicTypeOption.push({ value: value.id, text: value.name })
                }
            })
            }
        })
        this.getTestInfo()
    },
    computed: {
        subjectSelectText() {
            return this.subjectsOptions.find(el => el.value == this.testData.test_result.subjectid) || { text: ''}
        },
        classSelectText() {
            return this.classOptions.find(el => el.value == this.testData.test_result.classid) || { text: ''}
        },
    },
  methods: {
    async emailSendHandle() {
      if (!this.userInfo.email) {
          this.$toast({
              component: ToastificationContent,
              props: {
                  title: "Notification",
                  icon: "InfoIcon",
                  text: "Đích đến không được để trống",
                  variant: "danger",
                  position: "bottom-right",
              },
          });
      } else {
        const email_html = 'Data';
        this.$http.post('/email/send-test', {
          title: 'Thông báo điểm thi test Master',
          email_html: email_html,
          email_to: this.userInfo.email,
          email_from_name: 'trinhhuong29071999@gmail.com'
        })
        .then((resp) => {
          this.$toast({
              component: ToastificationContent,
              props: {
                title: "Notification",
                icon: "InfoIcon",
                text: "Gửi thành công",
                variant: "success",
                position: "bottom-right",
              },
          });
        })
      }
    },
        submitFile(event){
          this.file = event.target.files[0];
          //Add file to buffer
          const formData = new FormData();
          formData.append('file', this.file);
            // upload data to the server
            this.$http.post('uploads', formData,
              {
                headers: {
                    'Content-Type': 'multispart/form-data'
                }
              }
            )
            .then(res => {
                var link_file = res.data.data.src;
                if (res.data.code === 1) {
                  this.$http
                  .post("/update-mark", {
                      id: this.$route.params.id,
                      file_upload: res.data.data.src
                  })
                  .then(res => {
                    this.link_file_result = link_file
                  })
                  this.$toast({
                      component: ToastificationContent,
                      props: {
                          title: "Notification",
                          icon: "InfoIcon",
                          text: "Thành công",
                          variant: "success",
                          position: "bottom-right",
                      },
                  });
                }
               
            })
            .catch(err => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: "Notification",
                        icon: "InfoIcon",
                        text: err.response,
                        variant: "danger",
                        position: "bottom-right",
                    },
                });
            });
        },
        uploadButtonClick () {
            this.$refs.fileInput.click()
        },
        countResutlOfPart(part) {
            if (!part) { return '' }
            let questionCount = 0;
            let questionRightCount = 0;
            for (let index = 0; index < part.questions.length; index++) {
                if (part.questions[index].content_type === 1 || part.questions[index].content_type === 2) {
                    questionCount++;
                }
                if (part.questions[index].content_type === 3) {
                    questionCount += part.questions[index].option_data.length;
                }
                questionRightCount += this.checkQuestionRight(part.questions[index])
            }

            return `${questionRightCount}/${questionCount}`
        },
        countResutlOfTest(part) {
            if (!part) { return '' }
            let questionCount = 0;
            let questionRightCount = 0;
            for (let index = 0; index < part.length; index++) {
                for (let index2 = 0; index2 < part[index].questions.length; index2++) {
                    if (part[index].questions[index2].content_type === 1 || part[index].questions[index2].content_type === 2) {
                        questionCount++;
                    }
                    if (part[index].questions[index2].content_type === 3) {
                        questionCount += part[index].questions[index2].option_data.length;
                    }
                    questionRightCount += this.checkQuestionRight(part[index].questions[index2])
                }
            }

            return `${questionRightCount}/${questionCount}`
        },
        checkAnswerQuestionType3(index, question) {
            if (question.answers[index]) {
                let optionDataArr = question.option_data[index].content
                if (optionDataArr) {
                    optionDataArr = optionDataArr.trim().toLowerCase().split('|')
                    for (let index2 = 0; index2 < optionDataArr.length; index2++) {
                        const element = optionDataArr[index2];
                        if (element === question.answers[index].trim().toLowerCase()) {
                            return true
                        }
                    }
                }
            }
            return false;
        },
        checkQuestionRight(question) {
            // if (question.content.indexOf('Amy think about personality tes') != -1) {
            //     debugger
            // }
            let rightAnswer = 0;
            if (question.content_type === 1 || question.content_type === 2) {
                const questionRight = question.option_data.filter(qs => qs.right_answer === 'true' || qs.right_answer === true)
                if (questionRight.length === question.answers.length) {
                    for (let index = 0; index < questionRight.length; index++) {
                        const findIndex = question.answers.findIndex(ans => ans === questionRight[index].id)
                        if (findIndex === -1 || questionRight[index].right_answer === false) {
                            return rightAnswer
                        }
                    }
                    rightAnswer = 1
                }
            } else {
                for (let index = 0; index < question.option_data.length; index++) {
                    const answer = question.answers[index] && question.answers[index] !== '' ? question.answers[index].trim().toLowerCase() : ''
                    const option = question.option_data[index].content ? question.option_data[index].content.trim().toLowerCase() : ''
                    const optionArray = option.split('|')
                    for (let index2 = 0; index2 < optionArray.length; index2++) {
                        const element = optionArray[index2];
                        if (element !== '' && answer !== '' && element === answer) {
                            rightAnswer += 1
                            break
                        }
                    }
                }
            }
            return rightAnswer
        },
        findAnswer(id, option) {
            return option.find(op => op.id === id)
        },
        findIndexAnswer(id, option) {
            return option.findIndex(op => op.id === id)
        },
        indexToAlpha(index) {
            const alphaBet = 'ABCDEFGHIKLMN'
            return alphaBet.substr(index, 1)
        },
        changeInputInQuestion(text, answer) {
            let content = text
            const regex = /\$/gi
            let result
            const indices = [];
            while ((result = regex.exec(text))) {
                indices.push(result.index);
            }
            for (let index = indices.length - 1; index >= 0; index--) {
               if (answer[index]) {
                  content = `${content.substr(0, indices[index])}<input class="question-input" value="${answer[index].content}"/>${content.substr(indices[index] + 1, content.length)}`;
               }
            }
            console.log(content)
            return content
        },
        countQuestion(indexQs, question) {
            let count = 1
            for (let index = 0; index < indexQs; index++) {
                if (question[index].content_type !== 5) {
                    count++
                }
            }
            return count
        },
        getTestInfo() {
            this.$http.get('/test-detail', {
                params: {
                    id: this.$route.params.id
                }
            })
            .then(res => {
                if (res.data.code === 1) {
                    this.testData = res.data.data.testData
                    this.userInfo = res.data.data.userInfo
                    this.testDetail = this.testData.test_result
                    this.link_file_result = this.testData.file_upload
                    for(let index = 0; index < this.testDetail.part.length; index++){
                        for(let index1 = 0; index1 < this.testDetail.part[index].questions.length; index1++){
                            if(this.testDetail.part[index].questions[index1].topic_type != 0){
                                this.testDetail.part[index].questions[index1].topic_type = this.topicTypeOption.find(el => el.value == this.testDetail.part[index].questions[index1].topic_type).text
                            }
                             if(this.testDetail.part[index].questions[index1].level_type != 0){
                                this.testDetail.part[index].questions[index1].level_type = this.levelTypeOption.find(el => el.value == this.testDetail.part[index].questions[index1].level_type).text
                            }
                        }
                    }
                    this.$nextTick(() => {
                        window.MathJax.typesetPromise();
                    });
                }
            })
        }
    }
}
</script>

<style scoped>

span.user-answer strong {
    margin-right: 15px;
    background-color: #12508f;
    color: #fff;
      padding: 3px 6px;
    border-radius: 20px;
}

.answer-block {
    background-color: #ffecc6;
    color: #000;
    padding: 10px;
}
.part-block {
    border-bottom: 1px solid #c1c1c199;
    margin-bottom: 40px;
}

.ql-editor {
    padding: 12px 15px;
}

.question-content {
    color: #12508f;
}

.answer-remove-button {
    border: none;
    background-color: #ff4949;
    color: #fff;
    border-radius: 5px;
}

.answer-status {
    color: #fff;
    background-color: #ff6500;
    padding: 2px 10px;
    border-radius: 5px;
}

.answer-status.right-answer {
    background-color: #00af32;
}

.question-content img {
    max-height: 300px;
    width: auto;
}

span.question-count {
    font-size: 1.2rem;
    font-weight: bold;
    color: #12508f;
}

.question-content * {
    color: #12508f !important;
}

.question-option {
    list-style: none;
    padding: 0;
    width: max-content;
}

.test-result {
    background-color: #f75d03;
    padding: 5px;
    margin-bottom: 10px;
    color: #fff;
}

.question-option li {
    display: flex;
    padding: 5px 10px;
    background-color: #e1ebf3;
    color: #12508f !important;
    font-weight: 500;
    border-radius: 10px;
    margin-bottom: 5px;
    min-width: 260px;
}

.question-option .option-badge {
    border: 1px solid #12508f;
    display: block;
    border-radius: 22px;
    width: 23px;
    height: 23px;
    text-align: center;
    margin-right: 8px;
}

.question-option .option-badge.checked {
    background-color: #12508f;
    color: #fff;
}

.question-content.type-note {
    /* background-color: #ffe5c8; */
    padding: 10px;
}

audio.voice {
    margin: auto;
    display: inherit;
}

.time-tag span {
    background-color: #12508f;
    color: #fff;
    padding: 5px;
    margin-right: 10px;
}
</style>

<style>
input.question-input {
    border: 1px solid #12508f;
    border-radius: 22px;
    padding: 4px 20px;
}
</style>
