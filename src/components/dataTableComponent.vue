<template>

</template>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link rel="stylesheet" href='https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css'>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script><script>
import vdtnettable from 'vue-datatables-net';

import 'datatables.net-bs4'

// below you should only import what you need
// Example: import buttons and plugins
import 'datatables.net-buttons/js/dataTables.buttons.js'
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-buttons/js/buttons.print.js'

// import the rest for your specific theme
import 'datatables.net-buttons-bs4'
import 'datatables.net-select-bs4'

import 'datatables.net-select-bs4/css/select.bootstrap4.min.css'
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css'
export default {
    name: "DataTable",
    data() {
        return {
            fields: {
                _id: {
                    label: "ID"
                },
                title: {
                    label: "Title",
                    searchable: true,
                    sortable: true
                },
                type: {
                    label: "Type"
                }
            }
        }
    }
}
</script>

<style>

</style>
