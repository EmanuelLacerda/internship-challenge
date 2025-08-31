import { Button } from "../../components/button";
import { Input } from "../../components/input";

export default function LCMIntervalCard(){
    return <form
    className="form-element"
    method="post"
    >
        <div className="form-body">
            <Input
            id="first_number"
            name="first_number"
            label="Primeiro elemento:"
            />
            <Input
            id="last_number"
            name="last_number"
            label="Segundo elemento:"
            />
        </div>
        <div className="form-footer">
            <Button>CALCULAR</Button>
        </div>
    </form>
}