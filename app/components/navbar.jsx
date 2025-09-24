export default function Navbar({ children, variant = "primary", onClick }) {
  const styles = "px-4 py-2 rounded-md font-medium transition-all";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent/75",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    tertiary: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <nav>
      <div></div>
      <div>
        <p>Beranda</p>
        <p>Tentang Kami</p>
        <p>Artikel</p>
        <p>Kontak</p>
      </div>
    </nav>
  );
}
