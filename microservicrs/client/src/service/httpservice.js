import axios from 'axios';
class HttpService {
    constructor() {
        this.prdServiceUrl = 'http://localhost:4001';
        this.ordServiceUrl = 'http://localhost:4002';
    }
    getProducts = () => {
        return axios.get(`${this.prdServiceUrl}/api/product`);
    }
    postProduct = (prd) => {
        let resp;
        resp = axios.post(`${this.prdServiceUrl}/api/product`, prd, {
            headers: { 'Content-Type': 'application/json' }
        });
        return resp;
    }
    getOrders = () => {
        return axios.get(`${this.ordServiceUrl}/api/order`);
    }
    postOrder = (ord) => {
        let resp;
        resp = axios.post(`${this.ordServiceUrl}/api/order`, ord, {
            headers: { 'Content-Type': 'application/json' }
        });
        return resp;
    }
}

export default HttpService;