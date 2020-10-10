<template>
<div class="hello table-responsive">
    <div class="card-header">
        <i class="fas fa-table mr-1"></i>
        All Records
    </div>
    <table id="firstTable" class="table table-bordered" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>System</th>
                <th>Package</th>
                <th>Company</th>
                <th>Class</th>
                <th>Team</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in datas" v-bind:key="'id-'+row[1]+'-'+row[5]" :id="'id-'+row[1]+'-'+row[5]">
                <td>{{row[0]}}</td>
                <td>{{row[2]}}</td>
                <td v-if="row[3]!=null">{{row[4]}}</td>
                <td v-else><select size="xs" class="mt-12 form-control" @change="onChangeCompany($event)" placeholder=" Select Company">
                        <option value="0" disabled selected>Select any Company</option>
                        <option v-for="idx in companies" :key="idx.id" v-bind:value="idx.id">
                            {{idx.name}}
                        </option>
                    </select></td>
                <td>{{row[6]}}</td>
                <td v-if="row[7]!=null">{{row[8]}}</td>
                <td v-else-if="row[3]==0"><select size="xs" class="mt-12 form-control" @change="onChangeTeam($event)" placeholder="Select Team">
                        <option value="0" disabled selected>Select Team</option>
                        <option v-for="idx in teams1" :key="idx.id" v-bind:value="idx.id">
                            {{idx.name}}
                        </option>
                    </select></td>
                <td v-else-if="row[3]==1">
                    <select size="xs" class="mt-12 form-control" @change="onChangeTeam($event)" placeholder="Select Team">
                        <option value="0" disabled selected>Select Team</option>
                        <option v-for="idx in teams2" :key="idx.id" v-bind:value="idx.id">
                            {{idx.name}}
                        </option>
                    </select>
                </td>
                <td v-else-if="companyid==0"><select size="xs" class="mt-12 form-control" @change="onChangeTeam($event)" placeholder="Select Team">
                        <option value="0" disabled selected>Select Team</option>
                        <option v-for="idx in teams1" :key="idx.id" v-bind:value="idx.id">
                            {{idx.name}}
                        </option>
                    </select></td>
                <td v-else><select size="xs" class="mt-12 form-control" placeholder="Select Team" @change="onChangeTeam($event)">
                        <option value="0" disabled selected>Select Team</option>
                        <option v-for="idx in teams2" :key="idx.id" v-bind:value="idx.id">
                            {{idx.name}}
                        </option>
                    </select></td>
                <td v-if="row[7] == null"> <button v-bind:id="'id-'+row[1]+'-'+row[5]" v-on:click="saveValues(row)" class="btn btn-success">Save</button></td>
                <td v-else><button class="btn btn-danger" disabled>Already Assigned</button></td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import axio from 'axios';

export default {
    name: 'HelloWorld',
    props: {
        msg1: String
    },

    data() {
        return {
            datas: [],
            companies: [],
            teams1: [],
            teams2: [],
            companyid: -1,
            teamid: -1,
        }

    },

    mounted() {
        axio.get("http://10.10.1.109:8080/getAllRecord/").then((response) => {
                this.datas = response.data;
            }),
            axio.get("http://10.10.1.109:8080/teamgroup/").then(response => (
                this.companies = response.data
            )),
            axio.get("http://10.10.1.109:8080/team/tgid/" + 0).then(response => (
                this.teams1 = response.data
            ));
        axio.get("http://10.10.1.109:8080/team/tgid/" + 1).then(response => (
            this.teams2 = response.data
        ));

    },
    methods: {
        saveValues(event) {
            console.log(event[0] + ' ' + event[2] + ' ' + event[4] + ' ' + event[8]);
            if (event[3] == null && event[7] == null) {
                console.log("Assigned Group And class");
                if (this.companyid == -1) {
                    alert("No company Selected");
                    this.teamid == -1;
                    return;
                }
                if (this.teamid == -1) {
                    alert("No Team Selected");
                    return;
                }
                this.assignPackage(event[9], event[1], this.companyid, event[5], this.teamid);
            } else if (event[3] != null) {
                console.log("Group Selected");
                if (this.teamid == -1) {
                    alert("No Team Selected");
                    return;
                }
                this.assignClass(event[5], this.teamid);
                this.teamid = -1;
            }

        },
        assignPackage(g_id, pkg_id, company_id, class_id, team_id) {
            axio.put("http://10.10.1.109:8080/assignPkg/pgid/" + g_id + "/pid/" + pkg_id + "/tgid/" + company_id).then(response => (
                console.log(response.data),
                this.assignClass(class_id, team_id)
            ))

        },
        assignClass(class_id, team_id) {
            axio.put("http://10.10.1.109:8080/classes/assign/cid/" + class_id + "/tid/" + team_id).then(response =>
                (
                    console.log(response.data),
                    this.companyid = -1,
                    this.teamid = -1,
                    location.reload()
                )
            );

        },
        onChangeCompany(event) {
            this.companyid = event.target.value;
        },
        onChangeTeam(event) {
            this.teamid = event.target.value;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
