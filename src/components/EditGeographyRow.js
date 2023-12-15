import axios from 'axios';
import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';

function EditGeographyRow({data, geography, setGeography, expandedRows, setExpandedRows, item, index, }) {
    
    const handleExpand = (index) => {
        setExpandedRows((prevExpandedRows) => {
            const isRowExpanded = prevExpandedRows.includes(index);
            return isRowExpanded
                ? prevExpandedRows.filter((rowIndex) => rowIndex !== index)
                : [...prevExpandedRows, index];
        });
    };

    const calculateSubProductsTotal = (subGeographies, productKey) => {
        return subGeographies.reduce((total, subGeo) => total + subGeo[productKey], 0);
    };

    const handleGeoEdit = async (e, targetIndex) => {
        e.preventDefault()
        const updatedData = data
        updatedData[targetIndex] = {
            ...updatedData[targetIndex],
            Geography: geography
        }

        await axios.put(`http://localhost:5000/data/${item.id}`, updatedData[targetIndex], {
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
            <td> 
            <InputGroup>
                <Form.Control
                    type = 'text'
                    size = 'sm'
                    value = {geography}
                    onChange={(e) => setGeography(e.target.value)}
                />
                <Button
                    variant='light'
                    size='sm'
                    onClick={() => handleExpand(index)}
                >
                    {expandedRows.includes(index) ? <i class="fa-solid fa-caret-up"></i> : <i class="fa-solid fa-caret-down"></i>}
                </Button>
            </InputGroup> 
            </td>
            <td>
            <InputGroup>
                <Form.Control
                    type = 'text'
                    size = 'sm'
                    value = {item.sub_geographies ? calculateSubProductsTotal(item.sub_geographies, "Product 1") : item["Product 1"]}
                    onChange = {(e) => alert('Make Changes in the Sub Geography Product Values or Add one if it does not exist')}
                />
            </InputGroup> 
            </td>
            <td>
            <InputGroup>
                <Form.Control
                    type = 'text'
                    size = 'sm'
                    value = {item.sub_geographies ? calculateSubProductsTotal(item.sub_geographies, "Product 2") : item["Product 2"]}
                    onChange = {(e) => alert('Make Changes in the Sub Geography Product Values or Add one if it does not exist')}
                />
            </InputGroup> 
            </td>
            <td>
            <InputGroup>
                <Form.Control
                    type = 'text'
                    size = 'sm'
                    value = {item.sub_geographies ? calculateSubProductsTotal(item.sub_geographies, "Product 3") : item["Product 3"]}
                    onChange = {(e) => alert('Make Changes in the Sub Geography Product Values or Add one if it does not exist')}
                />
            </InputGroup> 
            </td>
            <td>{item["Product 1"] + item["Product 2"] + item["Product 3"]}</td>
            <td>
                <Button 
                    variant='success'
                    size='sm'
                    style={{ width: '100%' }}
                    onClick={(e) => handleGeoEdit(e, index)}
                >
                    <i class="fas fa-save"></i>
                </Button>
            </td>
        </tr>
    )
}

export default EditGeographyRow
