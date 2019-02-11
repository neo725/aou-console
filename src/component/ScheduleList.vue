<template>
    <div class="box-container">
        <div class="box" v-if="!isAddScheduleVisible">
            <div class="box-header">
                <div class="box-title">
                    <a class="btn btn-app" v-on:click="isAddScheduleVisible = true">
                        <i class="fa fa-plus"></i> New
                    </a>
                </div>
                <div class="box-tools">
                    <div class="input-group input-group-sm" style="width: 150px;">
                        <input type="text" name="table_search" class="form-control pull-right" placeholder="Search">

                        <div class="input-group-btn">
                            <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body table-responsive no-padding">
                <loading v-if="isLoading" />
                <table class="table table-hover" v-if="!isLoading">
                    <tbody>
                        <tr>
                            <th v-show="false">ID</th>
                            <th style="width: 35%">Title</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th style="width: 25%">Note</th>
                        </tr>
                        <tr v-for="schedule in orderedList" :key="schedule.id">
                            <td v-show="false">{{ schedule.id }}</td>
                            <td>{{ schedule.title }}</td>
                            <td class="text-date">
                                <div class="label">{{ schedule.start }}</div>
                                <div class="text"
                                     v-show="schedule.is_duration"> ~ </div>
                                <div class="label" 
                                     v-show="schedule.is_duration">{{ schedule.end }}</div></td>
                            <td>
                                <span class="label label-success"
                                      v-if="schedule.status == 'running'">Running</span>
                                <span class="label bg-gray"
                                      v-if="schedule.status == 'expired'">Expired</span>
                                <span class="label label-primary"
                                      v-if="schedule.status == 'not-begin'">Not yet</span>
                            </td>
                            <td>{{ schedule.note }}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <!-- /.box-body -->
        </div>
        <!-- /.box -->
        <add-schedule v-if="isAddScheduleVisible" @cancel="isAddScheduleVisible = false" />
    </div>
</template>
<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    import AddSchedule from './form/AddSchedule.vue'
    import momentUtil from '~/moment-util.js'
    import _ from 'lodash'

    var isSameDate = (schedule) => {
        return schedule.start == schedule.end
    }

    var getStatus = (schedule) => {
        return momentUtil.getDateStatus(schedule.start, schedule.end)
    }

    export default {

        data() {
            return {
                isLoading: false,
                isAddScheduleVisible: false,
            }
        },
        // created() {

        // },
        mounted() {
            this.getSchedules({
                'before': () => {
                    this.isLoading = true

                },
                "done": (schedules) => {
                    this.isLoading = false
                }
            })
        },

        methods: {
            // 如果 .babelrs 的 presets 中沒有 stage-2
            // 會發生這樣的錯誤
            // ...mapGetters(['todos'])
            // SyntaxError: Unexpected token
            // 參考 :
            // Syntax error: using spread operator with vuejs
            // https://github.com/vuejs/vue-loader/issues/663
            ...mapActions(['getSchedules']),

            prepareSchedule: (schedule) => {
                schedule.is_duration =
                    isSameDate(schedule) == false

                schedule.status = getStatus(schedule)

                // sort priority
                // running first, then not start, then expired
                schedule.sort = 0
                switch (schedule.status) {
                    case 'running':
                        schedule.sort = 0
                        break
                    case 'not-begin':
                        schedule.sort = 100
                        break
                    case 'expired':
                        schedule.sort = 1000
                        break
                }

                return schedule
            },

        },

        computed: {
            ...mapGetters(['Schedules']),

            normalizedList () {
                //return this.Schedules.map((elm) => this.prepareSchedule(elm))
                let _list =
                    this.Schedules.map((elm) => this.prepareSchedule(elm))

                return _list
            },

            orderedList () {
                return this.normalizedList.sort((a, b) => a.sort - b.sort)
            }
        },

        components: {
            'AddSchedule': AddSchedule,
        },
    }
</script>