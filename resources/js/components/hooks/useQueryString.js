import queryString from 'query-string'

const useQueryString = (search, data) => {
    const parsed = queryString.parse(search)

    return queryString.stringify({
        ...parsed,
        ...data
    })
}

export default useQueryString
