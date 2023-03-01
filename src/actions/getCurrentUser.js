

import jwt_decode from "jwt-decode";


export function getCurrentUser() {
    try {
        const token = localStorage.getItem('jwtToken');
        return jwt_decode(token)
    } catch (error) {
        return {isAuthenticated: false}
    }
};