import { CampainTable } from "@/app/(app)/components/campainTable";
import { CampainTableHeader } from "@/app/(app)/components/campainTableHeader";
import { getCampain } from "@/app/(app)/data";

export default async function Home() {
  const campains = await getCampain();
  
  if(campains === null ){
    return <div>Erro ao buscar campanhas</div>
  }

  return (
    <div>
      <CampainTableHeader />
      <CampainTable paginatedCampain={campains} />
      
    </div>
  );
}
