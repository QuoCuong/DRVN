const config = {
    headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
    }
}

export default config
