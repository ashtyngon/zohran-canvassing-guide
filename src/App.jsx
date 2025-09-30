import React, { useState, useMemo } from 'react';
import { Search, Home, Users, DollarSign, Shield, AlertCircle, BookOpen, ChevronRight, Menu, X } from 'lucide-react';

const CanvassingApp = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = {
    home: { title: 'Home', icon: Home },
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
      title: 'Safety',
      russian: 'Я то́же хочу́ жить в безопáсном го́роде. Зохра́н созда́ст но́вый отде́л безопáсности — он бу́дет вклады́вать в психи́ческое здоро́вье, де́лать у́лицы и метро́ безопáснее, сокраща́ть бездо́мность, предотвраща́ть вооружённое наси́лие.',
      english: 'I also want to live in a safe city. Zohran will create a new department focused on safety - he will invest in mental health, making streets and subways safer, reducing homelessness, and preventing gun violence.'
    },
    {
      title: 'Claims of anti-Semitism',
      russian: 'Зохра́н — не антисеми́т. Он уважа́ет евре́йских ли́деров и рабо́тает с ни́ми по мно́гим вопро́сам. Он хо́чет, что́бы война́ зако́нчилась и изра́ильтяне с палести́нцами жи́ли ми́рно.',
      english: 'Zohran is not anti-Semitic; he respects and works with Jewish leaders. He supports an end to the war where Israelis and Palestinians can live in peace.'
    },
    {
      title: 'Communism/socialism concerns',
      russian: 'Зохра́н — не коммуни́ст. «Демократи́ческий социали́зм» зна́чит: эконо́мика до́лжна рабо́тать для просты́х люде́й. Он не создаёт но́вый СССР. Он хо́чет, что́бы жизнь в Нью-Йо́рке была́ доступне́е.',
      english: 'Zohran is not a communist. "Democratic Socialism" means: the economy should work for working people. He is not creating a new USSR. He wants to make life in NYC more affordable.'
    },
    {
      title: 'How will he pay for it?',
      russian: 'Зохра́н возьмёт нало́ги с топ-1% — тех, кто зараба́тывает бо́льше миллио́на до́лларов в год. Не с рабо́чих люде́й. Е́сли уравня́ть корпорати́вный нало́г с у́ровнем Нью-Дже́рси, го́род полу́чит 5 миллиа́рдов до́лларов.',
      english: 'Zohran will tax the top 1% — those making over $1 million a year. Not working class people. Just matching New Jersey\'s corporate tax rate would bring in $5 billion.'
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
            ? 'bg-orange-100 text-gray-700 hover:bg-orange-200 border-2 border-zohran-orange'
            : 'bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100'
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
          <p className="text-gray-600 text-lg mb-2">No results found for "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-zohran-blue hover:text-blue-700 font-medium"
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
            <div className="bg-orange-100 border-l-4 border-zohran-orange p-4 rounded">
              <p className="text-gray-900">
                Found matches in {searchResults.matchingSections.size} sections for "{searchTerm}"
              </p>
            </div>
          )}
          
          <div className="bg-gradient-to-r from-zohran-blue to-zohran-orange text-white p-5 sm:p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Volunteer Canvassing Guide</h2>
            <p className="text-orange-100 leading-relaxed text-base sm:text-lg">
              Russian-speaking Brooklyn voters for Zohran Mamdani's campaign
            </p>
          </div>
          
          <div className="bg-orange-50 border-l-4 border-zohran-orange p-4 sm:p-5 rounded">
            <p className="text-gray-900 font-medium text-base sm:text-lg">
              Глáвный совéт: Говори́те об эконóмике, а не об идеолóгии / Key tip: Talk about economics, not ideology
            </p>
          </div>

          <div className="grid gap-4">
            <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-blue">
              <h3 className="font-bold text-lg sm:text-xl mb-3 text-zohran-blue">Quick Facts / Быстрые факты</h3>
              <ul className="space-y-2 text-gray-700 text-base sm:text-lg">
                <li>✓ 121,607 рýсскоговорящих / Russian speakers in Brooklyn</li>
                <li>✓ 70-80% голосýют за республикáнцев / vote Republican</li>
                <li>✓ Проблéмы: жильё, стóимость, безопáсность / housing, costs, safety</li>
                <li>✓ 36% не говоря́т по-англи́йски / don't speak English</li>
              </ul>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-orange">
              <h3 className="font-bold text-lg sm:text-xl mb-3 text-zohran-blue">Key Messages / Ключевые сообщения</h3>
              <ul className="space-y-2 text-gray-700 text-base sm:text-lg">
                <li>🏠 Замóрозка арéнды / Rent freeze</li>
                <li>👶 Бесплáтный детсáд / Free childcare (6 weeks-5 years)</li>
                <li>💰 $30 зарплáта к 2030 / $30 minimum wage by 2030</li>
                <li>🏗️ 200,000 досту́пных кварти́р / affordable apartments</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === 'priorities') {
      return (
        <div className="space-y-4">
          {searchTerm && (
            <div className="bg-orange-100 border-l-4 border-zohran-orange p-4 rounded mb-4">
              <p className="text-gray-900">Showing results for "{searchTerm}"</p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue mb-4">Key Priorities</h2>
          {priorities.map((item, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg sm:text-xl text-zohran-blue mb-3">{item.title}</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded border-l-4 border-zohran-blue">
                  <p className="text-gray-800 font-medium text-base sm:text-lg">{item.russian}</p>
                </div>
                <p className="text-gray-600 italic text-sm sm:text-base">{item.english}</p>
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
            <div className="bg-orange-100 border-l-4 border-zohran-orange p-4 rounded mb-4">
              <p className="text-gray-900">Showing results for "{searchTerm}"</p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue mb-4">Persuasion Questions</h2>
          <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-blue mb-6">
            <p className="text-zohran-blue text-sm sm:text-base">
              Questions to help voters see voting for Mamdani serves their interests, and that Trump's fear-mongering works against them.
            </p>
          </div>
          {persuasionQuestions.map((q, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-zohran-orange px-3 py-1.5 rounded-full inline-block mb-3">
                <span className="text-white font-semibold text-sm sm:text-base">{q.category}</span>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded border-l-4 border-zohran-blue">
                  <p className="text-gray-800 font-medium mb-2 text-base sm:text-lg">{q.russian}</p>
                  <p className="text-gray-600 italic text-sm sm:text-base">{q.english}</p>
                  {q.pronunciation && (
                    <p className="text-zohran-blue text-sm mt-2">🔊 {q.pronunciation}</p>
                  )}
                </div>
                {q.followup && (
                  <div className="bg-orange-50 p-3 sm:p-4 rounded border-l-4 border-zohran-orange">
                    <p className="text-gray-900 font-medium text-sm sm:text-base">
                      <span className="text-zohran-orange">Follow-up:</span> {q.followup}
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
            <div className="bg-orange-100 border-l-4 border-zohran-orange p-4 rounded mb-4">
              <p className="text-gray-900">Showing results for "{searchTerm}"</p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue mb-4">Identity-Based Persuasion</h2>
          <p className="text-gray-700 bg-blue-50 p-4 sm:p-5 rounded-lg border-l-4 border-zohran-blue text-base sm:text-lg">
            Tailored talking points for specific community groups in Brighton Beach
          </p>
          {affinityGroups.map((group, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-t-4 border-zohran-orange">
              <h3 className="font-bold text-xl sm:text-2xl text-zohran-blue mb-4">{group.group}</h3>
              <div className="space-y-4">
                {group.points.map((point, pidx) => (
                  <div key={pidx} className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 sm:p-5 rounded-lg">
                    <div className="space-y-2">
                      <p className="text-gray-800 font-medium leading-relaxed text-base sm:text-lg">{point.russian}</p>
                      <p className="text-gray-600 italic text-sm sm:text-base leading-relaxed">{point.english}</p>
                      {point.pronunciation && (
                        <p className="text-zohran-blue text-sm">🔊 {point.pronunciation}</p>
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
            <div className="bg-orange-100 border-l-4 border-zohran-orange p-4 rounded mb-4">
              <p className="text-gray-900">Showing results for "{searchTerm}"</p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue mb-4">Zohran's Platform</h2>
          <p className="text-gray-600 mb-4 text-base sm:text-lg">He will... / Он...</p>
          {platform.map((item, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-zohran-orange">
              <h3 className="font-bold text-zohran-blue mb-2 text-base sm:text-lg">✓ {item.title}</h3>
              <div className="space-y-2">
                <p className="text-gray-800 text-base sm:text-lg">{item.russian}</p>
                <p className="text-gray-600 italic text-sm sm:text-base">{item.english}</p>
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
            <div className="bg-orange-100 border-l-4 border-zohran-orange p-4 rounded mb-4">
              <p className="text-gray-900">Showing results for "{searchTerm}"</p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue mb-4">Addressing Concerns</h2>
          {concerns.map((item, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg sm:text-xl text-zohran-red mb-3">⚠️ {item.title}</h3>
              <div className="space-y-3">
                <div className="bg-red-50 p-4 rounded border-l-4 border-zohran-red">
                  <p className="text-gray-800 leading-relaxed text-base sm:text-lg">{item.russian}</p>
                </div>
                <p className="text-gray-600 italic text-sm sm:text-base leading-relaxed">{item.english}</p>
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
            <div className="bg-orange-100 border-l-4 border-zohran-orange p-4 rounded mb-4">
              <p className="text-gray-900">Showing results for "{searchTerm}"</p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue mb-4">About Cuomo</h2>
          <div className="bg-red-50 border-l-4 border-zohran-red p-4 sm:p-5 rounded mb-4">
            <p className="text-red-900 font-medium text-base sm:text-lg">
              ⚠️ Important information about the main opponent
            </p>
          </div>
          {cuomoPoints.map((item, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-lg shadow-md">
              <div className="space-y-2">
                <p className="text-gray-800 font-medium text-base sm:text-lg">{item.russian}</p>
                <p className="text-gray-600 italic text-sm sm:text-base">{item.english}</p>
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
            <div className="bg-orange-100 border-l-4 border-zohran-orange p-4 rounded mb-4">
              <p className="text-gray-900">Showing results for "{searchTerm}"</p>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-zohran-blue mb-4">Brighton Beach Area Report</h2>
          
          <div className="bg-gradient-to-r from-zohran-blue to-zohran-orange text-white p-5 sm:p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg sm:text-xl mb-3">🎯 The Brighton Beach Paradox</h3>
            <p className="leading-relaxed mb-2 text-base sm:text-lg">
              Zohran won Brighton Beach — a neighborhood that voted 75-90% for Trump in 2024.
            </p>
            <p className="text-orange-100 text-sm sm:text-base">
              How? Uzbek, Tajik, and Pakistani Muslims overcame Russian-speaking Jewish opposition.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-blue">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-blue mb-3">📊 Quick Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
              <div className="bg-gray-50 p-3 sm:p-4 rounded">
                <p className="font-semibold text-gray-800">Russian speakers:</p>
                <p className="text-gray-600">121,607 in Brooklyn</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded">
                <p className="font-semibold text-gray-800">Typical vote:</p>
                <p className="text-gray-600">70-80% Republican</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded">
                <p className="font-semibold text-gray-800">Don't speak English:</p>
                <p className="text-gray-600">36%</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded">
                <p className="font-semibold text-gray-800">Median age:</p>
                <p className="text-gray-600">47.9 years</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-orange">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-orange mb-3">🔑 How Zohran Won Brighton Beach</h3>
            <div className="space-y-3 text-sm sm:text-base">
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-gray-800 mb-1">Most Russian Jews couldn't vote against him</p>
                <p className="text-gray-600">They're registered Republicans. Only Democrats vote in Dem primary.</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-gray-800 mb-1">Central Asian Muslims turned out in force</p>
                <p className="text-gray-600">Uzbeks, Tajiks, Kazakhs, Kyrgyz — registered Democrats, voted for "their guy"</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-gray-800 mb-1">Palestine position was decisive</p>
                <p className="text-gray-600">Many voted for him not because he's socialist, but because he's pro-Palestine</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-red">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-red mb-3">⚠️ Opposition Voices You'll Hear</h3>
            <div className="space-y-4 text-sm sm:text-base">
              <div className="bg-white p-4 sm:p-5 rounded-lg">
                <p className="font-semibold text-zohran-red mb-2">Inna Vernikov (City Council, Brighton Beach):</p>
                <p className="text-gray-700 italic mb-2">"I grew up under communism. I know what 'government-run grocery stores' lead to: bread lines, devastation, no choice."</p>
                <p className="text-gray-600 text-sm">She won her Republican primary decisively — her anti-socialist message resonates strongly.</p>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-lg">
                <p className="font-semibold text-zohran-red mb-2">Gregory Lyakhov (Columnist, child of Soviet immigrants):</p>
                <p className="text-gray-700 italic mb-2">"My grandparents stood in lines for hours for bread. Will I have to flee my own city?"</p>
                <p className="text-gray-600 text-sm">Wrote multiple op-eds: "My Parents Stood in the Breadlines Mamdani Wants to Bring to NYC"</p>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-lg">
                <p className="font-semibold text-zohran-red mb-2">Brighton Beach News (Russian-language paper):</p>
                <p className="text-gray-700 italic">"Never has America's most Jewish city been so close to falling into hands of convinced antisemite."</p>
              </div>
            </div>
            <div className="bg-red-100 p-3 sm:p-4 rounded mt-4">
              <p className="text-red-900 font-medium text-sm sm:text-base">
                These voices represent genuine Soviet trauma — acknowledge it, don't dismiss it
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-blue">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-blue mb-3">🎤 Assembly Member Mikhail Novakhov Explains</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-3 italic">Interview with Novaya Gazeta, July 11, 2025</p>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-1">On why Russian-speakers couldn't stop him:</p>
                <p className="text-gray-700">"Significant portion of Russian-speaking population are registered Republicans. With all their desire, they simply couldn't participate in voting for Democratic candidate."</p>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-1">On Muslim voters:</p>
                <p className="text-gray-700">"Brighton Beach has fairly large Muslim population — immigrants from Pakistan, Palestine, Jordan. For them, he is 'their guy,' and his leftist views recede into background."</p>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-1">What poll workers saw:</p>
                <p className="text-gray-700">"They told me: 'Misha, many people coming to vote.' By appearance, by language, it was clear who these voters were. Very many came to vote specifically for Mamdani."</p>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-1">On the Palestine factor:</p>
                <p className="text-gray-700">"Significant part voted for Mamdani not because he's socialist, but because he's perceived as 'their own' — sympathizing with Palestine, criticizing Israel. This was decisive factor."</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-blue">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-blue mb-3">🌏 Central Asian Communities</h3>
            <p className="text-gray-700 text-sm sm:text-base mb-3">Uzbeks, Tajiks, Kazakhs, Kyrgyz — the quiet majority that decided Brighton Beach</p>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-1">Why they came to Brighton Beach:</p>
                <p className="text-gray-700">"Russian language still binds them together" — they speak Russian from Soviet times, but are predominantly Muslim</p>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-1">What matters to them:</p>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• First Muslim mayor = historic representation</li>
                  <li>• Zohran campaigned in Uzbek language</li>
                  <li>• Pro-Palestine position resonates deeply</li>
                  <li>• Economic policies help working families</li>
                </ul>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-1">Brighton Beach today:</p>
                <p className="text-gray-700">"No longer just Odessa. Now Uzbeks, Kyrgyz, Kazakhs, Tajiks." — hosts Central Asian Nowruz celebrations</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-orange">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-orange mb-3">😰 What Russian-Speaking Jews Fear</h3>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-orange mb-2">1. Soviet Trauma: "We've seen this before"</p>
                <p className="text-gray-700 mb-2">Government control of economy = Soviet shortages</p>
                <p className="text-gray-600 text-sm">Trigger policies: Rent freeze, city grocery stores, $30 min wage, wealth redistribution</p>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-orange mb-2">2. Israel/Palestine: "Antisemite"</p>
                <p className="text-gray-700 mb-2">Zohran's positions seen as threatening Jewish safety</p>
                <p className="text-gray-600 text-sm">Concerns: BDS support, calling Gaza "genocide," would arrest Netanyahu</p>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-orange mb-2">3. Cultural Anxiety: "America will change"</p>
                <p className="text-gray-700">Sanctuary city policies, Muslim identity, Qatar conspiracy theories</p>
              </div>
            </div>

            <div className="bg-orange-100 p-3 sm:p-4 rounded mt-4">
              <p className="text-gray-900 font-medium text-sm">
                Common phrases: "I lived under communism" • "Bread lines" • "Government grocery stores" • "We ran away from socialism"
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-blue">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-blue mb-3">🗳️ Actual Voting Results</h3>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-zohran-blue mb-2">Where Zohran WON:</p>
                <ul className="text-gray-700 space-y-1">
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
                <ul className="text-gray-700 space-y-1">
                  <li>• Sheepshead Bay</li>
                  <li>• Manhattan Beach</li>
                  <li>• Midwood/Borough Park: 78%</li>
                  <li>• (All heavily Russian-Jewish areas)</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-100 p-3 sm:p-4 rounded mt-4">
              <p className="text-zohran-blue font-medium text-sm sm:text-base">
                📊 Overall: Zohran won primary by 12 points with coalition of working-class immigrants, South Asians, Muslims, progressive voters
              </p>
            </div>
          </div>

          <div className="bg-indigo-50 p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
            <h3 className="font-bold text-lg sm:text-xl text-indigo-800 mb-3">💪 Your Canvassing Strategy</h3>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="bg-white p-4 sm:p-5 rounded">
                <p className="font-semibold text-indigo-700 mb-2">✓ DO:</p>
                <ul className="text-gray-700 space-y-1 ml-4">
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
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Say "socialism" unless they bring it up</li>
                  <li>• Dismiss their Soviet experiences</li>
                  <li>• Argue about Israel/Palestine extensively</li>
                  <li>• Get into long ideological debates</li>
                  <li>• Assume all Russian-speakers think alike</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-zohran-orange">
            <h3 className="font-bold text-lg sm:text-xl text-zohran-orange mb-3">🗣️ Key Phrases That Work</h3>
            
            <div className="space-y-2 text-sm sm:text-base">
              <div className="bg-white p-3 rounded">
                <p className="text-gray-700">"Who's robbing you now — government or your landlord?"</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-gray-700">"Cuomo won't freeze rent — it goes up 5% next year"</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-gray-700">"Trump prefers Cuomo — they can make deals together"</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-gray-700">"France, Germany, Japan — capitalist with free childcare"</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-gray-700">"Will your grandchildren afford to stay here?"</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-5 sm:p-6 rounded-lg shadow-md border-l-4 border-gray-400">
            <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3">❓ The Missing Voices</h3>
            <p className="text-gray-700 text-sm sm:text-base mb-3">Important communities we have limited data on:</p>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-gray-700 mb-1">Ukrainians (80,000 in NYC):</p>
                <p className="text-gray-600">Almost no coverage found. Zohran said he'd arrest Putin — but no Ukrainian response documented.</p>
              </div>
              
              <div className="bg-white p-3 sm:p-4 rounded">
                <p className="font-semibold text-gray-700 mb-1">Georgians & Armenians:</p>
                <p className="text-gray-600">No specific coverage. Likely align with Russian-Jewish community on socialism fears.</p>
              </div>
            </div>

            <div className="bg-gray-200 p-3 sm:p-4 rounded mt-4">
              <p className="text-gray-800 text-sm">
                💡 Why? Discussions happen in closed Telegram/WhatsApp groups, not public forums. Russian-language politics is mostly invisible to English researchers.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-zohran-red to-zohran-orange text-white p-5 sm:p-6 rounded-lg shadow-lg">
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
                <p className="font-semibold text-gray-800 mb-2">Campaign & Results:</p>
                <ul className="space-y-1 text-zohran-blue">
                  <li>• <a href="https://www.zohranfornyc.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Zohran for NYC - Official Campaign</a></li>
                  <li>• <a href="https://en.wikipedia.org/wiki/2025_New_York_City_Democratic_mayoral_primary" target="_blank" rel="noopener noreferrer" className="hover:underline">2025 NYC Democratic Primary</a></li>
                  <li>• <a href="https://www.bloomberg.com/graphics/2025-mamdani-nyc-voters/" target="_blank" rel="noopener noreferrer" className="hover:underline">Bloomberg: Who Voted for Mamdani?</a></li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-2">Community Analysis:</p>
                <ul className="space-y-1 text-zohran-blue">
                  <li>• <a href="https://forward.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">The Forward - Jewish Community</a></li>
                  <li>• <a href="https://www.tabletmag.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Tablet Magazine</a></li>
                  <li>• <a href="https://www.aljazeera.com/economy/2025/7/17/how-zohran-mamdani-reached-a-multilingual-multicultural-new-york" target="_blank" rel="noopener noreferrer" className="hover:underline">Al Jazeera: Multilingual Campaign</a></li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-2">Russian-Language Media:</p>
                <ul className="space-y-1 text-zohran-blue">
                  <li>• <a href="https://www.brightonbeachnews.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Brighton Beach News</a></li>
                  <li>• <a href="https://novayagazeta.eu/" target="_blank" rel="noopener noreferrer" className="hover:underline">Novaya Gazeta</a></li>
                  <li>• <a href="https://meduza.io/" target="_blank" rel="noopener noreferrer" className="hover:underline">Meduza</a></li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-2">Opposition Voices:</p>
                <ul className="space-y-1 text-zohran-blue">
                  <li>• <a href="https://www.thegatewaypundit.com/2025/07/my-parents-stood-breadlines-mamdani-wants-bring-nyc/" target="_blank" rel="noopener noreferrer" className="hover:underline">Gateway Pundit: Lyakhov on Breadlines</a></li>
                  <li>• <a href="https://townhall.com/columnists/gregory-lyakhov/2025/07/22/zohran-mamdanis-agenda-hurts-nycs-kids-n2660726" target="_blank" rel="noopener noreferrer" className="hover:underline">Townhall: Mamdani's Agenda</a></li>
                  <li>• <a href="https://council.nyc.gov/district-48/" target="_blank" rel="noopener noreferrer" className="hover:underline">Inna Vernikov - NYC Council</a></li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded mt-4">
                <p className="text-zohran-blue text-sm">
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
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-zohran-orange">ZOHRAN</h1>
              <p className="text-orange-200 text-sm sm:text-base">for New York City</p>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 sm:p-3 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors touch-manipulation"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <div className="mt-3 sm:mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-300" size={20} />
            <input
              type="text"
              placeholder="Search all content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-lg bg-white bg-opacity-20 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-zohran-orange text-sm sm:text-base"
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
