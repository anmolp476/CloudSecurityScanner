import { useState } from "react";

const Login = () => {
  const [accessKeyId, setAccessKeyId] = useState("");
  const [secretAccessKey, setSecretAccessKey] = useState("");

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <h1 className="text-white text-2xl font-semibold mb-1">
          Cloud Scanner
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Enter your AWS credentials to scan for misconfigurations
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm block mb-1">
              Access Key ID
            </label>
            <input
              type="text"
              value={accessKeyId}
              onChange={(e) => setAccessKeyId(e.target.value)}
              placeholder="Enter Access Key ID Here"
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 text-sm border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm block mb-1">
              Secret Access Key
            </label>
            <input
              type="password"
              value={secretAccessKey}
              onChange={(e) => setSecretAccessKey(e.target.value)}
              placeholder="Enter Secret Access Key Here"
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 text-sm border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-3 text-sm font-medium transition-colors mt-2">
            Start Scan
          </button>
        </div>

        <p className="text-gray-600 text-xs mt-6 text-center">
          Credentials are never stored and only used to read your AWS resources
        </p>
      </div>
    </div>
  );
};

export default Login;
