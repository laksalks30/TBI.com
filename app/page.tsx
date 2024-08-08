import Navbar from '@/Components/Navbar/Navbar';
import ProjectOverview from '@/Components/ProjectOverview/ProjectOverview';
import ResourceManagement from '@/Components/ResourceManagement/ResourceManagement';
import BudgetTracking from '@/Components/BudgetTracking/BudgetTracking';



export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-8">
        <ProjectOverview />
        <div className="mt-8">
          <ResourceManagement />
        </div>
        <div className="mt-8">
          <BudgetTracking />
        </div>
      </div>
    </main>
  );
}
