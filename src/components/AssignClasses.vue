<template>
<div id="group_select">
    <div class="col-md-12">
        <div class="row">
            <div class="column">
                <h5>Select Company</h5>
                <select size="xs" class="mt-12 form-control" @change="onChangeCompany($event)" placeholder="Select Group">
                    <option value="0" disabled selected>Select Company</option>
                    <option v-for="idx in companies" :key="idx.id" v-bind:value="idx.id">
                        {{idx.name}}
                    </option>
                </select>
            </div>
            <div class="column">
                <h5>Select Team</h5>
                <select size="xs" class="mt-12 form-control" @change="onChangeTeam($event)" placeholder="Select Package">
                    <option value="0" disabled selected>Select any Team</option>
                    <option v-for="idx in team" :key="idx.id" v-bind:value="idx.id">
                        {{idx.name}}
                    </option>
                </select>
            </div>
            <div class="column">
                <h5>Select Package</h5>
                <select size="xs" class="mt-12 form-control" @change="onChangePackage($event)" placeholder="Select Company">
                    <option value="0" disabled selected>Select any Package</option>
                    <option v-for="idx in packages" :key="idx.id" v-bind:value="idx.id">
                        {{idx.name}}
                    </option>
                </select>
            </div>
            <div class="column">
                <h5>Select any Class</h5>
                <select size="xs" class="mt-12 form-control" @change="onChangeClass($event)" placeholder="Select Company">
                    <option value="0" disabled selected>Select any Class</option>
                    <option v-for="idx in classes" :key="idx.id" v-bind:value="idx.id">
                        {{idx.name}}
                    </option>
                </select>
            </div>
            <button id="saveBtn" class="btn btn-success" v-on:click="onButtonClick()">Assign</button>
        </div>
    </div>
</div>
</template>

<script>
import axio from 'axios'
export default {

    name: 'AssignClasses',
    mounted() {
        this.getCompany();
    },
    methods: {
        getCompany() {
            axio.get("http://10.10.1.109:8080/teamgroup/").then(response => (
                this.companies = response.data
            ));
        },
        getTeam() {
            axio.get(this.ip + "/team/tgid/" + this.company_id).then(response => (
                this.team = response.data
            ));
        },
        getPackage() {
            axio.get(this.ip + "/packages/tg/" + this.company_id + "/assigned/").then(response => (
                this.packages = response.data
            ));

        },
        getClass() {
            axio.get(this.ip + "/classes/pid/" + this.package_id + "/unassigned").then(response => (
                this.classes = response.data
            ));
        },
        onChangeCompany(event) {
            this.company_id = event.target.value;
            this.getTeam();
            this.getPackage();
        },
        onChangePackage(event) {
            this.package_id = event.target.value;
            this.getClass();
        },
        onChangeTeam(event) {
            this.team_id = event.target.value;
        },
        onChangeClass(event) {
            this.class_id = event.target.value;
        },
        onButtonClick() {
            axio.put(this.ip + "/classes/assign/cid/" + this.class_id + "/tid/" + this.team_id).then(response =>
                (
                    console.log(response.data),
                    this.classes = [],
                    location.reload()
                )
            );

        }

    },
    data() {
        return {
            ip: "http://10.10.1.109:8080",
            selected: null,
            company_id: null,
            team_id: null,
            package_id: null,
            class_id: null,
            packages: [],
            companies: [],
            team: [],
            classes: []

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>
