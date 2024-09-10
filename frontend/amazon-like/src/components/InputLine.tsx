

interface InputType {
    label : string,
    value : string,
    name : string,
    required? : boolean,
    onChange : (evt : any) => void
}

const InputLine = ({label, name, value, onChange, required }: InputType) => {


  return (
    <label className="inputLine-container">
        {label}
        <input 
          value={value} 
          onChange={evt => onChange(evt)} 
          name={name} 
          required={required ? required : false}
          type={name === 'password' ? 'password' : name === 'email' ? 'email' :'text'}
        />
    </label>
  )
}

export default InputLine