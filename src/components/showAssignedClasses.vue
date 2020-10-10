<template>
<div>
    <h5>
        <strong>
            <center>Assigned Classes To Teams Table</center>
        </strong>
    </h5>
    <b-table stripped-hover :items="getreadData"></b-table>
</div>
</template>

<script>
import axio from 'axios'
export default {
    name: "showData",
    mounted() {
        this.getAll();
    },
    methods: {
        getAll() {
            axio.get(this.ip + "/getAssignedRecord/").then(response => (
                this.item = response.data,
                console.log(response),
                this.check = true,
                this.sortData()
            ));

        },
        sortData() {
            if (this.check == true) {
                var temp = [];
                for (this.counter = 0; this.counter < this.item.length; this.counter++) {
                    this.obj = new Object();
                    for (this.counter2 = 0; this.counter2 < this.item[this.counter].length; this.counter2++) {
                        //console.log(this.item[this.counter][this.counter2]);
                        if (this.counter2 == 0) {
                            this.obj.classname = this.item[this.counter][this.counter2];
                        } else if (this.counter2 == 1) {
                            this.obj.packagename = this.item[this.counter][this.counter2];
                        } else if (this.counter2 == 2) {
                            this.obj.teamname = this.item[this.counter][this.counter2];
                        }
                    }
                    console.log(this.obj);
                    temp.push(this.obj);
                }
                this.getreadData = temp;
                console.log(this.getreadData);
            }
        }
    },
    data() {
        return {
            ip: "http://10.10.1.109:8080",
            item: [],
            counter: null,
            counter2: null,
            obj: new Object(),
            check: false,
            getreadData: []
        }
    }
}
</script>

<style>

</style>
