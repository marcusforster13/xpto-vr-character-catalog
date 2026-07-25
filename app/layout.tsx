import type { Metadata } from "next";
import "./globals.css";
const siteUrl=process.env.NEXT_PUBLIC_SITE_URL??"http://localhost:3000";
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:"XPTO Character Systems — Catálogo VR",description:"Biblioteca de personagens 3D full rigged para treinamento em realidade virtual.",openGraph:{title:"XPTO Character Systems",description:"Personagens para o campo virtual — 14 modelos, 01 rig canônico.",images:[{url:"/og.png",width:1672,height:941,alt:"XPTO Character Systems"}]},twitter:{card:"summary_large_image",title:"XPTO Character Systems",description:"Personagens para o campo virtual.",images:["/og.png"]}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR"><body>{children}</body></html>}
