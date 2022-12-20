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
                        <!-- <b-form-group label="Số điện thoại" label-for="v-to-phone">
                            <b-form-input v-model="phone" placeholder="Số điện thoại" id="v-to-phone" />
                        </b-form-group> -->
                    </b-col>
                    <b-col md="3">
                        <!-- <b-form-group label="Số điện thoại" label-for="v-to-email">
                            <b-form-input v-model="email" placeholder="Email" id="v-to-email" />
                        </b-form-group> -->
                    </b-col>
                    <b-col md="3">
                        <!-- <b-form-group label="-">
                            <download-excel class="btn w-100 mr-1 btn-success" :fetch="fetchDataExport">
                                Export Excel
                            </download-excel>
                        </b-form-group> -->
                    </b-col>
                    <b-col md="3">
                        <b-form-group >
                            <b-button @click="filterData" type="submit" variant="primary" class="w-100 mr-1">LỌC</b-button>
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
                        <!-- <download-excel class="btn w-100 mr-1 btn-success" fetch="fetchDataExport(true)">
                            Export Excel
                        </download-excel> -->
                    </b-col>
                    <!-- <b-col md="4"><span class="float-right">Số lượng: <strong>{{ totalRows }}</strong></span></b-col> -->
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <div class="table-responsive">
                        <table class="table b-table table-striped table-hover">
                            <thead >
                                <tr >
                                    <th> Ca</th>
                                    <th  v-for="month1  in montharr">
                                        {{ month1 }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="val in distinceData">
                                    <tr>
                                        <td>Ca {{ val }}</td>
                                        <td v-for="month2 in montharr">
                                            {{ getValue(month2, val) }}
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        </div>
                    </b-col>
                </b-row>
                <!-- <b-row>
                    <b-col cols="12">
                        <b-table striped hover responsive :items="rows" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="filter">
                            <template #cell(tick_status)="data">{{ 'Ca ' + data.value }}</template>
                            <template #cell(status)="data">{{ data.value == 1 ? 'Đã hoàn thành' : 'Chưa hoàn thành' }}</template>
                            <template #cell(test_id)="data">
                                <router-link v-if="data.value" :to="'/t/'+data.item.test_id">Chi tiết</router-link>
                            </template>
                            <template #cell(created_at)="data">{{ dateToTimeString(data.value) }}<br>{{ dateToDateString(data.value) }}</template>
                        </b-table>
                    </b-col>
                </b-row> -->
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
        this.filterData();
        // this.fetchUtmSource()
    },
    data() {
        return {
            classSelected: null,
            classOptions: [{ value: null, text: 'Lớp' },],
            subjectSelected: null,
            subjectsOptions: [{ value: null, text: 'Môn' },],
            phone: '',
            email: '',
            source: '',
            currentPage: 1,
            totalRows: 0,
            perPage: 50,
            filter: null,
            sortDirection: "asc",
            sortBy: "",
            date_from: this.dateToDateString(new Date()),
            date_to: this.dateToDateString(new Date()),
            sortDesc: false,
            rows: [],
            fields: [
                { label: "Số ca", key: "tick_status" },
                { label: "Số bài thi", key: "total" },
            ],
            distinceData: [1, 2, 3, 4, 5, 6],
            montharr:[],
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
                this.filterData();
            },
            deep: true,
        },
    },
    methods: {
        getValue(month, ca) {
            let num_test = 0
            let val = this.rows.filter( e => {
                return e.month == month && e.tick_status == ca
            })
            
            if(val.length > 0) {
                num_test = val[0].total
            }
            
            return num_test
            
        },
        async filterData() {
            const data = await this.fetchData()
            this.rows = data.data.data;
            this.montharr = data.data.array_months
            
        },
        async fetchData(exportData = false) {
            return this.$http
                .get("/report/product-report", {
                    params: {
                        page: this.currentPage,
                        date_start: this.date_from,
                        date_end: this.date_to,
                        classid: this.classSelected,
                        subjectid: this.subjectSelected,
                        export_data: exportData
                    },
                })
        },
        async fetchDataExport() {
            const data = await this.fetchData(true)
            return data.data.data
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
