import React, { useState } from 'react';
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
      russian: 'Вы зна́ете, что Трамп угрожа́ет уре́зать финанси́рование Нью-Йóрка, е́сли Зохра́н ста́нет мэ́ром? Э́то в ва́ших интере
