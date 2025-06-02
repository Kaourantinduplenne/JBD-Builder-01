import dynamic from 'next/dynamic';
const RigJBDBuilder = dynamic(() => import('../components/RigJBDBuilder'), { ssr: false });

export default function Home() {
  return (
    <main className="p-4 max-w-5xl mx-auto">
      
      <RigJBDBuilder />
    </main>
  );
}
