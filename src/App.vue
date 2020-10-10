<template>
<div id="app">
    <timesheet />
</div>
</template>

<script>
//import HelloWorld from './components/ShowGroupDropDown.vue'
//import AssignClasses from './components/AssignClasses.vue'
//import show from './components/showAssignedClasses.vue'
//import allRecord from './components/getFullRecords.vue'
import timesheet from './components/TimeSheet.vue'
export default {
    name: 'App',
    components: {
        timesheet
    }

}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

#saveBtn {
    margin-top: 30px;
    height: 40px;
    width: 70px;
}
</style>
