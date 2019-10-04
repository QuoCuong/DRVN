const config = {
    headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('accessToken')
    }
}

export default config
