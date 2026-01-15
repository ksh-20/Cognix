const TypingIndicator = () => {
  return (
    <div className="flex gap-1 text-gray-500 px-2">
      <span className="animate-bounce">.</span>
      <span className="animate-bounce delay-150">.</span>
      <span className="animate-bounce delay-300">.</span>
    </div>
  );
};

export default TypingIndicator;