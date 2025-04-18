import axios from "axios";

export default axios.create({
  baseURL:
    "http://cvicna-uloha-vzor-api-edge.akademia.apps.openshift.softec.sk/api",
});
