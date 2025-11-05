
import React from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  return (
    <div className="bg-gray-900 border border-gray-600 rounded-lg h-full overflow-hidden">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full bg-transparent text-gray-200 p-4 font-mono text-sm leading-relaxed resize-none focus:outline-none"
        spellCheck="false"
      />
    </div>
  );
};

export default CodeEditor;
