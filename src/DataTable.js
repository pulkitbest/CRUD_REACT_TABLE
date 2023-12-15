import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import GeographyRow from './components/GeographyRow';
import EditGeographyRow from './components/EditGeographyRow';
import AddGeography from './components/AddGeography';
import SummaryTable from './components/SummaryTable';
import RenderSubGeographies from './components/RenderSubGeographies';

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

    return (
        <>
            <h4 style={{ textAlign: 'center' }}>Data Table</h4>
            <hr/>
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
                            {item.id === editId ? <EditGeographyRow 
                                    data={data}
                                    geography={geography} 
                                    setGeography={setGeography}
                                    expandedRows={expandedRows}
                                    setExpandedRows={setExpandedRows}
                                    item={item}
                                    index={index}
                                /> : <GeographyRow 
                                    item={item} 
                                    index={index} 
                                    expandedRows={expandedRows} 
                                    setExpandedRows={setExpandedRows} 
                                    setEditId={setEditId} 
                                    setGeography={setGeography}
                                />
                            }
                            {expandedRows.includes(index) && 
                                <RenderSubGeographies
                                    item={item}
                                    subGeographies={item.sub_geographies}
                                    targetIndex={index}
                                    editId={editId}
                                    setEditId={setEditId}
                                    data={data}
                                    expandedRows={expandedRows}
                                    subgeography={subgeography}
                                    setSubgeography={setSubgeography}
                                    product1={product1}
                                    product2={product2}
                                    product3={product3}
                                    setProduct1={setProduct1}
                                    setProduct2={setProduct2}
                                    setProduct3={setProduct3}
                                />
                            }
                        </React.Fragment>
                    ))}
                    <AddGeography data={data} expandedRows={expandedRows}/>
                </tbody>
            </Table>
            <div style={{ height: '140px' }}>

            </div>
            <SummaryTable data={data}/>
        </>
    );
}

export default DataTable;
