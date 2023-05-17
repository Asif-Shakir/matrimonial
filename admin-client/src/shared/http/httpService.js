import http from './axios-config';

class HttpService {
    getAll() {
        return http.get('/tutorials');
    }

    get(url) {
        return http.get(url);
    }

    post(url, data) {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        return http.post(url, formData);
    }

    update(id, url, data) {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        return http.put(url + id, formData);
        // return http.put(`/tutorials/${id}`, data);
    }

    delete(id) {
        return http.delete(`/tutorials/${id}`);
    }

    deleteAll() {
        return http.delete(`/tutorials`);
    }

    findByTitle(title) {
        return http.get(`/tutorials?title=${title}`);
    }
    objectToArray(object) {
        let arr = Object.keys(object).map(key => {
            return { value: key, id: object[key] }
        });
        return arr;
    }
}
const httpService = new HttpService();
export default httpService;
