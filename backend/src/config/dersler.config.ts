export interface DersConfig {
  id: string;
  title: string;
  icon: string;
  path: string;
  konuSayisi: number;
}
export const derslerConfig: DersConfig[] = [
  { id: 'turkce', title: "Türkçe", icon: "📖", path: "/turkce", konuSayisi: 12 },
  { id: 'matematik', title: "Matematik", icon: "➗", path: "/matematik", konuSayisi: 6 },
  { id: 'geometri', title: "Geometri", icon: "📐", path: "/geometri", konuSayisi: 8 },
  { id: 'fizik', title: "Fizik", icon: "🧲", path: "/fizik", konuSayisi: 26 },
  { id: 'kimya', title: "Kimya", icon: "⚗️", path: "/kimya", konuSayisi: 19 },
  { id: 'biyoloji', title: "Biyoloji", icon: "🧬", path: "/biyoloji", konuSayisi: 20 },
  { id: 'tarih', title: "Tarih", icon: "🏛️", path: "/tarih", konuSayisi: 11 },
  { id: 'cografya', title: "Coğrafya", icon: "🗺️", path: "/cografya", konuSayisi: 13 },
  { id: 'felsefe', title: "Felsefe", icon: "💭", path: "/felsefe", konuSayisi: 8 },
  { id: 'din', title: "Din Kültürü", icon: "🕌", path: "/din", konuSayisi: 7 },
];