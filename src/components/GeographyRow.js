import axios from 'axios';
import React from 'react'
import { Button } from 'react-bootstrap';

function GeographyRow({item, index, expandedRows, setExpandedRows, setEditId, setGeography, children}) {
    
    const calculateSubProductsTotal = (subGeographies, productKey) => {
        return subGeographies.reduce((total, subGeo) => total + subGeo[productKey], 0);
    };

    const handleExpand = (index) => {
        setExpandedRows((prevExpandedRows) => {
            const isRowExpanded = prevExpandedRows.includes(index);
            return isRowExpanded
                ? prevExpandedRows.filter((rowIndex) => rowIndex !== index)
                : [...prevExpandedRows, index];
        });
    };

    const handleGeoDelete = async (e, targetIndex) => {
        e.preventDefault()
        
        await axios.delete(`http://localhost:5000/data/${targetIndex + 1}`).then(res => {
            const newExpandedRows = expandedRows.filter(element => element !== targetIndex)
            localStorage.setItem('expandedItems', JSON.stringify(newExpandedRows))
            window.location.reload()
        }).catch(er => {
            console.log('ERROR: ', er)
        })
    }

    return (
        <tr>
            <td style={{ fontSize: '18px' }}> 
                {item.Geography} 
                <Button
                    variant='light'
                    size='sm'
                    onClick={() => handleExpand(index)}
                    style={{ float: 'right' }}
                >
                    {expandedRows.includes(index) ? <i class="fa-solid fa-caret-up"></i> : <i class="fa-solid fa-caret-down"></i>}
                </Button>
            </td>
            <td style={{ textAlign: 'center',fontSize: '18px' }}>{item.sub_geographies ? calculateSubProductsTotal(item.sub_geographies, "Product 1") : item["Product 1"]}</td>
            <td style={{ textAlign: 'center',fontSize: '18px' }}>{item.sub_geographies ? calculateSubProductsTotal(item.sub_geographies, "Product 2") : item["Product 2"]}</td>
            <td style={{ textAlign: 'center',fontSize: '18px' }}>{item.sub_geographies ? calculateSubProductsTotal(item.sub_geographies, "Product 3") : item["Product 3"]}</td>
            <td style={{ textAlign: 'center',fontSize: '18px' }}>{item["Product 1"] + item["Product 2"] + item["Product 3"]}</td>
            <td>
                <Button
                    variant='info'
                    size='sm'
                    style={{ width: '49%' }}
                    onClick={() => {
                        setEditId(item.id)
                        setGeography(item.Geography)
                    }}
                >
                    <i class="fa-solid fa-pencil"></i>
                </Button>
                {" "}
                <Button
                    variant='danger'
                    size='sm'
                    style={{ width: '49%' }}
                    onClick={(e) => handleGeoDelete(e, index)}
                >
                    <i class="fa-solid fa-trash"></i>
                </Button>
            </td>
        </tr>
    )
}

export default GeographyRow
