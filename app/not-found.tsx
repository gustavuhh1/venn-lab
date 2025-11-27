"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { BackgroundLines } from "../components/ui/background-lines";

export default function NotFound() {
  const accentColors = {
    a: "#22C55E",
    b: "#F97316",
    c: "#3B82F6",
    d: "#c80bcb",
  };

  return (
    <main className="mx-auto flex flex-col items-center justify-between xl:max-w-7xl overflow-hidden">
      <section className="hero flex-center relative min-h-screen w-full px-10">
        {/* BackgroundLines component */}
        <BackgroundLines className="absolute inset-0 z-0">
          <div />
        </BackgroundLines>

        {/* Conteúdo com z-index maior que o background */}
        <div className="flex-center relative z-10 flex-col gap-8 pb-20 text-center">
          {/* Logo e número 404 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-9xl font-bold text-gray-200 opacity-30">
                ∅
              </div>
            </div>
            <Image
              src="/logomarca.svg"
              alt="Logomarca do Espaço Venn"
              width={200}
              height={200}
              className="relative z-10"
            />
          </div>

          {/* Título e subtítulo */}
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold text-gray-900">
              Oops! Página Não Encontrada
            </h1>
            <p className="max-w-2xl text-xl text-gray-600">
              Parece que você se perdeu no Espaço Venn! 😅
            </p>
          </div>

          {/* Piada sobre conjunto vazio */}
          <div
            className="rounded-lg border-2 p-8"
            style={{
              borderColor: accentColors.a,
              backgroundColor: `${accentColors.a}15`,
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-6xl">📊</span>
              <p className="max-w-md text-lg font-semibold text-gray-800">
                Você descobriu o{" "}
                <span className="font-bold">Conjunto Vazio</span>! ∅
              </p>
              <p className="max-w-md text-sm text-gray-600">
                Esta rota não contém elementos. Nem mesmo a união com outras
                rotas a salvaria! 😄
              </p>
            </div>
          </div>

          {/* Mensagens matemáticas */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg p-4 text-sm font-medium text-gray-700">
              <span
                className="inline-block rounded px-2 py-1"
                style={{
                  backgroundColor: `${accentColors.b}30`,
                  color: accentColors.b,
                }}
              >
                ∅ ∪ A = A
              </span>
            </div>
            <div className="rounded-lg p-4 text-sm font-medium text-gray-700">
              <span
                className="inline-block rounded px-2 py-1"
                style={{
                  backgroundColor: `${accentColors.c}30`,
                  color: accentColors.c,
                }}
              >
                ∅ ∩ A = ∅
              </span>
            </div>
            <div className="rounded-lg p-4 text-sm font-medium text-gray-700">
              <span
                className="inline-block rounded px-2 py-1"
                style={{
                  backgroundColor: `${accentColors.d}30`,
                  color: accentColors.d,
                }}
              >
                |∅| = 0
              </span>
            </div>
          </div>

          {/* Botão para voltar */}
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105"
            style={{
              backgroundColor: accentColors.a,
            }}
          >
            <ArrowLeftIcon size={24} weight="bold" />
            Voltar ao Espaço Venn
          </Link>

          {/* Easter egg - informação legal */}
          <p className="mt-4 text-xs text-gray-500">
            Dica: Um conjunto vazio nunca está sozinho na matemática! 🤓
          </p>
        </div>
      </section>
    </main>
  );
}
