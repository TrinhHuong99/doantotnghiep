<template>
    <div>
        <b-card>
            <b-card-text>
                <b-row>
                    <b-col md="3">
                        <b-form-group label="Từ ngày" label-for="v-form-dateform">
                            <b-form-datepicker local="vi" placeholder="Từ ngày" v-model="date_from" class="mb-1" selected-variant="primary" id="v-form-dateform" />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="Đến ngày" label-for="v-to-dateto">
                            <b-form-datepicker local="vi" placeholder="Đến ngày" v-model="date_to" class="mb-1" selected-variant="primary" id="v-to-dateto" />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="Email" label-for="v-to-email">
                            <b-form-input v-model="emailFilter" placeholder="Email" id="v-to-email" />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="Số điện thoại" label-for="v-to-phone">
                            <b-form-input v-model="phoneFilter" id="v-to-phone" placeholder="Số điện thoại" />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="3">
                        <b-form-group label="Họ Tên" label-for="v-to-name">
                            <b-form-input v-model="nameFilter" placeholder="Tên" id="v-to-name" />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group  label="Lớp" class="mb-4"  ref="class"  label-for="input-3">
                                <b-form-select id="input-3" :options="classOptions" v-model="classSelected"  ></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group  label="Môn" class="mb-4"  ref="class"  label-for="input-3">
                                <b-form-select id="input-3" :options="subjectsOptions" v-model="subjectSelected"  ></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group  label="Đánh giá" class="mb-4"  ref="class"  label-for="input-3">
                            <b-form-select id="input-3" :options="updateStatusOptions" v-model="updateStatusChoose"  ></b-form-select>
                        </b-form-group>
                    </b-col>
                  
                </b-row>
                <b-row>
                    <b-col md="6">

                    </b-col>
                    <b-col md="3">
                        <!-- <b-form-group>
                            <download-excel class="btn w-100 mr-1 btn-success" :fetch="exportExcel">
                                Export Excel
                            </download-excel>
                        </b-form-group> -->
                    </b-col>
                    <b-col md="3">
                        <b-form-group >
                            <b-button @click="fetchContact" type="submit" variant="primary" class="w-100 mr-1">LỌC</b-button>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-card>
        <b-card>
            <b-card-text>
                <b-row>
                    <b-col md="6">
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" first-number last-number class="pagination-success">
                            <template #prev-text>
                                <feather-icon size="18" icon="ChevronLeftIcon" />
                            </template>
                            <template #next-text>
                                <feather-icon size="18" icon="ChevronRightIcon" />
                            </template>
                        </b-pagination>
                    </b-col>
                    <b-col md="2">
                        <!-- <download-excel class="btn w-100 mr-1 btn-success" :data="rows">
                            Export Excel
                        </download-excel> -->
                    </b-col>
                    <b-col md="4"><span class="float-right">Số lượng: <strong>{{ totalRows }}</strong></span></b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-table striped hover responsive :items="rows" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="filter">
                            <template #cell(mark_status)="data">{{ data.value == 1 ? 'Done' : 'Pending' }}</template>
                            <template #cell(test_id)="data">
                                <router-link v-if="data.value" :to="'/t/'+data.item.test_id">Chi tiết</router-link>
                            </template>
                            <template #cell(file_upload)="data">
                                <!-- <router-link v-if="data.value" :to="'/t/'+data.item.test_id">Chi tiết</router-link> -->
                                <div v-if="data.value"><a :href="data.value">Chi tiết </a></div>
                            </template>
                            <template #cell(created_at)="data">{{ dateToTimeString(data.value) }}<br>{{ dateToDateString(data.value) }}</template>
                            <template #cell(updated_at)="data">{{ dateToTimeString(data.value) }}<br>{{ dateToDateString(data.value) }}</template>
                        </b-table>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" first-number last-number class="pagination-success">
                            <template #prev-text>
                                <feather-icon size="18" icon="ChevronLeftIcon" />
                            </template>
                            <template #next-text>
                                <feather-icon size="18" icon="ChevronRightIcon" />
                            </template>
                        </b-pagination>
                    </b-col>
                </b-row>
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
} from "bootstrap-vue";

export default {
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
            this.classSelected = null
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
            this.subjectSelected = null
        })
        this.fetchContact();
    },
    data() {
        return {
            updateStatusChoose: null,
            updateStatusOptions: [
                { value: null, text: "Tất cả" },
                { value: "1", text: "Done" },
                { value: "0", text: "Pending" },
            ],
            testStatus: null,
            testOptions: [
                { value: null, text: "Tất cả" },
                { value: "1", text: "Đã làm bài thi" },
                { value: "2", text: "Chưa làm bài thi" },
            ],
            classSelected: null,
            classOptions: [{ value: null, text: 'Lớp' },],
            subjectSelected: null,
            subjectsOptions: [{ value: null, text: 'Môn' },],
            phoneFilter: '',
            ageFilter: '',
            emailFilter: '',
            nameFilter: '',
            currentPage: 1,
            totalRows: 0,
            perPage: 1,
            filter: null,
            sortDirection: "asc",
            sortBy: "",
            date_from: '',
            date_to: '',
            sortDesc: false,
            rows: [],
            fields: [
                { label: "Họ tên", key: "name" },
                { label: "Số điện thoại", key: "phone" },
                // { label: "Đã học IELTS", key: "learned" },
                { label: "Bài làm", key: "test_id" },
                { label: "Ngày ghi nhận", key: "created_at" },
                { label: "File đánh giá", key: "file_upload" },
                { label: "Ngày đánh giá", key: "updated_at" },
                { label: "Đánh giá", key: "mark_status" },
                { label: "Người thực hiện", key: "update_by" },
            ],
        };
    },
    components: {
        BRow,
        BCol,
        BTable,
        BCard,
        BCardText,
        BPagination,
        BFormGroup,
        BFormDatepicker,
        BFormSelect,
        BButton,
        BFormInput
    },
    watch: {
        currentPage: {
            handler() {
                this.fetchContact();
            },
            deep: true,
        },
    },
    methods: {
        async exportExcel() {
            const response = await this.fetchDataExport()
            return response.data.data;
        },
        async fetchDataExport() {
            return this.$http
                .get("/report/test-result", {
                    params: {
                        start: this.date_from,
                        end: this.date_to,
                        email: this.emailFilter,
                        phone: this.phoneFilter,
                    },
                })
        },
        onClick(fileName) {
            this.$http
                .get("/download/"+ fileName , {
                    responseType: 'blob',
                })
                .then((response) => {
                    console.log(response)
                     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                     var fileLink = document.createElement('a');
                     fileLink.href = fileURL;
                     fileLink.setAttribute('download', fileName);
                     document.body.appendChild(fileLink);
                     fileLink.click();
                });
        },
        fetchContact() {
            this.$http
                .get("/test-history", {
                    params: {
                        page: this.currentPage,
                        start: this.date_from,
                        end: this.date_to,
                        email: this.emailFilter,
                        phone: this.phoneFilter,
                        classid: this.classSelected,
                        subjectid: this.subjectSelected,
                        name: this.nameFilter,
                        mark_status: this.updateStatusChoose
                    },
                })
                .then((resp) => {
                    this.rows = resp.data.data.data;
                    this.totalRows = resp.data.data.total;
                    this.perPage = resp.data.data.perPage;
                });
        },
        dateToDateString(dateText) {
            const date = new Date(dateText)
            return `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
        },
        dateToTimeString(dateText) {
            const date = new Date(dateText)
            return `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()} : ${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
        },
    },
};
</script>

<style>
</style>
