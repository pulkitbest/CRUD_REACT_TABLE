import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';

function DataTable() {
    const [data, setData] = useState([]);

    const [geography, setGeography] = useState('New Geography')
    const [subgeography, setSubgeography] = useState('')
    const [product1, setProduct1] = useState(0)
    const [product2, setProduct2] = useState(0)
    const [product3, setProduct3] = useState(0)
    const [editId, setEditId] = useState(-1)
    const [expandedRows, setExpandedRows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/data')
            .then(res => setData(res.data))
            .catch(er => console.log(er));

        const storedExpandedRows = localStorage.getItem('expandedItems')
        if (storedExpandedRows) {
            setExpandedRows(JSON.parse(storedExpandedRows));
        }    
        localStorage.removeItem('expandedItems')
    }, []);


    const handleExpand = (index) => {
        setExpandedRows((prevExpandedRows) => {
            const isRowExpanded = prevExpandedRows.includes(index);
            return isRowExpanded
                ? prevExpandedRows.filter((rowIndex) => rowIndex !== index)
                : [...prevExpandedRows, index];
        });
    };

    const renderSubGeographies = (subGeographies, targetIndex) => {
        return (
            <>
                {subGeographies && subGeographies.map((subGeo, index) => (
                    <>
                    {((targetIndex + 1) * 10000) + index === editId ? (
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
                    ) : (
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
                    )}
                    </>
                ))}
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
            </>
        );
    };

    const calculateSubProductsTotal = (subGeographies, productKey) => {
        return subGeographies.reduce((total, subGeo) => total + subGeo[productKey], 0);
    };

    const calculateProductsTotal = (Geographies, productKey) => {
        return Geographies.reduce((total, geo) => total + geo[productKey], 0);
    };

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

    const handleGeoEdit = async (e, targetIndex) => {
        e.preventDefault()
        const updatedData = data
        updatedData[targetIndex] = {
            ...updatedData[targetIndex],
            Geography: geography
        }

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
        <>
            <Table bordered responsive className='table-sm' style={{ tableLayout: 'fixed' }}>
                <thead>
                    <tr>
                        <th style={{ fontSize: '20px' }}>Product/Geography</th>
                        <th style={{ textAlign: 'center',fontSize: '20px' }}>Product 1</th>
                        <th style={{ textAlign: 'center',fontSize: '20px' }}>Product 2</th>
                        <th style={{ textAlign: 'center',fontSize: '20px' }}>Product 3</th>
                        <th style={{ textAlign: 'center',fontSize: '20px' }}>Total</th>
                        <th style={{ textAlign: 'center',fontSize: '20px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <React.Fragment key={index}>
                            {item.id === editId ? (
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
                            ) : (
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
                            )}
                            {expandedRows.includes(index) && renderSubGeographies(item.sub_geographies, index)}
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
            <Table bordered responsive className='table-sm' style={{ tableLayout: 'fixed' }}>
                <thead>
                <tr>
                    <th style={{ fontSize: '18px' }}> Total </th>
                    <th style={{ textAlign: 'center',fontSize: '18px' }}> {calculateProductsTotal(data, "Product 1")} </th>
                    <th style={{ textAlign: 'center',fontSize: '18px' }}> {calculateProductsTotal(data, "Product 2")} </th>
                    <th style={{ textAlign: 'center',fontSize: '18px' }}> {calculateProductsTotal(data, "Product 3")} </th>
                    <th style={{ textAlign: 'center',fontSize: '18px' }}> {calculateProductsTotal(data, "Product 1") + calculateProductsTotal(data, "Product 2") + calculateProductsTotal(data, "Product 3")} </th>
                    <th></th>
                </tr>
                </thead>
            </Table>
            <Button type='submit' variant='success' style={{ width: '100%' }} onClick={handleAddGeography}>
                ADD GEOGRAPHY
            </Button>
        </>
    );
}

export default DataTable;
