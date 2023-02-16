<template>
    <div>
        <b-card>
            <b-card-text>
                <b-row>
                    <b-col md="4">
                        <b-form-group label="Từ ngày" label-for="v-form-dateform">
                            <b-form-datepicker local="vi" placeholder="Từ ngày" v-model="date_from" class="mb-1" selected-variant="primary" id="v-form-dateform" />
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group label="Đến ngày" label-for="v-to-dateto">
                            <b-form-datepicker local="vi" placeholder="Đến ngày" v-model="date_to" class="mb-1" selected-variant="primary" id="v-to-dateto" />
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group  label="Lớp" class="mb-4"  ref="class"  label-for="input-3">
                                <b-form-select id="input-3" :options="classOptions" v-model="classSelected"  ></b-form-select>
                        </b-form-group>
                    </b-col>
                    <!-- <b-col md="3"> -->
                        <!-- <b-form-group  label="Môn" class="mb-4"  ref="class"  label-for="input-3">
                                <b-form-select id="input-3" :options="subjectsOptions" v-model="subjectSelected"  ></b-form-select>
                        </b-form-group> -->
                    <!-- </b-col> -->
                    <b-col md="4">
                        <b-form-group  label="Môn" class="mb-4"  ref="class"  label-for="input-3">
                                <b-form-select id="input-3" :options="subjectsOptions" v-model="subjectSelected"  ></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                         <b-form-group  label="Giáo viên" class="mb-4"  ref="class"  label-for="input-3">
                                <b-form-select id="input-3" :options="teachersOptions" v-model="teacherSelected"  ></b-form-select>
                        </b-form-group>
                    </b-col>
                    <!-- <b-col md="3">
                        <b-form-group label="-">
                            <download-excel class="btn w-100 mr-1 btn-success" :fetch="fetchDataExport">
                                Export Excel
                            </download-excel>
                        </b-form-group>
                    </b-col> -->
                    <b-col md="4">
                        <b-form-group label="-">
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
                                    <th> Tên Giáo Viên</th>
                                    <th  v-for="month  in montharr">
                                        Tháng {{ month }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="val in distinceData">
                                    <tr>
                                        <td>
                                            {{ val.name }}
                                        </td>
                                        <td v-for="room in val.examAmount">
                                            {{ room }}
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
        this.$http.get("/report/teacher-report")
        .then((response) => {
            if (response.data.data.length > 0 ) {
                response.data.data.forEach(function (value) {
                    self.teachersOptions.push({ value: value.updated_by, text: value.name })
                })
            }
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
            teacherSelected: null,
            teachersOptions: [{ value: null, text: 'Giáo viên' },],
            phone: '',
            email: '',
            source: '',
            currentPage: 1,
            totalRows: 0,
            perPage: 50,
            filter: null,
            sortDirection: "asc",
            sortBy: "",
            date_from: this.dateToDateString(new Date(new Date().getFullYear(), 0, 1)),
            date_to: this.dateToDateString(new Date()),
            sortDesc: false,
            rows: [],
            // fields: [
            //     { label: "Tên giáo viên", key: "name" },
            //     { label: "Số bài thi", key: "total" },
            // ],
            distinceData: {},
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
        async filterData() {
            const data = await this.fetchData()
            this.rows = data.data.data;

            const monthFrom = new Date(this.date_from)
            const monthTo = new Date(this.date_to)
            const monthLength = monthTo.getMonth() - monthFrom.getMonth()
            for (let index = 0; index < this.rows.length; index++) {
                this.distinceData[this.rows[index].updated_by] = this.rows[index]
            }

            Object.keys(this.distinceData).forEach((key) => {
                let monthDataTemp = {}
                for (let index = 0; index < monthLength + 1; index++) {
                    const month = monthFrom.getMonth() + index + 1

                    monthDataTemp[month] = 0
                    const findData = this.rows.find(el => (el.updated_by == key && el.month == month))
                    if (findData) {
                        monthDataTemp[month] = findData.total
                    }
                    if(!this.montharr.find(el => el == month)){
                        this.montharr.push(month)
                    }
                    
                }
                this.distinceData[key].examAmount = monthDataTemp
            })
            this.montharr.sort(function(a, b) {
                return a - b;
            });        
            console.log(this.distinceData)
            console.log(this.montharr,'this.montharr')
            // this.totalRows = data.data.data.total;
            // this.perPage = data.data.data.perPage;
        },
        async fetchData(exportData = false) {
            return this.$http
                .get("/report/teacher-report", {
                    params: {
                        page: this.currentPage,
                        date_start: this.date_from,
                        date_end: this.date_to,
                        classid: this.classSelected,
                        subjectid: this.subjectSelected,
                        teacherid: this.teacherSelected,
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
