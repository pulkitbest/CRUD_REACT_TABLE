import React from 'react'
import SubGeographyRow from './SubGeographyRow';
import EditSubGeographyRow from './EditSubGeographyRow';
import AddSubGeographyRow from './AddSubGeographyRow';

function RenderSubGeographies({item, subGeographies, targetIndex, editId, setEditId, data, expandedRows, subgeography, setSubgeography, product1, setProduct1, product2, setProduct2, product3, setProduct3}) {
    return (
        <>
            {subGeographies && subGeographies.map((subGeo, index) => <>
                {((targetIndex + 1) * 10000) + index === editId ? <EditSubGeographyRow 
                        item={item}
                        data={data}
                        targetIndex={targetIndex}
                        index={index}
                        expandedRows={expandedRows}
                        subgeography={subgeography}
                        setSubgeography={setSubgeography}
                        product1={product1}
                        setProduct1={setProduct1}
                        product2={product2}
                        setProduct2={setProduct2}
                        product3={product3}
                        setProduct3={setProduct3}
                        subGeo={subGeo}
                    /> : <SubGeographyRow 
                        item={item}
                        data={data}
                        expandedRows={expandedRows}
                        index={index}
                        targetIndex={targetIndex}
                        subGeo={subGeo}
                        setEditId={setEditId}
                        setSubgeography={setSubgeography}
                        setProduct1={setProduct1}
                        setProduct2={setProduct2}
                        setProduct3={setProduct3}
                    />
                }
                </>
            )}
            <AddSubGeographyRow
                data={data}
                item={item}
                expandedRows={expandedRows}
                targetIndex={targetIndex}
            />
        </>   
    )
}

export default RenderSubGeographies
