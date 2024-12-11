import React from "react";

interface TextareaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder = "Enter text here...",
  rows = 4,
  className = "",
}) => {
  return (
    <textarea
      className={`textarea ${className}`}
      style={{
        borderRadius: "8px",
        border: "1px solid var(--md-sys-color-outline)",
        backgroundColor: "var(--md-sys-color-surface-container)",
        color: "var(--md-sys-color-on-surface)",
        padding: "12px",
        fontSize: "16px",
        width: "100%",
        boxSizing: "border-box",
        outline: "none",
        transition: "border-color 0.3s ease",
      }}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
    />
  );
};

export default Textarea;
