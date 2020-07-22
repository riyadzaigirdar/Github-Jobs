import React from 'react'
import { Form, Col } from 'react-bootstrap'

function Query({ param, handle }) {

    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={handle} name='description' value={param.description} type='text'></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control onChange={handle} name='location' value={param.location} type='text'></Form.Control>
                </Form.Group>
                <Form.Group as={Col} xs="auto" className="ml-2">
                    <Form.Check onChange={handle} value={param.full_time} name="full_time" id="full-time" label="Only Full Time" type="checkbox" className="mb-2" />
                </Form.Group>
            </Form.Row>
        </Form>
    )
}

export default Query