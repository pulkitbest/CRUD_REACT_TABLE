import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'

function SubGeographyRow({data, expandedRows, index, targetIndex, subGeo, setEditId, setSubgeography, setProduct1, setProduct2, setProduct3}) {
    
    const handleSubDelete = async (e, geoIndex, subIndex) => {
        e.preventDefault()

        const updatedData = data
        updatedData[geoIndex].sub_geographies.splice(subIndex, 1)

        await axios.put(`http://localhost:5000/data/${geoIndex + 1}`, updatedData[geoIndex], {
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
            <td style={{ textAlign: 'center', fontSize: '17px' }}><i>{subGeo.Geography}</i></td>
            <td style={{ textAlign: 'center', fontSize: '17px' }}><i>{subGeo["Product 1"]}</i></td>
            <td style={{ textAlign: 'center', fontSize: '17px' }}><i>{subGeo["Product 2"]}</i></td>
            <td style={{ textAlign: 'center', fontSize: '17px' }}><i>{subGeo["Product 3"]}</i></td>
            <td style={{ textAlign: 'center', fontSize: '17px' }}><i>{subGeo["Product 1"] + subGeo["Product 2"] + subGeo["Product 3"]}</i></td>
            <td>
                <Button
                    variant='outline-info'
                    size='sm'
                    style={{ width: '49%' }}
                    onClick={() => {
                        setEditId(((targetIndex + 1) * 10000) + index)
                        setSubgeography(subGeo.Geography)
                        setProduct1(subGeo["Product 1"])
                        setProduct2(subGeo["Product 2"])
                        setProduct3(subGeo["Product 3"])
                    }}
                >
                    <i class="fa-solid fa-pencil"></i>
                </Button>
                {" "}
                <Button 
                    size='sm' 
                    variant='outline-danger' 
                    style={{ width: '49%' }} 
                    onClick={(e) => handleSubDelete(e, targetIndex, index)}
                >
                <i class="fa-solid fa-trash"></i>
                </Button>
            </td>
        </tr>
    )
}

export default SubGeographyRow
