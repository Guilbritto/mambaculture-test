'use client'

import { getCampain } from '@/app/data'
import { Campain } from '@/types/campain'
import { Paginated } from '@/types/paginated'
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'

type CampainContextType = {
    campains: Paginated<Campain[]>
    fetchCampains: (page?: number) => Promise<void>
}

const CampainContext = createContext<CampainContextType | undefined>(
  undefined,
)

const CampainProvider = ({ children }: { children: ReactNode }) => {
    const [campains, setCampains] = useState<Paginated<Campain[]>>({} as Paginated<Campain[]>)

    const fetchCampains = useCallback(async (page=1) => {
      const campain = await getCampain(page);
      setCampains(campain ?? {} as Paginated<Campain[]>)
  }, [])

    useEffect(() => {
      if(campains.data) return
      fetchCampains()
    }, [campains.data, fetchCampains])

    return (
        <CampainContext.Provider
            value={{ campains, fetchCampains }}
        >
        {children}
        </CampainContext.Provider>
    )
}

const useCampain = () => {
  const campainContext = useContext(CampainContext)
  if (!campainContext) {
    throw new Error('useCampain must be used within a CampainProvider')
  }
  return campainContext
}
export { CampainContext, CampainProvider, useCampain }
