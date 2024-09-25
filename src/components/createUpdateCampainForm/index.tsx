'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/datePicker'
import { format, formatISO } from 'date-fns'
import { Campain } from '@/types/campain'
import { useModal } from '@/context/useModal'
import { useToast } from '@/hooks/use-toast'
import { createCampain, editCampain } from '@/app/actions'
import { useCampain } from '@/context/useCampain'


export type CreateUpdateCampainFormProps = {
    campain?: Campain
}
export const CreateUpdateCampainForm = ({campain}: CreateUpdateCampainFormProps) => {
    const {closeModal} = useModal()
    const { toast } = useToast()
    const {fetchCampains} = useCampain()
    const formSchema: z.ZodSchema = z.object({
        name: z
            .string()
            .min(2, 'O nome deve conter pelo menos 2 caracteres')
            .max(50, 'O nome deve conter no máximo 50 caracteres'),
        startDate: z.date({message: 'Obrigatório informar uma data Inicial'}),
        endDate: z.date({ message: 'Obrigatório informar uma data Final'}).refine((endDate) => {
            return endDate > form.getValues().startDate;
        }, {
            message: 'A data final deve ser maior que a data inicial'
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: campain?.name ?? '',
            startDate: campain ?  new Date(campain?.startDate ?? '') : null,
            endDate: campain ?  new Date(campain?.endDate ?? '') : null ,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const newCampain: Omit<Campain, 'id'> = {
            name: values.name,
            startDate: values.startDate,
            endDate: values.endDate,
            status: 'active',
            createAt: formatISO(new Date()),
        }

        let response;

        if(campain){
            response = await editCampain({id: campain.id, ...newCampain})
        }else{
            response = await createCampain(newCampain)
        }

        if (!response) {
            toast({
                title: "Erro",
                variant: "destructive",
                description: "Não foi possível salvar as informações, tente novamente mais tarde",
            })
            return
        }

        toast({
            title: "Sucesso",
            description: "Dados salvos com sucesso",
        })
        fetchCampains()
        closeModal()
    }

    return (
        <Form {...form}>
            <h1 className='text-xl text-black pb-3'>
                {campain ? 'Editar campanha' : 'Crie uma nova campanha'}
            </h1>
            <form className='space-y-2' action="" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                    <FormItem>

                        <FormLabel>Nome da campanha</FormLabel>
                        <FormControl>
                            <Input placeholder='Nome' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className='flex gap-5'>
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Data Inicial</FormLabel>
                                <FormControl>
                                    <DatePicker
                                    label={
                                        field.value
                                        ? format(field.value, 'PPP')
                                        : 'Data inicial'
                                    }
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Data Final</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        label={
                                            field.value
                                            ? format(field.value, 'PPP')
                                            : 'Data final'
                                        }
                                        selected={field.value}
                                        onSelect={field.onChange}

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                        }}
                    />
                </div>
                <div className='w-full flex justify-end pt-3'>
                    <Button type="submit" className='w-20 bg-slate-800'>
                        Salvar
                    </Button>
                </div>
            </form>
        </Form>
    )
}

