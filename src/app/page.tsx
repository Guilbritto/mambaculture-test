import { CampainTable } from "@/components/campainTable";
import { CampainTableHeader } from "@/components/campainTableHeader";

export default async function Home() {
  return (
    <div>
      <CampainTableHeader />
      <CampainTable  />
    </div>
  );
}
