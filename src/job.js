import React, { useState } from 'react'
import { Card, Button, Badge, Collapse } from 'react-bootstrap'
import ReactMarkDown from 'react-markdown'
function Job({ job }) {
    const [open, setOpen] = useState(false)
    if (!job) {
        return <h1>loading</h1>
    }


    return (
        <Card className="my-5">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>{job.title} - <span className="text-muted font-weight-light">{job.company}</span> </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">{(new Date(job.created_at)).toLocaleDateString()}</Card.Subtitle>
                        <Badge variant="secondary" className="mr-2">{job.type}</Badge>
                        <Badge variant="secondary">{job.location}</Badge>
                        <div style={{ wordBreak: 'break-all' }} className="my-2" >
                            <ReactMarkDown source={job.how_to_apply} />
                        </div>
                    </div>
                    <img className="d-none d-md-block" height='50px' src={job.company_logo} alt={job.company}></img>
                </div>

                <Card.Text>
                    <Button onClick={() => setOpen(prevOpen => !prevOpen)} variant="primary">
                        {open ? 'Hide Details' : 'View Details'}
                    </Button>
                </Card.Text>
                <Collapse in={open}>
                    <div className="my-2">{job.description}</div>
                </Collapse>

            </Card.Body>
        </Card >
    )
}

export default Job