function getToken() {
    const tokenString = sessionStorage.getItem('token');
    console.log(`token in storage is ${tokenString}`)
    const userToken = JSON.parse(tokenString);
    return userToken
}

export { getToken }