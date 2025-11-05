
import React, { useState } from 'react';
import Card from '../components/Card';
import CodeEditor from '../components/CodeEditor';
import { DEFAULT_PORTAL_HTML } from '../constants';

const PortalEditor: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>(DEFAULT_PORTAL_HTML);

  const handleSave = () => {
    // Mock save
    console.log(htmlContent);
    alert('Portal template saved!');
  };
  
  const handleReset = () => {
    if(window.confirm('Are you sure you want to reset to the default template?')) {
        setHtmlContent(DEFAULT_PORTAL_HTML);
    }
  };

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Portal HTML Editor</h1>
        <div className="flex space-x-3">
            <button 
                onClick={handleReset}
                className="px-5 py-2 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500 transition-colors"
            >
                Reset to Default
            </button>
            <button 
                onClick={handleSave}
                className="px-5 py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 transition-colors"
            >
                Save Template
            </button>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="HTML Code" className="flex flex-col">
          <div className="flex-1">
            <CodeEditor value={htmlContent} onChange={setHtmlContent} />
          </div>
        </Card>
        <Card title="Live Preview" className="flex flex-col">
            <div className="w-full h-full bg-white rounded-md overflow-hidden">
                <iframe
                    srcDoc={htmlContent}
                    title="Portal Preview"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                />
            </div>
        </Card>
      </div>
    </div>
  );
};

export default PortalEditor;
