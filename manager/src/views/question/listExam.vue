<template>
    <b-card>
        <b-modal ref="modal-primary" modal-class="modal-primary" centered hide-footer size="lg" title="Thêm đề mới">
            <b-card-text>
                <b-row>
                    <b-col class="mb-1">
                        <b-form-group label="Tên đề thi" label-for="exam-name">
                            <b-form-input :state="examNameValidation" v-model="examModalData.name" id="exam-name" placeholder="Tên đề thi"></b-form-input>
                            <b-form-invalid-feedback v-if="!examNameValidation" id="input-live-feedback">
                                Hãy nhập tên của đề thi
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-checkbox id="checkbox-1" v-model="examModalData.status" name="checkbox-1" value="1" unchecked-value="0">Xuất bản</b-form-checkbox>
                        <b-form-group class="mt-2" label="Mô tả đề thi" label-for="question-content">
                            <quill-editor id="question-content" v-model="examModalData.description" :options="editorOption" ref="myQuillEditor" />
                            <!-- <ckeditor id="question-content"  @ready="onReady" :editor="editor" v-model="examModalData.description" :config="editorConfig"></ckeditor>  -->
                        </b-form-group>
                        <!-- <b-form-group label="Loại đề thi" label-for="exam-type">
                            <b-form-select :state="examLevelValidation" v-model="examModalData.level" :options="typeOptions" id="exam-type"></b-form-select>
                            <b-form-invalid-feedback v-if="!examLevelValidation" id="input-live-feedback">
                                Hãy chọn một loại đề thi
                            </b-form-invalid-feedback>
                        </b-form-group> -->
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
                        <b-button class="mt-2" variant="primary" block @click="addExam()">XÁC NHẬN</b-button>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-modal>
        <b-card-text>
            <b-row>
                <b-col md="3">
                    <b-form-group  label="Lớp" class="mb-2"  ref="class"  label-for="input-3">
                        <b-form-select id="input-3" :options="classOptions" v-model="params.classid"  ></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="3">
                    <b-form-group  label="Môn" class="mb-2"  ref="subject"  label-for="input-4">
                        <b-form-select id="input-4" :options="subjectsOptions" v-model="params.subjectid"  ></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="9">
                    <b-form-group label="">
                        <b-button variant="success" @click="openModalAdd()">Thêm đề thi mới</b-button>
                    </b-form-group>
                </b-col>
    
                <b-col md="3">
                    <b-form-group label="">
                        <b-button @click="getListExam" type="submit" variant="primary" class="w-100 mr-1">LỌC</b-button>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-card-text>
        <b-card-text>
            
            <b-row>
                <b-col cols="12">
                    <b-table striped hover responsive :items="rows" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                        <template #cell(index)="data">{{ data.index + 1 }}</template>
                        <template #cell(question)="data">
                            <div class="question-content" v-html="data.value"></div>
                        </template>
                        <template #cell(description)="data">
                            <div class="question-content" v-html="data.value"></div>
                        </template>
                        <template #cell(classSelected)="data">
                            <div class="question-content" v-html="data.value"></div>
                        </template>
                        <template #cell(subjectSelected)="data">
                            <div class="question-content" v-html="data.value"></div>
                        </template>
                        <!-- <template #cell(level)="data">
                            <b-badge :variant="data.value === 1 ? 'success' : 'warning' ">{{ data.value === 1 ? "Đã học" : "Chưa học" }}</b-badge>
                        </template> -->

                        <template #cell(status)="data">
                            <b-badge :variant="data.value === 1 ? 'success' : 'warning' ">{{ data.value === 1 ? "Xuất bản" : "Ẩn" }}</b-badge>
                        </template>

                        <template #cell(action)="data">
                            <div class="d-flex">
                                <b-button class="mx-1" size="sm" variant="danger" @click="deleteItem(data.item.id)">Xóa</b-button>
                                <router-link class="mx-1 btn mx-1 btn-primary btn-sm" :to="'/exam/' + data.item.id">Sửa</router-link>
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

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
// import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";
// import MathType from '@wiris/mathtype-ckeditor5/src/plugin';

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
                description: "",
                // level: null,
                status: 1,
                classSelected: null,
                subjectSelected: null,
            },
            qaEditData: {
                content: "",
                option: [],
            },
            classOptions: [
                { value: null, text: 'Hãy chọn Lớp' },
            ],
            params: {
                classid: null,
                subjectid: null
            },
            subjectsOptions: [
                { value: null, text: 'Hãy chọn Môn' },
            ],
            pageLength: 10,
            dir: false,
            filter: null,
            filterOn: [],
            perPage: 20,
            sortBy: "",
            sortDesc: false,
            pageOptions: [10, 20, 40],
            sortDirection: "asc",
            fields: [
                { label: "ID", key: "id" },
                { label: "Name", key: "name" },
                // { label: "Mô tả", key: "description" },
                { label: "Lớp", key: "classid" },
                { label: "Môn", key: "subjectid" },
                // { label: "Loại đề", key: "level" },
                { label: "Status", key: "status" },
                { label: "Action", key: "action" },
            ],
            rows: [],
            searchTerm: "",
            totalRows: 1,
            currentPage: 1,
            uploadUrl: `${Config.apiUrl}/uploads`,
            editorOption: {},
              editor: ClassicEditor,
            editorConfig: {
                // The configuration of the editor.
                plugins: [
                    Essentials,
                //     // UploadAdapter,
                //     // SimpleUploadAdapter,
                    Base64UploadAdapter,
                    Autoformat,
                    Bold,
                    Italic,
                    BlockQuote,
                //     // EasyImage,
                    Heading,
                    Image,
                    ImageCaption,
                    ImageStyle,
                    ImageToolbar,
                    ImageUpload,
                    List,
                    Paragraph,
                    Alignment,
                    // MathType,
                //     Image,
                ],
                toolbar: {
                    items: [
                        "heading",
                        "|",
                        "alignment", // <--- ADDED
                        "bold",
                        "italic",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "uploadImage",
                        "blockQuote",
                        "undo",
                        "redo",
                        "MathType",
                        "ChemType",
                    ],
                },
                image: {
                    toolbar: [
                        "imageStyle:inline",
                        "imageStyle:block",
                        "imageStyle:side",
                        "|",
                        "toggleImageCaption",
                        "imageTextAlternative",
                    ],
                },
                simpleUpload: {
                    uploadUrl: `${Config.URL_BASE}/uploads?type=ckeditor`,

                    // Enable the XMLHttpRequest.withCredentials property.
                    // withCredentials: true,

                    // Headers sent along with the XMLHttpRequest to the upload server.
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "PHOLaccessToken",
                        )}`,
                    },
                },
                language: "en",
            },
        };
    },
    computed: {
       
        statusVariant() {
            const statusColor = {
                0: "light-warning",
                1: "light-success",
            };

            return (status) => statusColor[status];
        },
        direction() {
            if (store.state.appConfig.isRTL) {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.dir = true;
                return this.dir;
            }
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.dir = false;
            return this.dir;
        },
        examNameValidation() {
            if (this.examModalData.name !== '') {
                return true
            }
            return false
        },
        examLevelValidation() {
            if (this.examModalData.level !== null) {
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
        }
    },
    async mounted() {
        const self = this
        await this.$http.get("/get-class")
        .then((response) => {
            if (response.data.data.length > 0) {
            response.data.data.forEach(function (value) {
                if(value.status == 1){
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
                if(value.status == 1){
                    self.subjectsOptions.push({ value: value.id, text: value.name })
                }
            })
            }
            this.examModalData.subjectSelected = null
        })
        // modify the rich text editor image upload path
        this.editorOption = quillRedefine({
            uploadConfig: {
                action: this.uploadUrl,
                res: (response) => {
                    if (response.data.type === 'audio') {
                        const length = this.$refs.myQuillEditor.quill.getSelection().index
                        // this.$refs.myQuillEditor.quill.insertEmbed(length, 'audio', Config.assetUrl + response.data.src, "api")
                        this.$refs.myQuillEditor.quill.setSelection(length + 1)
                        return false;
                    }
                    // return Config.assetUrl + response.data.src
                    return response.data.src
                },
                name: 'file'
            }
        })
        this.getListExam();
 
    },
    methods: {
        onReady(editor) {
            // Insert the toolbar before the editable area.
            editor.ui
                .getEditableElement()
                .parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement(),
                );
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        editItem(id) {
            const index = this.rows.findIndex((r) => r.id === id);
            this.qaEditData = {
                id,
                content: this.rows[index].question,
                option: this.rows[index].option,
            };
            this.$refs["modal-edit"].show();
        },
        openModalAdd() {
            this.examModalData = {
                name: "",
                description: "",
                // level: null,
                classSelected: null,
                subjectSelected: null,
                status: 1,
            };
            this.$refs["modal-primary"].show();
        },
        deleteItem(id) {
            this.$bvModal
                .msgBoxConfirm(
                    "Hành động này không hoàn tác được, bạn có xác nhận xóa đề thi này ?",
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
                            .post("/delete-exam", { id })
                            .then((res) => {
                                if (res.data.code === 1) {
                                    const index = this.rows.findIndex(
                                        (r) => r.id === id
                                    );
                                    this.rows.splice(index, 1);
                                }
                            });
                    }
                });
        },
        addQARowEditPopup() {
            this.qaEditData.option.push({
                value: "",
                right_answer: 0,
                text: "",
            });
        },
        addExam() {
            // if (!this.examNameValidation || !this.examLevelValidation) {
            if (!this.examNameValidation || !this.examClassValidation  || !this.examSubjectValidation) {
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
                .post("/create-exam", {
                    name: this.examModalData.name,
                    description: this.examModalData.description,
                    // level: this.examModalData.level,
                    status: this.examModalData.status,
                    classid: this.examModalData.classSelected,
                    subjectid: this.examModalData.subjectSelected
                })
                .then((res) => {
                    if (res.data.code === 1) {
                        console.log(res.data.data)
                        res.data.data.classid = this.classOptions.find(el => el.value == res.data.data.classid).text
                        res.data.data.subjectid = this.subjectsOptions.find(el => el.value == res.data.data.subjectid).text
                            // this.rows[index].subjectid = this.subjectsOptions.find(el => el.value == this.rows[index].subjectid).text
                        this.rows.push(res.data.data);
                        this.$refs["modal-primary"].hide();
                        // for (let index = 0; index < this.rows.length; index++) {
                            // this.rows[index].classid = this.classOptions.find(el => el.value == this.rows[index].classid).text
                            // this.rows[index].subjectid = this.subjectsOptions.find(el => el.value == this.rows[index].subjectid).text
                            
                        // }
                        console.log(this.rows)
                        this.$nextTick(() => {
                            window.MathJax.typesetPromise();
                        });
                    }
                });
        },
        editQuestion() {
            this.$http
                .post("/edit-questions", {
                    question: this.qaEditData,
                })
                .then((res) => {
                    if (res.data.code === 1) {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Notification",
                                icon: "InfoIcon",
                                text: "I do not think that word means what you think it means.",
                                variant: "success",
                                position: "bottom-right",
                            },
                        });

                        const index = this.rows.findIndex(
                            (r) => r.id === this.qaEditData.id
                        );
                        this.rows[index].question = res.data.data.question;
                        this.rows[index].option = res.data.data.option;
                        this.$refs["modal-edit"].hide();
                        this.$nextTick(() => {
                            window.MathJax.typesetPromise();
                        });
                    }
                });
        },
        getListExam() {
            console.log(this.params)
            this.$http.get("/get-exam-admin", {params: this.params}).then((res) => {
                if (res.data.code === 1) {
                    this.rows = res.data.data;
                    for (let index = 0; index < this.rows.length; index++) {
                        if( this.rows[index].classid != 0){
                            this.rows[index].classid =  this.classOptions.find(el => el.value == this.rows[index].classid).text
                            this.rows[index].subjectid =  this.subjectsOptions.find(el => el.value == this.rows[index].subjectid).text
                            // this.rows[index].classid =  this.rows[index].classid.text 
                        }
                    }
                    this.totalRows = this.rows.length;
                    this.$nextTick(() => {
                        window.MathJax.typesetPromise();
                    });
                }
            });
        }
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
