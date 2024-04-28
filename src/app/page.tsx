import KanbanBoard from '@/components/KanbanBoard';
import MainLayout from '@/components/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <KanbanBoard />
    </MainLayout>
  );
}
