import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup, Table } from "semantic-ui-react";
import { RootState } from "../../app/store";
import { isPhoneNumber, isEmail } from "../../util/util";
import { heartBeat, setContactCount, setDuplicatedCount } from "./recordSlice";

export default function RecordTable() {
  const { records, duplicatedCount, contanctCount } = useSelector((state: RootState) => state.record);
  const dispatch = useDispatch<any>()

  useEffect(() => {
    setInterval(() => dispatch(heartBeat()), 8000)
  }, [])

  const RecordBody = () => {
    let contacts = records.map((item => item.name));

    let contactCount: string[] = []

    for (const con of contacts) {
      if (!contactCount.includes(con)) {
        contactCount.push(con)
      }
    }
    
    dispatch(setContactCount(contactCount.length))
    const recordsMapped = records.map((item: any) => {
      const keys: any[] = Object.keys(item);
      let duplicated = []
      for (const key of keys) {
        let finded = records.filter((rec: any) => rec[key] === item[key]).length;
        if (finded > 1 && ['name','phone','email'].includes(key)) {
          duplicated.push(key)
        }
      }
      return {
        name: item.name,
        phone: item.phone,
        email: item.email,
        key: item.id,
        phoneIsValid: isPhoneNumber(item.phone),
        emailIsValid: isEmail(item.email),
        duplicated
      }
    })

    dispatch(setDuplicatedCount(recordsMapped.filter( item => item.duplicated.length > 0 ).length))
    return (
      <>
        {
          recordsMapped.length > 0 ? recordsMapped.map(record => {
            return (
              <>
                <Table.Row>
                  <Table.Cell
                    style={record.duplicated.includes('name') ? { color: 'red' } : null}>
                    {record.name}
                  </Table.Cell>
                  <Table.Cell
                    style={record.duplicated.includes('email') ? { color: 'red' } : null}
                    warning={!record.emailIsValid}
                  >
                    {record.emailIsValid ? record.email : <Popup on={'hover'} content='Invalid email' trigger={<p>{record.email}</p>} />}
                  </Table.Cell>
                  <Table.Cell
                    style={record.duplicated.includes('phone') ? { color: 'red' } : null}
                    warning={!record.phoneIsValid}
                  >
                    {record.phoneIsValid ? record.phone : <Popup on={'hover'} content='Invalid phone' trigger={<p>{record.phone}</p>} />}
                  </Table.Cell>
                </Table.Row>
              </>
            )
          }) : null
        }
      </>
    )
  }
  return (<>
     <div>
      Datos Duplicados : {duplicatedCount}
    </div>
    <div style={{paddingLeft: '3rem'}}>
      Contactos : {contanctCount}
    </div>
    <div style={{paddingLeft: '3rem'}}>
      Registros : {records.length}
    </div>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Phone</Table.HeaderCell>
        </Table.Row>
        {records.length > 0 ? <RecordBody /> : "No Records available"}
      </Table.Header>
    </Table>
  </>
  );
}

