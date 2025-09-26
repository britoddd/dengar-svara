"use client"

export default function Button({ children, variant = "primary", onClick }) {
  const styles = "px-10 py-3 rounded-md font-medium transition-all w-fit";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent/75",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    tertiary: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button onClick={onClick} className={`${styles} ${variants[variant]}`}>
      {children}
    </button>
  );
}