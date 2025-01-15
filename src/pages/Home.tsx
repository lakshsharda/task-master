import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020817] text-green-500">
      {/* Banner Section */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-white">
          Welcome to TaskMaster
        </h1>
        <p className="text-xl text-green-400 mb-8">
          "Organization is the key to success"
        </p>
        <Link to="/signup">
          <Button size="lg" className="bg-green-500 text-black hover:bg-green-600">
            Get Started
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-green-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">
            Why Choose TaskMaster?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-black p-6 rounded-lg border border-white text-center hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-4 text-green-400">
                Simple
              </h3>
              <p className="text-white">
                Easy-to-use interface for managing your daily tasks.
              </p>
            </div>
            <div className="bg-black p-6 rounded-lg border border-white text-center hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-4 text-green-400">
                Organized
              </h3>
              <p className="text-white">
                Keep track of your tasks with our intuitive organization system.
              </p>
            </div>
            <div className="bg-black p-6 rounded-lg border border-white text-center hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-4 text-green-400">
                Efficient
              </h3>
              <p className="text-white">
                Complete your tasks faster with our streamlined workflow.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black p-4 rounded-lg border border-green-400 text-center hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-green-300">
                Schedule Your Tasks
              </h3>
              <p className="text-white">
                Plan your day effectively with task scheduling.
              </p>
            </div>
            <div className="bg-black p-4 rounded-lg border border-green-400 text-center hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-green-300">
                Prioritize Your Tasks
              </h3>
              <p className="text-white">
                Focus on what matters most with priority settings.
              </p>
            </div>
            <div className="bg-black p-4 rounded-lg border border-green-400 text-center hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-green-300">
                Customizable
              </h3>
              <p className="text-white">
                Tailor TaskMaster to suit your needs and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
