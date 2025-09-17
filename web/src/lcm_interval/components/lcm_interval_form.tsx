import { useForm } from "react-hook-form";

import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnumTypeText, Text } from "../../components/text";

import useLCMInterval from "../../hooks/use-lcm-interval"
import { useState } from "react";
import { formSchema, type IFormSchema, type IResponseSchema } from "../../lib/types";
import type { AxiosResponse } from "axios";


export default function LCMIntervalForm(){
    const [ lcmResult, setLCMResult ] = useState<IResponseSchema|null>(null)
    const [ requestErrors, setRequestErrors ] = useState<Array<string>|null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IFormSchema>({
        resolver: zodResolver(formSchema),
    })
    const {calculateLCMInterval} = useLCMInterval("lcm-interval-calculation/")

    const fieldMap = {
        "first_number": "Primeiro elemento",
        "last_number": "Último elemento"
    }

    const onSubmit = async (data: IFormSchema) => {
        const response = await calculateLCMInterval(data)

        if((response as AxiosResponse).status === 200){
            setLCMResult({
                ...(response as AxiosResponse).data
            })
        } else if((response as AxiosResponse).status === 400){
            if(typeof (response as AxiosResponse).data === "string"){
                setRequestErrors([(response as AxiosResponse).data])
            } else if(typeof (response as AxiosResponse).data === "object"){
                const requestErrorsArray = []

                for(const error_name of Object.keys((response as AxiosResponse).data)){
                    requestErrorsArray.push(fieldMap[error_name as keyof typeof fieldMap] ? `${fieldMap[error_name as keyof typeof fieldMap]}:   ${(response as AxiosResponse).data[error_name][0].toLowerCase()}` : (response as AxiosResponse).data[error_name][0])
                }

                setRequestErrors(requestErrorsArray)
            }
        }
    }

    return <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-element"
        method="post"
    >
        <div className="form-body">
            <Input
                {...register('first_number', {setValueAs: value => value != "" ? Number(value) : value})}
                id="first_number"
                name="first_number"
                label="Primeiro elemento:"
                type="number"
                errorMessage={errors.first_number ? errors.first_number.message : ""}
                
            />
            
            <Input
                {...register('last_number', {setValueAs: value => value != "" ? Number(value) : value})}
                id="last_number"
                name="last_number"
                label="Último elemento:"
                type="number"
                errorMessage={errors.last_number ? errors.last_number.message : ""}
            />
        </div>
        <div className="form-footer">
            <Button disabled={isSubmitting} onClick={() => setLCMResult(null)}>CALCULAR</Button>
        </div>
        {requestErrors && <ul className="error-message-container" style={{"listStyleType": "none"}}>
            {requestErrors?.map((
                error, index) => <li key={`${index}-${error}`}>
                    <Text type={EnumTypeText.errorFeedbackRegular}>{error}</Text>
                </li>
            )}
        </ul>}
        {lcmResult && <div className="result_container">
            <Text type={EnumTypeText.body1bold} as="span">O MMC dos números entre {lcmResult.first_number} e {lcmResult.last_number}:</Text>
            <Text type={EnumTypeText.body1regular} as="span">{lcmResult.lcm}</Text>
        </div>}
    </form>
}