import { useForm } from "react-hook-form";

import { z } from "zod";

import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { zodResolver } from "@hookform/resolvers/zod";

const commonNumberRule = z
    .number({error: (iss) => iss.input === "" ? "Este campo é obrigatório." : undefined})
    .refine(
        val => !isNaN(val) && val > 0 && val <= 10000, "O valor deste campo deve ser um número inteiro entre 0 e 10.000!"
    );

const formSchema = z
    .object({
        first_number:commonNumberRule,
        last_number: commonNumberRule
    })
    .refine(data => data.first_number < data.last_number, {
        message: 'O primeiro elemento do intervalo deve ser menor do que o último!',
        path: ["last_number"]
    })
    .refine(data => data.last_number - data.first_number > 0, {
        message: 'O tamanho do intervalo deve ser maior do que 0(zero)!',
        path: ["last_number"]
    })

type IFormSchema = z.infer<typeof formSchema>;

export default function LCMIntervalForm(){
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<IFormSchema>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data) => {
        await new Promise(resolver => setTimeout(resolver, 1000))
        reset();
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
            <Button disabled={isSubmitting}>CALCULAR</Button>
        </div>
    </form>
}