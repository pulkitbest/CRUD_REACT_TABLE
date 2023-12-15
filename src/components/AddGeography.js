import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'

function AddGeography({data, expandedRows}) {

    const handleAddGeography = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5000/data', {
            id: (data.length + 1),
            'Geography': 'New Geography', 
            'Product 1': Number(0), 
            'Product 2': Number(0), 
            'Product 3': Number(0),
            'sub_geographies': []
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            localStorage.setItem('expandedItems', JSON.stringify(expandedRows))
            window.location.reload()
        }).catch(er => {
            console.log(er)
        })
    }

    return (
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <Button type='submit' size = 'sm' variant='success' style={{ width: '100%' }} onClick={handleAddGeography}>
                    ADD GEOGRAPHY
                </Button>
            </td>
        </tr>
    )
}

export default AddGeography
