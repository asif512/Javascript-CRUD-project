/**
 *  EasyHTTP Library
 *  Library for making HTTP Request
 * 
 *  @author: Asif Hussain
 *  @email: asifh2591@gmail.com
 *  @data: 19 feb, 2020
 * 
 * 
 */

 class EasyHTTP {

    // get post
    async getPosts(url){

        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }

    // submit post
    async submitPost(url, data){
        const response = await fetch(url,{
            "method": "POST",
            headers: {
                "Content-type": "application/json"
            },
            "body": JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }

    // delete post
    async deletePost(url){
        const response = await fetch(url,{
            "method": "DELETE",
            "headers": {
                "Content-type": "application/json"
            }
        });
        const resData = await response.json();
        return resData;  
    }

    // put post
    async putPost(url, data){
        const response = await fetch(url, {
            "method": "PUT",
            "headers": {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }
 }

 export const http = new EasyHTTP();