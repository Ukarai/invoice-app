import { Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-pink-50">
      <header className="bg-teal-200 py-4 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Invoice Processor
        </h1>
      </header>
      <div className="max-w-6xl mx-auto p-4">
        {/* Navigation Links */}
        <nav className="flex justify-center space-x-4 mb-6">
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Invoice Management
          </Link>
          <Link
            to="/vendors"
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Vendor Management
          </Link>
        </nav>
      </div>
      <footer className="text-center py-4 text-gray-600">
        &copy; {new Date().getFullYear()} Invoice Processor. All rights
        reserved.
      </footer>
    </div>
  );
}

export default App;
