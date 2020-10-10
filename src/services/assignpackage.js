import axios from 'axios'
const ips="http://10.10.1.109:8080/";
var getGroups=ips+'packageGroup/';

class AssignPackages{
getPackageGroup(){
    console.log("CALLING");
    return axios.get(getGroups);
}
}
export default new AssignPackages();