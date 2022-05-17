import { useState } from "react";

const SelectInput = ({options}) => {

    const [selected, setSelected] = useState('all')
    
    switch (selected) {
        case 'active':
            // Visi kas atrodas praksē
            break;
        case 'inactive':
            // Visi kas neatrodas praksē
            break;
        default:
            // Visi ieraksti
    }

    return (
        <select className="select-input" value={selected} onChange={e => setSelected(e.target.value)}>
            {options.map((option) =>
            <option value={option.value} key={option.value}>{option.label}</option>
            )}
        </select>
    );
}
 
export default SelectInput;