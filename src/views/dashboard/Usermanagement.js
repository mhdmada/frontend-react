import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['id','name', 'password', 'username']

const UserManagement = () => {
  const [data, setData] = useState({ data: [] });
 
  useEffect(async () => {
    const result = await axios(
      'http://sharingvision-backend.herokuapp.com/user/',
    );
    setData(result.data);
  });


  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              User Management

              <CRow className="align-items-center">
              <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="success">Create</CButton>
              </CCol>
              </CRow>

            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={data.data}
              fields={fields}
              dark
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default UserManagement
