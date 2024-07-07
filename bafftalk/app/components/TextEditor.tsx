import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface TextEditorProps {
  onChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onChange }) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (content: string) => {
    setValue(content);
    onChange(content); // Call the passed in onChange function
  };

  return (
    <div>
      <ReactQuill value={value} onChange={handleChange} />
    </div>
  );
};

export default TextEditor;
