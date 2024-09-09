

interface InputType {
    label : string,
    value : string,
    name : string,
    onChange : (evt : any) => void
}

const InputLine = ({label, name, value, onChange }: InputType) => {


  return (
    <label>
        {label}
        <input value={value} onChange={evt => onChange(evt)} name={name} type={name === 'password' ? 'password' : name === 'email' ? 'email' :'text'}/>
    </label>
  )
}

export default InputLine