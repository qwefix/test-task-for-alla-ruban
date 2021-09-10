import c from './Info.module.css'

function Info({profile,close}) {
    console.log(profile)
    if (!profile) return <div className={c.info_wrapper+' '+c.hidden}/>
    const{firstName,lastName,description,adress}=profile
    return <div className={c.info_wrapper}>
        <div className={c.closeButton} onClick={close}>
            Close
        </div>
        <h4>Profile info</h4>
        <p>Selected Profile: {firstName+' '+lastName}</p>
        <p>Description: {description}</p>
        <p>Address: {adress.city+' '+adress.streetAddress}<br/>
        Index: {adress.zip} <br/>
        State: {adress.state}    
        </p>
    </div>
}
export default Info