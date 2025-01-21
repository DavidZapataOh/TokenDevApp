"use client";


export default function Header() {

  return (
    <header className="ml-64 flex justify-between items-center px-6 py-4 bg-thirty shadow-lg relative z-10">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold text-primary">Dashboard</h1>
        <span className="px-2 py-1 text-md bg-primary/20 text-primary rounded">Pre-alpha</span>
      </div>
      
      <div className="flex items-center gap-12">
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Connect Wallet
        </button>
      </div>
    </header>
  );
}
  

  