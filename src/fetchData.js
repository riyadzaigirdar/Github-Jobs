import { useReducer, useEffect } from "react"
import axios from 'axios'

const ACTION = {
    MAKE_REQUEST: 'make_request',
    GET_DATA: 'get_data',
    ERROR: 'error',
    HAS_NEXT: 'has_next'
}

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'

function reducer(state, action) {
    switch (action.type) {
        case ACTION.MAKE_REQUEST:
            return { loading: true, jobs: [] }
        case ACTION.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs }
        case ACTION.ERROR:
            return { ...state, loading: false, error: action.payload.error, jobs: [] }
        case ACTION.HAS_NEXT:
            return { ...state, has_next: action.payload.next }
        default:
            return state
    }
}

function useFetchData(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true, error: false, has_next: false })

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        dispatch(ACTION.MAKE_REQUEST)
        axios.get(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: { markdown: true, page: page, ...params }
        }).then(res => {
            dispatch({ type: ACTION.GET_DATA, payload: { jobs: res.data } })
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ACTION.ERROR, payload: { error: e } })
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.get(BASE_URL, {
            cancelToken: cancelToken2.token,
            params: { markdown: true, page: page + 1, ...params }
        }).then(res => {
            dispatch({ type: ACTION.HAS_NEXT, payload: { next: res.data.length !== 0 } })
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ACTION.ERROR, payload: { error: e } })
        })

        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
        }

    }, [params, page])

    return state

}

export default useFetchData