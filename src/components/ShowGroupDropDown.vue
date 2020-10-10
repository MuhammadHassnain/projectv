<template>
<div id="group_select">
    <div class="col-md-12">
        <div class="row">
            <div class="column">
                <h5> Select Group </h5>
                <select size="xs" class="mt-12 form-control" @change="onChange($event)" placeholder="Select Group">
                    <option value="0" disabled selected>Select any Group</option>
                    <option v-for="idx in option" :key="idx.id" v-bind:value="idx.id">
                        {{idx.name}}
                    </option>
                </select>
            </div>

            <div class="column">
                <h5>Select Packages</h5>
                <select size="xs" class="mt-12 form-control" @change="onChangePackage($event)" placeholder="Select Package">
                    <option value="0" disabled selected>Select any Packages</option>
                    <option v-for="idx in packages" :key="idx.id" v-bind:value="idx.id">
                        {{idx.name}}
                    </option>
                </select>
            </div>

            <div class="column">
                <h5>Select Company</h5>
                <select size="xs" class="mt-12 form-control" @change="onChangeCompany($event)" placeholder="Select Company">
                    <option value="0" disabled selected>Select any Company</option>
                    <option v-for="idx in companies" :key="idx.id" v-bind:value="idx.id">
                        {{idx.name}}
                    </option>
                </select>
            </div>
            <button id="saveBtn" class="btn btn-success" v-on:click="onButtonClickSave()">Assign</button>

        </div>
    </div>
</div>
</template>

<script>
import axio from 'axios'
export default {

    name: 'HelloWorlds',
    mounted() {
        this.getGroups();
    },
    methods: {
        getGroups() {
            axio.get("http://10.10.1.109:8080/packageGroup/").then(response => (
                this.option = response.data
            ));
        },
        onButtonClickSave() {
            axio.put(this.ip + "/assignPkg/pgid/" + this.g_id + "/pid/" + this.pkg_id + "/tgid/" + this.company_id).then(response => (
                console.log(response.data),

                this.g_id = null,
                this.pkg_id = null,
                this.company_id = null,
                this.packages = [],
                this.companies = []
            ))
        },
        onChange(event) {
            this.g_id = event.target.value;
            this.getPackageFromDatabase(this.g_id);
        },
        onChangePackage(event) {
            console.log("Clicked");
            this.pkg_id = event.target.value;
            this.getCompanyNameFromDatabase();
        },
        onChangeCompany(event) {
            this.company_id = event.target.value;
        },
        getPackageFromDatabase(id) {
            axio.get("http://10.10.1.109:8080/packages/pg/" + id + "/unassigned/").then(response => (
                this.packages = response.data
            ));
        },
        getCompanyNameFromDatabase() {
            axio.get("http://10.10.1.109:8080/teamgroup/").then(response => (
                this.companies = response.data
            ));
        }
    },
    data() {
        return {
            ip: "http://10.10.1.109:8080",
            selected: null,
            option: [],
            g_id: null,
            pkg_id: null,
            company_id: null,
            packages: [],
            companies: []

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>
