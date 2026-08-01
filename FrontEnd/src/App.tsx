import { Boxes, Moon, Package, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import ProdutosPage from "./pages/ProdutosPage";

type Tema = "light" | "dark";

export default function App() {
  const [tema, setTema] = useState<Tema>(() =>
    localStorage.getItem("tema") === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    localStorage.setItem("tema", tema);
  }, [tema]);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><Package size={18} /></span>StockManager</div>
        <nav>
          <a href="/produtos" className="nav-link active">
            <Boxes size={17} /> Produtos
          </a>
        </nav>
        <p className="sidebar-footer">Gestão de estoque · V2</p>
      </aside>
      <div className="main">
        <button className="theme-toggle" onClick={() => setTema(tema === "dark" ? "light" : "dark")} aria-label="Alternar tema">
          {tema === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <ProdutosPage />
      </div>
    </div>
  );
}
