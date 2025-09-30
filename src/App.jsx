import React, { useState, useMemo } from 'react';
import { Search, Home, Users, DollarSign, Shield, AlertCircle, BookOpen, ChevronRight, Menu, X, MessageSquare, Globe, ExternalLink } from 'lucide-react';

const CanvassingApp = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scriptStep, setScriptStep] = useState('start');
  const [scriptLanguage, setScriptLanguage] = useState('both'); // 'ru', 'en', 'both'

  const sections = {
    home: { title: 'Home', icon: Home },
    script: { title: 'Script', icon: MessageSquare },
    priorities: { title: 'Key Priorities', icon: AlertCircle },
    questions: { title: 'Persuasion Questions', icon: Users },
    affinity: { title: 'Identity-Based Persuasion', icon: Users },
    platform: { title: 'Zohran\'s Platform', icon: DollarSign },
    concerns: { title: 'Addressing Concerns', icon: Shield },
    cuomo: { title: 'About Cuomo', icon: AlertCircle },
    additional: { title: 'Area Report', icon: BookOpen }
  };

  const priorities = [
    {
      title: 'We need a mayor who will fight to lower the cost of living',
      russian: 'Нам ну́жен мэр, кото́рый бу́дет боро́ться за сниже́ние сто́имости жи́зни.',
      english: 'We need a mayor who will fight to lower the cost of living.',
      pronunciation: 'boROtsya (to fight), sniZHEniye (lowering)'
    },
    {
      title: 'About Zohran',
      russian: 'Зохра́н Мамда́ни три сро́ка рабо́тает в Ассамбле́е шта́та Нью-Йо́рк. Он вы́играл пра́ймериз (предвари́тельные вы́боры) на пост мэ́ра в ию́не.',
      english: 'Zohran Mamdani is a 3-term NY Assembly member and won the mayoral primaries in June.',
      pronunciation: 'AssambLEya (Assembly), PRAYmeriz (primaries)'
    },
    {
      title: 'Lowering the cost of living',
      russian: 'Он сни́зит сто́имость жи́зни. Семья́м бо́льше не придётся уезжа́ть из го́рода и́з-за роста аре́нды.',
      english: 'He will lower the cost of living. Families won\'t have to leave due to rising rent.'
    }
  ];

  const persuasionQuestions = [
    {
      category: 'Economic Reality',
      russian: 'Вам то́же ста́ло тру́днее справля́ться с расхо́дами? Аре́нда подня́лась?',
      english: 'Have you also found it harder to afford expenses? Has your rent gone up?',
      pronunciation: 'spravLYAtsya (to cope with), rasKHOdy (expenses)',
      followup: 'If yes: "Zohran will freeze rent for 2+ million rent-stabilized apartments. Куо́мо не замóрозит — аре́нда вы́растет на 5%."'
    },
    {
      category: 'Trump\'s Threats',
      russian: 'Вы зна́ете, что Трамп угрожа́ет уре́зать финанси́рование Нью-Йóрка, е́сли Зохра́н ста́нет мэ́ром? Э́то в ва́ших интере́сах?',
      english: 'Do you know Trump is threatening to cut NYC funding if Zohran becomes mayor? Is that in your interest?',
      pronunciation: 'ugroZHAyet (is threatening), urEzat (to cut)',
      followup: 'Трамп предпочита́ет Куóмо, потомý что с ним мóжно договори́ться. Вы хоти́те мэ́ра, кото́рый продаёт Нью-Йóрк Трáмпу? (Trump prefers Cuomo because he can make deals with him. Do you want a mayor who sells NYC out to Trump?)'
    },
    {
      category: 'Family Future',
      russian: 'Смогу́т ли ва́ши де́ти и вну́ки оста́ться жить в Нью-Йóрке? И́ли им придётся уе́хать во Флóриду и́ли Нью-Дже́рси и́з-за аре́нды $4,000 в ме́сяц?',
      english: 'Will your children and grandchildren be able to stay in New York? Or will they have to move to Florida or New Jersey because rent is $4,000/month?',
      pronunciation: 'SMOgut (will be able), VNUki (grandchildren)',
      followup: 'Зохра́н хóчет, что́бы сле́дующее поколе́ние могло́ стро́ить жизнь здесь — как вы, когда́ приéхали. (Zohran wants the next generation to build lives here — like you did when you arrived.)'
    },
    {
      category: 'Cuomo\'s Record',
      russian: 'Вы пóмните, что Куóмо ушёл в отста́вку в позóре? Сексуа́льные домога́тельства 11 же́нщин. Скрыл смéрти от COVID в дома́х престаре́лых.',
      english: 'Do you remember that Cuomo resigned in disgrace? Sexually harassed 11 women. Covered up COVID deaths in nursing homes.',
      pronunciation: 'otSTAvku (resignation), domoGAtelstva (harassment), prestaRElykh (elderly/nursing)',
      followup: 'DOJ всё ещё рассле́дует егó. Э́то тот челове́к, котóрому вы довéряете? (DOJ is still investigating him. Is that the person you trust?)'
    },
    {
      category: 'Crime Data',
      russian: 'Вы зна́ете, что престу́пность в Нью-Йóрке на истори́ческом ми́нимуме? Уби́йства -34%, стрельба́ -23%.',
      english: 'Do you know that NYC crime is at historic lows? Murders -34%, shootings -23%.',
      pronunciation: 'prestUPnost (crime), istoriCHEskom (historic), uBIYstva (murders)',
      followup: 'Трамп и Куóмо пуга́ют вас специа́льно. Дáнные доказы́вают — го́род безопáснее, чем был. (Trump and Cuomo are scaring you on purpose. Data proves — the city is safer than it was.)'
    },
    {
      category: 'Richest City',
      russian: 'Э́то са́мый бога́тый го́род в са́мой бога́той стране́ ми́ра за всю исто́рию челове́чества. Почему́ мы не мо́жем позво́лить себе́ бесплáтный де́тский сад, когда́ Фра́нция и Герма́ния мо́гут?',
      english: 'This is the richest city in the richest country in the history of the world. Why can\'t we afford free childcare when France and Germany can?',
      pronunciation: 'boGAty (rich), pozVOlit (afford), cheloVEchestva (humanity)',
      followup: 'Де́нег доста́точно. Вопро́с в том, что мы приоритизи́руем — по́мощь рабо́чим лю́дям и́ли нало́говые льго́ты для миллиарде́ров? (There\'s enough money. The question is what we prioritize — helping working people or tax breaks for billionaires?)'
    }
  ];

  const affinityGroups = [
    {
      group: 'Ukrainians / Українці',
      points: [
        {
          russian: 'Зохра́н хóчет останови́ть вóйну в Палести́не. Почемý э́то ва́жно для Украи́ны? Когда́ Изра́иль мóжет соверша́ть престу́пные дéйствия безнаказ́анно, Росси́я ви́дит, что и ей мóжно. Междунарóдное прáво рабóтает для всех и́ли ни для когó.',
          english: 'Zohran wants to stop the war in Palestine. Why does this matter for Ukraine? When Israel can commit criminal actions with impunity, Russia sees that it can too. International law works for everyone or for no one.',
          pronunciation: 'ostanoVIT (to stop), beznaKAZanno (with impunity)'
        },
        {
          russian: 'Путин — автокрáт. Трамп и Путин — друзья́. До недáвнего врéмени Трамп выбирáл Пу́тина, а не Зеле́нского. Куóмо бу́дет рабóтать с Трáмпом. Вам нýжен мэр, котóрый продаёт го́род Трáмпу и Пу́тину?',
          english: 'Putin is an autocrat. Trump and Putin are friends. Until recently Trump chose Putin over Zelensky. Cuomo will work with Trump. Do you want a mayor who sells the city to Trump and Putin?',
          pronunciation: 'avtoKRAT (autocrat), prodaYOt (sells out)'
        }
      ]
    },
    {
      group: 'Central Asians / Орто Азиялықтар (Uzbek, Tajik, Kazakh, Kyrgyz)',
      points: [
        {
          russian: 'Зохра́н — пéрвый мусульмани́н и пéрвый выходе́ц из Ю́жной А́зии, котóрый мóжет стать мэ́ром Нью-Йóрка. Э́то истори́ческий момéнт для на́шего сообщéства.',
          english: 'Zohran is the first Muslim and first South Asian who can become NYC mayor. This is a historic moment for our community.',
          pronunciation: 'musulmaNIN (Muslim), vykhoDEts (person from)'
        }
      ]
    },
    {
      group: 'Orthodox Jews / Ортодоксальные евреи',
      points: [
        {
          russian: 'Зохра́н — не антисеми́т. Егó поддéрживает конгрессмéн Джéрри Нáдлер, котóрый предстaвля́ет евре́йский óкруг и всю жизнь поддéрживал Изра́иль.',
          english: 'Zohran is not an antisemite. He\'s supported by Congressman Jerry Nadler, who represents a Jewish district and has supported Israel his whole life.',
          pronunciation: 'antiseMIT, podDERzhivayet (supports)'
        }
      ]
    }
  ];

  const platform = [
    {
      title: 'Freeze rent',
      russian: 'Заморóзит аре́ндную пла́ту для rent-stabilized (со стабилизи́рованной аре́ндой) жильцо́в',
      english: 'Freeze the rent for rent-stabilized tenants'
    },
    {
      title: 'Raise minimum wage',
      russian: 'Повы́сит минима́льную почасову́ю опла́ту до $30 к 2030 го́ду',
      english: 'Raise the minimum wage to $30/hour by 2030'
    },
    {
      title: 'Affordable housing',
      russian: 'Постро́ит 200,000 кварти́р с досту́пной аре́ндой',
      english: 'Build 200,000 affordable apartments'
    },
    {
      title: 'Free childcare',
      russian: 'Сде́лает де́тский сад бесплáтным для всех дете́й от 6 недéль до 5 лет',
      english: 'Make childcare free for all children from 6 weeks to 5 years old'
    },
    {
      title: 'Against bad landlords',
      russian: 'Ужéсточит мéры прóтив недобросóвестных арендодáтелей',
      english: 'Take action against bad landlords'
    },
    {
      title: 'Free buses',
      russian: 'Сде́лает авто́бусы бы́стрыми и бесплáтными. Зохра́н уже́ запусти́л пило́т бесплат́ных авто́бусов — лю́ди ста́ли бо́льше по́льзоваться авто́бусами, пое́здки ста́ли безопáснее.',
      english: 'Make buses fast and free. Zohran already ran a pilot of free buses and people started to use them more and trips became safer.'
    }
  ];

  const concerns = [
    {
      title: 'Safety / Безопасность',
      russian: 'Я то́же хочу́ жить в безопáсном го́роде. Зохра́н созда́ст но́вый отде́л безопáсности — он бу́дет вклады́вать в психи́ческое здоро́вье, де́лать у́лицы и метро́ безопáснее, сокраща́ть бездо́мность, предотвраща́ть вооружённое наси́лие. Он не про́тив поли́ции, он про́тив того́, что́бы поли́ция — вме́сто того́, что́бы лови́ть реа́льных престу́пников — вози́лась с те́ми, у кого́ психологи́ческие пробле́мы. И́менно поэ́тому он создаёт департа́мент обще́ственной безопа́сности, что́бы на вы́зовы к лю́дям с психи́ческими пробле́мами приезжа́ли социа́льные рабо́тники и подгото́вленные специали́сты, кото́рые мо́гут им помо́чь. Ина́че мы никогда́ не реши́м э́ту пробле́му.',
      english: 'I also want to live in a safe city. Zohran will create a new public safety department that will invest in mental health, make streets and subways safer, reduce homelessness, and prevent gun violence. He\'s not against police — he\'s against police having to deal with mental health crises instead of catching real criminals. That\'s why he\'s creating a public safety department, so that calls involving people with mental health issues are handled by social workers and trained specialists who can actually help them. Otherwise we\'ll never solve this problem.',
      pronunciation: 'bezoPASnost (safety), prestUPnikov (criminals), psikholoGIcheskie (psychological)'
    },
    {
      title: 'Claims of anti-Semitism / Обвинения в антисемитизме',
      russian: 'Зохра́н — не антисеми́т. Он уважа́ет евре́йских ли́деров и рабо́тает с ни́ми по мно́гим вопро́сам. Он хо́чет, что́бы война́ зако́нчилась и изра́ильтяне с палести́нцами жи́ли ми́рно. Его́ поддéрживают мно́гие евре́и Нью-Йо́рка. Конгрессме́н Дже́рри На́длер, кото́рый представля́ет евре́йский о́круг и всю жизнь защища́л Изра́иль, откры́то поддержа́л Зохра́на. Э́то пока́зывает, что обвине́ния в антисемити́зме — э́то поли́тическая мани́пуляция.',
      english: 'Zohran is not an antisemite. He respects Jewish leaders and works with them on many issues. He wants the war to end so Israelis and Palestinians can live in peace. Many New York Jews support him. Congressman Jerry Nadler, who represents a Jewish district and has defended Israel his whole life, openly endorsed Zohran. This shows that antisemitism accusations are political manipulation.',
      pronunciation: 'antiseMIT, podDERzhivayut (support), maniPULyatsiya (manipulation)'
    },
    {
      title: 'Communism/socialism concerns / Страхи о коммунизме',
      russian: 'Зохра́н — не коммуни́ст. «Демократи́ческий социали́зм» зна́чит: эконо́мика до́лжна рабо́тать для просты́х люде́й, кото́рые здесь живу́т и рабо́тают. Он не создаёт но́вый СССР. Он хо́чет, что́бы жизнь в Нью-Йо́рке была́ досту́пнее для просты́х люде́й. Во Фра́нции, Герма́нии, Япо́нии — капиталисти́ческих стра́нах — есть бесплáтный де́тский сад и медици́на. Э́то не коммуни́зм. Э́то забо́та о гра́жданах. Зохра́н хо́чет, что́бы Нью-Йо́рк рабо́тал для тех, кто здесь живёт, а не для миллиарде́ров.',
      english: 'Zohran is not a communist. "Democratic Socialism" means: the economy should work for regular people who live and work here. He\'s not creating a new USSR. He wants to make NYC more affordable for working people. In France, Germany, Japan — capitalist countries — they have free childcare and healthcare. That\'s not communism. That\'s caring for citizens. Zohran wants New York to work for those who live here, not for billionaires.',
      pronunciation: 'kommunIST, dostuPNEye (more affordable), milliardYOrov (billionaires)'
    },
    {
      title: 'How will we pay for it? / Как мы за это заплатим?',
      russian: 'Когда́ говоря́т, что мы не мо́жем э́то позво́лить: «Э́то са́мый бога́тый го́род в са́мой бога́той стране́ ми́ра за всю исто́рию челове́чества. Вы понима́ете, что вы вообще́ говори́те? Де́нег доста́точно, вопро́с в том, как систе́ма вы́строена и что мы приоритизи́руем». Зохра́н возьмёт нало́ги с топ-1% — тех, кто зараба́тывает бо́льше миллио́на до́лларов в год. Не с рабо́чих люде́й. Е́сли уравня́ть корпорати́вный нало́г с у́ровнем Нью-Дже́рси, го́род полу́чит 5 миллиа́рдов до́лларов.',
      english: 'When they say we can\'t afford it: "This is the richest city in the richest country in the history of the world. Do you understand what you\'re even saying? There\'s enough money, the question is how the system is structured and what we prioritize." Zohran will tax the top 1% — those making over $1 million a year. Not working people. Just matching New Jersey\'s corporate tax rate would bring in $5 billion.',
      pronunciation: 'pozVOlit (afford), prioritiZIruyem (prioritize), milliARdov (billions)'
    }
  ];

  const cuomoPoints = [
    {
      russian: 'Куó́мо ста́вит интере́сы бога́тых доно́ров вы́ше интере́сов жи́телей Нью-Йóрка. Когда́ он был губернáтором, он уре́зал финанси́рование тра́нспорта и школ.',
      english: 'Cuomo puts wealthy donors\' interests above NYC residents. When Governor, he cut funding for transit and schools.'
    },
    {
      russian: 'Он сде́лал аре́нду неподъёмной для просты́х люде́й.',
      english: 'He made rent unaffordable for average people.'
    },
    {
      russian: 'Он заста́вил дома́ престаре́лых принима́ть пацие́нтов с COVID и скрыл коли́чество уме́рших.',
      english: 'He forced nursing homes to accept COVID patients and covered up deaths.'
    },
    {
      russian: 'И́з-за егó сканда́лов и преступле́ний ему́ пришло́сь уйти́ в отста́вку.',
      english: 'Because of his scandals and crimes, he had to resign.'
    }
  ];

  // Build searchable content
  const allContent = useMemo(() => {
    const content = [];
    
    // Add priorities
    priorities.forEach(item => {
      content.push({
        section: 'priorities',
        text: `${item.title} ${item.russian} ${item.english} ${item.pronunciation || ''}`
      });
    });

    // Add persuasion questions
    persuasionQuestions.forEach(item => {
      content.push({
        section: 'questions',
        text: `${item.category} ${item.russian} ${item.english} ${item.pronunciation || ''} ${item.followup || ''}`
      });
    });

    // Add affinity groups
    affinityGroups.forEach(group => {
      group.points.forEach(point => {
        content.push({
          section: 'affinity',
          text: `${group.group} ${point.russian} ${point.english} ${point.pronunciation || ''}`
        });
      });
    });

    // Add platform
    platform.forEach(item => {
      content.push({
        section: 'platform',
        text: `${item.title} ${item.russian} ${item.english}`
      });
    });

    // Add concerns
    concerns.forEach(item => {
      content.push({
        section: 'concerns',
        text: `${item.title} ${item.russian} ${item.english}`
      });
    });

    // Add Cuomo points
    cuomoPoints.forEach(item => {
      content.push({
        section: 'cuomo',
        text: `${item.russian} ${item.english}`
      });
    });

    // Add additional content keywords
    content.push({
      section: 'additional',
      text: 'Brighton Beach Brooklyn Russian speakers voting Republican demographics Uzbek Tajik Pakistani Muslim voters primary results crime statistics murders shootings safety Inna Vernikov Gregory Lyakhov Soviet trauma communism socialism bread lines antisemite Palestine Israel Mikhail Novakhov Central Asian Nowruz Odessa Georgia Armenian Ukrainian Putin Trump Cuomo funding referendum recall'
    });

    // Add script content
    content.push({
      section: 'script',
      text: 'canvassing script decision tree door knocking voter outreach volunteer привет здравствуйте голосование выборы мэр волонтер кампания Зохран Мамдани ноября голосовать регистрация участок досрочно почта автобусы аренда детский сад'
    });

    return content;
  }, []);

  // Search logic
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return { matchingSections: new Set(Object.keys(sections)), hasResults: true };
    }

    const query = searchTerm.toLowerCase();
    const matchingSections = new Set();

    allContent.forEach(item => {
      if (item.text.toLowerCase().includes(query)) {
        matchingSections.add(item.section);
      }
    });

    // Also check section titles
    Object.entries(sections).forEach(([key, section]) => {
      if (section.title.toLowerCase().includes(query)) {
        matchingSections.add(key);
      }
    });

    return { 
      matchingSections, 
      hasResults: matchingSections.size > 0 
    };
  }, [searchTerm, allContent]);

  const NavButton = ({ sectionKey, section }) => {
    const Icon = section.icon;
    const isVisible = searchResults.matchingSections.has(sectionKey);
    const hasMatch = searchTerm && isVisible;
    
    if (searchTerm && !isVisible) return null;
    
    return (
      <button
        onClick={() => {
          setActiveSection(sectionKey);
          setMenuOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg transition-all touch-manipulation ${
          activeSection === sectionKey
            ? 'bg-zohran-blue text-white shadow-md'
            : hasMatch
            ? 'bg-white text-black border-2 border-zohran-orange hover:bg-zohran-orange hover:text-white'
            : 'bg-white text-black hover:bg-gray-100 active:bg-gray-200 border border-gray-300'
        }`}
      >
        <Icon size={22} className="flex-shrink-0" />
        <span className="font-medium text-left">{section.title}</span>
        {hasMatch && (
          <span className="ml-auto bg-zohran-orange text-white text-xs px-2 py-1 rounded-full">
            Match
          </span>
        )}
        {!hasMatch && <ChevronRight size={18} className="ml-auto flex-shrink-0" />}
      </button>
    );
  };

  const renderContent = () => {
    // Show no results message if searching and nothing found
    if (searchTerm && !searchResults.hasResults) {
      return (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-black text-lg mb-2">No results found for "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-zohran-blue hover:text-blue-800 font-medium"
          >
            Clear search
          </button>
        </div>
      );
    }

    if (activeSection === 'home') {
      return (
        <div className="space-y-4 sm:space-y-6">
          {searchTerm && (
            <div className="bg-white border-2 border-zohran-orange p-4 rounded">
              <p className="text-black">
                Found matches in {searchResults.matchingSections.size} sections for "{searchTerm}"
              </p>
            </div>
          )}
          
          <div className="bg-zohran-blue text-white p-5 sm:p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Brighton Beach Canvassing Guide</h2>
            <p className="text-white opacity-90 leading-relaxed text-base sm:text-lg">
              Russian-speaking voters for Zohran Mamdani's NYC mayoral campaign
            </p>
          </div>
          
          <div className="bg-white border-2 border-zohran-orange p-4 sm:p-5 rounded">
            <p className="text-black font-medium text-base sm:text-lg">
              Глáвный совéт: Говори́те об эконóмике, а не об идеолóгии / Key tip: Talk about economics, not ideology
            </p>
          </div>

          <div className="grid gap-4">
            <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-blue">
              <h3 className="font-bold text-lg sm:text-xl mb-3 text-zohran-blue">Quick Facts / Быстрые факты</h3>
              <ul className="space-y-2 text-black text-base sm:text-lg">
                <li>✓ 121,607 рýсскоговорящих / Russian speakers in Brooklyn</li>
                <li>✓ 70-80% голосýют за республикáнцев / vote Republican</li>
                <li>✓ Проблéмы: жильё, стóимость, безопáсность / housing, costs, safety</li>
                <li>✓ 36% не говоря́т по-англи́йски / don't speak English</li>
              </ul>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-orange">
              <h3 className="font-bold text-lg sm:text-xl mb-3 text-zohran-blue">Key Messages / Ключевые сообщения</h3>
              <ul className="space-y-2 text-black text-base sm:text-lg">
                <li>🏠 Замóрозка арéнды / Rent freeze</li>
                <li>👶 Бесплáтный детсáд / Free childcare (6 weeks-5 years)</li>
                <li>💰 Повыше́ние минима́льной почасово́й опла́ты до $30 к 2030 / $30 minimum wage by 2030</li>
                <li>🏗️ 200,000 досту́пных кварти́р / affordable apartments</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === 'script') {
      const scriptNodes = {
        start: {
          ru: 'Здра́вствуйте! [И́МЯ]? Я [ВА́ШЕ И́МЯ], волонтёр кампа́нии Зохра́на Мамда́ни. Обхожу́ избира́телей пе́ред вы́борами мэ́ра — метро́ опя́ть подорожа́ло, аре́нда растёт ка́ждый год. Вас э́то то́же доста́ло?',
          en: 'Hi! [NAME]? I\'m [YOUR NAME], volunteering for Zohran Mamdani. I\'m talking to voters before the mayor election - subway prices went up again, rent keeps rising every year. Are you fed up with this too?',
          note: {
            ru: 'ИХ РЕА́КЦИЯ = ВАШ КО́МПАС\n• Соглаша́ются → продолжа́йте\n• Молча́т/ду́мают → да́йте секу́нду, пото́м продолжа́йте\n• Зля́тся на всё → э́то ваш челове́к, рабо́тайте с э́той эне́ргией',
            en: 'THEIR REACTION = YOUR COMPASS\n• Agree → continue\n• Silent/thinking → give a second, then continue\n• Angry at everything → this is your person, work with that energy'
          },
          next: 'check',
          buttonText: { ru: 'Да́льше', en: 'Next' }
        },
        check: {
          ru: 'Я поддéрживаю Зохра́на Мамда́ни — он обеща́ет сде́лать авто́бусы бесплáтными. Представля́ете, ско́лько семья́ сэконо́мит? Что вы об э́том ду́маете?',
          en: 'I support Zohran Mamdani - he promises to make buses free. Can you imagine how much a family would save? What do you think about this?',
          note: {
            ru: 'По отве́ту сра́зу поня́тно:',
            en: 'The answer immediately shows:'
          },
          branches: [
            { label: { ru: '👍 «Бы́ло бы здо́рово!»', en: '👍 "That would be great!"' }, next: 'supporter' },
            { label: { ru: '🤷 «А кто э́то?» / «Как э́то возмо́жно?»', en: '🤷 "Who?" / "How?"' }, next: 'undecided' },
            { label: { ru: '👎 «Э́то нереа́льно» / «Я за друго́го»', en: '👎 "Unrealistic" / "I support someone else"' }, next: 'opposed' }
          ]
        },
        supporter: {
          ru: 'Пра́вда же! И э́то не пусты́е обеща́ния — он уже́ провёл зако́ны о защи́те арендáторов в Ассамбле́е шта́та. Вы бу́дете голосова́ть 4 ноября́?',
          en: 'Right! And these aren\'t empty promises - he already passed tenant protection laws in the State Assembly. Will you vote November 4th?',
          next: 'supporter2',
          buttonText: { ru: 'Да, бу́ду голосова́ть', en: 'Yes, I\'ll vote' }
        },
        supporter2: {
          ru: 'Отли́чно! Кста́ти, мо́жно досро́чно с 25 октября́ — очереде́й нет вообще́. Зна́ете, где ваш уча́сток?',
          en: 'Great! By the way, you can vote early from October 25 - no lines at all. Do you know where your polling site is?',
          next: 'volunteer',
          buttonText: { ru: 'Да́льше', en: 'Next' }
        },
        volunteer: {
          ru: 'Мы в суббо́ту идём по райо́ну, расска́зываем сосе́дям. Хоти́те с на́ми? Два часа́ ма́ксимум.',
          en: 'We\'re walking the neighborhood Saturday, talking to neighbors. Want to join? Two hours max.',
          note: {
            ru: 'Поле́зные фра́зы:\n• «Запишу́ ваш телефо́н?» = Can I get your number?\n• «Вот фла́ер с информа́цией» = Here\'s a flyer with information\n• «Спаси́бо за подде́ржку!» = Thanks for your support!',
            en: 'Useful phrases:\n• Can I get your number?\n• Here\'s a flyer with information\n• Thanks for your support!'
          },
          branches: [
            { label: { ru: 'Записа́ть конта́кт', en: 'Record contact' }, next: 'wrap' },
            { label: { ru: 'Заверши́ть разгово́р', en: 'End conversation' }, next: 'wrap' }
          ]
        },
        undecided: {
          ru: 'Зохра́н — член Ассамбле́и шта́та Нью-Йо́рк. Еди́нственный, кто говори́т о реа́льном сниже́нии цен. Что для вас сейча́с са́мая больша́я пробле́ма в го́роде?',
          en: 'Zohran is a NY State Assembly member. The only one talking about really lowering costs. What\'s your biggest problem with the city right now?',
          next: 'concerns',
          buttonText: { ru: 'Отве́тить на вопро́сы', en: 'Answer questions' }
        },
        concerns: {
          ru: 'ВА́ШИ ОТВЕ́ТЫ НА ИХ ПРОБЛЕ́МЫ:\n\n«Как он э́то опла́тит?»\n→ Нало́г на тех, у кого́ бо́льше 100 миллио́нов до́лларов. Таки́х люде́й в го́роде всего́ не́сколько ты́сяч, но у них миллиа́рды.\n\n«Поли́тики всегда́ обеща́ют»\n→ Согла́сен! Но Зохра́н уже́ доказа́л — он провёл зако́н о защи́те от выселе́ний во вре́мя кови́да. Реа́льно рабо́тает.\n\n«А что с безопа́сностью?»\n→ Когда́ у люде́й есть рабо́та и жильё — у́лицы безопа́снее. Плюс програ́ммы для подро́стков, что́бы не попада́ли в ба́нды.\n\n«Мигра́нты забира́ют ресу́рсы»\n→ Зохра́н сам прие́хал из Уга́нды ребёнком. Он за то, что́бы лю́ди быстре́е получа́ли разреше́ния на рабо́ту — рабо́тают, пла́тят нало́ги, не сидя́т на посо́биях.',
          en: 'YOUR ANSWERS TO THEIR CONCERNS:\n\n"How will he pay for it?"\n→ Tax on those with over $100 million. Only a few thousand people in the city, but they have billions.\n\n"Politicians always promise"\n→ I agree! But Zohran already proved it - he passed the eviction protection law during COVID. Really works.\n\n"What about safety?"\n→ When people have jobs and housing - streets are safer. Plus programs for teenagers to stay out of gangs.\n\n"Migrants take resources"\n→ Zohran himself came from Uganda as a child. He wants people to get work permits faster - they work, pay taxes, don\'t sit on welfare.',
          next: 'undecided_close',
          buttonText: { ru: 'Заверши́ть', en: 'Close' }
        },
        undecided_close: {
          ru: 'Поду́майте об э́том. Вот информа́ция. Гла́вное — проголосу́йте 4 ноября́.',
          en: 'Think about it. Here\'s information. Main thing - vote November 4th.',
          next: 'wrap',
          buttonText: { ru: 'Зако́нчить', en: 'Finish' }
        },
        opposed: {
          ru: 'Поня́тно. Гла́вное — что́бы вы проголосова́ли. Хоро́шего дня!',
          en: 'I understand. The important thing is that you vote. Have a good day!',
          note: {
            ru: '⚠️ НЕ СПО́РЬТЕ. НЕ ТРА́ТЬТЕ ВРЕ́МЯ.',
            en: '⚠️ DON\'T ARGUE. DON\'T WASTE TIME.'
          },
          next: 'wrap',
          buttonText: { ru: 'Заверши́ть', en: 'Finish' }
        },
        wrap: {
          ru: 'Разгово́р завершён. Спаси́бо за ва́шу рабо́ту!',
          en: 'Conversation complete. Thanks for your work!',
          next: 'start',
          buttonText: { ru: 'Нача́ть но́вый разгово́р', en: 'Start new conversation' }
        }
      };

      const currentNode = scriptNodes[scriptStep];

      return (
        <div className="space-y-4">
          {searchTerm && (
            <div className="bg-white border-l-4 border-zohran-orange p-4 rounded mb-4">
              <p className="text-black">Showing results for "{searchTerm}"</p>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue">Script</h2>
            
            {/* Language Toggle */}
            <div className="flex gap-2 bg-white rounded-lg shadow p-1">
              <button
                onClick={() => setScriptLanguage('ru')}
                className={`px-3 py-1.5 rounded transition-all text-sm font-medium ${
                  scriptLanguage === 'ru' 
                    ? 'bg-zohran-blue text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setScriptLanguage('en')}
                className={`px-3 py-1.5 rounded transition-all text-sm font-medium ${
                  scriptLanguage === 'en' 
                    ? 'bg-zohran-blue text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setScriptLanguage('both')}
                className={`px-3 py-1.5 rounded transition-all text-sm font-medium ${
                  scriptLanguage === 'both' 
                    ? 'bg-zohran-blue text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                RU+EN
              </button>
            </div>
          </div>

          {/* Official Resources */}
          <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md border-l-4 border-zohran-orange">
            <h3 className="font-bold text-base sm:text-lg mb-3 text-black">Official NYC Voting Resources / Официа́льные ресу́рсы</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://vote.nyc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded text-sm font-medium transition-colors group"
              >
                <div className="text-left">
                  <div className="text-zohran-blue">vote.nyc</div>
                  <div className="text-xs text-gray-600">Информа́ция о вы́борах</div>
                </div>
                <ExternalLink size={14} className="text-gray-400 group-hover:text-zohran-blue" />
              </a>
              <a
                href="https://e-register.vote.nyc/registration"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded text-sm font-medium transition-colors group"
              >
                <div className="text-left">
                  <div className="text-zohran-blue">Register / Регистра́ция</div>
                  <div className="text-xs text-gray-600">До 25 октября́</div>
                </div>
                <ExternalLink size={14} className="text-gray-400 group-hover:text-zohran-blue" />
              </a>
              <a
                href="https://requestballot.vote.nyc/absentee"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded text-sm font-medium transition-colors group"
              >
                <div className="text-left">
                  <div className="text-zohran-blue">Absentee / Зао́чное</div>
                  <div className="text-xs text-gray-600">Голосова́ние по по́чте</div>
                </div>
                <ExternalLink size={14} className="text-gray-400 group-hover:text-zohran-blue" />
              </a>
              <a
                href="https://requestballot.vote.nyc/earlymail"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded text-sm font-medium transition-colors group"
              >
                <div className="text-left">
                  <div className="text-zohran-blue">Early Mail / Досро́чно</div>
                  <div className="text-xs text-gray-600">25 окт - 2 нояб</div>
                </div>
                <ExternalLink size={14} className="text-gray-400 group-hover:text-zohran-blue" />
              </a>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-2">Материа́лы на ру́сском / Russian Materials:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="https://www.elections.ny.gov/NYSBOE/download/voting/voteformrussian.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded text-sm transition-colors group"
                >
                  <div className="text-left">
                    <div className="text-zohran-blue font-medium">📄 Фо́рма регистра́ции (PDF)</div>
                    <div className="text-xs text-gray-600">Registration form in Russian</div>
                  </div>
                  <ExternalLink size={14} className="text-gray-400 group-hover:text-zohran-blue" />
                </a>
                <a
                  href="https://www.elections.ny.gov/NYSBOE/elections/2024/2024Elections.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded text-sm transition-colors group"
                >
                  <div className="text-left">
                    <div className="text-zohran-blue font-medium">📅 Да́ты вы́боров 2024</div>
                    <div className="text-xs text-gray-600">Election dates & info</div>
                  </div>
                  <ExternalLink size={14} className="text-gray-400 group-hover:text-zohran-blue" />
                </a>
                <a
                  href="https://findmypollsite.vote.nyc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded text-sm transition-colors group"
                >
                  <div className="text-left">
                    <div className="text-zohran-blue font-medium">📍 Найти́ уча́сток</div>
                    <div className="text-xs text-gray-600">Find your poll site</div>
                  </div>
                  <ExternalLink size={14} className="text-gray-400 group-hover:text-zohran-blue" />
                </a>
                <a
                  href="https://vote.nyc/page/voter-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded text-sm transition-colors group"
                >
                  <div className="text-left">
                    <div className="text-zohran-blue font-medium">📖 Voter Guide</div>
                    <div className="text-xs text-gray-600">Гид избира́теля</div>
                  </div>
                  <ExternalLink size={14} className="text-gray-400 group-hover:text-zohran-blue" />
                </a>
              </div>
            </div>
            
            <div className="mt-3 p-3 bg-yellow-50 rounded text-xs text-gray-700">
              <p className="font-semibold mb-1">⚠️ Ва́жные да́ты / Important Dates:</p>
              <ul className="space-y-0.5">
                <li>• Регистра́ция / Registration deadline: <span className="font-bold">Oct 25</span></li>
                <li>• Досро́чное голосова́ние / Early voting: <span className="font-bold">Oct 25 - Nov 2</span></li>
                <li>• День вы́боров / Election Day: <span className="font-bold">Nov 4, 6am-9pm</span></li>
              </ul>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Step: <span className="font-bold text-zohran-blue">{scriptStep.toUpperCase()}</span>
              </span>
              <button
                onClick={() => setScriptStep('start')}
                className="text-sm text-zohran-orange hover:text-orange-700 font-medium"
              >
                Reset Script
              </button>
            </div>
          </div>

          {/* Main Script Content */}
          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-lg border-2 border-zohran-blue">
            <div className="space-y-4">
              {/* Combined Russian and English Text */}
              {scriptLanguage === 'both' && (
                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg">
                  <p className="text-black text-lg sm:text-xl leading-relaxed whitespace-pre-line">
                    {currentNode.ru}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base italic mt-2 leading-relaxed whitespace-pre-line">
                    {currentNode.en}
                  </p>
                  {currentNode.note?.ru && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-700 text-sm whitespace-pre-line">
                        {currentNode.note.ru}
                      </p>
                      <p className="text-gray-500 text-xs italic mt-1 whitespace-pre-line">
                        {currentNode.note.en}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Russian Only */}
              {scriptLanguage === 'ru' && (
                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg">
                  <p className="text-black text-lg sm:text-xl leading-relaxed whitespace-pre-line">
                    {currentNode.ru}
                  </p>
                  {currentNode.note?.ru && (
                    <p className="text-gray-600 text-sm mt-3 italic whitespace-pre-line">
                      {currentNode.note.ru}
                    </p>
                  )}
                </div>
              )}

              {/* English Only */}
              {scriptLanguage === 'en' && (
                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg">
                  <p className="text-black text-lg sm:text-xl leading-relaxed whitespace-pre-line">
                    {currentNode.en}
                  </p>
                  {currentNode.note?.en && (
                    <p className="text-gray-600 text-sm mt-3 italic whitespace-pre-line">
                      {currentNode.note.en}
                    </p>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-4">
                {currentNode.branches ? (
                  <div className="grid gap-3">
                    {currentNode.branches.map((branch, idx) => (
                      <button
                        key={idx}
                        onClick={() => setScriptStep(branch.next)}
                        className="w-full px-4 py-3 sm:py-4 bg-zohran-blue hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-base sm:text-lg shadow-md"
                      >
                        {scriptLanguage === 'ru' && branch.label.ru}
                        {scriptLanguage === 'en' && branch.label.en}
                        {scriptLanguage === 'both' && (
                          <>
                            <span>{branch.label.ru}</span>
                            <span className="block text-sm opacity-90 mt-1">{branch.label.en}</span>
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                ) : currentNode.next && (
                  <button
                    onClick={() => setScriptStep(currentNode.next)}
                    className="w-full px-4 py-3 sm:py-4 bg-zohran-blue hover:bg-blue-700 text-white rounded-lg font-bold transition-colors text-base sm:text-lg shadow-md"
                  >
                    {scriptLanguage === 'ru' && currentNode.buttonText.ru}
                    {scriptLanguage === 'en' && currentNode.buttonText.en}
                    {scriptLanguage === 'both' && (
                      <>
                        <span>{currentNode.buttonText.ru}</span>
                        <span className="text-sm opacity-90"> / {currentNode.buttonText.en}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Cheat Sheet */}
          <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md border-l-4 border-zohran-orange">
            <h3 className="font-bold text-base sm:text-lg mb-3 text-black">Шпарга́лка / Cheat Sheet</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-semibold text-black mb-1">Основно́е сообще́ние / Main message:</p>
                <p className="text-gray-700 italic">"I'm volunteering for Zohran Mamdani for Mayor. He'll make buses free, freeze rent for stabilized tenants, and provide free childcare."</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-semibold text-black mb-1">Да́ты / Dates:</p>
                <p className="text-gray-700">"Election Day is November 4th. Early voting: October 25 to November 2."</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-semibold text-black mb-1">Где голосова́ть / Where to vote:</p>
                <p className="text-gray-700">"Check your poll site at zohranfornyc.com/pollsite"</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-semibold text-black mb-1">Регистра́ция / Registration:</p>
                <p className="text-gray-700">"Register by October 25 at e-register.vote.nyc"</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md border-l-4 border-zohran-red">
            <h3 className="font-bold text-base sm:text-lg mb-3 text-black">Ча́стые вопро́сы / Frequently Asked Questions</h3>
            <div className="space-y-3 text-sm">
              <div className="border-b border-gray-200 pb-3">
                <div className="space-y-1">
                  <p className="font-semibold text-black">В: «А ру́сские за кого́ обы́чно голосу́ют?»</p>
                  <p className="text-gray-600 text-xs italic">Q: "Who do Russians usually vote for?"</p>
                  <p className="text-gray-700 mt-2">О: «За того́, кто сни́зит це́ны и нало́ги. Зохра́н — еди́нственный с конкре́тным пла́ном.»</p>
                  <p className="text-gray-500 text-xs italic">A: "For whoever lowers prices and taxes. Zohran is the only one with a concrete plan."</p>
                </div>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <div className="space-y-1">
                  <p className="font-semibold text-black">В: «Он демокра́т? Они́ же повыша́ют нало́ги!»</p>
                  <p className="text-gray-600 text-xs italic">Q: "He's a Democrat? They raise taxes!"</p>
                  <p className="text-gray-700 mt-2">О: «Он повы́сит нало́ги то́лько миллиардéрам. Е́сли у вас нет 100 миллио́нов — вы сэконо́мите.»</p>
                  <p className="text-gray-500 text-xs italic">A: "He'll only raise taxes on billionaires. If you don't have $100 million — you'll save."</p>
                </div>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <div className="space-y-1">
                  <p className="font-semibold text-black">В: «А что он ду́мает про Изра́иль/Украи́ну/etc?»</p>
                  <p className="text-gray-600 text-xs italic">Q: "What does he think about Israel/Ukraine/etc?"</p>
                  <p className="text-gray-700 mt-2">О: «Он мэр го́рода, не президе́нт. Его́ рабо́та — сни́зить це́ны на метро́ и аре́нду, а не вне́шняя поли́тика.»</p>
                  <p className="text-gray-500 text-xs italic">A: "He's running for mayor, not president. His job is to lower subway and rent prices, not foreign policy."</p>
                </div>
              </div>
              <div>
                <div className="space-y-1">
                  <p className="font-semibold text-black">В: «Почему́ вы э́то де́лаете беспла́тно?»</p>
                  <p className="text-gray-600 text-xs italic">Q: "Why are you doing this for free?"</p>
                  <p className="text-gray-700 mt-2">О: «Потому́ что хочу́ жить в го́роде, где мои́ де́ти смо́гут себе́ позво́лить кварти́ру.»</p>
                  <p className="text-gray-500 text-xs italic">A: "Because I want to live in a city where my kids can afford an apartment."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md border-l-4 border-gray-400">
            <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-700">Как испо́льзовать / How to Use This Script</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Follow the prompts step by step</li>
              <li>• Choose the appropriate response based on voter reaction</li>
              <li>• Use language toggle for Russian/English speakers</li>
              <li>• Reference official voting sites for specific dates/locations</li>
              <li>• Keep it conversational and friendly</li>
            </ul>
          </div>
        </div>
      );
    }
    
    if (activeSection === 'priorities') {
      return (
        <div className="space-y-4">
          {searchTerm && (
            <div className="bg-white border-2 border-zohran-orange p-4 rounded mb-4">
              <p className="text-black font-medium">Showing results for "{searchTerm}"</p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue mb-4">Key Priorities</h2>
          {priorities.map((item, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg sm:text-xl text-zohran-blue mb-3">{item.title}</h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded border-2 border-zohran-blue">
                  <p className="text-black font-medium text-base sm:text-lg">{item.russian}</p>
                </div>
                <p className="text-black italic text-sm sm:text-base">{item.english}</p>
                {item.pronunciation && (
                  <p className="text-zohran-blue text-sm">🔊 {item.pronunciation}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === 'questions') {
      return (
        <div className="space-y-4">
          {searchTerm && (
            <div className="bg-white border-l-4 border-zohran-orange p-4 rounded mb-4">
              <p className="text-black">Showing results for "{searchTerm}"</p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue mb-4">Persuasion Questions</h2>
          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-2 border-zohran-blue mb-6">
            <p className="text-black font-medium text-sm sm:text-base">
              Questions to help voters see voting for Mamdani serves their interests, and that Trump's fear-mongering works against them.
            </p>
          </div>
          {persuasionQuestions.map((q, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-zohran-orange px-3 py-1.5 rounded-full inline-block mb-3">
                <span className="text-white font-semibold text-sm sm:text-base">{q.category}</span>
              </div>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded border-2 border-zohran-blue">
                  <p className="text-black font-medium mb-2 text-base sm:text-lg">{q.russian}</p>
                  <p className="text-black italic text-sm sm:text-base">{q.english}</p>
                  {q.pronunciation && (
                    <p className="text-zohran-blue font-medium text-sm mt-2">🔊 {q.pronunciation}</p>
                  )}
                </div>
                {q.followup && (
                  <div className="bg-white p-3 sm:p-4 rounded border-2 border-zohran-orange">
                    <p className="text-black font-medium text-sm sm:text-base">
                      <span className="text-zohran-orange font-bold">Follow-up:</span> {q.followup}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === 'affinity') {
      return (
        <div className="space-y-4 sm:space-y-6">
          {searchTerm && (
            <div className="bg-white border-l-4 border-zohran-orange p-4 rounded mb-4">
              <p className="text-black">Showing results for "{searchTerm}"</p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue mb-4">Identity-Based Persuasion</h2>
          <p className="text-black bg-white p-4 sm:p-5 rounded-lg border-2 border-zohran-blue text-base sm:text-lg font-medium">
            Tailored talking points for specific community groups in Brighton Beach
          </p>
          {affinityGroups.map((group, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-t-4 border-zohran-orange">
              <h3 className="font-bold text-xl sm:text-2xl text-zohran-blue mb-4">{group.group}</h3>
              <div className="space-y-4">
                {group.points.map((point, pidx) => (
                  <div key={pidx} className="bg-white p-4 sm:p-5 rounded-lg border border-gray-300">
                    <div className="space-y-2">
                      <p className="text-black font-medium leading-relaxed text-base sm:text-lg">{point.russian}</p>
                      <p className="text-black italic text-sm sm:text-base leading-relaxed">{point.english}</p>
                      {point.pronunciation && (
                        <p className="text-zohran-blue font-medium text-sm">🔊 {point.pronunciation}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === 'platform') {
      return (
        <div className="space-y-4">
          {searchTerm && (
            <div className="bg-white border-l-4 border-zohran-orange p-4 rounded mb-4">
              <p className="text-black">Showing results for "{searchTerm}"</p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue mb-4">Zohran's Platform</h2>
          <p className="text-black mb-4 text-base sm:text-lg font-medium">He will... / Он...</p>
          {platform.map((item, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-zohran-orange">
              <h3 className="font-bold text-black mb-2 text-base sm:text-lg">✓ {item.title}</h3>
              <div className="space-y-2">
                <p className="text-black text-base sm:text-lg">{item.russian}</p>
                <p className="text-black italic text-sm sm:text-base">{item.english}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === 'concerns') {
      return (
        <div className="space-y-4">
          {searchTerm && (
            <div className="bg-white border-l-4 border-zohran-orange p-4 rounded mb-4">
              <p className="text-black">Showing results for "{searchTerm}"</p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue mb-4">Addressing Concerns</h2>
          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-2 border-zohran-red mb-6">
            <p className="text-black font-medium text-sm sm:text-base">
              Common concerns from Russian-speaking voters and how to address them effectively. These responses acknowledge their experiences while explaining the differences.
            </p>
          </div>
          {concerns.map((item, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-zohran-red">
              <h3 className="font-bold text-lg sm:text-xl text-zohran-red mb-3">⚠️ {item.title}</h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded border-2 border-zohran-red">
                  <p className="text-black leading-relaxed text-base sm:text-lg">{item.russian}</p>
                </div>
                <p className="text-black italic text-sm sm:text-base leading-relaxed">{item.english}</p>
                {item.pronunciation && (
                  <p className="text-zohran-blue font-medium text-sm">🔊 {item.pronunciation}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === 'cuomo') {
      return (
        <div className="space-y-4">
          {searchTerm && (
            <div className="bg-white border-l-4 border-zohran-orange p-4 rounded mb-4">
              <p className="text-black">Showing results for "{searchTerm}"</p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue mb-4">About Cuomo</h2>
          <div className="bg-white border-2 border-zohran-red p-4 sm:p-5 rounded mb-4">
            <p className="text-zohran-red font-bold text-base sm:text-lg">
              ⚠️ Important information about the main opponent
            </p>
          </div>
          {cuomoPoints.map((item, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-lg shadow-md">
              <div className="space-y-2">
                <p className="text-black font-medium text-base sm:text-lg">{item.russian}</p>
                <p className="text-black italic text-sm sm:text-base">{item.english}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === 'additional') {
      return (
        <div className="space-y-4">
          {searchTerm && (
            <div className="bg-white border-l-4 border-zohran-orange p-4 rounded mb-4">
              <p className="text-black">Showing results for "{searchTerm}"</p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue mb-4">Brighton Beach Area Report</h2>
          
          <div className="bg-zohran-orange text-white p-5 sm:p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg sm:text-xl mb-3">🎯 The Brighton Beach Paradox</h3>
            <p className="leading-relaxed mb-2 text-base sm:text-lg">
              Zohran won Brighton Beach — a neighborhood that voted 75-90% for Trump in 2024.
            </p>
            <p className="text-white opacity-90 text-sm sm:text-base">
              How? Uzbek, Tajik, and Pakistani Muslims overcame Russian-speaking Jewish opposition.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-blue">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-blue mb-3">📊 Quick Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
              <div className="bg-gray-50 p-3 sm:p-4 rounded">
                <p className="font-semibold text-black">Russian speakers:</p>
                <p className="text-black">121,607 in Brooklyn</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded">
                <p className="font-semibold text-black">Typical vote:</p>
                <p className="text-black">70-80% Republican</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded">
                <p className="font-semibold text-black">Don't speak English:</p>
                <p className="text-black">36%</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded">
                <p className="font-semibold text-black">Median age:</p>
                <p className="text-black">47.9 years</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-2 border-zohran-orange">
            <h3 className="font-bold text-lg sm:text-xl text-black mb-3">🔑 How Zohran Won Brighton Beach</h3>
            <div className="space-y-3 text-sm sm:text-base">
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-black mb-1">Most Russian Jews couldn't vote against him</p>
                <p className="text-black">They're registered Republicans. Only Democrats vote in Dem primary.</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-black mb-1">Central Asian Muslims turned out in force</p>
                <p className="text-black">Uzbeks, Tajiks, Kazakhs, Kyrgyz — registered Democrats, voted for "their guy"</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-black mb-1">Palestine position was decisive</p>
                <p className="text-black">Many voted for him not because he's socialist, but because he's pro-Palestine</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-2 border-zohran-red">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-red mb-3">⚠️ Opposition Voices You'll Hear</h3>
            <div className="space-y-4 text-sm sm:text-base">
              <div className="bg-white p-4 sm:p-5 rounded-lg">
                <p className="font-semibold text-zohran-red mb-2">Inna Vernikov (City Council, Brighton Beach):</p>
                <p className="text-black italic mb-2">"I grew up under communism. I know what 'government-run grocery stores' lead to: bread lines, devastation, no choice."</p>
                <p className="text-black text-sm">She won her Republican primary decisively — her anti-socialist message resonates strongly.</p>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-lg">
                <p className="font-semibold text-zohran-red mb-2">Gregory Lyakhov (Columnist, child of Soviet immigrants):</p>
                <p className="text-black italic mb-2">"My grandparents stood in lines for hours for bread. Will I have to flee my own city?"</p>
                <p className="text-black text-sm">Wrote multiple op-eds: "My Parents Stood in the Breadlines Mamdani Wants to Bring to NYC"</p>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-lg">
                <p className="font-semibold text-zohran-red mb-2">Brighton Beach News (Russian-language paper):</p>
                <p className="text-black italic">"Never has America's most Jewish city been so close to falling into hands of convinced antisemite."</p>
              </div>
            </div>
            <div className="bg-zohran-red text-white p-3 sm:p-4 rounded mt-4">
              <p className="font-medium text-sm sm:text-base">
                These voices represent genuine Soviet trauma — acknowledge it, don't dismiss it
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-2 border-zohran-blue">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-blue mb-3">🎤 Assembly Member Mikhail Novakhov Explains</h3>
            <p className="text-black text-sm sm:text-base mb-3 italic">Interview with Novaya Gazeta, July 11, 2025</p>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-1">On why Russian-speakers couldn't stop him:</p>
                <p className="text-black">"Significant portion of Russian-speaking population are registered Republicans. With all their desire, they simply couldn't participate in voting for Democratic candidate."</p>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-1">On Muslim voters:</p>
                <p className="text-black">"Brighton Beach has fairly large Muslim population — immigrants from Pakistan, Palestine, Jordan. For them, he is 'their guy,' and his leftist views recede into background."</p>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-1">What poll workers saw:</p>
                <p className="text-black">"They told me: 'Misha, many people coming to vote.' By appearance, by language, it was clear who these voters were. Very many came to vote specifically for Mamdani."</p>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-1">On the Palestine factor:</p>
                <p className="text-black">"Significant part voted for Mamdani not because he's socialist, but because he's perceived as 'their own' — sympathizing with Palestine, criticizing Israel. This was decisive factor."</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-2 border-zohran-blue">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-blue mb-3">🌏 Central Asian Communities</h3>
            <p className="text-black text-sm sm:text-base mb-3">Uzbeks, Tajiks, Kazakhs, Kyrgyz — the quiet majority that decided Brighton Beach</p>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-1">Why they came to Brighton Beach:</p>
                <p className="text-black">"Russian language still binds them together" — they speak Russian from Soviet times, but are predominantly Muslim</p>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-1">What matters to them:</p>
                <ul className="text-black space-y-1 ml-4">
                  <li>• First Muslim mayor = historic representation</li>
                  <li>• Zohran campaigned in Uzbek language</li>
                  <li>• Pro-Palestine position resonates deeply</li>
                  <li>• Economic policies help working families</li>
                </ul>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-1">Brighton Beach today:</p>
                <p className="text-black">"No longer just Odessa. Now Uzbeks, Kyrgyz, Kazakhs, Tajiks." — hosts Central Asian Nowruz celebrations</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-2 border-zohran-orange">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-orange mb-3">😰 What Russian-Speaking Jews Fear</h3>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="bg-white p-3 sm:p-4 rounded border border-gray-300">
                <p className="font-semibold text-black mb-2">1. Soviet Trauma: "We've seen this before"</p>
                <p className="text-black mb-2">Government control of economy = Soviet shortages</p>
                <p className="text-black text-sm italic">Trigger policies: Rent freeze, city grocery stores, $30 min wage, wealth redistribution</p>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded border border-gray-300">
                <p className="font-semibold text-black mb-2">2. Israel/Palestine: "Antisemite"</p>
                <p className="text-black mb-2">Zohran's positions seen as threatening Jewish safety</p>
                <p className="text-black text-sm italic">Concerns: BDS support, calling Gaza "genocide," would arrest Netanyahu</p>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded border border-gray-300">
                <p className="font-semibold text-black mb-2">3. Cultural Anxiety: "America will change"</p>
                <p className="text-black">Sanctuary city policies, Muslim identity, Qatar conspiracy theories</p>
              </div>
            </div>

            <div className="bg-zohran-orange text-white p-3 sm:p-4 rounded mt-4">
              <p className="font-medium text-sm">
                Common phrases: "I lived under communism" • "Bread lines" • "Government grocery stores" • "We ran away from socialism"
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-blue">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-blue mb-3">🗳️ Actual Voting Results</h3>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-2">Where Zohran WON:</p>
                <ul className="text-black space-y-1">
                  <li>• Brighton Beach (Muslim voters)</li>
                  <li>• Chinatown: +28 points</li>
                  <li>• Jackson Heights (Bangladeshi): +26</li>
                  <li>• Sunset Park (Chinese): +37</li>
                  <li>• Woodside: +34</li>
                  <li>• 5 of 6 majority-Asian neighborhoods</li>
                </ul>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-red mb-2">Where Cuomo WON:</p>
                <ul className="text-black space-y-1">
                  <li>• Sheepshead Bay</li>
                  <li>• Manhattan Beach</li>
                  <li>• Midwood/Borough Park: 78%</li>
                  <li>• (All heavily Russian-Jewish areas)</li>
                </ul>
              </div>
            </div>

            <div className="bg-zohran-blue text-white p-3 sm:p-4 rounded mt-4">
              <p className="font-medium text-sm sm:text-base">
                📊 Overall: Zohran won primary by 12 points with coalition of working-class immigrants, South Asians, Muslims, progressive voters
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-2 border-zohran-blue">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-blue mb-3">💪 Your Canvassing Strategy</h3>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="bg-white p-4 sm:p-5 rounded">
                <p className="font-semibold text-zohran-blue mb-2">✓ DO:</p>
                <ul className="text-black space-y-1 ml-4">
                  <li>• Lead with economics: rent freeze, free childcare, $30 wage</li>
                  <li>• Use crime data: murders -34%, shootings -23%</li>
                  <li>• Acknowledge Soviet trauma, then explain differences</li>
                  <li>• Point to Trump-Cuomo connection</li>
                  <li>• Ask about their grandchildren's future</li>
                  <li>• Listen more than you talk</li>
                </ul>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded">
                <p className="font-semibold text-zohran-red mb-2">✗ DON'T:</p>
                <ul className="text-black space-y-1 ml-4">
                  <li>• Say "socialism" unless they bring it up</li>
                  <li>• Dismiss their Soviet experiences</li>
                  <li>• Argue about Israel/Palestine extensively</li>
                  <li>• Get into long ideological debates</li>
                  <li>• Assume all Russian-speakers think alike</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-2 border-zohran-orange">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-orange mb-3">🗣️ Key Phrases That Work</h3>
            
            <div className="space-y-2 text-sm sm:text-base">
              <div className="bg-white p-3 rounded border border-gray-300">
                <p className="text-black font-medium">"Who's robbing you now — government or your landlord?"</p>
              </div>
              <div className="bg-white p-3 rounded border border-gray-300">
                <p className="text-black font-medium">"Cuomo won't freeze rent — it goes up 5% next year"</p>
              </div>
              <div className="bg-white p-3 rounded border border-gray-300">
                <p className="text-black font-medium">"Trump prefers Cuomo — they can make deals together"</p>
              </div>
              <div className="bg-white p-3 rounded border border-gray-300">
                <p className="text-black font-medium">"France, Germany, Japan — capitalist with free childcare"</p>
              </div>
              <div className="bg-white p-3 rounded border border-gray-300">
                <p className="text-black font-medium">"Will your grandchildren afford to stay here?"</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-gray-400">
            <h3 className="font-bold text-lg sm:text-xl text-black mb-3">❓ The Missing Voices</h3>
            <p className="text-black text-sm sm:text-base mb-3">Important communities we have limited data on:</p>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-black mb-1">Ukrainians (80,000 in NYC):</p>
                <p className="text-black">Almost no coverage found. Zohran said he'd arrest Putin — but no Ukrainian response documented.</p>
              </div>
              
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-black mb-1">Georgians & Armenians:</p>
                <p className="text-black">No specific coverage. Likely align with Russian-Jewish community on socialism fears.</p>
              </div>
            </div>

            <div className="bg-gray-200 p-3 sm:p-4 rounded mt-4">
              <p className="text-black text-sm">
                💡 Why? Discussions happen in closed Telegram/WhatsApp groups, not public forums. Russian-language politics is mostly invisible to English researchers.
              </p>
            </div>
          </div>

          <div className="bg-zohran-red text-white p-5 sm:p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg sm:text-xl mb-3">🚨 Critical Reminders</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>• This community is NOT monolithic — Jews ≠ Muslims ≠ Ukrainians</li>
              <li>• Brighton Beach transformed: not just "Little Odessa" anymore</li>
              <li>• Trump got 75-90% here in 2024, but Zohran still won primary</li>
              <li>• When trauma is too deep, respect it and move on</li>
              <li>• Your safety comes first — leave if hostile</li>
              <li>• You're part of 50,000-volunteer army that won the primary</li>
            </ul>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-blue">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-blue mb-4">📚 Sources & Further Reading</h3>
            <div className="space-y-4 text-sm sm:text-base">
              <div>
                <p className="font-semibold text-black mb-2">Campaign & Results:</p>
                <ul className="space-y-1 text-zohran-blue">
                  <li>• <a href="https://www.zohranfornyc.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Zohran for NYC - Official Campaign</a></li>
                  <li>• <a href="https://en.wikipedia.org/wiki/2025_New_York_City_Democratic_mayoral_primary" target="_blank" rel="noopener noreferrer" className="hover:underline">2025 NYC Democratic Primary</a></li>
                  <li>• <a href="https://www.bloomberg.com/graphics/2025-mamdani-nyc-voters/" target="_blank" rel="noopener noreferrer" className="hover:underline">Bloomberg: Who Voted for Mamdani?</a></li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-black mb-2">Community Analysis:</p>
                <ul className="space-y-1 text-zohran-blue">
                  <li>• <a href="https://forward.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">The Forward - Jewish Community</a></li>
                  <li>• <a href="https://www.tabletmag.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Tablet Magazine</a></li>
                  <li>• <a href="https://www.aljazeera.com/economy/2025/7/17/how-zohran-mamdani-reached-a-multilingual-multicultural-new-york" target="_blank" rel="noopener noreferrer" className="hover:underline">Al Jazeera: Multilingual Campaign</a></li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-black mb-2">Russian-Language Media:</p>
                <ul className="space-y-1 text-zohran-blue">
                  <li>• <a href="https://www.brightonbeachnews.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Brighton Beach News</a></li>
                  <li>• <a href="https://novayagazeta.eu/" target="_blank" rel="noopener noreferrer" className="hover:underline">Novaya Gazeta</a></li>
                  <li>• <a href="https://meduza.io/" target="_blank" rel="noopener noreferrer" className="hover:underline">Meduza</a></li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-black mb-2">Opposition Voices:</p>
                <ul className="space-y-1 text-zohran-blue">
                  <li>• <a href="https://www.thegatewaypundit.com/2025/07/my-parents-stood-breadlines-mamdani-wants-bring-nyc/" target="_blank" rel="noopener noreferrer" className="hover:underline">Gateway Pundit: Lyakhov on Breadlines</a></li>
                  <li>• <a href="https://townhall.com/columnists/gregory-lyakhov/2025/07/22/zohran-mamdanis-agenda-hurts-nycs-kids-n2660726" target="_blank" rel="noopener noreferrer" className="hover:underline">Townhall: Mamdani's Agenda</a></li>
                  <li>• <a href="https://council.nyc.gov/district-48/" target="_blank" rel="noopener noreferrer" className="hover:underline">Inna Vernikov - NYC Council</a></li>
                </ul>
              </div>

              <div className="bg-white border border-zohran-blue p-4 rounded mt-4">
                <p className="text-black text-sm">
                  <strong>Research Note:</strong> This guide synthesizes public statements, news coverage, and voting analysis from April-September 2025. Russian-language discussions largely occur in closed Telegram/WhatsApp groups.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-zohran-blue text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setActiveSection('home');
                setSearchTerm('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left hover:opacity-80 transition-opacity"
            >
              <h1 className="text-xl sm:text-2xl font-bold text-white">ZOHRAN</h1>
              <p className="text-white opacity-90 text-sm sm:text-base">for Brighton Beach</p>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 sm:p-3 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors touch-manipulation"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <div className="mt-3 sm:mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white opacity-70" size={20} />
            <input
              type="text"
              placeholder="Search all content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      {menuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div 
            className={`
              lg:w-64 
              ${menuOpen 
                ? 'fixed inset-y-0 left-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto pt-20 px-4 pb-4' 
                : 'hidden lg:block'
              }
            `}
          >
            <div className="space-y-2 lg:sticky lg:top-24">
              {Object.entries(sections).map(([key, section]) => (
                <NavButton key={key} sectionKey={key} section={section} />
              ))}
            </div>
          </div>

          <div className="flex-1 lg:max-w-3xl">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvassingApp;
