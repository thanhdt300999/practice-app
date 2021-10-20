import axios from "axios";

export default axios.create({
  baseURL: "http://apiv2.ltservices.ovh/gate",
});


