import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import useFetchData from './fetchData'
import Job from './job'
import Pagi from './pagination'
import Query from './form'


function App() {
    const [page, setPage] = useState(1)
    const [params, setParams] = useState({})
    const { jobs, loading, error, has_next } = useFetchData(params, page)

    function handleParamChange(e) {
        console.log(e.target.value)
        const param = e.target.name
        const value = e.target.value
        setPage(1)
        setParams(prevParams => {
            return { ...prevParams, [param]: value }
        })
    }

    return (
        <Container className="my-5">
            <h1 className="mb-2" >Github Jobs</h1>
            <Query param={params} handle={handleParamChange} />
            <Pagi page={page} setPage={setPage} has_next={has_next} />
            {jobs.map(job => <Job key={job.id} job={job} />)}
            <Pagi page={page} setPage={setPage} has_next={has_next} />
        </Container>
    )
}

export default App