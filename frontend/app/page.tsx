'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">This is a simple school website to fill in the list of schools and students. Please fill in the school data form first</p>
          <button 
          className="btn btn-primary"
            onClick={() => {
              router.push('/school')
            }}
          >
            School</button>
            <button 
          className="btn btn-secondary ml-4"
            onClick={() => {
              router.push('/student')
            }}
          >
            student</button>
        </div>
        
      </div>
    </div>
  );
}
