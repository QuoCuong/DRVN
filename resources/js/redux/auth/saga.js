import actions from './actions'
import { takeLatest, put, call, all, fork } from 'redux-saga/effects'
import axios from 'axios'

function fetchAuthUserApi() {
    return axios({
        method: 'get',
        url: '/api/admin/auth',
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    })
}

function* fetchAuthUser() {
    try {
        yield put({ type: actions.LOGIN_REQUESTING })

        let response = yield call(fetchAuthUserApi)

        yield put({
            type: actions.LOGIN_SUCCESS,
            user: response.data
        })
    } catch (error) {
        yield put({ type: actions.LOGIN_FAILURE })
        yield window.localStorage.removeItem('token')
    }
}

function* fetchAuthWatcher() {
    yield takeLatest(actions.FETCH_AUTH_USER, fetchAuthUser)
}

export default function* rootSaga() {
    yield all([
        fork(fetchAuthWatcher)
    ])
}
