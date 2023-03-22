<template>
    <b-card>
        <b-modal ref="modal-primary" modal-class="modal-primary" centered hide-footer size="lg" title="Thêm chủ đề mới">
            <b-card-text>
                <b-row>
                    <b-col class="mb-1">
                        <b-form-group label="Tên chủ đề" label-for="exam-name">
                            <b-form-input :state="classNameValidation" v-model="examModalData.name" id="exam-name" placeholder="Tên chủ đề"></b-form-input>
                            <b-form-invalid-feedback v-if="!classNameValidation" id="input-live-feedback">
                                Hãy nhập tên môn thi
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Lớp" label-for="exam-class">
                            <b-form-select :state="examClassValidation" v-model="examModalData.classSelected" :options="classOptions" id="exam-class"></b-form-select>
                            <b-form-invalid-feedback v-if="!examClassValidation" id="input-live-feedback">
                                Hãy chọn lớp học
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Môn" label-for="exam-subject">
                            <b-form-select :state="examSubjectValidation" v-model="examModalData.subjectSelected" :options="subjectsOptions" id="exam-subject"></b-form-select>
                            <b-form-invalid-feedback v-if="!examSubjectValidation" id="input-live-feedback">
                                Hãy chọn môn học
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-checkbox id="checkbox-1" v-model="examModalData.status" name="checkbox-1" value="1" unchecked-value="0">Xuất bản</b-form-checkbox>
                        <b-button class="mt-2" variant="primary" block @click="addClass()">XÁC NHẬN</b-button>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-modal>
        <b-modal ref="modal-edit-class" modal-class="modal-primary" centered hide-footer size="lg" title="Sửa thông tin chủ đề">
            <b-card-text>
                <b-row>
                    <b-col class="mb-1">
                        <b-form-group label="Tên chủ đề" label-for="exam-name">
                            <b-form-input v-model="examModalData.name" :state="classNameValidation" id="exam-name" placeholder="Tên chủ đề"></b-form-input>
                            <b-form-invalid-feedback v-if="!classNameValidation" id="input-live-feedback">
                                Hãy nhập tên chủ đề
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Lớp" label-for="exam-class">
                            <b-form-select :state="examClassValidation" v-model="examModalData.classSelected" :options="classOptions" id="exam-class"></b-form-select>
                            <b-form-invalid-feedback v-if="!examClassValidation" id="input-live-feedback">
                                Hãy chọn lớp học
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Môn" label-for="exam-subject">
                            <b-form-select :state="examSubjectValidation" v-model="examModalData.subjectSelected" :options="subjectsOptions" id="exam-subject"></b-form-select>
                            <b-form-invalid-feedback v-if="!examSubjectValidation" id="input-live-feedback">
                                Hãy chọn môn học
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-checkbox id="checkbox-1" class="mb-1" v-model="examModalData.status" name="checkbox-1" value="1" unchecked-value="0">Xuất bản</b-form-checkbox>
                        <b-button class="mt-2" variant="primary" block @click="editClass()">XÁC NHẬN</b-button>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-modal>
        <b-card-text>
            <div class="custom-search d-flex justify-content-between mb-2">
                <b-button variant="success" @click="openModalAdd()">Thêm chủ đề mới</b-button>
            </div>
            <b-row>
                <b-col cols="12">
                    <b-table striped hover responsive :items="rows" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"  
                     >
                        <template #cell(index)="data">{{ data.index + 1 }}</template>
                        <template #cell(name)="data">
                            <div class="question-content" v-html="data.value"></div>
                        </template>
                        <template #cell(classid)="data">
                            <div class="question-content" v-html="data.value"></div>
                        </template>
                        <template #cell(subjectid)="data">
                            <div class="question-content" v-html="data.value"></div>
                        </template>
                        <template #cell(status)="data">
                            <b-badge :variant="data.value == 1 ? 'success' : 'warning' ">{{ data.value == 1 ? "Xuất bản" : "Ẩn" }}</b-badge>
                        </template>

                        <template #cell(action)="data">
                            <div class="d-flex">
                                <b-button class="mx-1" size="sm" variant="danger" @click="deleteItem(data.item.id)">Xóa</b-button>
                                <!-- <router-link class="mx-1 btn mx-1 btn-primary btn-sm" :to="'/exam/' + data.item.id">Sửa</router-link> -->
                                <b-button class="mx-1" size="sm" variant="primary" @click="openModalCLassEdit(data.item.id)">Sửa</b-button>
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
import "quill/dist/quill.core.css";
// eslint-disable-next-line
import "quill/dist/quill.snow.css";
// eslint-disable-next-line
import "quill/dist/quill.bubble.css";

import { quillRedefine } from '@/libs/quillRedefine'
import { quillEditor } from "vue-quill-editor";

import {
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
    BFormInvalidFeedback
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Config from '../../../config'

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
        ToastificationContent,
        BFormInvalidFeedback
    },
    data() {
        return {
            examModalData: {
                name: "",
                status: 1,
                classSelected: null,
                subjectSelected: null,
            },
            classOptions: [
                { value: null, text: 'Hãy chọn Lớp' },
            ],
            subjectsOptions: [
                { value: null, text: 'Hãy chọn Môn' },
            ],
            pageLength: 10,
            dir: false,
            perPage: 20,
            sortBy: "",
            sortDesc: false,
            pageOptions: [10, 20, 40],
            sortDirection: "asc",
            fields: [
                { label: "ID", key: "id" },
                { label: "Name", key: "name" },
                { label: "Class", key: "classid" },
                { label: "Subject", key: "subjectid" },
                { label: "Status", key: "status" },
                { label: "Action", key: "action" },
            ],
            rows: [],
            totalRows: 1,
            currentPage: 1,
        };
    },
    async mounted() {
        const self = this
        await this.$http.get("/get-class")
            .then((response) => {
                if (response.data.data.length > 0) {
                    response.data.data.forEach(function (value) {
                        if (value.status == 1) {
                            self.classOptions.push({ value: value.id, text: value.name })
                        }
                    })
                }
                this.examModalData.classSelected = null
            })
        await this.$http.get("/get-subject")
            .then((response) => {
                if (response.data.data.length > 0) {
                    response.data.data.forEach(function (value) {
                        if (value.status == 1) {
                            self.subjectsOptions.push({ value: value.id, text: value.name })
                        }
                    })
                }
                this.examModalData.subjectSelected = null
            })
        this.getListTopic();
    },
    computed: {
        classNameValidation() {
            if (this.examModalData.name !== '') {
                return true
            }
            return false
        },
        examClassValidation() {
            if (this.examModalData.classSelected !== null) {
                return true
            }
            return false
        },
        examSubjectValidation(){
            if (this.examModalData.subjectSelected !== null) {
                return true
            }
            return false
        },
        statusVariant() {
            const statusColor = {
                0: "light-warning",
                1: "light-success",
            };

            return (status) => statusColor[status];
        },
    },
    created() {
        
    },
    methods: {
        getListTopic() {
            const self = this
            this.$http.get("/get-topic-type").then((res) => {
                if (res.data.code === 1) {
                    this.rows = res.data.data;
                    for (let index = 0; index < this.rows.length; index++) {
                        if( this.rows[index].classid != 0){
                            this.rows[index].classid =  self.classOptions.find(el => el.value == this.rows[index].classid).text
                            this.rows[index].subjectid =  self.subjectsOptions.find(el => el.value == this.rows[index].subjectid).text
                        }
                    }
                    this.totalRows = this.rows.length;
                }
            });
        },
        openModalAdd() {
            this.examModalData = {
                name: "",
                status: 1,
                classSelected: null,
                subjectSelected: null,
            };
            this.$refs["modal-primary"].show();
        },
        openModalCLassEdit(id) {
            const index = this.rows.findIndex((r) => r.id === id);
            let classid =  this.classOptions.find(el => el.text == this.rows[index].classid).value
            // this.rows[index].classid =  this.classOptions.find(el => el.text == this.rows[index].classid).value
            // this.rows[index].subjectid =  this.subjectsOptions.find(el => el.text == this.rows[index].subjectid).value
            let subjectid =  this.subjectsOptions.find(el => el.text == this.rows[index].subjectid).value
            this.examModalData = {
                id,
                name: this.rows[index].name,
                status: this.rows[index].status,
                classSelected: classid,
                subjectSelected: subjectid,
            };
            console.log(this.rows[index],'kkkkk')
            this.$refs["modal-edit-class"].show();
        },
        deleteItem(id) {
            this.$bvModal
                .msgBoxConfirm(
                    "Hành động này không hoàn tác được, bạn có xác nhận xóa chủ đề này ?",
                    {
                        title: "Xác nhận",
                        size: "sm",
                        okVariant: "primary",
                        okTitle: "Yes",
                        cancelTitle: "No",
                        cancelVariant: "outline-secondary",
                        hideHeaderClose: false,
                        centered: true,
                    }
                )
                .then((value) => {
                    if (value) {
                        this.$http
                            .post("/delete-topic-type", { id })
                            .then((res) => {
                                if (res.data.code === 1) {
                                    const index = this.rows.findIndex(
                                        (r) => r.id === id
                                    );
                                    this.rows.splice(index, 1);
                                    this.$toast({
                                        component: ToastificationContent,
                                        props: {
                                            title: "Notification",
                                            icon: "InfoIcon",
                                            text: "Thành Công",
                                            variant: "success",
                                            position: "bottom-right",
                                        },
                                    });
                                }
                            });
                    }
                });
        },
        addClass() {
            if (!this.examModalData.name || !this.examClassValidation  || !this.examSubjectValidation) {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: "Notification",
                        icon: "InfoIcon",
                        text: "Hãy nhập các trường được yêu cầu !",
                        variant: "danger",
                        position: "bottom-right",
                    },
                });

                return
            }

            this.$http
                .post("/create-topic-type", {
                    name: this.examModalData.name,
                    status: this.examModalData.status,
                    classid: this.examModalData.classSelected,
                    subjectid: this.examModalData.subjectSelected
                })
                .then((res) => {
                    if (res.data.code === 1) {
                        res.data.data.classid = this.classOptions.find(el => el.value == res.data.data.classid).text
                        res.data.data.subjectid = this.subjectsOptions.find(el => el.value == res.data.data.subjectid).text
                        this.rows.push(res.data.data);
                        this.$refs["modal-primary"].hide();
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Notification",
                                icon: "InfoIcon",
                                text: "Thành Công",
                                variant: "success",
                                position: "bottom-right",
                            },
                        });
                    }
                });
        },
        editClass() {
            this.$http
                .post("/edit-topic-type", {
                    id: this.examModalData.id,
                    name: this.examModalData.name,
                    status: this.examModalData.status,
                    classid: this.examModalData.classSelected,
                    subjectid: this.examModalData.subjectSelected,
                })
                .then((res) => {
                    if (res.data.code === 1) {
                        const index = this.rows.findIndex(
                            (r) => r.id === this.examModalData.id
                        );
                        this.rows[index].name = res.data.data.name;
                        this.rows[index].status = res.data.data.status;
                        res.data.data.classid = this.classOptions.find(el => el.value == res.data.data.classid).text
                        res.data.data.subjectid = this.subjectsOptions.find(el => el.value == res.data.data.subjectid).text
                        this.rows[index].classid = res.data.data.classid
                        this.rows[index].subjectid = res.data.data.subjectid
                        this.$refs["modal-edit-class"].hide();
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Notification",
                                icon: "InfoIcon",
                                text: "Thành Công",
                                variant: "success",
                                position: "bottom-right",
                            },
                        });
                    }
                });
        },
    },
};
</script>

<style>
.question-content img {
    height: 300px;
}
</style>

<style lang="scss" >
@import "@core/scss/vue/libs/vue-good-table.scss";
</style>
