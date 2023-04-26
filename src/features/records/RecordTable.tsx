import { useSelector } from "react-redux";
import { Popup, Table } from "semantic-ui-react";
import { RootState } from "../../app/store";
import { isPhoneNumber, isEmail } from "../../util/util";
import { Record } from './Record'

export default function RecordTable() {
  const { records } = useSelector((state: RootState) => state.record);

  const RecordBody = () => {
    const recordsMapped = records.map((item: Record) => {
      const keys = item.keys();
      let duplicated = []
      for (const key of keys) {
        let finded = records.filter((rec: Record) => rec[key] === item[key]).length;
        if (finded > 1) {
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

    return (
      <>
        {
          recordsMapped.length > 0 ? recordsMapped.map(record => {
            return (
              <>
                <Table.Row>
                  <Table.Cell 
                    style={record.duplicated.includes('name')? { color: 'red'}: null}>
                    {record.name}
                  </Table.Cell>
                  <Table.Cell 
                    style={record.duplicated.includes('email')? { color: 'red'}: null}
                    warning={record.emailIsValid}
                    >
                    {record.emailIsValid ? record.email : <Popup on={'hover'} content='Invalid email' trigger={<p>{record.email}</p>}/>}
                  </Table.Cell>
                  <Table.Cell 
                    style={record.duplicated.includes('phone')? { color: 'red'}: null}
                    warning={record.phoneIsValid}
                    >
                    {record.phoneIsValid ? record.phone : <Popup on={'hover'} content='Invalid phone' trigger={<p>{record.phone}</p>}/>}
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
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Phone</Table.HeaderCell>
        </Table.Row>
        {records.length > 0 ? <RecordBody /> : <p> Not Record Allowed</p>}
      </Table.Header>
    </Table>
  </>
  );
}