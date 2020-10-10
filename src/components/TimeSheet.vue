<template>
<div>
    <h5>TimeSheet for Teams</h5>
    <select size="xs" class="mt-12 form-control" @change="onChangeTeam($event)" placeholder="Select Team">
        <option value="0" disabled selected>Select Your Team</option>
        <option v-for="idx in teams1" :key="idx.id" v-bind:value="idx.id">
            {{idx.name}}
        </option>
    </select>
    <select size="xs" class="mt-12 form-control" @change="onPopulateTable($event)" placeholder="Select Class">
        <option disabled selected>Select Assigned Class</option>
        <option v-for="idx in classes" :key="idx.id" v-bind:value="idx.id">
            {{idx.name}}
        </option>
    </select>

    <div class="hello table-responsive">
        <div class="card-header">
            <i class="fas fa-table mr-1"></i>
            Team Record
        </div>
        <table id="firstTable" class="table table-bordered" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th>Group</th>
                    <th>Package</th>
                    <th>Class</th>
                    <th># Of Lines</th>
                    <th>From Line</th>
                    <th>To Line</th>
                    <th>Date</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="row in data" v-bind:key="'id-'+row[0]+'-'+row[5]" :id="'id-'+row[1]+'-'+row[5]">
                    <td>{{row[2]}}</td>
                    <td>{{row[4]}}</td>
                    <td>{{row[6]}}</td>
                    <td>{{row[7]}}</td>

                    <td v-if="row[10]==null"><input /></td>
                    <td else>{{row[10]}}</td>
                    <td v-if="row[11]==null"><input /></td>
                    <td v-else>{{row[11]}}</td>
                    <td>{{new Date().toLocaleString()}}</td>
                </tr>
            </tbody>

        </table>
    </div>

    <b-form v-if="show">
        <div class="row">
            <div class="col-xs-12">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            <div class="title">Today Data</div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="form-group col-md-2">
                                <label class="capitalize" for="emp_Name">Group</label>
                                <input id="emp_name" name="emp_name" type="text" class="form-control input1" :value="grouparr[0][0]" placeholder="Group name" disabled>
                                <span class="help-block hidden"></span>
                            </div>
                            <div class="form-group col-md-3">
                                <label class="capitalize" for="empNo">Package</label>
                                <input id="emp_no" name="empNo" type="text" class="form-control input1" :value="grouparr[0][2]" placeholder="Package" disabled>
                                <span class="help-block hidden"></span>
                            </div>
                            <div class="form-group col-md-3">
                                <label class="capitalize" for="cnic">Class</label>
                                <input id="cnic" name="cnic" type="text" class="form-control input1" :value="grouparr[0][4]" placeholder="Class" disabled>
                                <span class="help-block hidden"></span>
                            </div>
                            <div class="form-group col-md-2">
                                <label class="capitalize" for="dob">From Lines</label>
                                <input id="fromlines" name="dob" type="text" class="form-control input1" placeholder="Enter From Line">
                                <span class="help-block hidden"></span>
                            </div>
                            <div class="form-group col-md-2">
                                <label class="capitalize" for="dob">To Lines</label>
                                <input id="tolines" name="dob" type="text" class="form-control input1" placeholder="Enter To Line">
                                <span class="help-block hidden"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-2">
                                <label class="capitalize" for="dob">Date</label>
                                <input id="date" name="date" type="text" class="form-control input1" :value="new Date().toLocaleString()" disabled>
                                <span class="help-block hidden"></span>
                            </div>
                            <div class="form-group col-md-2">
                                <label class="capitalize" for="dob">Team</label>
                                <input id="team" name="team" type="text" class="form-control input1" :value="teamname" disabled>
                                <span class="help-block hidden"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 pull-right">
                            <button id="createEmployeeButton" v-bind:onclick="callSave()" class="btn btn-primary btn-block">Save</button>
                        </div>
                        <div class="col-md-6 pull-right">
                            <button id="cancelButton" class="btn btn-warning btn-block">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </b-form>
</div>
</template>

<script>
import axio from "axios"

export default {

    mounted() {
        axio.get("http://10.10.1.109:8080/team/").then(response => (
            this.teams1 = response.data

        ));

    },
    methods: {
        callSave() {

        },
        getClasses() {
            axio.get("http://10.10.1.109:8080/classes/tid/" + this.teamid + "/assigned").then(response => (
                this.classes = response.data

            ))
        },
        getTeamSheetRecordById() {
            axio.get("http://10.10.1.109:8080/getTeamRecord/" + this.teamid + "/cid/" + this.classid).then(response => (
                this.data = response.data,
                this.checklength = response.data.length,
                this.showDialog()
            ))
        },
        showDialog() {
            if (this.checklength == 0) {
                this.getExistingRecord()
            }
        },
        getExistingRecord() {
            axio.get("http://10.10.1.109:8080/getTeamRecord/cid/" + this.classid).then(response => (
                console.log(response.data),
                this.grouparr = response.data,
                this.show = true
            ))
        },
        onChangeTeam(event) {
            console.log(event.target.value)
            console.log(event.target.options[event.target.value].text);
            this.teamname = (event.target.options[event.target.value].text);
            this.teamid = event.target.value;
            this.getClasses();
        },
        onPopulateTable(event) {
            console.log(event.target.value)
            this.classid = event.target.value
            this.getTeamSheetRecordById();

        }
    },
    data() {
        return {
            teams1: [],
            classes: [],
            classid: -1,
            data: [],
            checklength: -1,
            email: '',
            name: '',
            teamname: null,
            teamid: -1,
            grouparr: [],
            show: false
        }
    }
}
</script>

<style>

</style>
