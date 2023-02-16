<template>
    <div>
        <b-modal ref="modal-examEdit" modal-class="modal-primary" centered hide-footer size="lg"
            title="Sửa thông tin đề">
            <b-card-text>
                <b-row>
                    <b-col class="mb-1">
                        <b-form-group label="Tên đề thi" label-for="exam-name">
                            <b-form-input :state="examNameValidation" v-model="examModalData.name" id="exam-name"
                                placeholder="Tên đề thi"></b-form-input>
                            <b-form-invalid-feedback v-if="!examNameValidation" id="input-live-feedback">
                                Hãy nhập tên của đề thi
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-checkbox id="checkbox-1" v-model="examModalData.status" name="checkbox-1" value="1"
                            unchecked-value="0">Xuất bản</b-form-checkbox>
                        <b-form-group class="mt-2" label="Mô tả đề thi" label-for="question-content">
                            <!-- <quill-editor v-model="examModalData.description" ref="myQuillEditor" toolbar="toolbar1"></quill-editor> -->
                            <ckeditor ref="myQuillEditor" @ready="onReady" :editor="editor"
                                v-model="examModalData.description" :config="editorConfig"></ckeditor>
                        </b-form-group>
                        <!-- <b-form-group label="Loại đề thi" label-for="exam-type">
                            <b-form-select :state="examLevelValidation" v-model="examModalData.level" :options="typeOptions" id="exam-type"></b-form-select>
                            <b-form-invalid-feedback v-if="!examLevelValidation" id="input-live-feedback">
                                Hãy chọn một loại đề thi
                            </b-form-invalid-feedback>
                        </b-form-group> -->
                        <b-form-group label="Lớp" label-for="exam-class">
                            <b-form-select :state="examClassValidation" v-model="examModalData.classid"
                                :options="classOptions" id="exam-class"></b-form-select>
                            <b-form-invalid-feedback v-if="!examClassValidation" id="input-live-feedback">
                                Hãy chọn lớp học
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Môn" label-for="exam-subject">
                            <b-form-select :state="examSubjectValidation" v-model="examModalData.subjectid"
                                :options="subjectsOptions" id="exam-subject"></b-form-select>
                            <b-form-invalid-feedback v-if="!examSubjectValidation" id="input-live-feedback">
                                Hãy chọn môn học
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-button class="mt-2" variant="primary" block @click="examSave()">XÁC NHẬN</b-button>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-modal>
        <b-modal ref="modal-questionedit" modal-class="modal-primary" centered hide-footer size="lg"
            title="Sửa câu hỏi">
            <b-card-text>
                <b-row>
                    <b-col class="mb-1">
                        <b-form-group label="Loại câu hỏi" label-for="question-content">
                            <b-form-select v-model="questionEditModalData.content_type"
                                :options="questionTypeOption"></b-form-select>
                        </b-form-group>
                        <b-form-group v-if="questionEditModalData.content_type == 1" label="Chủ đề"
                            label-for="question-content2">
                            <b-form-select v-model="questionEditModalData.topic_type"
                                :options="topicTypeOption"></b-form-select>
                        </b-form-group>
                        <b-form-group v-if="questionEditModalData.content_type == 1" label="Cấp độ"
                            label-for="question-content1">
                            <b-form-select v-model="questionEditModalData.level_type"
                                :options="levelTypeOption"></b-form-select>
                        </b-form-group>
                        <b-form-group label="Nội dung" label-for="question-content">
                            <b-alert variant="warning" :show="questionEditModalData.content_type == 3">Hãy thêm ${đáp
                                án} vào vị trí muốn hiển thị ô nhập trả lời. Nếu có nhiều đáp án, mỗi đáp án cách nhau
                                bởi dấu |. VD: ${đáp án 1|Đáp án 2}</b-alert>
                            <!-- <quill-editor id="question-content"  ref="myQuillEditor" toolbar="toolbar2" v-model="questionEditModalData.content" /> -->
                            <ckeditor id="question-content" ref="myQuillEditor" @ready="onReady" :editor="editor"
                                v-model="questionEditModalData.content" :config="editorConfig"></ckeditor>
                        </b-form-group>
                        <b-form-group v-if="questionEditModalData.content_type == 1" label="Câu trả lời"
                            label-for="basicInput">
                            <div v-for="(option, index) in questionEditModalData.option" :key="index" class="mb-2">
                                <div class="d-flex justify-content-between align-content-center">
                                    <b-form-checkbox v-model="questionEditModalData.option[index].right_answer"
                                        :value="true">Câu trả lời đúng</b-form-checkbox>
                                    <button class="answer-remove-button" @click="removeBlockEdit(index)">x</button>
                                </div>
                                <!-- <b-form-input v-model="questionEditModalData.option[index].content" placeholder="Câu trả lời" rows="1" /> -->
                                <ckeditor id="question-content" ref="myQuillEditor" @ready="onReady" :editor="editor"
                                    v-model="questionEditModalData.option[index].content" :config="editorConfig">
                                </ckeditor>
                            </div>
                            <b-button size="sm" variant="warning" block @click="addQARowEditPopup()">Thêm</b-button>
                        </b-form-group>
                        <b-form-group v-if="questionEditModalData.content_type == 2" label="Câu trả lời"
                            label-for="basicInput">
                            <div v-for="(option, index) in questionEditModalData.option" :key="index" class="mb-2">
                                <div class="d-flex justify-content-between align-content-center">
                                    <b-form-checkbox v-model="questionEditModalData.option[index].right_answer"
                                        :value="true">{{
                                            questionEditModalData.option[index].content
                                        }}</b-form-checkbox>
                                </div>
                            </div>
                        </b-form-group>
                        <!-- <b-form-group v-if="questionEditModalData.content_type == 3" label="Câu trả lời" label-for="basicInput">
                            <div v-for="(option, index) in questionEditModalData.option" :key="index" class="mb-2">
                                <b-form-input v-model="questionEditModalData.option[index].content" placeholder="Câu trả lời" rows="1" />
                            </div>
                        </b-form-group> -->
                        <b-button class="mt-2" variant="primary" block @click="editQuestion()">XÁC NHẬN</b-button>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-modal>
        <b-modal ref="modal-addquestion" :no-enforce-focus="true" modal-class="modal-primary" centered hide-footer
            size="lg" title="Thêm câu hỏi mới">
            <b-card-text>
                <b-row>
                    <b-col class="mb-1">
                        <b-form-group label="Loại câu hỏi" label-for="question-content">
                            <b-form-select v-model="questionModalData.content_type"
                                :options="questionTypeOption"></b-form-select>
                        </b-form-group>
                        <b-form-group v-if="questionModalData.content_type == 1" label="Chủ đề"
                            label-for="question-content1">
                            <b-form-select v-model="questionModalData.topic_type"
                                :options="topicTypeOption"></b-form-select>
                        </b-form-group>
                        <b-form-group v-if="questionModalData.content_type == 1" label="Cấp độ"
                            label-for="question-content1">
                            <b-form-select v-model="questionModalData.level_type"
                                :options="levelTypeOption"></b-form-select>
                        </b-form-group>
                        <b-form-group label="Nội dung" label-for="question-content">
                            <b-alert variant="warning" :show="questionModalData.content_type == 3">Hãy thêm ${đáp án}
                                vào vị trí muốn hiển thị ô nhập trả lời. Nếu có nhiều đáp án, mỗi đáp án cách nhau bởi
                                dấu |. VD: ${đáp án 1|Đáp án 2}</b-alert>
                            <!-- <quill-editor id="question-content" v-model="questionModalData.content" ref="myQuillEditor" toolbar="toolbar3"/> -->
                            <ckeditor @ready="onReady" :editor="editor" v-model="questionModalData.content"
                                :config="editorConfig"></ckeditor>
                        </b-form-group>
                        <b-form-group v-if="questionModalData.content_type == 1" label="Câu trả lời"
                            label-for="basicInput">
                            <div v-for="(option, index) in questionModalData.option" :key="index" class="mb-2">
                                <div class="d-flex justify-content-between align-content-center">
                                    <b-form-checkbox v-model="questionModalData.option[index].right_answer"
                                        value="true">Câu trả lời đúng</b-form-checkbox>
                                    <button class="answer-remove-button" @click="removeBlock(index)">x</button>
                                </div>
                                <!-- <b-form-input v-model="questionModalData.option[index].content" placeholder="Câu trả lời" rows="1" /> -->
                                <ckeditor @ready="onReady" :editor="editor"
                                    v-model="questionModalData.option[index].content" :config="editorConfig"></ckeditor>
                            </div>
                            <b-button size="sm" variant="warning" block @click="addQARow()">Thêm</b-button>
                        </b-form-group>
                        <b-form-group v-if="questionModalData.content_type == 2" label="Câu trả lời"
                            label-for="basicInput">
                            <div v-for="(option, index) in questionModalData.option" :key="index" class="mb-2">
                                <div class="d-flex justify-content-between align-content-center">
                                    <b-form-checkbox v-model="questionModalData.option[index].right_answer"
                                        value="true">{{ questionModalData.option[index].content }}</b-form-checkbox>
                                </div>
                            </div>
                        </b-form-group>
                        <!-- <b-form-group v-if="questionModalData.content_type == 3" label="Câu trả lời" label-for="basicInput">
                            <div v-for="(option, index) in questionModalData.option" :key="index" class="mb-2">
                                <b-form-input v-model="questionModalData.option[index].content" placeholder="Câu trả lời" rows="1" />
                            </div>
                        </b-form-group> -->
                        <b-button class="mt-2" variant="primary" block @click="addQuestion()">XÁC NHẬN</b-button>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-modal>
        <b-modal ref="modal-primary" modal-class="modal-primary" centered hide-footer size="lg" title="Thêm part mới">
            <b-card-text>
                <b-row>
                    <b-col class="mb-1">
                        <b-form-group label="Tên part" label-for="exam-name">
                            <b-form-input v-model="examPartModalData.name" :state="examPartNameValidation"
                                id="exam-name" placeholder="Tên part"></b-form-input>
                            <b-form-invalid-feedback v-if="!examPartNameValidation" id="input-live-feedback">
                                Hãy nhập tên part
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Thời gian hoàn thành (tính bằng giây)" label-for="exam-time">
                            <b-form-input type="number" v-model="examPartModalData.time" id="exam-time"
                                placeholder="Thời gian hoàn thành"></b-form-input>
                        </b-form-group>
                        <b-form-checkbox id="checkbox-1" class="mb-1" v-model="examPartModalData.status"
                            name="checkbox-1" value="1" unchecked-value="0">Xuất bản</b-form-checkbox>
                        <!-- <b-form-checkbox id="checkbox-2" v-model="examPartModalData.part_type" name="checkbox-2" value="1" unchecked-value="0">Dạng viết</b-form-checkbox> -->
                        <b-form-group class="mt-2" label="Yêu cầu của part" label-for="question-content">
                            <!-- <quill-editor id="question-content" v-model="examPartModalData.description" ref="myQuillEditor" toolbar="toolbar4" /> -->
                            <ckeditor id="question-content" @ready="onReady" :editor="editor"
                                v-model="examPartModalData.description" :config="editorConfig"></ckeditor>
                        </b-form-group>
                        <b-button class="mt-2" variant="primary" block @click="addExamPart()">XÁC NHẬN</b-button>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-modal>
        <b-modal ref="modal-edit-exampart" modal-class="modal-primary" centered hide-footer size="lg"
            title="Sửa thông tin part">
            <b-card-text>
                <b-row>
                    <b-col class="mb-1">
                        <b-form-group label="Tên part" label-for="exam-name">
                            <b-form-input v-model="examPartModalData.name" :state="examPartNameValidation"
                                id="exam-name" placeholder="Tên part"></b-form-input>
                            <b-form-invalid-feedback v-if="!examPartNameValidation" id="input-live-feedback">
                                Hãy nhập tên part
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Thời gian hoàn thành (tính bằng giây)" label-for="exam-time">
                            <b-form-input type="number" v-model="examPartModalData.time" id="exam-time"
                                placeholder="Thời gian hoàn thành"></b-form-input>
                        </b-form-group>
                        <b-form-checkbox id="checkbox-1" class="mb-1" v-model="examPartModalData.status"
                            name="checkbox-1" value="1" unchecked-value="0">Xuất bản</b-form-checkbox>
                        <!-- <b-form-checkbox id="checkbox-2" v-model="examPartModalData.part_type" name="checkbox-2"
                            value="1" unchecked-value="0">Dạng viết</b-form-checkbox> -->
                        <b-form-group class="mt-2" label="Yêu cầu của part" label-for="question-content">
                            <!-- <quill-editor id="question-content" v-model="examPartModalData.description" ref="myQuillEditor" toolbar="toolbar5"/> -->
                            <ckeditor id="question-content" @ready="onReady" :editor="editor"
                                v-model="examPartModalData.description" :config="editorConfig"></ckeditor>
                        </b-form-group>
                        <b-button class="mt-2" variant="primary" block @click="confirmEditExamPart()">XÁC
                            NHẬN</b-button>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-modal>
        <b-card>
            <b-card-text>
                <div class="d-flex justify-content-between mb-2">
                    <h4 class="card-title m-0">
                        {{ examInfo.name }}
                        <span class="badge mx-1"
                            :class="{ 'badge-success': examInfo.status == 1, 'badge-warning': examInfo.status == 0 }">{{
                                examInfo.status ? "Xuất bản" : "Ẩn"
                            }}</span>
                        <span class="badge badge-info">{{ classSelectText.text }}</span>
                        <span class="badge mx-1 badge-info">{{ subjectSelectText.text }}</span>
                        <!-- <span class="badge badge-info">{{ examInfo.level == 1 ? "Cho người đã học" : "Cho người chưa học" }}</span> -->

                    </h4>
                    <b-button class size="sm" variant="primary" @click="openModalExamEdit()">Sửa thông tin đề
                        thi</b-button>
                </div>
                <b-row>
                    <b-col cols="12">
                        <div class=" ql-editor" v-html="examInfo.description"></div>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-card>
        <div class="exam-part-block">
            <b-row v-if="examPart.length > 0" class="mb-2">
                <b-col class>
                    <b-button class="m-auto d-block" variant="primary" @click="openModalAddExamPart()">Thêm part
                        mới</b-button>
                </b-col>
            </b-row>
            <div class="exam-part-content" v-if="examPart.length > 0">
                <b-card v-for="examp in examPart" :key="examp.id">
                    <b-card-text>
                        <b-row>
                            <b-col>
                                <div class="d-flex justify-content-between mb-2">
                                    <h4 class="card-title m-0">
                                        {{ examp.name }}
                                        <span class="mx-1 badge"
                                            :class="{ 'badge-success': examp.status == 1, 'badge-warning': examp.status == 0 }">{{
                                                examp.status ? "Xuất bản" : "Ẩn"
                                            }}</span>
                                        <span class="badge badge badge-info">Time: {{
                                            secondToMinute(examp.time)
                                        }}</span>
                                    </h4>
                                    <div>
                                        <b-button class="" size="sm" variant="danger"
                                            @click="deletePart(examp.id)">Xóa</b-button>
                                        <b-button class="mx-1" size="sm" variant="primary"
                                            @click="openModalEditExam(examp.id)">Sửa part</b-button>
                                    </div>
                                </div>
                                <b-row>
                                    <b-col cols="12">
                                        <div class=" ql-editor" v-html="examp.description"></div>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>

                            <b-col>
                                <b-button v-if="examp.part_type == 0" class="mb-2" size="sm" variant="success"
                                    @click="openModalAddQuestion(examp.id)">Thêm câu hỏi</b-button>
                                <span v-if="examp.part_type == 1">Phần thi viết</span>
                                <draggable v-model="examp.questions" v-bind="dragOptions" :moved="listDrag(examp.id)"
                                    class="list-group list-group-flush cursor-move" tag="ul">
                                    <transition-group type="transition" name="flip-list">
                                        <b-list-group-item v-for="(listItem) in examp.questions" :key="listItem.id"
                                            tag="li">
                                            <div class="">
                                                <b-card-text
                                                    class="font-weight-bold mb-0 d-flex align-items-center justify-content-between">
                                                    <h4 class="card-title m-0">
                                                        #{{ listItem.id }}
                                                        <span
                                                            v-if="listItem.content_type == 1 && listItem.topic_type != 0"
                                                            class="badge mx-1 badge-info">{{
                                                                listItem.topic_type
                                                            }}</span>
                                                        <span
                                                            v-if="listItem.content_type == 1 && listItem.level_type != 0"
                                                            class="badge badge-info">{{ listItem.level_type }}</span>
                                                    </h4>
                                                    <div class="question-action">
                                                        <b-button class="mx-1" size="sm" variant="danger"
                                                            @click="deleteQuestion(listItem.id, examp.id)">Xóa</b-button>
                                                        <b-button size="sm" variant="primary"
                                                            @click="editItem(listItem.id, examp.id)">Sửa</b-button>
                                                    </div>
                                                </b-card-text>
                                                <div class="question-item" v-if="listItem.content_type == 1">
                                                    <!-- <span class="question-count">Question {{ countQuestion(index, examp.questions) }}</span> -->
                                                    <div class="question-content ql-editor" v-html="listItem.content">
                                                    </div>

                                                    <ul class="question-option">
                                                        <li v-for="(op, index) in listItem.option" :key="index">
                                                            <span class="option-badge"
                                                                :class="{ 'checked': op.right_answer }">{{
                                                                    indexToAlpha(index)
                                                                }}</span>
                                                            <!-- {{ op.content }} -->
                                                            <span v-html="op.content"></span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="question-item" v-if="listItem.content_type == 2">
                                                    <!-- <span class="question-count">Question {{ countQuestion(index, examp.questions) }}</span> -->
                                                    <div class="question-content ql-editor" v-html="listItem.content">
                                                    </div>
                                                    <ul class="question-option">
                                                        <li v-for="(op, index) in listItem.option" :key="index">
                                                            <span class="option-badge"
                                                                :class="{ 'checked': op.right_answer }">{{
                                                                    indexToAlpha(index)
                                                                }}</span>
                                                            {{ op.content }}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="question-item" v-if="listItem.content_type == 3">
                                                    <!-- <span class="question-count">Question {{ countQuestion(index, examp.questions) }}</span> -->
                                                    <div class="question-content ql-editor"
                                                        v-html="changeInputInQuestion(listItem.content, listItem.option)">
                                                    </div>
                                                </div>
                                                <div class="question-item"
                                                    v-if="listItem.content_type == 5 || listItem.content_type == 4">
                                                    <div class="question-content type-note ql-editor"
                                                        v-html="listItem.content"></div>
                                                </div>
                                            </div>
                                        </b-list-group-item>
                                    </transition-group>
                                </draggable>
                                <b-button v-if="examp.part_type == 0" class="mt-2" size="sm" variant="success"
                                    @click="openModalAddQuestion(examp.id)">Thêm câu hỏi</b-button>
                            </b-col>
                        </b-row>
                    </b-card-text>
                </b-card>
            </div>
            <b-row>
                <b-col class>
                    <b-button class="m-auto d-block" variant="primary" @click="openModalAddExamPart()">Thêm part
                        mới</b-button>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>

// eslint-disable-next-line
import "quill/dist/quill.core.css";
// eslint-disable-next-line
import "quill/dist/quill.snow.css";
// eslint-disable-next-line
import "quill/dist/quill.bubble.css";

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
    BListGroupItem,
    BFormInvalidFeedback,
    BAlert
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import draggable from 'vuedraggable'

import { quillRedefine } from '@/libs/quillRedefine'
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
import MathType from '@wiris/mathtype-ckeditor5/src/plugin';
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
        // quillEditor,
        ToastificationContent,
        draggable,
        BListGroupItem,
        BFormInvalidFeedback,
        BAlert,
        // QillEdit
    },
    data() {
        return {
            fields: [
                { label: "ID", key: "id" },
                { label: "STT", key: "index" },
                { label: "#", key: "position" },
                { label: "Question", key: "content" },
                { label: "Loại nội dung", key: "content_type" },
                { label: "Status", key: "status" },
                { label: "Action", key: "action" },
            ],
            typeOptions: [
                { value: null, text: 'Hãy chọn trình độ đề thi' },
                { value: 1, text: 'Cho người đã học' },
                { value: 2, text: 'Cho người chưa học' }
            ],
            classOptions: [
                { value: null, text: 'Hãy chọn Lớp' },
            ],
            subjectsOptions: [
                { value: null, text: 'Hãy chọn Môn' },
            ],
            examInfo: {},
            examPart: [],
            examPartModalData: {
                name: "",
                description: "",
                status: 1,
                time: 0,
                part_type: 0
            },
            examModalData: {
                name: "",
                description: "",
                // level: null,
                classid: null,
                subjectid: null,
                status: 1,
            },
            questionModalData: {
                content: "",
                option: [],
                content_type: 1,
                topic_type: 1,
                level_type: 1,
            },
            questionEditModalData: {
                content: "",
                option: [],
            },
            partidAddQuestion: -1,
            questionEdit: -1,
            questionTypeOption: [
                { value: 1, text: 'Dạng tích chọn' },
                // { value: 2, text: 'Dạng đúng/sai' },
                // { value: 3, text: 'Dạng điền từ vào chỗ trống' },
                { value: 4, text: 'Dạng tự luận' },
                { value: 5, text: 'Chú thích/Đề bài' },
            ],
            topicTypeOption: [
                { value: 0, text: 'Chọn chủ đề' },
                // { value: 1, text: 'Số tự nhiên' },
                // { value: 2, text: 'Phân Số' },
                // { value: 3, text: 'Đơn vị đo' },
                // { value: 4, text: 'Hình học' },
                // { value: 5, text: 'Giải toán' },
                // { value: 6, text: 'Biểu đồ' },
                // { value: 7, text: 'Dấu hiệu chia hết' },
                // { value: 8, text: 'Tự chủ tự học' },
                // { value: 9, text: 'Giao tiếp - tương tác' },
            ],
            levelTypeOption: [
                { value: 0, text: 'Chọn Cấp độ' },
                { value: 1, text: 'Trung bình - Khá' },
                { value: 2, text: 'Nâng Cao - Giỏi' }
            ],
            uploadUrl: `${Config.apiUrl}/uploads`,
            editorOption: {},
            listQuestionCopied: null,
            questionEditPartId: null,
            questionEditId: null,
            editor: ClassicEditor,
            editorConfig: {
                // mathTypeParameters: {
                //     serviceProviderProperties: {
                //         URI: 'http://mathtype.kola.vn/mathtype-integration-php/integration',
                //         server: 'php',
                //     },
                // },
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
                    MathType,
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
                    uploadUrl: `${Config.apiUrl}/uploads?type=ckeditor`,

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
        classSelectText() {
            return this.classOptions.find(el => el.value == this.examInfo.classid) || { text: '' }
        },
        subjectSelectText() {
            return this.subjectsOptions.find(el => el.value == this.examInfo.subjectid) || { text: '' }
        },
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        },
        examPartNameValidation() {
            if (this.examPartModalData.name !== '') {
                return true
            }
            return false
        },
        examNameValidation() {
            if (this.examModalData.name !== '') {
                return true
            }
            return false
        },
        // examLevelValidation() {
        //     if (this.examModalData.level !== null) {
        //         return true
        //     }
        //     return false
        // },
        examClassValidation() {
            if (this.examModalData.classid !== null) {
                return true
            }
            return false
        },
        examSubjectValidation() {
            if (this.examModalData.subjectid !== null) {
                return true
            }
            return false
        }
    },
    watch: {
        'questionModalData.content_type': {
            handler(value) {
                switch (value) {
                    case 1:
                        this.questionModalData.option = [
                            {
                                id: new Date().getTime(),
                                right_answer: false,
                                content: "",
                            },
                        ]
                        break;
                    case 2:
                        this.questionModalData.option = [
                            {
                                id: new Date().getTime(),
                                right_answer: false,
                                content: "True",
                            },
                            {
                                id: new Date().getTime() + 1,
                                right_answer: false,
                                content: "False",
                            },
                        ]
                        break;
                    case 3:
                        this.questionModalData.option = []
                        break;
                    default:
                        break;
                }
            },
            deep: true
        },
        'questionEditModalData.content_type': {
            handler(value) {
                const indexpart = this.examPart.findIndex(
                    (exp) => exp.id === this.questionEditPartId
                );
                const index = this.examPart[indexpart].questions.findIndex(
                    (q) => q.id === this.questionEditId
                );

                switch (value) {
                    case 1:
                        if (this.examPart[indexpart].questions[index].content_type === 1) {
                            this.questionEditModalData.option = this.examPart[indexpart].questions[index].option

                            // Fix cau hoi bi loi cau truc
                            for (let index = 0; index < this.questionEditModalData.option.length; index++) {

                                // Câu hỏi không có id
                                if (!this.questionEditModalData.option[index].id) {
                                    this.questionEditModalData.option[index].id = new Date().getTime() + index;
                                }
                            }
                        } else {
                            this.questionEditModalData.option = [
                                {
                                    id: new Date().getTime(),
                                    right_answer: false,
                                    content: "",
                                },
                            ]
                        }
                        break;
                    case 2:
                        if (this.examPart[indexpart].questions[index].content_type === 2) {
                            this.questionEditModalData.option = this.examPart[indexpart].questions[index].option
                        } else {
                            this.questionEditModalData.option = [
                                {
                                    id: new Date().getTime(),
                                    right_answer: false,
                                    content: "True",
                                },
                                {
                                    id: new Date().getTime() + 1,
                                    right_answer: false,
                                    content: "False",
                                },
                            ]
                        }
                        break;
                    case 3:

                        if (this.examPart[indexpart].questions[index].content_type === 3) {
                            this.questionEditModalData.option = this.examPart[indexpart].questions[index].option
                        } else {
                            this.questionEditModalData.option = [
                                {
                                    id: new Date().getTime(),
                                    right_answer: true,
                                    content: "",
                                },
                            ]
                        }
                        break;
                    default:
                        break;
                }
            },
            deep: true
        },
        examPart: {
            handler(newValue) {
                this.checkChangeDragList(newValue)
                // console.log(newValue, oldValue)
            },
            deep: true
        },
    },
    created() {
        const self = this
        this.$http.get("/get-class")
            .then((response) => {
                if (response.data.data.length > 0) {
                    response.data.data.forEach(function (value) {
                        if (value.status == 1) {
                            self.classOptions.push({ value: value.id, text: value.name })
                        }
                    })
                }
                this.examModalData.classid = null
            })
        this.$http.get("/get-subject")
            .then((response) => {
                if (response.data.data.length > 0) {
                    response.data.data.forEach(function (value) {
                        if (value.status == 1) {
                            self.subjectsOptions.push({ value: value.id, text: value.name })
                        }
                    })
                }
                this.examModalData.subjectid = null
            })
        this.$http.get("/get-topic-type")
            .then((response) => {
                if (response.data.data.length > 0) {
                    response.data.data.forEach(function (value) {
                        if (value.status == 1) {
                            self.topicTypeOption.push({ value: value.id, text: value.name })
                        }
                    })
                }
            })
        // modify the rich text editor image upload path
        this.editorOption = quillRedefine({
            uploadConfig: {
                action: this.uploadUrl,
                res: (response) => {
                    if (response.data.type === 'audio') {
                        const length = self.$refs.myQuillEditor.quill.getSelection().index
                    }
                    return Config.assetUrl + response.data.src
                },
                name: 'file'
            }
        })
        this.fetchExamInfo();
        this.fetchExamPart();
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
        changeInputInQuestion(text, option) {
            const regex = /\$/gi
            let result
            const indices = [];
            while ((result = regex.exec(text))) {
                indices.push(result.index);
            }
            for (let index = indices.length - 1; index >= 0; index--) {
                if (option[index]) {
                    text = `${text.substr(0, indices[index])}<input class="question-input" value="${option[index].content}"/>${text.substr(indices[index] + 1, text.length)}`
                }
            }
            // const answerText = `<input class="question-input" value="${option[0]}"/>`
            return text //.replace('$', answerText)
        },
        checkChangeDragList(value) {
            console.log(value)
            if (this.listQuestionCopied == null) {
                this.listQuestionCopied = JSON.parse(JSON.stringify(value))
                return
            }
            // Check part change
            let partIndex = 0
            for (let index = 0; index < value.length; index++) {
                if (value[index].questions) {
                    for (let index2 = 0; index2 < value[index].questions.length; index2++) {
                        // console.log(value[index].questions[index2].id, this.listQuestionCopied[index].questions[index2].id)
                        if (value[index].questions[index2].id == this.listQuestionCopied[index].questions[index2].id) {
                            partIndex = index
                            break;
                        }
                    }
                }
            }
            this.listQuestionCopied = JSON.parse(JSON.stringify(value))
            // console.log(partIndex)
            let questionPosition = []
            for (let index = 0; index < value[partIndex].questions.length; index++) {
                questionPosition.push(value[partIndex].questions[index].id)
            }

            this.$http
                .post("/update-position", {
                    part_id: value[partIndex].id,
                    question_position: questionPosition
                })
                .then((res) => {
                    console.log(res.data)
                })

        },
        listDrag(id) {
            // this.checkChangeDragList(this.examPart)
            // console.log(id, 'drag')
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
        indexToAlpha(index) {
            const alphaBet = 'ABCDEFGHIKLMN'
            return alphaBet.substr(index, 1)
        },
        examSave() {
            // if (!this.examNameValidation || !this.examLevelValidation) {
            if (!this.examNameValidation || !this.examClassValidation || !this.examSubjectValidation) {
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
                .post("/edit-exam", {
                    id: this.examModalData.id,
                    name: this.examModalData.name,
                    description: this.examModalData.description,
                    // level: this.examModalData.level,
                    classid: this.examModalData.classid,
                    subjectid: this.examModalData.subjectid,
                    status: this.examModalData.status
                })
                .then((res) => {
                    if (res.data.code === 1) {
                        this.examInfo = this.examModalData;
                        this.$refs["modal-examEdit"].hide();
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
                    } else {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Notification",
                                icon: "InfoIcon",
                                text: res.data.message,
                                variant: "danger",
                                position: "bottom-right",
                            },
                        });
                    }
                });
        },
        openModalExamEdit() {
            this.examModalData = JSON.parse(JSON.stringify(this.examInfo));
            this.$refs["modal-examEdit"].show();
        },
        secondToMinute(time) {
            const minute = parseInt(time / 60, 0) < 10 ? `0${parseInt(time / 60, 0)}` : parseInt(time / 60, 0)
            const secord = time % 60 < 10 ? `0${time % 60}` : time % 60
            return `${minute}:${secord}`
        },
        toPosition() {
            let position = 0
            for (let index = 0; index < this.examPart.length; index++) {
                for (let index2 = 0; index2 < this.examPart[index].length; index2++) {
                    // const element = examPart[index].questions[index2];
                    position++;
                }
            }

            return position
        },
        editQuestion() {
            const self = this
            console.log(this.questionEditModalData.option)
            this.$http.post('/edit-questions', {
                id: this.questionEdit,
                content: this.questionEditModalData.content,
                option: this.questionEditModalData.option,
                content_type: this.questionEditModalData.content_type,
                topic_type: this.questionEditModalData.topic_type,
                level_type: this.questionEditModalData.level_type,
                position: this.questionEditModalData.position,
            })
                .then(res => {
                    if (res.data.code === 1) {
                        const indexPart = self.examPart.findIndex(
                            (exp) => exp.id === self.partidAddQuestion
                        );
                        const indexQuestion = self.examPart[indexPart].questions.findIndex(
                            (qs) => qs.id === self.questionEdit
                        );

                        self.examPart[indexPart].questions[indexQuestion].content = res.data.data.question
                        self.examPart[indexPart].questions[indexQuestion].option = res.data.data.option
                        self.examPart[indexPart].questions[indexQuestion].content_type = res.data.data.content_type
                        self.examPart[indexPart].questions[indexQuestion].topic_type = res.data.data.topic_type
                        self.examPart[indexPart].questions[indexQuestion].level_type = res.data.data.level_type
                        self.examPart[indexPart].questions[indexQuestion].position = res.data.data.position
                        self.examPart[indexPart].questions.sort((a, b) => a.position - b.position);

                        self.$refs["modal-questionedit"].hide();
                        if (self.examPart[indexPart].questions[indexQuestion].content_type == 1 && self.examPart[indexPart].questions[indexQuestion].topic_type != 0) {
                            self.examPart[indexPart].questions[indexQuestion].topic_type = this.topicTypeOption.find(el => el.value == self.examPart[indexPart].questions[indexQuestion].topic_type).text
                        }
                         if (self.examPart[indexPart].questions[indexQuestion].content_type == 1 && self.examPart[indexPart].questions[indexQuestion].level_type != 0) {
                            self.examPart[indexPart].questions[indexQuestion].level_type = this.levelTypeOption.find(el => el.value == self.examPart[indexPart].questions[indexQuestion].level_type).text
                        }
                        console.log(self.examPart[indexPart].questions[indexQuestion])
                        this.$nextTick(() => {
                            window.MathJax.typesetPromise();
                        });
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
                    } else {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Notification",
                                icon: "InfoIcon",
                                text: res.data.message,
                                variant: "danger",
                                position: "bottom-right",
                            },
                        });
                    }
                })
        },
        editItem(questionid, partid) {
            this.questionEditId = questionid
            this.questionEditPartId = partid
            const indexpart = this.examPart.findIndex(
                (exp) => exp.id === partid
            );
            const index = this.examPart[indexpart].questions.findIndex(
                (q) => q.id === questionid
            );

            this.questionEditModalData = JSON.parse(JSON.stringify({
                id: questionid,
                content: this.examPart[indexpart].questions[index].content,
                position: this.examPart[indexpart].questions[index].position,
                option: this.examPart[indexpart].questions[index].option,
                content_type: this.examPart[indexpart].questions[index].content_type,
                topic_type: this.examPart[indexpart].questions[index].topic_type,
                level_type: this.examPart[indexpart].questions[index].level_type,
            }))

            if (this.questionEditModalData.content_type == 1 && this.questionEditModalData.topic_type != 0) {
                this.questionEditModalData.topic_type = this.topicTypeOption.find(el => el.text == this.questionEditModalData.topic_type).value
                this.questionEditModalData.level_type = this.levelTypeOption.find(el => el.text == this.questionEditModalData.level_type).value
            }

            if (this.questionEditModalData.content_type == 3) {

                const regex = /\$/gi
                let result
                const indices = [];
                while ((result = regex.exec(this.questionEditModalData.content))) {
                    indices.push(result.index);
                }
                for (let index = indices.length - 1; index >= 0; index--) {
                    if (this.questionEditModalData.option[index]) {
                        this.questionEditModalData.content = `${this.questionEditModalData.content.substr(0, indices[index])}\${${this.questionEditModalData.option[index].content}}${this.questionEditModalData.content.substr(indices[index] + 1, this.questionEditModalData.content.length)}`
                    }
                }
            }

            this.questionEdit = questionid
            this.partidAddQuestion = partid
            this.$refs["modal-questionedit"].show();

            console.log(this.questionEditModalData.option)
        },
        openModalEditExam(id) {
            const examPart = this.examPart.find((exp) => exp.id === id);
            this.examPartModalData.id = examPart.id
            this.examPartModalData.name = examPart.name
            this.examPartModalData.description = examPart.description
            this.examPartModalData.time = examPart.time
            this.examPartModalData.status = examPart.status
            this.examPartModalData.part_type = examPart.part_type
            this.$refs["modal-edit-exampart"].show();
        },
        deletePart(id) {
            const self = this
            this.$bvModal
                .msgBoxConfirm(
                    "Hành động này không hoàn tác được, bạn có xác nhận xóa part này ?",
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
                        self.$http.delete('/delete-exam-part', {
                            params: {
                                id,
                            },
                        })
                            .then(res => {
                                if (res.data.code === 1) {
                                    self.$toast({
                                        component: ToastificationContent,
                                        props: {
                                            title: "Notification",
                                            icon: "InfoIcon",
                                            text: "Thành công !",
                                            variant: "success",
                                            position: "bottom-right",
                                        },
                                    });
                                    const index = self.examPart.findIndex(
                                        (exp) => exp.id === id
                                    );
                                    self.examPart.splice(index, 1)
                                } else {
                                    this.$toast({
                                        component: ToastificationContent,
                                        props: {
                                            title: "Notification",
                                            icon: "InfoIcon",
                                            text: res.data.message,
                                            variant: "danger",
                                            position: "bottom-right",
                                        },
                                    });
                                }
                            })
                    }
                })
        },
        deleteQuestion(id, partid) {
            const self = this
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
                        self.$http.delete('/delete-questions', {
                            params: {
                                id,
                            },
                        })
                            .then(res => {
                                if (res.data.code === 1) {
                                    self.$toast({
                                        component: ToastificationContent,
                                        props: {
                                            title: "Notification",
                                            icon: "InfoIcon",
                                            text: "Thành công !",
                                            variant: "success",
                                            position: "bottom-right",
                                        },
                                    });

                                    const index = self.examPart.findIndex(
                                        (exp) => exp.id === partid
                                    );
                                    const questionIndex = self.examPart[index].questions.findIndex(qs => qs.id === id)
                                    self.examPart[index].questions.splice(questionIndex, 1)
                                } else {
                                    this.$toast({
                                        component: ToastificationContent,
                                        props: {
                                            title: "Notification",
                                            icon: "InfoIcon",
                                            text: res.data.message,
                                            variant: "danger",
                                            position: "bottom-right",
                                        },
                                    });
                                }
                            })
                    }
                })
        },
        addQuestion() {
            const self = this
            this.$http
                .post("/add-questions", {
                    content: this.questionModalData.content,
                    option: this.questionModalData.option,
                    content_type: this.questionModalData.content_type,
                    topic_type: this.questionModalData.topic_type,
                    level_type: this.questionModalData.level_type,
                    exam_part: this.partidAddQuestion,
                    exam_id: this.$route.params.id,
                })
                .then((res) => {
                    if (res.data.code === 1) {
                        const index = self.examPart.findIndex(
                            (exp) => exp.id === self.partidAddQuestion
                        );
                        
                        let level_type = 0;
                        let topic_type = 0;

                        if (res.data.data.topic_type != 0) {
                            topic_type = this.topicTypeOption.find(el => el.value == res.data.data.topic_type).text;
                        }
                        if (res.data.data.level_type != 0) {
                            level_type = this.levelTypeOption.find(el => el.value == res.data.data.level_type).text;
                        }
                        self.examPart[index].questions.push({
                            id: res.data.data.id,
                            content: res.data.data.question,
                            option: res.data.data.option,
                            status: res.data.data.status,
                            topic_type: topic_type,
                            level_type: level_type,
                            // level_type: res.data.data.level_type,
                            content_type: res.data.data.content_type,
                        });
                        
                        self.$refs["modal-addquestion"].hide();
                        this.$nextTick(() => {
                            window.MathJax.typesetPromise();
                        });
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
                    } else {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Notification",
                                icon: "InfoIcon",
                                text: res.data.message,
                                variant: "danger",
                                position: "bottom-right",
                            },
                        });
                    }
                });
        },
        addQARowEditPopup() {
            if (!this.questionEditModalData.option) {
                this.questionEditModalData.option = []
            }
            this.questionEditModalData.option.push({
                right_answer: false,
                content: '',
            })
        },
        addQARow() {
            const time = new Date();
            this.questionModalData.option.push({
                id: time.getTime(),
                right_answer: false,
                content: "",
            });
        },
        removeBlock(index) {
            this.questionModalData.option.splice(index, 1);
        },
        removeBlockEdit(index) {
            this.questionEditModalData.option.splice(index, 1);
        },
        openModalAddQuestion(parId) {
            this.questionModalData = {
                content: "",
                option: [],
                content_type: 1,
                topic_type: 0,
                level_type: 0,
            };
            this.partidAddQuestion = parId;
            this.$refs["modal-addquestion"].show();
        },
        openModalAddExamPart() {
            this.examPartModalData = {
                name: "",
                description: "",
                status: 1,
                time: 0,
                part_type: 0,
            };
            this.$refs["modal-primary"].show();
        },
        confirmEditExamPart() {
            const self = this;
            if (!this.examPartNameValidation) {
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
                .post("/edit-exam-part", {
                    id: this.examPartModalData.id,
                    name: this.examPartModalData.name,
                    description: this.examPartModalData.description,
                    status: this.examPartModalData.status,
                    time: this.examPartModalData.time,
                    part_type: this.examPartModalData.part_type,
                })
                .then((res) => {
                    if (res.data.code === 1) {
                        const partIndex = this.examPart.findIndex((exp) => exp.id === self.examPartModalData.id);
                        self.examPart[partIndex].name = self.examPartModalData.name
                        self.examPart[partIndex].description = self.examPartModalData.description
                        self.examPart[partIndex].status = self.examPartModalData.status
                        self.examPart[partIndex].time = self.examPartModalData.time
                        self.examPart[partIndex].part_type = self.examPartModalData.part_type
                        self.$refs["modal-edit-exampart"].hide();
                        this.$nextTick(() => {
                            window.MathJax.typesetPromise();
                        });
                        self.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Notification",
                                icon: "InfoIcon",
                                text: "Thành công",
                                variant: "success",
                                position: "bottom-right",
                            },
                        });
                    } else {
                        self.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Notification",
                                icon: "InfoIcon",
                                text: res.data.message,
                                variant: "danger",
                                position: "bottom-right",
                            },
                        });
                    }
                });
        },
        addExamPart() {
            if (!this.examPartNameValidation) {
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
                .post("/create-exam-part", {
                    exam_id: this.$route.params.id,
                    name: this.examPartModalData.name,
                    description: this.examPartModalData.description,
                    status: this.examPartModalData.status,
                    time: this.examPartModalData.time,
                    part_type: this.examPartModalData.part_type,
                })
                .then((res) => {
                    if (res.data.code === 1) {
                        this.examPart.push(res.data.data);
                        this.$refs["modal-primary"].hide();
                        this.$nextTick(() => {
                            window.MathJax.typesetPromise();
                        });
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
                    } else {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Notification",
                                icon: "InfoIcon",
                                text: res.data.message,
                                variant: "danger",
                                position: "bottom-right",
                            },
                        });
                    }
                });
        },
        fetchExamInfo() {
            this.$http
                .get("/get-exam-admin", {
                    params: {
                        id: this.$route.params.id,
                    },
                })
                .then((res) => {
                    if (res.data.code === 1) {
                        this.examInfo = res.data.data;
                    }
                });
        },
        fetchExamPart() {
            this.$http
                .get("/get-exam-part", {
                    params: {
                        id: this.$route.params.id,
                    },
                })
                .then((res) => {
                    if (res.data.code === 1) {
                        this.examPart = res.data.data;
                        for (let index = 0; index < this.examPart.length; index++) {
                            for (let index1 = 0; index1 < this.examPart[index].questions.length; index1++) {
                                if (this.examPart[index].questions[index1].topic_type != 0) {
                                    this.examPart[index].questions[index1].topic_type = this.topicTypeOption.find(el => el.value == this.examPart[index].questions[index1].topic_type).text
                                    // this.examPart[index].questions[index1].level_type = this.levelTypeOption.find(el => el.value == this.examPart[index].questions[index1].level_type).text
                                }
                                 if (this.examPart[index].questions[index1].level_type != 0) {
                                    this.examPart[index].questions[index1].level_type = this.levelTypeOption.find(el => el.value == this.examPart[index].questions[index1].level_type).text
                                }
                                
                            }
                        }
                        console.log(this.examPart, 'this.examPart')
                        this.$nextTick(() => {
                            window.MathJax.typesetPromise();
                        });
                    }
                });
        },
    },
};
</script>

<style>
.ql-editor .h6,
.ql-editor h6 {
    font-size: 1rem !important;
}

.ql-editor .h5,
.ql-editor h5 {
    font-size: 1.25rem !important;
}

.ql-editor .h4,
.ql-editor h4 {
    font-size: 1.5rem !important;
}

.ql-editor .h3,
.ql-editor h3 {
    font-size: 1.75rem !important;
}

.ql-editor .h2,
.ql-editor h2 {
    font-size: 2rem !important;
}

.ql-editor .h1,
.ql-editor h1 {
    font-size: 2.5rem !important;
}

.answer-remove-button {
    border: none;
    background-color: #ff4949;
    color: #fff;
    border-radius: 5px;
}

.question-content img {
    max-height: 300px;
    max-width: 100%;
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

ul.question-option {
    list-style: none;
    padding: 0;
    width: max-content;
}

ul.question-option li {
    padding: 5px 10px;
    background-color: #e1ebf3;
    color: #12508f !important;
    font-weight: 500;
    border-radius: 10px;
    margin-bottom: 5px;
    display: flex
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

input.question-input {
    border: 1px solid #12508f;
    border-radius: 22px;
    padding: 4px 20px;
}

audio.voice {
    margin: auto;
    display: inherit;
}
</style>
