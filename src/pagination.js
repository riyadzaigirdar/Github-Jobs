import React from 'react'
import { Pagination } from 'react-bootstrap'

function Pagi({ page, setPage, has_next }) {
    function adjustPage(amount) {
        return () => {
            setPage(page + amount)
        }
    }

    return (
        <Pagination>
            {page !== 1 && <Pagination.Prev onClick={adjustPage(-1)} />}
            {page !== 1 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>}
            {page > 2 && <Pagination.Ellipsis />}
            {page > 2 && <Pagination.Item onClick={adjustPage(-1)}>{page - 1}</Pagination.Item>}
            <Pagination.Item active>{page}</Pagination.Item>
            {has_next && <Pagination.Item onClick={adjustPage(1)}>{page + 1}</Pagination.Item>}
            {has_next && <Pagination.Next onClick={adjustPage(1)} />}
        </Pagination>
    )

}

export default Pagi