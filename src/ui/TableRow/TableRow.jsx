function TableRow(props){
    const{id,reduxID,firstName,lastName,email,phone,adress:{state},select}=props
    return <tr onClick={()=>{select(reduxID)}}>
        <td>{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{state}</td>
    </tr>
}

export default TableRow