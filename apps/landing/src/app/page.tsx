import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Phone, BookOpen, AlertTriangle } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" href="#">
                    <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                    <span className="font-bold">Guider</span>
                </Link>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Survive Anything & Everything
                                    </h1>
                                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                        Be prepared for any situation with our
                                        comprehensive emergency guide app. Stay
                                        safe, informed, and ready to act.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button
                                        size="lg"
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        Download Now
                                    </Button>
                                    <Button size="lg" variant="outline">
                                        Learn More
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <Image
                                    alt="Emergency Guide App Preview"
                                    className="aspect-[1/1] overflow-hidden rounded-xl object-contain object-center"
                                    height="600"
                                    src="/placeholder.svg"
                                    width="600"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="features"
                    className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
                >
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            Key Features
                        </h2>
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                            <Card>
                                <CardHeader>
                                    <Shield className="h-10 w-10 text-red-600 mb-2" />
                                    <CardTitle>Emergency Protocols</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Step-by-step guides for various
                                        emergency situations, from natural
                                        disasters to medical emergencies.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Phone className="h-10 w-10 text-red-600 mb-2" />
                                    <CardTitle>
                                        One-Tap Emergency Calls
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Quickly connect with emergency services
                                        with just one tap, including location
                                        sharing.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <BookOpen className="h-10 w-10 text-red-600 mb-2" />
                                    <CardTitle>Offline Access</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        All guides and resources available
                                        offline, ensuring you're prepared even
                                        without internet access.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section
                    id="how-it-works"
                    className="w-full py-12 md:py-24 lg:py-32"
                >
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            How It Works
                        </h2>
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 items-center">
                            <Image
                                alt="How EmergencyGuide Works"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                                height="400"
                                src="/placeholder.svg"
                                width="600"
                            />
                            <div className="flex flex-col justify-center space-y-4">
                                <ul className="grid gap-6">
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">
                                                1. Download the App
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Get EmergencyGuide from your app
                                                store and set up your profile.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">
                                                2. Explore Emergency Guides
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Familiarize yourself with
                                                various emergency protocols and
                                                safety tips.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">
                                                3. Stay Prepared
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Access guides instantly when
                                                needed, even without internet
                                                connection.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="testimonials"
                    className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
                >
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            What Our Users Say
                        </h2>
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                            <Card>
                                <CardContent className="mt-4">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        "This app gave me peace of mind during a
                                        recent power outage. The offline guides
                                        were incredibly helpful."
                                    </p>
                                    <p className="font-semibold mt-4">
                                        - Sarah M.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="mt-4">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        "As a first responder, I recommend this
                                        app to everyone. It's a valuable
                                        resource for any emergency situation."
                                    </p>
                                    <p className="font-semibold mt-4">
                                        - John D., EMT
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="mt-4">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        "The one-tap emergency call feature
                                        potentially saved my life. Everyone
                                        should have this app on their phone."
                                    </p>
                                    <p className="font-semibold mt-4">
                                        - Emily L.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Download EmergencyGuide Today
                                </h2>
                                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Be prepared for any emergency. Download our
                                    app and stay safe.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                                <Button
                                    size="lg"
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Download for iOS
                                </Button>
                                <Button
                                    size="lg"
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Download for Android
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2023 EmergencyGuide Inc. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
