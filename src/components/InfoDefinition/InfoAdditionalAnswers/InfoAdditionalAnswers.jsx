import {useState} from 'react'

export const InfoAdditionalAnswers = ({answer}) => {
    const [variant, setVariant] = useState(answer)
    const handleInputChange = (e) => {
        setVariant(e.target.value)
    }
    return (
        <li >
            <input type="text" onChange={handleInputChange} value={variant} />
        </li>
    )
}