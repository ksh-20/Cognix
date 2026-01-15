interface InputBoxProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

const InputBox = ({ value, onChange, onSend, disabled }: InputBoxProps) => {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
      />
      <button
        onClick={onSend}
        disabled={disabled}
        className="bg-blue-600 text-white px-5 py-2 rounded-full disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
};

export default InputBox;