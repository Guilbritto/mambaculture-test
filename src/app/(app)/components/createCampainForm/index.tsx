'use client'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/datePicker'
import { format } from 'date-fns'
import { Campain } from '@/types/campain'
import { createCampain } from '@/app/(app)/components/createCampainForm/actions'
import { useRouter } from 'next/navigation'
import { useModal } from '@/context/useModal'
import { useToast } from '@/hooks/use-toast'



export const CreateCampainForm = () => {
    const router = useRouter()
    const {closeModal} = useModal()
    const { toast } = useToast()

    const formSchema: z.ZodSchema = z.object({
        name: z
            .string()
            .min(2, 'O nome deve conter pelo menos 2 caracteres')
            .max(50, 'O nome deve conter no máximo 50 caracteres'),
        startDate: z.date(),
        endDate: z.date().refine((endDate) => {
            return endDate > form.getValues().startDate;
        }, {
            message: 'A data final deve ser maior que a data inicial'
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            startDate: null,
            endDate: null,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const campain: Omit<Campain, 'id'> = {
            name: values.name,
            startDate: values.startDate,
            endDate: values.endDate,
            status: 'active'
        }

        const response = await createCampain(campain)

        if (!response) {
            toast({
                title: "Erro",
                variant: "destructive",
                description: "Não foi possível criar a campanha, tente novamente mais tarde",
            })
            return
        }
        toast({
            title: "Sucesso",
            description: "Campanha criada com sucesso",
        })
        router.refresh()
        closeModal()
    }

    return (
        <Form {...form}>
            <h1 className='text-xl text-black pb-3'>Crie uma nova campanha</h1>
            <form className='space-y-2' action="" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                    <FormItem>
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
                <div className='w-full flex justify-end'>
                    <Button type="submit" className='w-20 bg-slate-800'>Criar</Button>
                </div>
            </form>
        </Form>
    )
}

