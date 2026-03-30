import { useScanStore } from "../store";

const severityColor: Record<string, string> = {
  HIGH: "bg-red-500/10 text-red-400 border-red-500/20",
  MEDIUM: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  LOW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const Dashboard = () => {
  const findings = useScanStore((state) => state.findings);

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-2xl font-semibold mb-1">Scan Results</h1>
        <p className="text-gray-400 text-sm mb-8">
          {findings.length} issue{findings.length !== 1 ? "s" : ""} found
        </p>

        <div className="space-y-4">
          {findings.map((finding) => (
            <div
              key={finding.resource}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">
                  {finding.resource}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full border font-medium ${severityColor[finding.severity] || severityColor.LOW}`}
                >
                  {finding.severity}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{finding.rule}</p>
            </div>
          ))}

          {findings.length === 0 && (
            <div className="text-center text-gray-500 py-16">
              No issues found — your AWS account looks clean!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
