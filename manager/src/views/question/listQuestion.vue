<template>
  <b-card>
    <b-modal
      ref="modal-primary"
      modal-class="modal-primary"
      centered
      hide-footer
      size="lg"
      title="Thêm câu hỏi mới"
    >
      <b-card-text>
        <b-row>
          <b-col class="mb-1">
            <b-form-group
              label="Nội dung câu hỏi"
              label-for="question-content"
            >
              <quill-editor
                id="question-content"
                v-model="qaAddData.content"
                :options="snowOption"
              />
            </b-form-group>
            <b-form-group
              label="Câu trả lời"
              label-for="basicInput"
            >
              <div
                v-for="(option, index) in qaAddData.option"
                :key="index"
                class="mb-2"
              >
                <div class="d-flex justify-content-between align-content-center">
                  <b-form-checkbox
                    v-model="qaAddData.option[index].answer"
                    value="true"
                  >
                    Câu trả lời đúng
                  </b-form-checkbox>
                  <button @click="removeBlock(index)">
                    x
                  </button>
                </div>
                <b-form-textarea
                  v-model="qaAddData.option[index].content"
                  placeholder="Câu trả lời"
                  rows="1"
                />
              </div>
            </b-form-group>
            <b-button
              size="sm"
              @click="addQARow()"
            >
              Thêm
            </b-button>
            <b-button
              class="mt-2"
              variant="primary"
              block
              @click="addQuestion()"
            >
              XÁC NHẬN
            </b-button>
          </b-col>
        </b-row>
      </b-card-text>
    </b-modal>
    <b-modal
      ref="modal-edit"
      modal-class="modal-primary"
      centered
      hide-footer
      size="lg"
      title="Sửa câu hỏi"
    >
      <b-card-text>
        <b-row>
          <b-col class="mb-1">
            <b-form-group
              label="Nội dung câu hỏi"
              label-for="question-content"
            >
              <quill-editor
                id="question-content"
                v-model="qaEditData.content"
                :options="snowOption"
              />
            </b-form-group>
            <b-form-group
              label="Câu trả lời"
              label-for="basicInput"
            >
              <div
                v-for="(option, index) in qaEditData.option"
                :key="index"
                class="mb-2"
              >
                <div class="d-flex justify-content-between align-content-center">
                  <b-form-checkbox
                    v-model="qaEditData.option[index].right_answer"
                    value="1"
                  >
                    Câu trả lời đúng
                  </b-form-checkbox>
                  <button @click="removeBlock(index)">
                    x
                  </button>
                </div>
                <b-form-textarea
                  v-model="qaEditData.option[index].text"
                  placeholder="Câu trả lời"
                  rows="1"
                />
              </div>
            </b-form-group>
            <b-button
              size="sm"
              @click="addQARowEditPopup()"
            >
              Thêm
            </b-button>
            <b-button
              class="mt-2"
              variant="primary"
              block
              @click="editQuestion()"
            >
              XÁC NHẬN
            </b-button>
          </b-col>
        </b-row>
      </b-card-text>
    </b-modal>
    <b-card-text>
      <div class="custom-search d-flex justify-content-between mb-2">
        <b-button @click="openModalAdd()">
          Thêm câu hỏi
        </b-button>
        <b-form-group class="mb-0">
          <div class="d-flex align-items-center">
            <label class="mr-1">Search</label>
            <b-form-input
              v-model="searchTerm"
              placeholder="Search"
              type="text"
              class="d-inline-block"
            />
          </div>
        </b-form-group>
      </div>
      <b-row>
        <b-col cols="12">
          <b-table
            striped
            hover
            responsive
            :items="rows"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            :filter="filter"
            :filter-included-fields="filterOn"
            @filtered="onFiltered"
          >
            <template #cell(index)="data">
              {{ data.index + 1 }}
            </template>
            <template #cell(question)="data">
              <div class="question-content" v-html="data.value"></div>
            </template>

            <template #cell(status)="data">
              <b-badge :variant="data.value === 1 ? 'success' : 'warning' ">
                {{ data.value === 1 ? "Mở" :  "Ẩn" }}
              </b-badge>
            </template>

            <template #cell(action)="data">
              <div class="d-flex">
                <b-button class="mx-1" size="sm" variant="danger" @click="deleteItem(data.item.id)">Xóa</b-button>
                <b-button size="sm" variant="primary" @click="editItem(data.item.id)">Sửa</b-button>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>

// eslint-disable-next-line
import 'quill/dist/quill.core.css'
// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BCard, BCardText, BButton, BModal, BRow, BCol, BFormTextarea, BFormCheckbox, BTable,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'

export default {
  components: {
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BCard,
    BCardText,
    BButton,
    BModal,
    BRow,
    BCol,
    BFormTextarea,
    BFormCheckbox,
    BTable,
    quillEditor,
  },
  data() {
    return {
      qaAddData: {
        content: '',
        option: [],
      },
      qaEditData: {
        content: '',
        option: [],
      },
      snowOption: {
        placeholder: 'Viết nội dung ở đây ...',
      },
      pageLength: 10,
      dir: false,
      filter: null,
      filterOn: [],
      perPage: 20,
      sortBy: '',
      sortDesc: false,
      pageOptions: [10, 20, 40],
      sortDirection: 'asc',
      fields: [
        { label: 'ID', key: 'id' },
        { label: 'STT', key: 'index' },
        { label: 'Question', key: 'question' },
        { label: 'Status', key: 'status' },
        { label: 'Action', key: 'action' },
      ],
      rows: [],
      searchTerm: '',
      totalRows: 1,
      currentPage: 1,
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        0: 'light-warning',
        1: 'light-success',
      }

      return status => statusColor[status]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  created() {
    this.$http.get('/test/get-questions-admin')
      .then(res => {
        if (res.data.code === 1) {
          this.rows = res.data.data
          this.totalRows = this.rows.length
        }
      })
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    editItem(id) {
      const index = this.rows.findIndex(r => r.id === id)

      // Check và sửa lỗi cấu trúc câu hỏi

      if (this.rows[index].option) {
        for (let i = 0; i < this.rows[index].option.length ; i++) {
          if (! this.rows[index].option[i].id) {
            this.rows[index].option[i].id = new Date()
          }
        }
      }

      this.qaEditData = {
        id,
        content: this.rows[index].question,
        option: this.rows[index].option,
      }
      this.$refs['modal-edit'].show()
    },
    openModalAdd() {
      this.qaAddData = {
        content: '',
        option: [],
      }
      this.$refs['modal-primary'].show()
    },
    deleteItem(id) {
      console.log(id)
      this.$http.delete('/test/delete-questions', {
        params: {
          id,
        },
      })
        .then(res => {
          if (res.data.code === 1) {
            const index = this.rows.findIndex(r => r.id === id)
            this.rows.splice(index, 1)
          }
        })
    },
    removeBlock(index) {
      this.qaAddData.option.splice(index, 1)
    },
    addQARowEditPopup() {
      this.qaEditData.option.push({
        value: '',
        right_answer: 0,
        text: '',
      })
    },
    addQARow() {
      const time = new Date()
      this.qaAddData.option.push({
        id: time.getTime(),
        answer: false,
        content: '',
      })
    },
    addQuestion() {
      this.$http.post('/test/add-questions', {
        question: this.qaAddData,
      })
        .then(res => {
          if (res.data.code === 1) {
            this.rows.push({
              id: res.data.data.id,
              question: res.data.data.question,
              status: true,
            })
            this.$refs['modal-primary'].hide()
          }
        })
    },
    editQuestion() {
      this.$http.post('/test/edit-questions', {
        question: this.qaEditData,
      })
        .then(res => {
          if (res.data.code === 1) {
            const index = this.rows.findIndex(r => r.id === this.qaEditData.id)
            this.rows[index].question = res.data.data.question
            this.rows[index].option = res.data.data.option
            this.$refs['modal-edit'].hide()
          }
        })
    },
  },
}
</script>

<style>
.question-content img {
    height: 300px;
}
</style>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
