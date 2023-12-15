import axios from 'axios';
import React from 'react'
import { Button } from 'react-bootstrap';

function AddSubGeographyRow({data, expandedRows, targetIndex}) {

    const handleAddSub = async (e, targetIndex) => {
        e.preventDefault()
        const updatedData = data;
        const updatedSubGeographies = [...updatedData[targetIndex].sub_geographies];
    
        updatedSubGeographies.push({
            'Geography': 'New Sub Geography',
            'Product 1': Number(0),
            'Product 2': Number(0),
            'Product 3': Number(0)
        });
    
        updatedData[targetIndex] = {
            ...updatedData[targetIndex],
            sub_geographies: updatedSubGeographies
        };
        
        await axios.put(`http://localhost:5000/data/${targetIndex + 1}`, updatedData[targetIndex], {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            localStorage.setItem('expandedItems', JSON.stringify(expandedRows))
            window.location.reload()
        }).catch(er => {
            console.log('ERROR: ', er)
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
                <Button size='sm' type='submit' variant='outline-success' style={{ width: '100%' }} onClick={(e) => handleAddSub(e, targetIndex)}>
                <i class="fa fa-plus" aria-hidden="true"></i>
                </Button>
            </td>
        </tr>
    )
}

export default AddSubGeographyRow
