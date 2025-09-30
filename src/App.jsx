import { useEffect, useMemo, useState } from "react";

/**
 * Single-page, bilingual decision tree (RU primary, EN secondary).
 * Чистые Tailwind-утилиты, без @apply и кастомных цветов.
 * CTA — orange-600/700; навигация/язык/лого — blue-600/700.
 */

const LINKS = {
  vote: "https://vote.nyc",
  register: "https://e-register.vote.nyc/registration",
  absentee: "https://requestballot.vote.nyc/absentee",
  earlymail: "https://requestballot.vote.nyc/earlymail",
};

const NAMES_RU = {
  intro: "Вступление",
  offer: "Программа",
  support: "Поддержка",
  yes: "Ветка: Да",
  lean: "Ветка: Скорее/Не уверен",
  oppose: "Ветка: Против",
  plan: "План голосования",
  ask: "Предложение для сторонников",
  details: "Контакты",
  wrap_no: "Завершение (против)",
  wrap: "Завершение",
};

const NAMES_EN = {
  intro: "Introduction",
  offer: "Offer",
  support: "Support",
  yes: "Branch: Yes",
  lean: "Branch: Lean/Undecided",
  oppose: "Branch: Opposed",
  plan: "Voting plan",
  ask: "Supporter ask",
  details: "Details",
  wrap_no: "Wrap (opposed)",
  wrap: "Wrap",
};

function Btn({ children, variant = "solid", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants = {
    solid:
      "bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-600",
    outline:
      "border border-slate-300 text-slate-800 hover:bg-slate-100 focus-visible:ring-slate-400",
    ghost:
      "text-slate-800 hover:bg-slate-100 focus-visible:ring-slate-400",
  };
  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}

function SegBtn({ active, children, ...props }) {
  return (
    <button
      aria-pressed={active}
      className={`inline-flex items-center rounded-xl border px-3 py-2 text-sm font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        active
          ? "border-blue-600 text-blue-700 focus-visible:ring-blue-600"
          : "border-slate-300 text-slate-800 hover:bg-slate-100 focus-visible:ring-slate-400"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

function Node({ id, activeId, children }) {
  return (
    <section
      data-node={id}
      className={[
        "rounded-xl border border-slate-200 bg-slate-50 p-4",
        activeId === id ? "" : "hidden",
      ].join(" ")}
    >
      {children}
    </section>
  );
}

function LangLine({ ru, en, className = "" }) {
  return (
    <div className={className}>
      <div className="ru">{ru}</div>
      <div className="en text-slate-600 text-[0.95em]">{en}</div>
    </div>
  );
}

function TopBar({ lang, setLang, crumbsRU, crumbsEN }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-blue-600 font-bold text-white">
            Z
          </div>
          <div className="font-semibold">Zohran 2025 — Door Script</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="rounded-full border border-slate-300 px-2 py-0.5 text-[11px] text-slate-600">
            Decision Tree
          </span>
          <SegBtn active={lang === "RU"} onClick={() => setLang("RU")}>RU</SegBtn>
          <SegBtn active={lang === "EN"} onClick={() => setLang("EN")}>EN</SegBtn>
          <SegBtn active={lang === "BOTH"} onClick={() => setLang("BOTH")}>RU+EN</SegBtn>
          <SegBtn
            onClick={() => {
              window.location.hash = "#intro";
              window.location.reload();
            }}
          >
            Reset
          </SegBtn>
          <SegBtn onClick={() => window.print()}>Print</SegBtn>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 px-4 pb-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-3">
          <div className="ru text-sm">
            <strong>Маршрут:</strong>{" "}
            <span className="text-slate-600">{crumbsRU || "Начало"}</span>
          </div>
          <div className="en text-sm">
            <strong>Path:</strong>{" "}
            <span className="text-slate-600">{crumbsEN || "Start"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  const [lang, setLang] = useState(localStorage.getItem("zcg-lang") || "RU");
  const [active, setActive] = useState("intro");
  const [trail, setTrail] = useState(["intro"]);
  const [noteRU, setNoteRU] = useState(
    JSON.parse(localStorage.getItem("zcg-notes") || "{}").issueRU || ""
  );
  const [noteEN, setNoteEN] = useState(
    JSON.parse(localStorage.getItem("zcg-notes") || "{}").issueEN || ""
  );

  // переключение отображения языков: RU — основной, EN — подпись (или оба)
  useEffect(() => {
    localStorage.setItem("zcg-lang", lang);
    const el = document.body;
    el.classList.remove("hidden-ru", "hidden-en");
    if (lang === "RU") el.classList.add("hidden-en");
    if (lang === "EN") el.classList.add("hidden-ru");
  }, [lang]);

  // восстановление активного шага из hash
  useEffect(() => {
    const applyFromHash = () => {
      const parts = window.location.hash.replace("#", "").split("/").filter(Boolean);
      const last = parts[parts.length - 1] || "intro";
      setActive(last);
      setTrail(parts.length ? parts : ["intro"]);
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  // сохранение заметок в localStorage
  useEffect(() => {
    localStorage.setItem(
      "zcg-notes",
      JSON.stringify({ issueRU: noteRU, issueEN: noteEN })
    );
  }, [noteRU, noteEN]);

  const crumbsRU = useMemo(
    () => trail.map((t) => NAMES_RU[t] || t).join(" → "),
    [trail]
  );
  const crumbsEN = useMemo(
    () => trail.map((t) => NAMES_EN[t] || t).join(" → "),
    [trail]
  );

  function go(next) {
    const nextTrail = [...trail, next];
    window.location.hash = nextTrail.join("/");
    // hashchange обновит состояние
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopBar
        lang={lang}
        setLang={setLang}
        crumbsRU={crumbsRU}
        crumbsEN={crumbsEN}
      />

      <main className="mx-auto max-w-5xl px-4 py-6">
        {/* верхняя панель: заметки и ссылки */}
        <section className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="ru text-sm">
              <strong>Пометки:</strong>{" "}
              <input
                value={noteRU}
                onChange={(e) => setNoteRU(e.target.value)}
                className="ml-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-2 py-1"
                placeholder="Что важно человеку"
              />
            </div>
            <div className="en text-sm">
              <strong>Notes:</strong>{" "}
              <input
                value={noteEN}
                onChange={(e) => setNoteEN(e.target.value)}
                className="ml-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-2 py-1"
                placeholder="Voter's key issue"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="text-sm">Официальные ссылки / Official links</div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
                href={LINKS.vote}
                target="_blank"
                rel="noreferrer"
              >
                vote.nyc
              </a>
              <a
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
                href={LINKS.register}
                target="_blank"
                rel="noreferrer"
              >
                e-register
              </a>
              <a
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
                href={LINKS.absentee}
                target="_blank"
                rel="noreferrer"
              >
                absentee
              </a>
              <a
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
                href={LINKS.earlymail}
                target="_blank"
                rel="noreferrer"
              >
                early mail
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="text-sm">Подсказки</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
              <li>Зачитывай даты/адреса с официальных сайтов, не пересказывай.</li>
              <li>Коротко. Без споров. Один чёткий «ask» за разговор.</li>
            </ul>
          </div>
        </section>

        {/* ДЕРЕВО */}
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
          {/* 1 Intro */}
          <Node id="intro" activeId={active}>
            <h2 className="ru text-base font-semibold">1) Вступление</h2>
            <LangLine
              ru='Здравствуйте! [ИМЯ]? Я [ВАШЕ ИМЯ], волонтёр кампании демократического кандидата в мэры — Зохрана Мамдани. 4 ноября выборы мэра.'
              en="Hi! Is [VOTER NAME] available? I’m [YOUR NAME], a volunteer for the Democratic candidate for mayor, Zohran Mamdani. The election is on November 4."
              className="mt-1"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <Btn onClick={() => go("offer")}>Дальше / Next</Btn>
            </div>
          </Node>

          {/* 2 Offer */}
          <Node id="offer" activeId={active}>
            <h2 className="ru text-base font-semibold">2) Коротко о программе</h2>
            <LangLine
              ru="Бесплатные и быстрые автобусы; заморозка аренды для жильцов с регулируемой ставкой; доступный уход за детьми. Что важнее для вас лично?"
              en="Free & fast buses; rent freeze for rent-stabilized tenants; universal childcare. Which matters most to you?"
              className="mt-1"
            />
            <div className="mt-2 text-sm text-slate-600">
              Подсказка: зафиксируйте тему в «Пометках» наверху.
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Btn onClick={() => go("support")}>Дальше / Next</Btn>
            </div>
          </Node>

          {/* 3 Support */}
          <Node id="support" activeId={active}>
            <h2 className="ru text-base font-semibold">3) Вопрос о поддержке</h2>
            <LangLine
              ru="Я поддерживаю Зохрана, потому что ___. А вы планируете голосовать за него?"
              en="I’m voting for Zohran because ___. Do you plan to vote for him?"
              className="mt-1"
            />
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <Btn onClick={() => go("yes")}>Да, твёрдо / Strong Yes</Btn>
              <Btn variant="outline" onClick={() => go("lean")}>Скорее да / Не уверен(а)</Btn>
              <Btn variant="outline" onClick={() => go("oppose")}>Против / Opposed</Btn>
            </div>
          </Node>

          {/* 4A Yes */}
          <Node id="yes" activeId={active}>
            <h2 className="ru text-base font-semibold">4A) Если «Да»</h2>
            <LangLine
              ru="Отлично! 4 ноября участки открыты с 6:00 до 21:00. Досрочное голосование — даты и часы смотрите на официальном сайте."
              en="Great! On Nov 4, polls are open 6AM–9PM. For early voting dates/hours, read from the official site."
              className="mt-1"
            />
            <div className="mt-3">
              <Btn onClick={() => go("plan")}>К плану голосования</Btn>
            </div>
          </Node>

          {/* 4B Lean */}
          <Node id="lean" activeId={active}>
            <h2 className="ru text-base font-semibold">4B) Если «Скорее да / Не уверен(а)»</h2>
            <LangLine
              ru="Понимаю. Что для вас самое важное от мэра? (Коротко перефразируйте и свяжите с пунктами программы.)"
              en="I hear you. What matters most in a mayor? (Reflect briefly and tie to policy.)"
              className="mt-1"
            />
            <div className="mt-3">
              <Btn onClick={() => go("plan")}>К плану голосования</Btn>
            </div>
          </Node>

          {/* 4C Opposed */}
          <Node id="oppose" activeId={active}>
            <h2 className="ru text-base font-semibold">4C) Если «Против»</h2>
            <LangLine
              ru="Спасибо, что сказали. Хорошего дня!"
              en="Thanks for sharing — have a good day!"
              className="mt-1"
            />
            <div className="mt-3">
              <Btn variant="outline" onClick={() => go("wrap_no")}>Завершить</Btn>
            </div>
          </Node>

          {/* 5 Voting plan */}
          <Node id="plan" activeId={active}>
            <h2 className="ru text-base font-semibold">5) План голосования</h2>
            <div className="mt-1 ru">
              <ul className="list-inside list-disc space-y-1">
                <li>Вы зарегистрированы?</li>
                <li>Знаете адрес вашего участка?</li>
                <li>Будете голосовать в день выборов, досрочно или по почте?</li>
              </ul>
            </div>
            <div className="en mt-1">
              Registered? Do you know your poll site address? Will you vote on Election Day, early, or by mail?
            </div>
            <div className="mt-2 text-sm text-slate-600">
              Важно: даты/адреса зачитывайте с официальных страниц:
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <a className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
                 href={LINKS.vote} target="_blank" rel="noreferrer">
                vote.nyc
              </a>
              <a className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
                 href={LINKS.register} target="_blank" rel="noreferrer">
                e-register
              </a>
              <a className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
                 href={LINKS.absentee} target="_blank" rel="noreferrer">
                absentee
              </a>
              <a className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
                 href={LINKS.earlymail} target="_blank" rel="noreferrer">
                early mail
              </a>
            </div>
            <div className="mt-3">
              <Btn onClick={() => go("ask")}>Дальше</Btn>
            </div>
          </Node>

          {/* 6 Supporter ask */}
          <Node id="ask" activeId={active}>
            <h2 className="ru text-base font-semibold">6) Предложение для сторонников</h2>
            <LangLine
              ru="Хотите присоединиться к нашей волонтёрской команде? Мы сообщим о ближайших выходах в Южном Бруклине."
              en="Would you like to join our volunteer team? We will update you on the next canvass in South Brooklyn."
              className="mt-1"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <Btn variant="outline" onClick={() => go("details")}>Оставить контакты</Btn>
              <Btn variant="outline" onClick={() => go("wrap")}>Пропустить</Btn>
            </div>
          </Node>

          {/* 7 Details */}
          <Node id="details" activeId={active}>
            <h2 className="ru text-base font-semibold">7) Контакты (с согласия)</h2>
            <LangLine
              ru="Добавьте номер телефона и email во вкладке Details в MiniVAN."
              en="Add phone and email under Details in MiniVAN (with consent)."
              className="mt-1"
            />
            <div className="mt-3">
              <Btn onClick={() => go("wrap")}>Завершить</Btn>
            </div>
          </Node>

          {/* Wrap nodes */}
          <Node id="wrap_no" activeId={active}>
            <h2 className="ru text-base font-semibold">Завершение</h2>
            <LangLine ru="Спасибо за время!" en="Thanks for your time!" className="mt-1" />
          </Node>

          <Node id="wrap" activeId={active}>
            <h2 className="ru text-base font-semibold">Завершение</h2>
            <LangLine ru="Спасибо!" en="Thanks!" className="mt-1" />
          </Node>
        </section>

        <footer className="mt-6 text-center text-xs text-slate-500">
          Read dates/addresses from official sites only. Single-page in React.
        </footer>
      </main>

      {/* видимость языков через body-классы */}
      <style>{`
        .hidden-en .en { display: none; }
        .hidden-ru .ru { display: none; }
        @media print {
          header { position: static !important; }
          body { background: #fff; }
        }
      `}</style>
    </div>
  );
}
