<template>
    <div class="box box-primary" :class="{ 'box-danger': $v.$invalid && submitStatus }">
        <div class="box-header with-border">
            <h3 class="box-title">Add new schedule for AOU</h3>
        </div>
        <!-- /.box-header -->
        <!-- form start -->
        <form role="form" @submit.prevent="onSubmit">
            <div class="box-body">
                <div class="form-group" :class="{ 'has-error': $v.form.title.$invalid && submitStatus }">
                    <label for="inputTitle">Title</label>
                    <input type="text" class="form-control" id="inputTitle" name="inputTitle" v-model="form.title">
                    <span class="help-block" v-show="!$v.form.title.required && submitStatus">Title can't be empty.</span>
                </div>
                <div class="form-group">
                    <label for="inputDate">Date range</label>
                    <div class="form-horizontal">
                        <div class="row-2 form-group" :class="{ 'has-error': $v.form.start.$invalid && submitStatus }">
                            <label for="inputDate" class="col-sm-2 control-label">from</label>
                            <div class="col-sm-10">
                                <date-picker id="inputDate" v-model="form.start" :config="options" class="date-picker"></date-picker>
                            </div>
                        </div>
                        <div class="row-2 form-group" :class="{ 'has-error': $v.form.end.$invalid && submitStatus }">
                            <label for="inputDateEnd" class="col-sm-2 control-label">to</label>
                            <div class="col-sm-10">
                                <date-picker id="inputDateEnd" v-model="form.end" :config="options" :compare-to="form.start" class="date-picker"></date-picker>
                                <span class="help-block" v-show="!$v.form.end.GreaterThenStart && submitStatus">End must be equal or larger then start.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group" :class="{ 'has-error': $v.form.link.$invalid && submitStatus }">
                    <label for="inputNote">Link</label>
                    <input type="text" class="form-control" id="inputLink" v-model="form.link">
                    <span class="help-block" v-show="!$v.form.link.required && submitStatus">Link can't be empty.</span>
                    <span class="help-block" v-show="!$v.form.link.url && submitStatus">Link looks not like a url.</span>
                </div>
                <div class="form-group">
                    <label for="inputNote">Note</label>
                    <span class="label text-tips">Just display in admin console for memo</span>
                    <input type="text" class="form-control" id="inputNote" v-model="form.note">
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" v-model="continueNextCreate"> After added, continue to create next new schedule
                    </label>
                </div>
            </div>
            <!-- /.box-body -->

            <div class="box-footer">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn" @click="$emit('cancel')">Cancel</button>
            </div>
        </form>
    </div>
</template>
<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    import {
        validationMixin
    } from "vuelidate"
    import {
        required,
        minLength,
        url,
        between,
    } from "vuelidate/lib/validators"
    import Validators from './validators'
    import Swal from 'sweetalert2'

    const Toast = Swal.mixin({
        // toast: true,
        // position: 'top-end',
        type: 'error',
        showConfirmButton: true,
        // timer: 3000
    });

    export default {
        data() {
            return {
                submitStatus: null,
                continueNextCreate: false,
                form: {
                    start: new Date(),
                    end: new Date(),
                },
                options: {
                    format: 'YYYY/M/D',
                    useCurrent: true,
                }
            }
        },

        mounted() {

        },

        methods: {
            ...mapActions(['addSchedule']),

            'onSubmit': function() {
                console.log('submitted !')

                this.$v.$touch()

                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                    Toast.fire({
                        type: 'error',
                        text: 'There has validation errors, please confirm and fix it.'
                    })
                } else {
                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500)

                    let args = {
                        'data': this.form,
                        'before': () => {
                            this.isLoading = true

                        },
                        "done": (schedules) => {
                            this.isLoading = false
                        }
                    }

                    this.addSchedule(args)
                        .then(() => {
                            this.$emit('cancel')
                        })
                        .catch()
                }
            }
        },

        mixins: [
            validationMixin
        ],

        validations: {
            form: {
                title: {
                    required
                },
                start: {
                    required,
                    isDate: Validators.isDate()
                },
                end: {
                    required,
                    isDate: Validators.isDate(),
                    GreaterThenStart: Validators.GreaterThenValidator()
                },
                link: {
                    required,
                    url
                },
            }
        }
    }
</script>