import React from 'react'
import { Container, Table } from 'react-bootstrap';

function SummaryTable({data}) {

    const calculateProductsTotal = (Geographies, productKey) => {
        return Geographies.reduce((total, geo) => total + geo[productKey], 0);
    };

    return (
        <Container>
        <h4 style={{ textAlign: 'center' }}>Summary</h4>
        <hr/>
        <Table bordered responsive className='table-sm' style={{ tableLayout: 'fixed' }}>
            <thead>
            <tr>
                <th style={{ fontSize: '18px' }}> Products </th>
                <th style={{ textAlign: 'center',fontSize: '18px' }}> Product 1 </th>
                <th style={{ textAlign: 'center',fontSize: '18px' }}> Product 2 </th>
                <th style={{ textAlign: 'center',fontSize: '18px' }}> Product 3 </th>
                <th style={{ textAlign: 'center',fontSize: '18px' }}> Total </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{ fontSize: '18px' }}> Values </td>
                <td style={{ textAlign: 'center',fontSize: '18px' }}> {calculateProductsTotal(data, "Product 1")} </td>
                <td style={{ textAlign: 'center',fontSize: '18px' }}> {calculateProductsTotal(data, "Product 2")} </td>
                <td style={{ textAlign: 'center',fontSize: '18px' }}> {calculateProductsTotal(data, "Product 3")} </td>
                <td style={{ textAlign: 'center',fontSize: '18px' }}> {calculateProductsTotal(data, "Product 1") + calculateProductsTotal(data, "Product 2") + calculateProductsTotal(data, "Product 3")} </td>
            </tr>
            </tbody>
        </Table>
        </Container>
    )
}

export default SummaryTable
