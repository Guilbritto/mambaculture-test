'use client'

import { ActionMenu } from "@/app/(app)/components/actionMenu"
import { formatDate } from "@/app/utils/date"
import { Card } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Campain } from "@/types/campain"
import { Paginated } from "@/types/paginated"
import { Pagination, PaginationContent } from "@/components/ui/pagination"
import { getCampain } from "@/app/(app)/data"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {  ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export type CampainTableProps = {
    paginatedCampain: Paginated<Campain[]>
}

export const CampainTable = ({paginatedCampain}: CampainTableProps) => {
    const [campains, setCampains] = useState<Paginated<Campain[]>>(paginatedCampain);

    const handlePrevious = async () => {
        if(campains.prev === null) return

        const response = await getCampain(campains.prev)
        if (response) {
            setCampains(response)
        }
    }

    const handleNext = async () => {
        if(campains.next === null) return

        const response = await getCampain(campains.next)
        if(response){
            setCampains(response)
        }
    }
    
    const isExpired = (endDate: string) => {
        const today = new Date()
        const end = new Date(endDate)
        return today > end
    }

    return (
        <Card>
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead className="w-[200px]">Data Inicio</TableHead>
                        <TableHead className="w-[200px]">Data Fim</TableHead>
                        <TableHead className="w-[200px]">Status</TableHead>
                        <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {campains.data.map((campain) => (
                        <TableRow key={campain.id}>
                            <TableCell>#{campain.id}</TableCell>
                            <TableCell>{campain.name}</TableCell>
                            <TableCell>{formatDate(campain.startDate)}</TableCell>
                            <TableCell>{formatDate(campain.endDate)}</TableCell>
                            <TableCell>{
                                isExpired(campain.endDate) ? 
                                    <Badge className="bg-slate-700/60">Expirado</Badge> : 
                                    <Badge className="bg-slate-700" >Ativo</Badge>}
                            </TableCell>
                            <TableCell>
                                <ActionMenu id={campain?.id}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination className="p-2 justify-end border-t">
                <PaginationContent >
                    <Button className="bg-slate-700 hover:bg-slate-800" onClick={handlePrevious}>
                        <ChevronLeft />
                    </Button>
                    <Button className="bg-slate-700 hover:bg-slate-800" onClick={handleNext}>
                        <ChevronRight />
                    </Button>
                </PaginationContent>
            </Pagination>
        </Card>
    )
}