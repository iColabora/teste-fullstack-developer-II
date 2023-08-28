const api_url = 'http://localhost:3000';

export async function apiGET(endpoint, data = null){
    var success = true;
    var status = 200;
    var messages = null;

    let url = `${api_url}/${endpoint}`;
    url = url.replace(`${api_url}//`, `${api_url}/`);
    if(data){
        let params = "";

        data.map(value=>{
            if(params != ""){
                params += "&";
            }
            params += `${value}`;
        });

        url += `?${params}`;
    }

    let res = await fetch(url, {method: 'GET'})
    .then(res => {
        //console.log(res);
        status = res.status;
        return res.json();
    }).then(data => {
        if(data.messages){
            data.messages.map(msg => {
                messages = data.messages
            });
        }
        return data;
    }).catch(e => {
        messages = [{
            content: "Ocorreu um erro na requisição dos dados.",
            type: "error"
        },{
            content: e.message,
            type: "error_log"
        }];

        return {
            success: false,
            status: status,
            messages: messages
        };
    });
    return res;
}

export async function apiPOST(endpoint, data = null){
    var success = true;
    var status = 200;
    var messages = null;

    let url = `${api_url}/${endpoint}`;
    url = url.replace(`${api_url}//`, `${api_url}/`);

    let res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
    })
    .then(res => {
        //console.log(res);
        status = res.status;
        return res.json();
    }).then(data => {
        if(data.messages){
            data.messages.map(msg => {
                messages = data.messages
            });
        }
        return data;
    }).catch(e => {
        messages = [{
            content: "Ocorreu um erro na requisição.",
            type: "error"
        },{
            content: e.message,
            type: "error_log"
        }];

        return {
            success: false,
            status: status,
            messages: messages
        };
    });
    return res;
}

export async function apiPUT(endpoint, data = null){
    var success = true;
    var status = 200;
    var messages = null;

    let url = `${api_url}/${endpoint}`;
    url = url.replace(`${api_url}//`, `${api_url}/`);

    let res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: data,
    })
    .then(res => {
        //console.log(res);
        status = res.status;
        return res.json();
    }).then(data => {
        if(data.messages){
            data.messages.map(msg => {
                messages = data.messages
            });
        }
        return data;
    }).catch(e => {
        messages = [{
            content: "Ocorreu um erro na requisição.",
            type: "error"
        },{
            content: e.message,
            type: "error_log"
        }];

        return {
            success: false,
            status: status,
            messages: messages
        };
    });
    return res;
}

export async function apiDELETE(endpoint, data = null){
    var success = true;
    var status = 200;
    var messages = null;

    let url = `${api_url}/${endpoint}`;
    url = url.replace(`${api_url}//`, `${api_url}/`);
    if(data){
        let params = "";

        data.map(value=>{
            if(params != ""){
                params += "&";
            }
            params += `${value}`;
        });

        url += `?${params}`;
    }

    let res = await fetch(url, {method: 'DELETE'})
    .then(res => {
        //console.log(res);
        status = res.status;
        return res.json();
    }).then(data => {
        if(data.messages){
            data.messages.map(msg => {
                messages = data.messages
            });
        }
        return data;
    }).catch(e => {
        messages = [{
            content: "Ocorreu um erro na requisição dos dados.",
            type: "error"
        },{
            content: e.message,
            type: "error_log"
        }];

        return {
            success: false,
            status: status,
            messages: messages
        };
    });
    return res;
}