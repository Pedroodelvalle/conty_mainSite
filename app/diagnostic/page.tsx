import TestScript from "../components/test-script"

export default function DiagnosticPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">JavaScript Diagnostic Page</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Instructions</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Open your browser's developer console (F12 or right-click → Inspect → Console)</li>
          <li>Look for any error messages, especially ones mentioning "Unexpected token '&lt;'"</li>
          <li>Note the file path or URL mentioned in the error</li>
        </ol>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Common Causes</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>A JavaScript file is returning HTML instead of JavaScript (404 error)</li>
          <li>Issues with how JavaScript is being bundled or processed</li>
          <li>Mixing client-side and server-side code incorrectly</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
        <p>After identifying the specific file causing the error, check:</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>If the file exists in your project</li>
          <li>If there are any import errors in your code</li>
          <li>If you're using any browser-specific APIs in server components</li>
        </ul>
      </div>

      <TestScript />
    </div>
  )
}

