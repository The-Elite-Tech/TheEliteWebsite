import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

axios.defaults.baseURL = process.env.VITE_SERVER_DOMAIN;


/** Make API Requests */

/** login function */
export async function login({ email, password }){
    try {
        if(email){
            const { data } = await axios.post('/api/login', { email, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** verify OTP */
export async function verifyOTP({ email, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { email, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwtDecode(token)
    return decode;
}

/** authenticate function */
export async function authenticate(email){
    try {
        return await axios.post('/api/authenticate', { email })
    } catch (error) {
        return { error : "User doesn't exist on this mail...!"}
    }
}

/** get User details */
export async function getUser({ id }){
    try {
        const { data } = await axios.get(`/api/user/${id}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}

/** register user function */
export async function registerUser(credentials){
    try {
        const { data : { msg }, status } = await axios.post(`/api/register`, credentials);

        let {firstName, email} = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { firstName, userEmail : email})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** update user profile function */
export async function updateUser(response){
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateUser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

/** generate OTP */
// export async function generateOTP(email, id){
//     try {
//         const {data : { code }, status } = await axios.get('/api/generateOTP', { email });

//         // send mail with the OTP
//         if(status === 201){
//             let { data : { email }} = await getUser({ id });
//             let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
//             await axios.post('/api/registerMail', { firstName, userEmail: email, text, subject : "Password Recovery OTP"})
//         }
//         return Promise.resolve(code);
//     } catch (error) {
//         return Promise.reject({ error });
//     }
// }


/** reset password */
export async function resetPassword({ email, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { email, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}