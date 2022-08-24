import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:1337/",
    headers: {
        Authorization: `Bearer 7c744550ce5ca7d7c2a44dde4b895e527debabd6670a1d51473d37fd0c62c33fa95fae3f717188cc6e220da7f363ba7f6ffabe16378850c3ba8802e90b5ebc83798fc6556a076f85010945388c6b2ae55c9c999e723564fa79c59961e5bd903cd0b5af97915e5aa50a1bfd86131693e377ff0d873a6caef255b3a238e49e24f2`,
    },
});

// Categories
export const fetchCategories = async () => api.get('/api/categories');

// Articles
export const fetchArticles = async (queryString: string) =>
    api.get(`/api/articles?${queryString}`);

export const fetchArticleBySlug = async (queryString: string) =>
    api.get(`/api/articles?${queryString}`);

//Jobs

export const fetchJobs = async () => api.get('/api/jobs');

export const fetchJobById = async (id:number) => 
    api.get(`/api/jobs/${id}`);

export const ApplyJob = async (data:any) => api.post('/api/forms', data)