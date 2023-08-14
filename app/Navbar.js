import Link from "next/link";


export default function Navbar() {
  return (
    <main className="flex flex-col justify-center items-center space-y-10 bg-slate-200 p-12 font-mono">
        <div>
            <Link href='/'>
                <p className="text-6xl font-bold">
                    Mel's Kitchen
                </p>
            </Link>
        </div>
        <div className="flex flex-row justify-center items-center space-x-10">
            <div>
                <Link href='/salads'>
                    <p className="text-3xl font-medium">
                        Salads
                    </p>
                </Link>
            </div>
            <div className="text-3xl font-medium">||</div>
            <div>
                <Link href='/subscription'>
                    <p className="text-3xl font-medium">
                        Subscriptions
                    </p>
                </Link>
            </div>
        </div>
    </main>
  )
}
