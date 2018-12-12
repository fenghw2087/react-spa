import $ from 'jquery';

const doRequest = (options) => {
    if(process.env.NODE_ENV === 'dev' && options.url && options.url.indexOf('http')===-1){
        options.url = `/api${options.url}`
    }
    return $.ajax({
        ...options,
        success:data=>{
            typeof options.success === 'function' && options.success(data);
        }
    });
};

export default doRequest;