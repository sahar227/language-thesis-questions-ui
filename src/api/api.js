import axios from "axios";
import { baseURL } from "../utils/config";

export default axios.create({
  baseURL,
});
