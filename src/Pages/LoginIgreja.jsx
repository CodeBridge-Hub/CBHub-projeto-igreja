import React from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/Logo.png";
import ImgInterior from "../assets/interor-igreja.svg";
import ImgHands from "../assets/hands.svg";
import ImgChurch from "../assets/church.svg";
import IconArrowRight from "../assets/icone-seta-direita.svg";

const LoginIgreja = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <header>
  
        <div className="mx-auto w-full max-w-[1344px] px-6 py-6 flex flex-col sm:flex-row justify-center items-center gap-3 text-center sm:text-left">
          <img
            src={Logo}
            className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px]"
            alt="logo"
          />
          <h2 className="font-bold text-[#0F172A] text-2xl sm:text-3xl lg:text-[40px]">
            Sistema Integrado de Atendimento
          </h2>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1344px] px-4 lg:px-6 py-8">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card login */}
      
          <article className="w-full min-h-[795px] bg-white rounded-[16px] shadow-[0_8px_16px_rgba(113,146,255,.25)] ring-1 ring-[#E2E8F0] p-6">
            <div className="flex flex-col justify-center items-center gap-4">
              <h4 className="text-[20px] leading-tight font-bold text-[#0A1B4B] text-center">
                Atendimento social, jurídico e de saúde, rápido e integrado.
              </h4>

              <div className="w-full max-w-md space-y-4">
                <form className="space-y-4 mt-20 lg:mt-40" noValidate>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[20px] font-bold text-[#0F276D]"
                    >
                      CPF ou E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="email@exemplo.com"
                      autoComplete="username"
                      className="mt-1 w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-[#0F172A] outline-none focus:ring-2 focus:ring-[#3B82F6]"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-[20px] font-bold text-[#0F276D]"
                    >
                      Senha
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="********"
                      autoComplete="current-password"
                      className="mt-1 w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-[#0F172A] outline-none focus:ring-2 focus:ring-[#3B82F6]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-white border border-blue-500 hover:bg-blue-600 px-4 py-2.5 hover:text-white text-sm font-semibold text-[#0F172A] transition-colors"
                  >
                    Fazer Login
                  </button>

                  <div className="flex flex-col text-center text-md gap-5 pt-4">
                    <span>
                      Esqueceu sua senha?{" "}
                      <Link
                        to="/password-recovery"
                        className="text-blue-700 font-semibold"
                      >
                        Recuperar a senha
                      </Link>
                    </span>
                    <span>
                      Não tem conta?{" "}
                      <Link
                        to="/cadastro-pacientes" className="text-blue-700 font-semibold">
                        Criar uma conta
                      </Link>
                    </span>
                    <span>
                      Quer ser um voluntário?{" "}
                      <Link
                        to="/cadastro" className="text-blue-700 font-semibold">
                        Ser um voluntário
                      </Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </article>

          {/* Coluna dos cards da direita */}

          <aside className="w-full">
            <div className="w-full bg-white rounded-[16px] shadow-[0_8px_16px_rgba(113,146,255,.25)] ring-1 ring-[#E2E8F0] p-6">
              <h4 className="text-center text-[20px] leading-[20px] font-bold text-[#0A1B4B]">
                Entenda melhor sobre a instituição.
              </h4>

              {/* Card 1 */}
              <div className="bg-white rounded-[16px] ring-1 ring-[#E2E8F0] shadow-[0_8px_16px_rgba(113,146,255,.25)] overflow-hidden mt-10">
                
                <div className="flex flex-col lg:grid lg:grid-cols-[260px_1fr_auto] lg:items-center lg:gap-[15px] lg:pr-4 lg:py-4">
                  <img
                    src={ImgInterior}
                    alt="Interior da igreja"
                    className="w-full h-48 object-cover lg:w-[258px] lg:h-[203px] lg:rounded-[12px] lg:-ml-4 lg:-mt-4 lg:-mb-4"
                  />
                  <div className="p-4 lg:p-0">
                    <h4 className="text-[20px] font-bold text-[#0F172A] mb-1">
                      Nossa missão
                    </h4>
                    <p className="text-[16px] leading-6 text-[#334155]">
                      Atender a população em situação de vulnerabilidade,
                      promovendo cuidado e inclusão.
                    </p>
                  </div>
                  <button
                    aria-label="Ver mais"
                    className="hidden lg:block shrink-0 rounded-full p-2 ring-[#CBD5E1] hover:bg-[#F1F5F9]"
                  >
                    <img
                      src={IconArrowRight}
                      alt="seta"
                      className="w-[48px] h-[48px] cursor-pointer"
                    />
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-[16px] ring-1 ring-[#E2E8F0] shadow-[0_8px_16px_rgba(113,146,255,.25)] overflow-hidden mt-10">
                <div className="flex flex-col lg:grid lg:grid-cols-[260px_1fr_auto] lg:items-center lg:gap-[15px] lg:pr-4 lg:py-4">
                  <img
                    src={ImgHands}
                    alt="Mãos solidárias"
                    className="w-full h-48 object-cover lg:w-[258px] lg:h-[203px] lg:rounded-[12px] lg:-ml-4 lg:-mt-4 lg:-mb-4"
                  />
                  <div className="p-4 lg:p-0">
                    <h4 className="text-[20px] font-bold text-[#0F172A] mb-1">
                      Sobre a instituição
                    </h4>
                    <p className="text-[16px] leading-6 text-[#334155]">
                      Atender a população em situação de vulnerabilidade,
                      promovendo cuidado e inclusão.
                    </p>
                  </div>
                  <button
                    aria-label="Ver mais"
                    className="hidden lg:block shrink-0 rounded-full p-2 ring-[#CBD5E1] hover:bg-[#F1F5F9]"
                  >
                    <img
                      src={IconArrowRight}
                      alt="seta"
                      className="w-[48px] h-[48px] cursor-pointer"
                    />
                  </button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-[16px] ring-1 ring-[#E2E8F0] shadow-[0_8px_16px_rgba(113,146,255,.25)] overflow-hidden mt-10">
                <div className="flex flex-col lg:grid lg:grid-cols-[260px_1fr_auto] lg:items-center lg:gap-[15px] lg:pr-4 lg:py-4">
                  <img
                    src={ImgChurch}
                    alt="Fachada da igreja"
                    className="w-full h-48 object-cover lg:w-[258px] lg:h-[203px] lg:rounded-[12px] lg:-ml-4 lg:-mt-4 lg:-mb-4"
                  />
                  <div className="p-4 lg:p-0">
                    <h4 className="text-[20px] font-bold text-[#0F172A] mb-1">
                      Como ajudar
                    </h4>
                    <p className="text-[16px] leading-6 text-[#334155]">
                      Atender a população em situação de vulnerabilidade,
                      promovendo cuidado e inclusão.
                    </p>
                  </div>
                  <button
                    aria-label="Ver mais"
                    className="hidden lg:block shrink-0 rounded-full p-2 ring-[#CBD5E1] hover:bg-[#F1F5F9]"
                  >
                    <img
                      src={IconArrowRight}
                      alt="seta"
                      className="w-[48px] h-[48px] cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <footer className="mt-8 py-4">
        
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4 text-center">
            <h5 className="font-normal text-base">
              Data da próxima ação social:
            </h5>
            <h6 className="font-bold text-base text-[#6585E0]">15/10/2025</h6>
            <h5 className="font-normal text-base hidden sm:inline-block">
              Assunto:
            </h5>
            <h6 className="font-bold text-base text-[#6585E0] hidden sm:inline-block">
              Liberdade de Expressão
            </h6>
            <a href="#">
              <h6 className="font-bold text-base text-[#060F2A] underline">
                Ver mais...
              </h6>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};
export default LoginIgreja;
