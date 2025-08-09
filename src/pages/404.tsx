import Link from "next/link"
import {Button} from "@/components/ui/button";

export default function Custom404() {
    return (
        <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="w-full space-y-6 text-center">
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">404</h1>
                    <p className="text-gray-500">
                        Bilinmeyen dijital aleme adım atmış gibisiniz.    
                    </p>
                </div>
                <Button asChild>
                <Link
                    href="/"
                    className="inline-flex h-10 items-center rounded-md px-8 text-sm font-medium  shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 "
                    prefetch={false}
                >
                    Geri Dönelim
                </Link>
                </Button>
            </div>
        </div>
    )
}
