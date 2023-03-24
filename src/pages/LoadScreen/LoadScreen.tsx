import Centered from "../../layouts/Centered";
import loader from '../../assets/loader.svg'

export default function LoadScreen() {
    return (
        <Centered>
            <img src={loader} />
        </Centered>
    )
}