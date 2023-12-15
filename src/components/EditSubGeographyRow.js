import axios from 'axios';
import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';

function EditSubGeographyRow({item, data, targetIndex, index, expandedRows, subgeography, setSubgeography, product1, setProduct1, product2, setProduct2, product3, setProduct3, subGeo}) {
    
    const calculateSubProductsTotal = (subGeographies, productKey) => {
        return subGeographies.reduce((total, subGeo) => total + subGeo[productKey], 0);
    };

    const handleSubEdit = async (e, geoIndex, subIndex) => {
        e.preventDefault()
        const updatedData = data
        updatedData[geoIndex].sub_geographies[subIndex] = {
            'Geography': subgeography,
            'Product 1': Number(product1),
            'Product 2': Number(product2),
            'Product 3': Number(product3)
        }

        updatedData[geoIndex]['Product 1'] = calculateSubProductsTotal(updatedData[geoIndex].sub_geographies, "Product 1")
        updatedData[geoIndex]['Product 2'] = calculateSubProductsTotal(updatedData[geoIndex].sub_geographies, "Product 2")
        updatedData[geoIndex]['Product 3'] = calculateSubProductsTotal(updatedData[geoIndex].sub_geographies, "Product 3")

        await axios.put(`http://localhost:5000/data/${item.id}`, updatedData[geoIndex], {
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
        <tr key={index}>
            <td> 
            <InputGroup>
                <Form.Control
                    type = 'text'
                    size = 'sm'
                    value = {subgeography}
                    onChange={(e) => setSubgeography(e.target.value)}
                />
            </InputGroup> 
            </td>
            <td>
            <InputGroup>
                <Form.Control
                    type = 'number'
                    size = 'sm'
                    value = {product1}
                    onChange = {(e) => setProduct1(e.target.value)}
                />
            </InputGroup> 
            </td>
            <td>
            <InputGroup>
                <Form.Control
                    type = 'number'
                    size = 'sm'
                    value = {product2}
                    onChange = {(e) => setProduct2(e.target.value)}
                />
            </InputGroup> 
            </td>
            <td>
            <InputGroup>
                <Form.Control
                    type = 'number'
                    size = 'sm'
                    value = {product3}
                    onChange = {(e) => setProduct3(e.target.value)}
                />
            </InputGroup> 
            </td>
            <td><i>{subGeo["Product 1"] + subGeo["Product 2"] + subGeo["Product 3"]}</i></td>
            <td>
                <Button 
                    variant='outline-success'
                    size='sm'
                    style={{ width: '100%' }}
                    onClick={(e) => handleSubEdit(e, targetIndex, index)}
                >
                    <i class="fas fa-save"></i>
                </Button>
            </td>
        </tr>
    )
}

export default EditSubGeographyRow
