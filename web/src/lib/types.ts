import { z } from "zod";

const commonNumberRule = z
    .number({error: (iss) => iss.input === "" ? "Este campo é obrigatório." : undefined})
    .refine(
        val => !isNaN(val) && val > 0 && val <= 10000, "O valor deste campo deve ser um número inteiro entre 0 e 10.000!"
    );

export const formSchema = z
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

export const responseSchema = z
    .object({
        first_number: z.number(),
        last_number:  z.number(),
        lcm: z.number()
    })

export type IFormSchema = z.infer<typeof formSchema>;

export type IResponseSchema = z.infer<typeof responseSchema>;